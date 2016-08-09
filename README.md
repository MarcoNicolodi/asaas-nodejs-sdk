# asaas-nodejs-sdk
A wrapper to Asaas API

Um wrapper em NodeJS para a [API de pagamento do Asaas](https://www.asaas.com/documentacao/faq-asaas/)
Para utilizá-la, você deve fazer um cadastro para receber sua Access Token.

Para utilizar este wrapper, simplesmente inclua o módulo através de um require

```javascript
var asaas = require('asaas-nodejs-sdk');
```

Configure seu ambiente('homologacao || producao') e sua access token:

```javascript
asaas.settings.setAccessToken( 'sua_access_token');
asaas.settings.setEnvironment('homologacao || producao');
``` 

Toda chamada a API deve conter um callback seguindo o padrão NodeJS, ou seja, primeiro argumento deve ser uma váriavel de erro(se existir) e o segundo uma variável de sucesso(se não houver erro).

Os métodos que tiverem um parâmetro filtro devem receber um objeto chave-valor referente ao filtro ou o valor null.

Os métodos que tiverem um parâmetro data devem receber um objeto chave-valor contendo os dados.

Exemplo:

```javascript
asaas.customer.create({'name': 'nodejs','email':'nodejs@nodejs.com'},function(err, data){
	if(err){
		//HTTP 400, 401,404,500
		//tratar erro
	} else {
		//HTTP 200
		//variável data é a mesma que retorna no retorno 200 da API oficial
	}
});
```

## Clientes

```javascript
//retorna todos os clientes
asaas.customers.getAll(filters || null,callback);

//retorna cliente por id
asaas.customers.getById(id,callback);

//retorna cliente por email
asaas.customers.getByEmail(email,callback);

//cria um cliente
asaas.customers.create({name: 'nome',email: 'email@email.com'},callback);

//atualiza o cliente com o id especificado
asaas.customers.update('cus_abc123',{name: 'novo nome',address: 'nova rua'},callback);


//exclui um cliente
asaas.customers.delete(id);
```

## Assinaturas