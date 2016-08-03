var http = require('http');
var https = require('https');
var qs = require('querystring');
exports = module.exports = {}




var settings = {
	setAccessToken: function (access_token){
		this.access_token = access_token;
	},
	setEnvironment: function(environment){
		if(environment != 'homologacao' && environment != 'producao'){
			throw new Error("Invalid environment");
		}
		this.environment = environment;

	},
	getAccessToken: function(){
		return this.access_token;
	},
	getEnvironment: function(){
		return this.environment;
	},
	getUrl: function(){
		switch(this.getEnvironment()){
			case 'homologacao':
				return 'homolog.asaas.com';
			break;
			case 'producao':
				return 'asaas.com';
			break;
			default:
				throw new Error('Invalid environment');
			break;
		}
	}

}

function apiCall(path,method,callback,postData){

	
	var options = {
				host: settings.getUrl(),
				path: path,
				method: method,
				headers: {access_token: settings.getAccessToken(),'Content-Type': 'application/x-www-form-urlencoded'}
			};

	switch(settings.getEnvironment()){
		case 'homologacao':
			
			var req = http.request(options, function(res){
				switch(res.statusCode){
					case 401:
						return callback('Unauthorized',null);
					break;
					case 404:
						return callback('Not found',null);
					break;
					case 500:
						return callback('Internal server error',null);
					break;
				}

				data = '';
				res.on('data', function(chunk){
					data += chunk.toString();

				});
				res.on('error',function(err){
					return callback(err,null);
				})
				res.on('end',function(){
					return callback(null,JSON.parse(data));
					
				})
					
			})
			req.on('error',function(err){
				return callback(err,null);
			});
			if(postData){				
				req.write(qs.stringify(postData));
			}
			req.end();
			


		break;
		case 'producao':
			https.request(options, function(res){
				var data = '';
				res.on('data', function(chunk){
					data += chunk.toString();
				});
				res.on('end',function(){
					return data;
				})
			}).end();
			
		break;
	}

}

var customer = {
	getAll: function(filters,callback){
		apiCall('/api/v2/customers','GET',callback);
	},
	getById: function(id,callback){
		apiCall('/api/v2/customers/'+id,'GET',callback);
	},
	getByEmail: function(email){

	},
	create: function(data,callback){
		apiCall('/api/v2/customers','POST',callback,data)
	},
	update: function(id, data){

	},
	delete: function(id){

	}
}

var payment = {
	getAll: function(filters,callback){
		var uri = filters ? '/api/v2/payments?'+qs.stringify(filters) : '/api/v2/payments';
		console.log(uri);
		apiCall(uri,'GET',callback)
	},	
	getById: function(id){

	},
	getByCustomer: function(customer_id){

	},
	getBySubscription: function(subscription_id){

	},
	create: function(data){

	},
	update: function(id,data){

	},
	delete: function(id){

	}
}

var subscription = {
	getAll: function(filters){

	},
	getById: function(id){

	},
	getByCustomer: function(customer_id){

	},
	create: function(data){

	},
	update: function(id,data){

	},
	delete: function(id){

	}
}

var city = {

}

exports.payment = payment;
exports.customer = customer;
exports.subscription = subscription;
exports.settings = settings;