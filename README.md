<h1 align="center">
  <img alt="Logo" height="200" src="./docs/assets/logo.png" />
  <br>
  Shortener URL
</h1>

<p align="center">

   <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-blue">

  <img alt="TypeScript Language" src="https://img.shields.io/badge/typescript-94%25-blue">

  <img alt="Languages" src="https://img.shields.io/badge/languages-2-blue">

  <a href="https://www.codacy.com/manual/luanfonsecap/jokes-norris?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=luanfonsecap/jokes-norris&amp;utm_campaign=Badge_Grade">
    <img alt="Code Quality" src="https://api.codacy.com/project/badge/Grade/da538d9c65c7489cb78390a0159c3a2a">
  </a>
  
  <br>

  <p align="center">
    :sparkles: Desafio backend proposto pela <a href="https://github.com/bemobi/hire.me">Bemobi</a>
  </p>
  <br>
</p>

# :muscle: O Projeto

**Shortener URL** é uma aplicação que encurta url's fornecidas por qualquer client através de requisições http, criando um `alias` gerado aleatoriamente ou fornecido pelo mesmo, e também recupera e redireciona um client para uma URL original quando requisitado uma short url válida.

<br>

## :fire: Funcionalidades

- Encurtar uma url com `alias` aleatório
- Encurtar uma url com `alias` customizado
- Recuperar e redirecionar client para url completa
- Recuperar lista de links mais acessados

<br>

## ⚗️ Tecnologias

- NestJs
- MongoDB
- Mongoose
- Date-fns
- Jest
- Docker

<br>

## :rocket: Rodando o Projeto

É necessário ter o ambiente para docker configurado e o [Yarn](https://yarnpkg.com/) instalado.
<br>
Para iniciar a aplicação clone este repositório e execute os comandos abaixo:

```
cd shortener-url
docker-compose up -d --build
```

Dentro do diretório `docs/api` você irá encontrar um arquivo JSON para ser importado no [Insomnia](https://insomnia.rest/download) para realizar as requisições.

Ou, pode executar os seguintes comandos no terminal:
<br>

1. Encurtar uma url com `alias` aleatório

```shell
curl --request POST \
  --url 'http://localhost:3000/shorten/create?url=https%3A%2F%2Fwww.bing.com'
```

2. Encurtar uma url com `alias` customizado

```shell
curl --request POST \
  --url 'http://localhost:3000/shorten/create?url=https%3A%2F%2Fwww.bing.com&alias=my_custom_alias'
```

3. Recuperar e redirecionar client para url completa

```shell
curl --request GET \
  --url http://localhost:3000/shorten/#alias aqui
```

4. Recuperar lista de links mais acessados

```shell
curl --request GET \
  --url http://localhost:3000/favorites
```

<br>

## :bicyclist: RoadMap

- [x] Docker
- [ ] Integration tests
- [ ] Swagger
- [ ] Cache strategy
- [ ] Microservices branch version

<br>

---

<h6 align="center">
	Feito com :purple_heart: por Luan Fonseca
</h6>
