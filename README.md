# :checkered_flag: ANIMELOG

Um site feito para você conseguir registrar e avaliar todos os seus animes em sua lista.

## :technologist: Membros da equipe

Jônatas Brito Ferreira | 508309 | Engenharia de Software

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

-   Usuário registrado
-   Usuário não registrado
-   Administrador

> Tenha em mente que obrigatoriamente a aplicação deve possuir funcionalidades acessíveis a todos os tipos de usuário e outra funcionalidades restritas a certos tipos de usuários.

## :spiral_calendar: Entidades ou tabelas do sistema

-   Usuário
-   Anime
-   Comentário
-   Avaliação Pessoal

## :triangular_flag_on_post: Principais funcionalidades da aplicação

-   Usuários não registrados poderão pesquisar por animes e ver a avaliação geral e os comentários feitos por usuários registrados
-   Usuários registrados poderão adicionar animes a sua lista, escrever uma avaliação pessoal, adicionar comentários na página geral do anime e pesquisar por outros usuários.
-   O administrador poderar manter os animes da página principal.

---

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:

---

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

-   VueJS
-   Bootstrap

**Backend:**

-   Strapi

## :shipit: Operações implementadas para cada entidade da aplicação

| Entidade          | Criação | Leitura | Atualização | Remoção |
| ----------------- | ------- | ------- | ----------- | ------- |
| Usuário           | X       | X       |             |         |
| Anime             | X       | X       | X           | X       |
| Comentário        | X       | X       |             |         |
| Avaliação Pessoal | X       | X       |             |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| ----------- | --- |
