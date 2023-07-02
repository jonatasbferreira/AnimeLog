# :checkered_flag: ANIMELOG

Um site feito para você conseguir registrar e avaliar todos os seus animes em sua lista.

## :technologist: Membros da equipe

| Nome                   | Matrícula | Curso                  |
| ---------------------- | --------- | ---------------------- |
| Jônatas Brito Ferreira | 508309    | Engenharia de Software |

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

-   Administrador
-   Usuário registrado
-   Usuário não registrado

## :spiral_calendar: Entidades ou tabelas do sistema

-   Usuário
-   Anime
-   Comentário
-   Avaliação

## :triangular_flag_on_post: Principais funcionalidades da aplicação

-   Usuários não registrados poderão pesquisar por animes ver e os comentários feitos por usuários registrados
-   Usuários registrados poderão adicionar animes a sua lista com uma avaliação pessoal, adicionar comentários na página geral do anime e pesquisar por outros usuários e ver a lista de animes deles.
-   O administrador poderá manter os animes da página principal e gerenciar os comentários.

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

- HTML, CSS
- TypeScript
- JavaScript
- Bootstrap
- Vue

**Backend:**

- Strapi


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuario    | X | X |   |   | 
| Anime      | X | X | X |  X |
| Comentário | X | X |   | X  |
| Avaliação  | X | X  | X  | X  |


## :neckbeard: Rotas da API REST utilizadas

#### User
| Método HTTP | URL |
| --- | --- |
| GET | api/users/|
| GET | api/users/:id|
| POST | /api/auth/local/register|

#### Anime
| Método HTTP | URL |
| --- | --- |
| GET | api/animes/|
| GET | api/animes/:id|
| POST | api/animes/|
| PUT | api/animes/:id|
| DELETE | api/animes/:id|

#### Comment
| Método HTTP | URL |
| --- | --- |
| GET | api/comments/|
| GET | api/comments/:id|
| POST | api/comments/|
| DELETE | api/comments/:id|

#### Assessment
| Método HTTP | URL |
| --- | --- |
| GET | api/assessments/|
| GET | api/assessments/:id|
| POST | api/assessments/|
| PUT | api/assessments/:id|
| DELETE | api/assessments/:id|