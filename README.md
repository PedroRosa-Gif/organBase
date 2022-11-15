## Para executar

Primeiro copie a URL do repositório para fazer uma copia local em seu computador. Ou se quiser, apenas copie o código abaixo e execute na pasta que deseja.

Para https
```bash
  git clone https://github.com/PedroRosa-Gif/organBase.git
```

Para Chave SSH
```bash
  git@github.com:PedroRosa-Gif/organBase.git
```

Após clonar o repositório ainda no terminal, é necessário instalar os modulos que foram utilizados no projeto.

Para Windows
```bash
  npm install
```
Para Linux
```bash
  yarn install
```

Assim é possivel executar o projeto localmente. Depois que instalar as dependencias do projeto, execute:

```bash
  nodemon ./server.js
```

O terminal retorna o status da execução, dizendo se algum erro aconteceu ou não, você pode acessar o projeto na sua URL local, localhost:3001. Lembre-se também de que é necessário alterar as credenciais do banco de dados, como está sendo executado localmente, você precisará colocar as informações do seu banco de dados no arquivo .env, há um exemplo deixado no repositório, o arquivo .env-example para a instanciação das variáveis de ambiente. Na pasta 'database' estão os comandos SQL para a construção e população do banco, execute eles antes de rodar. Com isso a aplicação estará disponível para uso.