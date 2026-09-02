# S-Mart — Cloud-Native E-Commerce Platform

[![S-Mart CI/CD Pipeline](https://github.com/ksowmya-debug/S-Mart/actions/workflows/deploy.yml/badge.svg)](https://github.com/ksowmya-debug/S-Mart/actions/workflows/deploy.yml)

S-Mart is a full-stack e-commerce web application built with **React 19**, **Node.js/Express**, and **MongoDB Atlas**, fully containerized with **Docker** and deployed on **AWS EC2** using **K3s Kubernetes** with automated **GitHub Actions CI/CD**.

---

## ??? Architecture & Tech Stack

* **Frontend**: React 19, Tailwind CSS, Vite, Nginx
* **Backend**: Node.js, Express, JWT Authentication, Mongoose
* **Database**: MongoDB Atlas (Cloud)
* **Containerization**: Docker (Multi-stage builds, Alpine base images)
* **Orchestration**: K3s Kubernetes (Deployments, ClusterIP Services, Traefik Ingress)
* **Cloud Infrastructure**: AWS EC2 (Amazon Linux 2023)
* **CI/CD Pipeline**: GitHub Actions (Automated testing, container building, SSH deployment, zero-downtime rolling updates)
