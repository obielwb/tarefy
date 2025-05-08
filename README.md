# Tarefy

## Descrição do Sistema

O Tarefy é um sistema de produtividade que inclui as seguintes funcionalidades principais:

### Autenticação de Usuários:

- Registro de novos usuários com nome, email e senha (criptografada com bcrypt)
- Login e logout com gerenciamento de sessões

### Gerenciamento de Tarefas:

- Criação, listagem, edição e exclusão de tarefas
- Atributos das tarefas: título, descrição, status (pendente, em andamento, concluída), prioridade (baixa, média, alta) e data de vencimento

### Gerenciamento de Projetos:

- Criação, listagem, edição e exclusão de projetos
- Atributos dos projetos: nome e descrição

### Relacionamento:

- Tarefas e projetos pertencem a um usuário específico
- Suporte para relacionar tarefas a projetos (muitos-para-muitos, implementado na tabela task_project)

### Interface:

- Interface web responsiva com templates EJS e estilização em CSS
- Navegação intuitiva com links condicionais baseados no estado de autenticação do usuário

## Arquitetura

O sistema utiliza uma arquitetura MVC para separar responsabilidades:

- **Model**: Gerencia a lógica de dados e interação com o banco de dados PostgreSQL
- **View**: Renderiza a interface do usuário com templates EJS
- **Controller**: Processa requisições HTTP, coordena a lógica de negócio e atualiza as views

O banco de dados é gerenciado com o pacote pg para Node.js, e as migrações garantem a criação automática das tabelas necessárias.

## Estrutura de Pastas e Arquivos

A estrutura do projeto está organizada para facilitar a manutenção e escalabilidade. Abaixo está a descrição das pastas e arquivos principais:

```
tarefy/
├── config/
│ └── database.js # Configuração da conexão com o PostgreSQL
├── migrations/
│ └── migrate.js # Script de migração para criar tabelas no banco
├── models/
│ ├── user.js # Modelo para operações com usuários
│ ├── task.js # Modelo para operações com tarefas
│ └── project.js # Modelo para operações com projetos
├── controllers/
│ ├── userController.js # Controlador para autenticação e gerenciamento de usuários
│ ├── taskController.js # Controlador para gerenciamento de tarefas
│ └── projectController.js # Controlador para gerenciamento de projetos
├── routes/
│ ├── userRoutes.js # Rotas para autenticação e usuários
│ ├── taskRoutes.js # Rotas para tarefas
│ └── projectRoutes.js # Rotas para projetos
├── views/
│ ├── layouts/
│ │ └── main.ejs # Layout principal da aplicação
│ ├── user/
│ │ ├── login.ejs # View para login
│ │ └── register.ejs # View para registro
│ ├── task/
│ │ ├── list.ejs # View para listagem de tarefas
│ │ ├── create.ejs # View para criação de tarefas
│ │ └── edit.ejs # View para edição de tarefas
│ ├── project/
│ │ ├── list.ejs # View para listagem de projetos
│ │ ├── create.ejs # View para criação de projetos
│ │ └── edit.ejs # View para edição de projetos
├── public/
│ └── styles.css # Arquivo de estilização CSS
├── .env # Arquivo de configuração de variáveis de ambiente
├── server.js # Arquivo principal para iniciar o servidor
└── package.json # Configuração do projeto e dependências
```

## Como Executar o Projeto Localmente

Pré-requisitos

- Node.js (v16 ou superior)
- PostgreSQL (v12 ou superior)
- Navegador web moderno (Chrome, Firefox, etc.)
- Editor de código (ex.: VS Code)

## Passos para Configuração

Clone o Repositório :

```bash
git clone <URL_DO_REPOSITORIO>
cd tarefy
```

Instale as Dependências:
Execute o comando abaixo para instalar as dependências listadas no package.json:
bash

npm install

Configure o Banco de Dados:
Crie um banco de dados no PostgreSQL chamado tarefy:
sql

CREATE DATABASE tarefy;

Configure as variáveis de ambiente no arquivo .env. Crie o arquivo na raiz do projeto com o seguinte conteúdo:
env

DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=tarefy
DB_PASSWORD=sua_senha
DB_PORT=5432
PORT=3000
SESSION_SECRET=sua_chave_secreta

Substitua seu_usuario, sua_senha e sua_chave_secreta pelos valores apropriados.

Execute as Migrações:
Crie as tabelas no banco de dados executando o script de migração:
bash

npm run migrate

Inicie o Servidor:
Inicie a aplicação com o comando:
bash

npm start

O servidor será iniciado em http://localhost:3000 (ou a porta definida no .env).

Acesse a Aplicação:
Abra o navegador e acesse http://localhost:3000.

Registre um novo usuário em /users/register ou faça login em /users/login.

Após o login, você poderá gerenciar tarefas e projetos.
