# Gold Price API — Deployment Guide (Docker + Nginx + AWS)

คู่มือนี้สรุปขั้นตอนตั้งแต่เริ่มต้นจนสามารถเรียก API ได้จาก Public IP บน AWS โดยใช้ **Docker**, **Nginx (Reverse Proxy)** และ **GitHub Container Registry (GHCR)**

> ตัวอย่างปลายทางที่ใช้งานได้จริง:
> `http://<PUBLIC_IP>/api/v1/gold-price`

---

## Architecture Overview

```
Internet
   ↓ (Port 80)
EC2 Public IP
   ↓
Nginx (Docker)
   ↓
Gold Price API (Node.js Docker)
```

- Nginx เป็นประตูหน้า (Entry Point)
- Node.js API รันภายใน Docker และไม่เปิด public port
- ทั้งสอง container อยู่ใน Docker network เดียวกัน

---

## Prerequisites

- AWS EC2 (Default VPC)
- Security Group เปิด Inbound:
  - TCP 80 → `0.0.0.0/0`
- Docker & Docker Compose ติดตั้งแล้ว
- Docker image ของ API อยู่ที่ **GHCR (public)**

---

## Step-by-Step Deployment

### 1) เตรียม EC2 และ Network (AWS)

- EC2 ต้องมี **Public IPv4**
- อยู่ใน **Public Subnet**
- Security Group:
  - เปิด TCP 80 (HTTP)

---

### 2) ติดตั้ง Docker และ Docker Compose

ตรวจสอบว่าใช้งานได้:

```bash
docker ps
docker compose version
```

---

### 3) เตรียม Docker Image ของ Node.js API (GHCR)

- Build และ Push image ไปยัง GHCR
- ตั้งค่า Package เป็น **public**
- รูปแบบชื่อ image:

```
ghcr.io/<github-username>/gold-price-api:<tag>
```

ตัวอย่าง:
```
ghcr.io/fahaph/gold-price-api:latest
```

---

### 4) สร้างโครงสร้างโปรเจกต์

```
project/
├─ docker-compose.yml
└─ nginx/
   └─ conf.d/
      └─ default.conf
```

---

### 5) ตั้งค่า Nginx เป็น Reverse Proxy

ไฟล์: `nginx/conf.d/default.conf`

```nginx
server {
    listen 80;

    location /api/ {
        proxy_pass http://gold-price-api:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

### 6) สร้าง docker-compose.yml

```yaml
version: "3.8"

services:
  gold-price-api:
    image: ghcr.io/fahaph/gold-price-api:latest
    container_name: gold-price-api
    expose:
      - "3000"
    networks:
      - ingress-net

  nginx-ingress:
    image: nginx:alpine
    container_name: nginx-ingress
    ports:
      - "80:80"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
    depends_on:
      - gold-price-api
    networks:
      - ingress-net

networks:
  ingress-net:
    driver: bridge
```

---

### 7) ล้าง Container เก่า (ถ้ามี) และรันระบบ

```bash
docker rm -f gold-price-api nginx-ingress || true
docker compose up -d --pull always
```

ตรวจสอบ:

```bash
docker ps
```

---

### 8) ทดสอบจากเครื่อง EC2 (Local Test)

```bash
curl http://localhost/api/health
```

- ถ้าได้ response → nginx proxy ไป node ทำงานถูกต้อง

---

### 9) ทดสอบจาก Internet (Public IP)

```text
http://<PUBLIC_IPV4>/api/v1/gold-price
```

หรือ:

```bash
curl http://<PUBLIC_IPV4>/api/v1/gold-price
```

---

## Troubleshooting

### ❌ `host not found in upstream`
- nginx กับ API อยู่คนละ Docker network
- แก้โดยให้ใช้ docker-compose และ network เดียวกัน

### ❌ `pull access denied`
- ระบุชื่อ image / tag ไม่ตรง
- ตรวจสอบว่า GHCR เป็น public และชื่อถูกต้อง (case-sensitive)

### ❌ Public IP ใช้งานไม่ได้ แต่ localhost ได้
- Security Group ยังไม่เปิด TCP 80

---

## Best Practices

- ใช้ `docker compose` คุมทุก container (อย่าผสมกับ `docker run`)
- ทดสอบ `localhost` ก่อนเสมอ แล้วค่อยเปิด public
- ไม่ expose port API โดยตรง ให้ผ่าน nginx เท่านั้น
- แนะนำใช้ Elastic IP สำหรับ production

---

## Next Steps (Optional)

- 🔒 เปิด HTTPS (Let’s Encrypt)
- 🌍 ผูก Domain
- ⚖️ Load Balance หลาย API container
- 🚀 CI/CD จาก GitHub Actions → EC2

---

## Summary

คุณได้สร้างระบบที่:
- แยก Front (nginx) และ Backend (API)
- ปลอดภัยและพร้อม production
- เข้าถึงได้จาก Internet ผ่าน Public IP

🎉 Deployment สำเร็จ!

