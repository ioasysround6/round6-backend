# Projeto Cobé

Cobé é um projeto desenvolvido, pelo grupo !Round6, para operar como uma agência de turismo comunitário. Neste repositório, consta o código da trilha back-end, realizado pelo camper Lucas Alves. O projeto faz parte da 3ª fase (Desafio Final) da 4ª edição do ioasys Camp 2022.

## Tecnologias Utilizadas

- NestJS (framework do NodeJS)
- PostgreSQL (banco de dados relacional)
- Postman (client da API)
- Heroku (deploy da API)

## Descrição

A API foi criada para ser consumida pelas demais trilhas do grupo (front-end, react native e android), com o intuito de desenvolver uma solução para um dos 17 Objetivos de Desenvolvimento Sustentável (ODS) da Organização das Nações Unidas (ONU). No caso do projeto Cobé, era atuar na ODS 1 (Erradicação da Pobreza). Por conta disso, foi desenvolvido uma agência de turismo comunitário para aproximar os turistas de pessoas em condições de pobreza, mais especificamente as comunidades de artesãos da região Norte e Nordeste. Além de se cadastrar no site e aplicativo, os turistas teriam a possibilidade de realizar a compra dos passeios, de ler as histórias dessas comunidades e de compartilhar suas aventuras dentro do diário de viagem.  

## Variáveis de Ambiente

Por questões de segurança, foi definido algumas variáveis de ambiente:

```bash
# JWT token secret para autenticação
JWT_SECRET_KEY=       =>   (LOCAL e HEROKU) EX.: cqf0a97Et+pp7qWIVJbOIWrSUo6DdUbkXjxV6ZWH3To=

# Conexão com o banco de dados
DB_CONNECTION=        =>   (LOCAL e HEROKU) EX.: postgres

DATABASE_URL=         =>   (LOCAL) EX.: postgres://postgres:postgres@localhost:5432/backend
                      =>   (HEROKU) EX.: postgres://boibfxvbxrxlnz:fd914b7a99539d9b7f714213ce0917c2b4db955cb784985ca45e0c439dcbc18d@ec2-3-229-161-70.compute-1.amazonaws.com:5432/dc507dcaovoavj  

# Caminho que será lido ao rodar as entities e as migrations na máquina local e no Heroku
ENTITIES=             =>    (LOCAL) EX.: src/app/**/*.entity.ts
                      =>    (HEROKU) EX.: dist/app/**/*.entity.js

MIGRATIONS=           =>    (LOCAL) EX.: src/config/typeorm/migrations/*.ts
                      =>    (HEROKU) EX.: dist/config/typeorm/migrations/*.js

# Ambiente que a aplicação está rodando para utilizar ou não a propriedade ssl
NODE_ENV=             =>    (LOCAL) EX.: development
                      =>    (HEROKU) EX.: production

# Informações para o seed do admin
ADMIN_FIRST_NAME=     =>    (LOCAL e HEROKU) EX.: Grace          
ADMIN_LAST_NAME=      =>    (LOCAL e HEROKU) EX.: Hopper                
ADMIN_EMAIL=          =>    (LOCAL e HEROKU) EX.: grace@hotmail.com               
ADMIN_PASSWORD=       =>    (LOCAL e HEROKU) EX.: Grace@123    
ADMIN_BIRTH_DATE=     =>    (LOCAL e HEROKU) EX.: 1906-12-09    
ADMIN_PHOTO=          =>    (LOCAL e HEROKU) EX.: https://i.imgur.com/DSYfMyu.jpg 

# Informações para o seed do primeiro turista 
TOURIST1_FIRST_NAME=  =>    (LOCAL e HEROKU) EX.: Tim  
TOURIST1_LAST_NAME=   =>    (LOCAL e HEROKU) EX.: Berners-Lee  
TOURIST1_EMAIL=       =>    (LOCAL e HEROKU) EX.: tim@hotmail.com  
TOURIST1_PASSWORD=    =>    (LOCAL e HEROKU) EX.: Tim@123  
TOURIST1_BIRTH_DATE=  =>    (LOCAL e HEROKU) EX.: 1955-06-08  
TOURIST1_PHOTO=       =>    (LOCAL e HEROKU) EX.: https://i.imgur.com/dqPjVPs.jpg 

# Informações para o seed do segundo turista 
TOURIST2_FIRST_NAME=  =>    (LOCAL e HEROKU) EX.: Bill
TOURIST2_LAST_NAME=   =>    (LOCAL e HEROKU) EX.: Gates
TOURIST2_EMAIL=       =>    (LOCAL e HEROKU) EX.: bill@hotmail.com
TOURIST2_PASSWORD=    =>    (LOCAL e HEROKU) EX.: Bill@123
TOURIST2_BIRTH_DATE=  =>    (LOCAL e HEROKU) EX.: 1955-10-28
TOURIST2_PHOTO=       =>    (LOCAL e HEROKU) EX.: https://i.imgur.com/DET9Z3M.jpg

# Informações para adicionar o id dos tours, que possui chave estrangeira em stories
ID_TOUR_ONE=          =>    (LOCAL e HEROKU) EX.: aaf8a761-b6f0-40b2-8227-21c8f3a521b7
ID_TOUR_TWO=          =>    (LOCAL e HEROKU) EX.: 38c477a6-fa63-45a1-8b29-a625f24db881
ID_TOUR_THREE=        =>    (LOCAL e HEROKU) EX.: 8f98da35-1103-491c-9f6e-55bcec9f66e9

# Criptografia AES
AES_KEY=              =>    (LOCAL e HEROKU) EX.: e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61
AES_ALGORITHM=        =>    (LOCAL e HEROKU) EX.: aes-256-cbc
AES_IV_LENGTH=        =>    (LOCAL e HEROKU) EX.: 16
AES_IV=               =>    (LOCAL e HEROKU) EX.: ff5ac19190424b1d88f9419ef949ae56
``` 

## Clonando o repositório

Inicialmente, faça o git clone do repositório:

```bash
$ git clone https://github.com/ioasys/round6-backend.git
```

## Instalação

Para rodar a aplicação na máquina local, é necessário ter um banco de dados criado. Criado o banco, execute o seguinte comando terminal para instalar as 
dependências necessárias: 

```bash
$ npm install
```

## Migrações na máquina local

Agora, gere as migrations, contendo as tabelas (users, tours, orders, stories, payments, checkouts e tokens), os seeds (turistas e admin) e a trigger (controle das vagas disponíveis no passeio turístico). Portanto, utilize o comando abaixo:

```bash
$ npm run typeorm migration:run
```

Obs.: caso, por algum motivo, seja necessário resetar o banco de dados local, use o comando:

```bash
$ npm run schema:drop
```

## Rodando a aplicação

Em seguida, rode a aplicação:

```bash
$ npm run start:dev
```

## Heroku 

Como a API deve ser integrada com as demais trilhas, torna-se necessário realizar o deploy dela. Para isso, foi utilizado o Heroku. Portanto, instale a plataforma através do comando:

```bash
$ npm install -g heroku
```

Após isso, crie uma conta e siga os seguintes passos: new > create new app > create app (escolha o nome do app e deixe a região 
como Estados Unidos).

Como será utilizado o banco de dados da plataforma, vá em Resources, digite Heroku Postgres e confirme o plano Hobby Dev - Free. Em
seguida, confira as credenciais do banco de dados seguindo o caminho: Data (no menu do canto superior direito) > clique no app criado > Settings > View Credentials. Com os dados em mão, abra o pgAdmin4, crie um novo server, adicione o nome e, na aba Connection, preencha os dados com as credenciais do Heroku Postgres. Exemplo:

```bash
Host= ec2-3-229-161-70.compute-1.amazonaws.com
Port= 5432
Maintenance Database= dc507dcaovoavj
Username= boibfxvbxrxlnz
Password= fd914b7a99539d9b7f714213ce0917c2b4db955cb784985ca45e0c439dcbc18d
```

Após esse processo, salve a senha e vá para a aba Advanced. Na coluna DB Restriction, adicione o Maintenance Database (dc507dcaovoavj)
para informar qual a base de dados que vai ser administrada. Pronto, configuração concluída!

De volta para o Heroku, siga para a aba Setting, clique em Reveal Config Vars e adicione todas as variáveis de ambiente mencionadas 
anteriormente. Além disso, vá em buildpacks e adicione o heroku/nodejs. Agora, clique na aba Deploy e escolha o método para subir a aplicação.

Por fim, vá para a raiz do projeto no VS Code, crie um arquivo chamado Procfile e adicione a seguinte linha:

```bash
web: npm run start:prod
```

Para realizar de fato o deploy, faça um git push normalmente caso tenha selecionado o método de deploy sincronizado com o github
ou rode determinados comandos para subir a aplicação pelo Heroku CLI.

```bash
# Para logar na conta cadastrada no Heroku
$ heroku login

# Adicione, faça o commit e suba suas mudanças com o Heroku Git
$ git add .
$ git commit -am "commit"
$ git push heroku <branch>
```

## Diagrama do projeto Cobé

## Funcionamento do projeto Cobé

## Segurança da API

## Autor

- Autor - [Lucas Alves](https://github.com/LucasAlvesBS)
- linkedin - [https://www.linkedin.com/in/lucas-alves-090524225/](https://www.linkedin.com/in/lucas-alves-090524225/)

## Licença

Cobé é [MIT licensed](LICENSE).

## Referências

- NestJS: https://docs.nestjs.com/
- TypeORM: https://typeorm.io/#/
- PostgreSQL: https://www.postgresql.org/docs/
- npmjs: https://www.npmjs.com/
- Heroku: https://devcenter.heroku.com/categories/reference
