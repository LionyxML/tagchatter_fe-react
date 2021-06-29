# TagChatter - Frontend - React Version

Frontend para a API de chat tagchatter

## Setup
Clone este diretório com o git ou outro método de preferência.

A partir do diretório do projeto, instale as dependências com:
`yarn` ou `yarn install`

À seguir, se desejar, altere o arquivo src/config.js que vem carregado\
com os seguintes valores padrão:

```
apiURL: 'https://tagchatter.herokuapp.com',
showLast: 20,
parrotsTimer: 3000,
listTimer: 3000,
appName: '#tagchatter',
```

Onde:
- ApiURL é o endereço raiz da API.
- showLast é a quantidade de posts exibidos por vez.
- parrotsTimer é o tempo (em ms) entre as atualizações do contador do cabeçalho
- listTimer é o tempo (em ms) entre as atualizações das mensagens
- appName é o título do aplicativo, utilizado no cabeçalho e na caixa modal de alerta


## Scripts disponíveis
A partir do diretório do projeto, você pode rodar:

### `yarn start`

Roda o app em modo desenvolvedor\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no browser.

A página irá atualizar se alterações forem feitas.\
Também aparecerão os erros de lint no console.

### `yarn build`

Constrói a versão de distribuição no diretório `build`.\
Empacota o react para modo de produção e otimiza para melhor performance.

A build é minificada e os nomes de arquivos incluem os hashes.\
O aplicativo então está pronto para ser distribuído.

É possível testar com `serve build` e acessar o [http://localhost:5000](http://localhost:5000).
