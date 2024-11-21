### App Login
##### Com o propósito de atender a uma atividade da disciplina de Segurança da Informação do curso tecnólogo em ADS, foi desenvolvido um sistema de login com as telas de login, signup, recover, new-password e home. Além disso foram implementadas práticas que visam impedir ataques SQL injection tanto no back quanto no front. 
##### SQL injection é um tipo de ataque cibernético que consiste na inserção de instruções SQL em campos como email ou senha com objetivo de visualizar ou acessar partes restritas de um determinado sistema.
### 🚀 Tecnologias utilizadas

#### Frontend:
- Angular
- Angular Material
- HTML
- CSS
- Typescript
- Javascript

#### Backend:
- C#
- .NET 6
- SQL server

## 💻 Como rodar a aplicação

#### Requisitos

- Angular/cli 12.2.17
- Node v14.17.1
- npm ou yarn
- .NET 6
- Visual Studio
- Microsoft SQL server 2019

**Clone o repositório**
```sh
git clone git@github.com:DaniloGH/App-Login.git
```

#### Frontend
**Instale as dependencias**
em App-Login/frontend/
```
npm i
```

**Inicie o Front**
em App-Login/frontend/
```
ng serve
```

#### Backend

**Crie um novo banco no SQL Server 2019**
- Caixa: Pesquisador de Objetos > Clique com o lado direito do mouse em: Banco de Dados > Novo banco de dados > digite o nome do banco > Ok

**No Microsoft Visual Studio**
- Abra a pasta do backend
- Ferramentas > Conectar-se a Banco de Dados > Nome do Servidor: encontre o nome do seu servidor no SQL server > autenticação: Autenticação do Windows, ou alguma outra caso tenha escolhido utilizar senha no servidor SQL
- Selecione ou digite o nome do banco de dados > Testar Conexão > se o teste for bem-sucedido > Conectar
- Depois vá ao Gerenciador de Servidores > Conexões de Dados > Clique com o lado direito do mouse no seu banco > Propriedades > Copie a Cadeia de Conexão
- Acesse o arquivo appsettings.json e cole sua cadeia de conexão no DefaultConnection:
```
  "ConnectionStrings": {
    "DefaultConnection": "COLE_SUA_CADEIA_DE_CONEXÃO_AQUI"
  },
```
- Após isso, no mesmo arquivo inclua no SecretKey (Crie uma secret key qualquer):
```
  "AppSettings": {
    "SecretKey": "exemplo_de_secret_key_aqui_vc_usa_a_criatividade",
    "Expiration": 2,
    "Issuer": "ApiCapotariaBatista",
    "Audience": "https://localhost"
  },
```
- Abra o package manager, gerenciador de pacotes do Microsoft Visual Studio e insira os seguintes comandos:
```
update-database -context AppDbContext
```
```
update-database -context NetDevPackAppDbContext
```
- O Programa irá criar as tabelas no seu banco de dados que foi conectado
- Em seguida clique no botão Run, para rodar o servidor
- Use a aplicação
