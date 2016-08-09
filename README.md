# asaas-nodejs-sdk
A wrapper to Asaas API

Um wrapper em NodeJS para a [API de pagamento do Asaas](https://www.asaas.com/documentacao/faq-asaas/)
Para utilizá-la, você deve fazer um cadastro para receber sua Access Token.

Para utilizar este wrapper, simplesmente inclua o módulo através de um require

```javascript
var asaas = require('asaas-nodejs-sdk');
```

Configure seu ambiente `homologacao` ou `producao` e sua access token:

```javascript
asaas.settings.setAccessToken( 'sua_access_token');
asaas.settings.setEnvironment('homologacao || producao');
``` 

Toda chamada a API deve conter uma função `callback` seguindo o padrão NodeJS, ou seja, primeiro argumento deve ser uma váriavel de erro(se existir) e o segundo uma variável de sucesso(se não houver erro).

Os métodos que tiverem um parâmetro `filter` devem receber um objeto chave-valor referente ao filtro ou o valor `null`.

```javascript
//com filtros
asaas.payment.getAll({status:'OVERDUE'},function(err, data){

});

//sem filtros
asaas.payment.getAll(null,function(err, data){

});
```


Os métodos que tiverem um parâmetro `data` devem receber um objeto chave-valor contendo os dados.

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

//retorna determinado cliente por id
asaas.customers.getById(id,callback);

//retorna cliente por email
asaas.customers.getByEmail(email,callback);

//cria um cliente
asaas.customers.create({name: 'nome',email: 'email@email.com'},callback);

//atualiza determinado cliente por id
asaas.customers.update('cus_abc123',{name: 'novo nome',address: 'nova rua'},callback);

//exclui determinado cliente por id
asaas.customers.delete(id);
```

## Assinaturas

```javascript
//retorna todas as assinaturas
asaas.subscriptions.getAll(filters || null, callback);

//retorna determinada assinatura por id
asaas.subscriptions.getById(id,callback);

//retorna as assinaturas de determinado cliente com o customer_id
asaas.subscriptions.getByCustomer(filters || null, customer_id,callback);

//cria uma nova assinatura
asaas.subscriptions.create(data,callback);

//atualiza determinada assinatura por id
asaas.subscriptions.update(id,data,callback)

//deleta determinada assinatura por id
asaas.subscriptions.delete(id,callback)

```

## Cobranças

```javascript
//retorna todas as cobranças
asaas.payments.getAll(filters || null, callback);

//retorna determinada cobrança por id
asaas.payments.getById(id,callback);

//retorna cobranças de um determinado cliente
asaas.payments.getByCustomer(filters || null, customer_id, callback);

//retorna cobranças de uma determinada assinatura
asaas.payments.getBySubscription(filters || null, subscription_id, callback);

//cria uma nova cobrança
asaas.payments.create(data, callback);

//atualiza uma determinada cobrança por id
asaas.payments.update(id,data,callback);

//deleta uma determinada cobrança por id
asaas.payments.delete(id,callback);

```

## Cidades

```javascript
//retorna todas as cidades
asaas.cities.getAll(filters || null,callback);

//retorna determinada cidade por id
asaas.cities.getById(id,callback);

//retorna determinada cidade por nome
asaas.cities.getByName(name, callback);

```