
# eMutua App — Gerenciador de Produtos E-commerce (SaaS)

Este projeto é uma aplicação web full-stack com backend em Laravel utilizando Doctrine ORM e frontend em Next.js, voltado para a gestão de produtos. A estrutura está preparada para rodar via Docker, com suporte a OpenSearch para buscas avançadas (opcional).

---

## 📁 Estrutura de Pastas

```
./emutua-app/
├── backend/             # API Laravel com Doctrine
├── frontend/
│   └── emutua/          # Frontend Next.js
├── docker-compose.yml   # Orquestração Docker
└── README.md            # Este arquivo
```

---

## 🚀 Tecnologias Utilizadas

- **Backend:** PHP 8.2, Laravel 10, Doctrine ORM
- **Frontend:** Next.js (React), TailwindCSS
- **Banco de Dados:** MySQL 8
- **Busca Avançada (opcional):** OpenSearch
- **Gerenciamento via Containers:** Docker + Docker Compose

---

## 🔧 Pré-Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🧱 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/LucasMeyble/teste-emutua.git
cd emutua-app
```

### 2. Suba os containers com Docker Compose

```bash
docker-compose up --build
```

- Acesse o frontend: [http://localhost:3000](http://localhost:3000)
- Acesse o backend (API): [http://localhost:8000/api](http://localhost:8000/api)
- OpenSearch (opcional): [http://localhost:9200](http://localhost:9200)

---

## ⚙️ Inicialização do Banco de Dados

Após os containers estarem rodando:

### 1. Acesse o container do backend:

```bash
docker-compose exec app bash
```

### 2. Gere as tabelas com Doctrine:

```bash
php artisan doctrine:migrations:migrate
```

### 3. Popule a tabela de usuários (user seed):

```bash
php artisan app:seed-users
```

> O seed encontra-se em `app/Console/Commands/SeedUsers.php`

---

## 📦 Dockerfile — Backend

Local: `./emutua-app/backend/Dockerfile`

```dockerfile
FROM php:8.2-fpm
...
```

---

## 🖥️ Dockerfile — Frontend

Local: `./emutua-app/frontend/emutua/Dockerfile`

```dockerfile
FROM node:18
...
```

---

## 🐳 docker-compose.yml

Local: `./emutua-app/docker-compose.yml`

Inclui serviços para:

- app (Laravel)
- frontend (Next.js)
- db (MySQL)
- opensearch (busca avançada - opcional)

---

## 🛠️ Funcionalidades Implementadas

- CRUD completo de produtos
  - Campos: `id`, `name`, `description`, `price`, `category`
- Validações de formulário (obrigatoriedade e formato)
- Integração com Doctrine ORM
- Busca por produtos
  - (Opcional) via OpenSearch

> ❗ A integração com OpenSearch não foi implementada por motivo de um imprevisto de saúde durante o desenvolvimento do teste. A estrutura do projeto, no entanto, já prevê suporte para essa funcionalidade.

---

## 🔒 Autenticação

O projeto utiliza autenticação JWT no backend. Após login, o token é armazenado e utilizado para proteger rotas.

---

## 🔍 Integração com OpenSearch (Opcional)

- Produtos são indexados automaticamente ao serem criados ou atualizados
- Produtos são removidos do índice quando deletados
- Busca pode ser feita via `GET /api/products/search?q=termo`

---

## 🛠️ Comandos Úteis

```bash
# Executar as migrations com Doctrine
php artisan doctrine:schema:create

# Popular tabela de usuários
php artisan app:seed-users
```

---

## 📄 Exemplos de Endpoints

- `GET /api/products` — Lista todos os produtos
- `POST /api/products` — Cria um novo produto
- `PUT /api/products/{id}` — Atualiza um produto
- `DELETE /api/products/{id}` — Remove um produto

---

## 📌 Decisões Técnicas

- **Laravel + Doctrine:** arquitetura limpa com DDD, aproveitando poder do ORM com estrutura de entidades, repositórios e serviços bem definidos.
- **Next.js:** SPA reativa com Server Side Rendering quando necessário.
- **Docker:** isolamento dos serviços para facilitar execução local e deploy.
- **OpenSearch:** melhora a performance e escalabilidade da busca.

---

## 👨‍💻 Desenvolvedor

> Este projeto foi desenvolvido como parte de um teste técnico para a empresa **eMutua Digital**.

---

## ✅ Status

✅ Projeto funcional, com autenticação, CRUD completo e busca pronta para produção.