#  Sistema de Gerenciamento de Publicidades

Sistema fullstack para gerenciar publicidades vinculadas a estados brasileiros, 
com upload de imagem, controle de vigência e relacionamento com múltiplos estados.

---

##  Tecnologias utilizadas

| Camada         | Tecnologia                        |
|----------------|-----------------------------------|
| Frontend       | Angular 16 + PrimeNG 16 + PrimeFlex 3 |
| Backend        | Laravel 12 (PHP 8.2)              |
| Banco de dados | PostgreSQL 15                     |
| Infraestrutura | Docker + Docker Compose           |

---

##  Estrutura do projeto
```
publicidade-system/
├── backend/                  # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/  # Lógica dos endpoints
│   │   └── Models/           # Representação das tabelas
│   ├── database/
│   │   ├── migrations/       # Estrutura das tabelas
│   │   └── seeders/          # Dados iniciais (estados)
│   ├── routes/
│   │   └── api.php           # Definição das rotas da API
│   └── config/
│       └── cors.php          # Configuração de CORS
├── frontend/
│   └── publicidade-front/    # App Angular
│       └── src/
│           └── app/
│               ├── pages/    # Componentes de tela
│               └── services/ # Chamadas HTTP
├── docker/
│   └── php/
│       └── Dockerfile        # Imagem do PHP
└── docker-compose.yml        # Orquestração dos containers
```

---


##  Tutorial de configurar o ambiente:

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/publicidade-system.git
cd publicidade-system
```

### 2. Configure o ambiente do Laravel
```bash
cp backend/.env.example backend/.env
```
> O `.env.example` já vem com todas as variáveis configuradas para Docker. Não é necessário alterar nada.

### 3. Suba os containers
```bash
docker-compose up -d
```

Verifique se os 3 containers estão rodando:
```bash
docker ps
```

| Container      | Descrição              | Porta  |
|----------------|------------------------|--------|
| `laravel_app`  | Backend Laravel        | 8000   |
| `postgres_db`  | Banco PostgreSQL       | 5432   |
| `angular_front`| Frontend Angular       | 4200   |

### 4. Configure o Laravel (apenas na primeira vez que rodar)
```bash
docker exec -it laravel_app php artisan key:generate
docker exec -it laravel_app php artisan migrate
docker exec -it laravel_app php artisan db:seed --class=EstadoSeeder
docker exec -it laravel_app php artisan storage:link
```

### 5. Aguarde o Angular compilar
```bash
docker logs -f angular_front
```


---

##  Acessos

| Serviço       | URL                           |
|---------------|-------------------------------|
| Frontend      | http://localhost:4200         |
| API Backend   | http://localhost:8000/api     |

---

##  Solução de problemas (Erros encontrados durando o desenvolvimento)

**Tabelas não existem após reiniciar:**
```bash
docker exec -it laravel_app php artisan migrate
docker exec -it laravel_app php artisan db:seed --class=EstadoSeeder
```

**Frontend não compilou ou travou:**
```bash
docker restart angular_front
docker logs -f angular_front
```

**Erro de CORS:**
Verifique se o backend está em `localhost:8000` e o frontend em `localhost:4200`.
Caso tenha alterado as portas, atualize `backend/config/cors.php`:
```php
'allowed_origins' => ['http://localhost:SUA_PORTA'],
```

**Imagens não aparecem:**
```bash
docker exec -it laravel_app php artisan storage:link
```