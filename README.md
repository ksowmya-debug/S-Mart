# S-Mart — End-to-End Cloud-Native DevOps Platform

[![S-Mart CI/CD Pipeline](https://github.com/ksowmya-debug/S-Mart/actions/workflows/deploy.yml/badge.svg)](https://github.com/ksowmya-debug/S-Mart/actions/workflows/deploy.yml)

A production-ready full-stack e-commerce web application containerized with **Docker**, orchestrated on **AWS EC2** using **K3s Kubernetes**, secured with **MongoDB Atlas**, automated via **GitHub Actions CI/CD with GHCR**, and monitored with **Prometheus + Grafana**.

---

## ??? Architecture & Tech Stack

* **Frontend**: React 19, Tailwind CSS, Vite, Nginx
* **Backend**: Node.js, Express 5, JWT, Bcrypt, Mongoose
* **Database**: MongoDB Atlas (Cloud)
* **Container Registry**: GitHub Container Registry (GHCR)
* **Orchestration**: K3s Kubernetes (Deployments, ClusterIP Services, Traefik Ingress)
* **Cloud Infrastructure**: AWS EC2 (Amazon Linux 2023, 5GB Swap)
* **CI/CD Pipeline**: GitHub Actions (Cloud builds, GHCR push, automated SSH Kubernetes rollout)
* **Monitoring & Observability**: Prometheus TSDB (:30090) & Grafana Dashboard (:30001)
