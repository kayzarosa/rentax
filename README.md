## VC-QUOTA-DASHBOAR-API

# :rocket: Back-End

> TUDO ESTÁ BEM!!!!!.  <img src="https://user-images.githubusercontent.com/20192309/80777643-4202cd80-8b3c-11ea-8f32-5348bda4486b.jpg" width="10%" />

## Sobre a api

Resumo da api

## Versão e instalação

<a href="https://nodejs.org/pt/"> NodeJS v16.15.0 LTS</a> <br/>

## Ou pode instalar o NVM no linux que você pode trabalhar com qualquer versão do node.

<a href="https://github.com/nvm-sh/nvm"> NVM</a> <br/>

<a href="./DOCKER.md">Instalando Docker 20.10.12 e Docker Compose 1.28.5 </a> <br/>


## Instalação dos pacotes

Instale todas as dependências do projeto com o comando abaixo:

````sh
npm install --legacy-peer-deps
````

<br />

Para configurar o banco de dados na aplicação duplicar o arquivo <b>src/shared/infra/typeorm/ormconfig.example.ts</b> e o renomeie ele para somente <b>ormconfig.ts</b> aqui nos temos os dados que serão utilizados para acessar o banco de dados mude o usuário e senha.

## Rodar o typeorm para criar todas as tabelas
````sh
npm run typeorm migration:create src/database/migrations/CreateCategories
````

Comando que cria as tabelas no banco de dados

````sh
npm run typeorm migration:run -d src/shared/infra/typeorm/migrations
````

Após rodar o comando ele vai criar todos as tabelas no banco, caso de algum erro veja se o arquivo <b>ormconfig.ts</b> está com os dados corretos.


## Iniciar uma API via npm

````sh
npm run dev
````

## Caso queira usar o docker-composer
 
 Para iniciar ou criar um novo container do docker 
 
````sh
docker-compose up -d
````

O -d ele fala que após criar e iniciar o container ele vai liberar o terminal para continuar a ser utilizado, caso queira ver o que esta acontecendo remover o -d.

<br />

Realiza apenas a etapa de build das imagens que serão utilizadas;

````sh
docker-compose build
````

<br />

Visualiza os logs dos contêineres;

````sh
docker-compose logs
````

<br />

Reinicia os contêineres;

````sh
docker-compose restart
````

<br />

Lista os contêineres;

````sh
docker-compose ps
````

<br />

Permite aumentar o número de réplicas de um contêiner;

````sh
docker-compose scale
````

<br />

Inicia os contêineres;

````sh
docker-compose start
````

<br />

Paralisa os contêineres;

````sh
docker-compose stop
````

<br />

Paralisa e remove todos os contêineres e seus componentes como rede, imagem e volume;

````sh
docker-compose down
````

## Usando a API

Você encontra a documentação de exemplo nessa url: http://localhost:3000/docs.

<br />
Feito com ♥ by Kayza :wave:
