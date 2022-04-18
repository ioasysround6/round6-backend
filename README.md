# Projeto Cobé

Cobé é um projeto desenvolvido, pelo grupo !Round6, para operar como uma agência de turismo comunitário. Neste repositório, consta o código da trilha back-end, realizado pelo camper Lucas Alves. O projeto faz parte da 3ª fase (Desafio Final) da 4ª edição do ioasys Camp 2022.

## Tecnologias Utilizadas

- NestJS (framework do NodeJS)
- PostgreSQL (banco de dados relacional)
- Postman (client da API)
- Heroku (deploy da API)

## Descrição

A API foi criada para ser consumida pelas demais trilhas do grupo (front-end, react native e android), com o intuito de desenvolver uma solução para um dos 17 Objetivos de Desenvolvimento Sustentável (ODS) da Organização das Nações Unidas (ONU). No caso do projeto Cobé, o objetivo é atuar na ODS 1 (Erradicação da Pobreza). Por conta disso, foi desenvolvido uma agência de turismo comunitário para aproximar os turistas de pessoas em condições de pobreza, mais especificamente as comunidades de artesãos da região Norte e Nordeste. Além de se cadastrarem no site e no aplicativo, os turistas teriam a possibilidade de realizar a compra dos passeios, de ler as histórias dessas comunidades e de compartilhar suas aventuras dentro do diário de viagem.  

## Variáveis de Ambiente

Por questões de segurança, foram definidas algumas variáveis de ambiente:

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

# Criptografia AES (biblioteca typeorm-encrypted)
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

Para rodar a aplicação na máquina local, é necessário ter um banco de dados criado. Feito isso, execute o seguinte comando no terminal para instalar as 
dependências necessárias: 

```bash
$ npm install
```

## Migrações na máquina local

Agora, gere as migrations, contendo as tabelas (users, tours, orders, stories, payments, checkouts, tokens, diares e comments), os seeds (admin, turistas,
passeios turísticos e histórias das comunidades) e a trigger (controle das vagas disponíveis no passeio turístico). Portanto, utilize o comando abaixo:

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

Como a API deve ser integrada com as demais trilhas, torna-se necessário realizar o deploy dela. Para isso, foi utilizado o 
Heroku. Portanto, instale a plataforma através do comando:

```bash
$ npm install -g heroku
```

Após isso, crie uma conta e siga os seguintes passos: new > create new app > create app (escolha o nome do app e deixe a região 
como Estados Unidos).

Como será utilizado o banco de dados da plataforma, vá em Resources, digite Heroku Postgres e confirme o plano Hobby Dev - Free. Em
seguida, confira as credenciais do banco de dados seguindo o caminho: Data (no menu do canto superior direito) > clique no app criado > Settings > View Credentials. Com os dados em mão, abra o pgAdmin4, crie um novo server, adicione o nome do server e, na aba 
Connection, preencha os dados com as credenciais do Heroku Postgres. Exemplo:

```bash
Host= ec2-3-229-161-70.compute-1.amazonaws.com
Port= 5432
Maintenance Database= dc507dcaovoavj
Username= boibfxvbxrxlnz
Password= fd914b7a99539d9b7f714213ce0917c2b4db955cb784985ca45e0c439dcbc18d
```

Após esse processo, salve a senha e vá para a aba Advanced. Na coluna DB Restriction, adicione o Maintenance Database (dc507dcaovoavj)
para informar qual a base de dados que vai ser administrada. Pronto, configuração concluída no pgAdmin4!

De volta para o Heroku, siga para a aba Settings, clique em Reveal Config Vars e adicione todas as variáveis de ambiente mencionadas 
anteriormente. Além disso, vá em buildpacks e adicione o heroku/nodejs. Agora, clique na aba Deploy e escolha o método para subir a aplicação.

Por fim, vá para a raiz do projeto no VS Code, crie um arquivo chamado Procfile e adicione a seguinte linha:

```bash
web: npm run start:prod
```

Para realizar de fato o deploy, faça um git push normalmente caso tenha selecionado o método de deploy sincronizado com o github
ou rode determinados comandos para subir a aplicação pelo Heroku CLI:

```bash
# Para logar na conta cadastrada no Heroku
$ heroku login

# Adicione os arquivos, faça o commit e suba suas mudanças com o Heroku Git
$ git add .
$ git commit -am "commit"
$ git push heroku <branch>
```

No caso do projeto, foi utilizado a branch main.

O próximo passo é rodar as migrações antes de acessar o link da API gerado no deploy. Para isso, execute o comando:

```bash
$ heroku run bash --app <app-name>
```

Para o app-name, usou-se o nome cobe-backend.

Em seguida, rode o comando:

```bash
$ npx typeorm migration:run
```

Caso queira fazer consultas no banco de dados, coloque o comando na linha do terminal:

```bash
$ heroku pg:psql --app cobe-backend
```

Obs.: para sair do heroku run bash e do heroku pg:psql, basta digitar 'exit'.

Pronto! Agora já é possível documentar os endpoints da API, assim como foi feito no arquivo 
'cobe.postaman_collection.json'. Após concluída a documentação, esta foi repassada aos demais desenvolvedores 
para que pudessem fazer a integração do front-end, react native e android com o back-end.

## Diagrama do projeto Cobé

Importante destacar de qual forma foi diagramado o banco de dados para entender como funciona o fluxo do projeto:

![COBE_DIAGRAM!](https://user-images.githubusercontent.com/91624733/163865081-3f4eba43-cd9d-483c-869f-3b7aaf178aac.png)

Algumas considerações: em relação ao usuário, ele pode ter vários pedidos, diários e comentários. Quanto aos pedidos, 
pode ter apenas um pagamento, mas vários checkouts. Já os passeios turísticos, pode ter somente uma história de 
comunidade relacionado, mas ter muitos pedidos de compra. Enquanto que os diários, por sua vez, podem ter muitos 
comentários. 

A tabela de tokens foi criada porque a API está suportando a implementação de refresh token. Logo, a coluna hash
armazena o último token gerado para determinado usuário.

Para mais detalhes, consulte o arquivo 'cobe-diagram.pdf' na raiz do projeto, que contém, por exemplo, os enum's 
utilizados.

## Funcionamento do projeto Cobé

Com tudo configurado, abra a collection do postman para verificar todos os endpoints que a API suporta. Vale destacar 
que a collection foi dividida em duas partes: a do localhost:3000 e a do herokuapp.com, para facilitar os testes nos
ambientes de desenvolvimento e de produção.

Na API, foram estabelecidos guardiões nas rotas para impedir o acesso de determinados usuários. Porém, existem rotas 
que não possuem essas restrições como o acesso aos passeios turísticos (tours), às histórias das comunidades (stories),
aos diários de viagem (diares) e aos comentários realizados nesses diários (comments). Todos no método GET. Isso porque
a ideia é fazer o turista se interessar em participar ativamente do aplicativo e do site, então ele consegue analisar
o produto e visualizar o feedback de outros usuários. No entanto, para realizar a compra do passeio, a postagem no diário
e o comentário na postagem do diário torna-se necessário o cadastro do turista. É importante destacar também que o 
turista não tem privilégios suficientes para criar, atualizar ou deletar os passeios turísticos e as histórias das comunidades. 

Obs.1: em relação às fotos dos usuários, dos passeios e das histórias, o ideal seria ter um sistema de upload para 
permitir que elas sejam armazenadas normalmente. Porém, por não haver tempo hábil, adotou-se uma forma mais simples
para adicionar as fotos. Elas foram hospedadas no site 'imgur', em que os links, em jpg e png, eram gerados para serem
armazenados no banco de dados. Como isso não fica muito prático para os usuários, um dos próximos passos do projeto
seria implementar um sistema de upload. 

Outro ponto importante é que a aplicação possuem alguns seeds, são eles: 1 admin, 2 turistas, 3 passeios turísticos e
3 histórias da comunidade. Isso foi feito para facilitar o fluxo do projeto e já aparecer os produtos, desde o início,
nas telas do site e do aplicativo.

O fluxo do projeto funciona da seguinte forma: o usuário pode fazer o login caso já tenha uma conta, cadastrar-se caso não 
tenha uma conta ou visualizar, ainda que sem conta, os passeios, as histórias, os diários e os comentários. Ao se 
cadastrar, o turista pode realizar a compra de um passeio se houver vagas disponíveis. Se não houver vagas suficientes
para atender a demanda, o status 422 será apresentado com uma mensagem explicando a situação de indisponibilidade.
Após a compra, aparecerá a propriedade custo total (totalCost), que envolve a relação do preço do passeio com a quantidade 
de vagas selecionada. Continuando o processo, o turista realizará o checkout, informando os dados das pessoas irão para a 
viagem. Nessa tabela, não foi colocada a validação de email e cpf único porque pode acontecer da mesma pessoa realizar 
mais de uma viagem e, consequentemente, ter mais de um checkout, o que resultaria em erro na aplicação. Por fim, ele 
escolherá o método de pagamento (cash, credit_card ou pix), em que os dados do cartão de crédito serão encriptados. Ao 
optar por fazer a compra pelo método de cartão de crédito, o usuário pode escolher em quantas parcelas gostaria de 
dividir a compra. Feito isso, aparecerá a propriedade valor da parcela (installmentValue), que envolve a relação do
custo total com a quantidade de parcelas escolhida pelo usuário. 

Obs.2: nos campos de cartão de crédito, o ideal seria mandar os dados para um serviço específico, que faria as validações.
Porém, como não houve tempo suficiente para fazer isso, foram usadas regex's simples. Não é muito adequado usá-las por
conta do processo de manutenção, que se torna muito trabalhoso, já que pode haver várias alterações por parte das empresas
bancárias. No caso do projeto, elas só foram utilizadas apenas para não receber qualquer valor nos testes (letras, caracteres
especiais, etc). O padrão estabelecido na regex foi de 16 números.

Obs.3: as opções de Insert, Update e Delete (que estão localizadas na trigger) permitem gerenciar automaticamente a
quantidade de vagas disponíveis em cada passeio turístico.

Realizada a compra, o turista tem a possibilidade de relatar, posteriormente, a sua experiência no seu diário de viagem,
além de fazer comentários nas postagens de outros turistas.

Obs.4: ao deletar um usuário, todas as suas compras, os seus registros e as suas postagens são deletados também.

## Segurança da API

Em relação à segurança, algumas bibliotecas foram adicionadas para obter uma maior credibilidade do projeto Cobé: throttler,
helmet, bcrypt, typeorm-encrypted e winston.

O throttler possbilita inibir os ataques de força bruta, visto que o usuário é bloqueado ao realizar mais de 10 solicitações
dentro de um período de 60 segundos. Já o helmet oculta as tecnologias que estão sendo utilizadas na API, por meio de cabeçalhos
especiais nas respostas HTTP. Quanto à criptografia, tem a bcrypt, que faz com que a senha permaneça sempre criptografada e tem
a criptografia AES (typeorm-encrypted), que faz com que os dados pessoais (cartão de crédito e cpf) estejam criptografadas 
apenas quando estiverem em repouso no banco de dados, dificultando o trabalho dos invasores em caso de ataques. Por fim, tem o 
winston, que permite monitorar as requisições na API, identificando possíveis erros e/ou ameaças, registrados no console do 
terminal e no arquivo 'application.log' da pasta 'logs'. Esta pasta é gerada naturalmente ao rodar a aplicação.

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
