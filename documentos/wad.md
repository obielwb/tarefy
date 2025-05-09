# WAD - Web Application Document - Módulo 2 - Inteli

## Tarefy

#### Autor:

- <a href="https://github.com/obielwb">Gabriel Willian Bartmanovicz</a>

## Sumário

[1. Introdução](#c1) <br/>
[2. Projeto Técnico da Aplicação Web](#c2)

# <a name="c1"></a>1. Introdução

Tarefy é um sistema web de gerenciamento de tarefas projetado para aumentar a produtividade de usuários individuais. Desenvolvido com a arquitetura MVC (Model-View-Controller), o projeto utiliza Node.js com Express.js no backend, PostgreSQL como banco de dados relacional, e EJS para renderização de views no frontend. A aplicação permite que usuários se registrem, façam login, criem e gerenciem tarefas e projetos, com uma interface simples e estilizada.
O objetivo do Tarefy é fornecer uma ferramenta prática para organizar tarefas com atributos como status, prioridade e data de vencimento, além de possibilitar a criação de projetos para agrupar tarefas relacionadas. O sistema foi construído com foco em usabilidade, segurança (autenticação com sessões e senhas criptografadas) e escalabilidade.

# <a name="c1"></a>2. Projeto Técnico da Aplicação Web

## 3.1. Modelagem do banco de dados

<img src="../public/images/gdd/MER.png" alt="Modelo Entidade Relacionamento" /> <br/>
<sub>Fonte: Material produzido pelo autor (2025).</sub>

A modelagem do banco de dados do sistema **Tarefy**, um gerenciador de tarefas para produtividade, foi projetada com base em um modelo relacional que reflete as necessidades funcionais da aplicação, garantindo organização, escalabilidade e consistência dos dados. O sistema é estruturado em quatro entidades principais: **Usuários (Users)**, **Tarefas (Tasks)**, **Projetos (Projects)** e **Relação Tarefa-Projeto (Task_Project)**. Cada entidade foi cuidadosamente definida com atributos relevantes e relacionamentos que suportam as funcionalidades de autenticação, gerenciamento de tarefas e organização de projetos, enquanto a tabela de junção `Task_Project` permite associações flexíveis entre tarefas e projetos.

A entidade **Usuários** armazena informações dos usuários do sistema, sendo essencial para a autenticação e personalização. Ela possui os atributos:

- `id` (chave primária, gerada automaticamente)
- `nome` (texto para o nome do usuário)
- `email` (texto único para identificação e login)
- `senha` (texto criptografado para segurança)
- `created_at` e `updated_at` (timestamps para rastrear criação e atualização).

Essa entidade serve como base para associar tarefas e projetos a usuários específicos, garantindo que cada usuário visualize apenas seus próprios dados.

A entidade **Tarefas** é o núcleo do sistema, representando as tarefas que os usuários criam e gerenciam. Seus atributos incluem:

- `id` (chave primária)
- `titulo` (texto obrigatório para descrever a tarefa)
- `descricao` (texto opcional para detalhes)
- `status` (texto com valores padrão como "pendente", podendo ser "em andamento" ou "concluída")
- `prioridade` (texto com valores padrão "média", podendo ser "baixa" ou "alta")
- `data_vencimento` (data opcional para prazos)
- `user_id` (chave estrangeira que referencia a tabela `Users`, associando a tarefa a um usuário)
- `created_at` e `updated_at` (timestamps).

A chave estrangeira `user_id` estabelece uma relação com a tabela `Usuários`, onde um usuário pode ter várias tarefas, mas cada tarefa pertence a apenas um usuário.

A entidade **Projetos** permite que usuários organizem tarefas em grupos lógicos, como iniciativas ou categorias. Seus atributos são:

- `id` (chave primária)
- `nome` (texto obrigatório para identificar o projeto)
- `descricao` (texto opcional)
- `user_id` (chave estrangeira que referencia `Users`)
- `created_at` e `updated_at` (timestamps)

Assim como nas tarefas, a relação com `Usuários` é **um-para-muitos**, com `user_id` vinculando cada projeto a um usuário específico, e a restrição `ON DELETE CASCADE` assegura que a exclusão de um usuário remova seus projetos. Projetos oferecem uma camada adicional de organização, permitindo que tarefas sejam agrupadas por contexto.

A relação entre **Tarefas** e **Projetos** é implementada pela tabela de junção **Task_Project**, que suporta uma relação **muitos-para-muitos**. Essa tabela contém apenas dois atributos:

- `task_id` (chave estrangeira que referencia `Tasks`)
- `project_id` (chave estrangeira que referencia `Projects`)

formando uma chave primária composta `(task_id, project_id)` para evitar duplicatas. As restrições `ON DELETE CASCADE` em ambas as chaves estrangeiras garantem que, se uma tarefa ou projeto for excluído, as associações correspondentes na tabela `Task_Project` sejam automaticamente removidas. Essa estrutura permite que uma tarefa esteja associada a múltiplos projetos e que um projeto contenha várias tarefas, oferecendo flexibilidade na organização.

Essa modelagem suporta as funcionalidades principais do Tarefy, como autenticação de usuários, criação e gerenciamento de tarefas com atributos personalizáveis, organização de projetos e associação flexível entre tarefas e projetos. A escolha de um modelo relacional com chaves estrangeiras e restrições de integridade garante que os dados permaneçam consistentes, enquanto a tabela de junção `Task_Project` permite uma estrutura escalável para futuras expansões, como filtros de tarefas por projeto ou relatórios de produtividade.
