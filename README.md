# Sports API

Este projeto é uma API RESTful para gerenciamento de atividades esportivas. Permite criar, listar, atualizar e deletar atividades esportivas.

## Tecnologias Utilizadas

- NestJS
- TypeORM
- PostgreSQL
- Docker

## Pré-requisitos

- Antes de iniciar, certifique-se de ter o [Node.js](https://nodejs.org/en/) instalado em sua máquina. Este projeto foi desenvolvido com Node.js versão 20^
- Yarn
- Docker

## Configuração do Ambiente

1. **Clone o repositório:**

```bash
git clone https://github.com/YuriPiresG/sports-api.git
cd sports-api
```

2. **Instale as dependências:**

```bash
yarn install
```

3. **Configurando o ENV:**

- Eu deixei disponível um arquivo .env.example na raiz do projeto, você pode copiar o conteúdo dele e criar um arquivo .env na raiz do projeto e colar o conteúdo.
- Caso você tenha um banco de dados PostgreSQL rodando localmente, você pode alterar as variáveis de ambiente para apontar para o seu banco de dados.

4. **Rodando o projeto:**

```bash
docker-compose up
```

5. **Rodando os testes**

```bash
yarn test
```
