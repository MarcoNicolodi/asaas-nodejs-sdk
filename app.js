var asaas = require('./index.js');
asaas.settings.setAccessToken( '65f6cc7662d3bcd0377021c5d0158bc0a43724d6d80129bc807e2063b6cc63e7');
asaas.settings.setEnvironment('homologacao');


// asaas.customer.getAll(null,function(err, data){
// 	if(err){
// 		console.log(err);
// 		console.log('error');
// 	} else {
// 		console.log(data);
// 		console.log('success');
// 	}
// });

// asaas.customer.create({'name': 'nodejs','email':'nodejs@nodejs.com'},function(err, data){
// 	if(err){
// 		console.log(err);
// 		console.log('error');
// 	} else {
// 		console.log(data);
// 		console.log('success');
// 	}
// });

asaas.payment.getAll({status:'OVERDUE'},function(err, data){
	if(err){
		console.log(err);
		console.log('error');
	} else {
		
		console.log(data)
		console.log('success');
	}
});