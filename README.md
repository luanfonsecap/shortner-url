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
    :sparkles: Backend challenge proposed by <a href="https://github.com/bemobi/hire.me">Bemobi</a>
  </p>
  <br>
</p>

# :muscle: The Project

**Shortener URL** is an application that shortens URLs provided by any client through http requests, creating a randomly generated or provided alias, and also retrieves and redirects a client to an original URL when a valid short URL is requested.

<br>

## :fire: Features

- Shorten a url with a random `alias`
- Shorten a url with a custom `alias`
- Retrieve and redirect client to full url
- Retrieve list of most accessed links

<br>

## ⚗️ Tech Stack

- NestJs
- MongoDB
- Mongoose
- Date-fns
- Jest
- Docker

<br>

## :rocket: Run the project

You need to have the docker environment configured and [Yarn](https://yarnpkg.com/) installed.
<br>
To start the application, clone this repository and run the commands below:

```
cd shortener-url
docker-compose up -d --build
```

Inside the `docs/api` directory you will find a JSON file to import into [Insomnia](https://insomnia.rest/download) to make the requests.

Or, you can run the following commands in the terminal:
<br>

1. Shorten a url with random `alias`

```shell
curl --request POST \
  --url 'http://localhost:3000/shorten/create?url=https%3A%2F%2Fwww.bing.com'
```

2. Shorten a url with custom `alias`

```shell
curl --request POST \
  --url 'http://localhost:3000/shorten/create?url=https%3A%2F%2Fwww.bing.com&alias=my_custom_alias'
```

3. Retrieve and redirect client to full url

```shell
curl --request GET \
  --url http://localhost:3000/shorten/#alias aqui
```

4. Retrieve list of most visited links

```shell
curl --request GET \
  --url http://localhost:3000/favorites
```

<br>

## :bicyclist: Roadmap

- [x] Docker
- [ ] Integration tests
- [ ] Swagger
- [x] Cache strategy
- [ ] Microservices branch version
- [ ] CI/CD Workflow

<br>

---

<h6 align="center">
	Made with :purple_heart: by Luan Fonseca
</h6>
