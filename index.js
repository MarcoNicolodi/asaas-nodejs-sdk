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
			var req = https.request(options, function(res){
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
	}

}

var customer = {
	getAll: function(filters,callback){
		var uri = filters ? '/api/v2/customers?'+qs.stringify(filters) : '/api/v2/customers';
		apiCall(uri,'GET',callback);
	},
	getById: function(id,callback){
		apiCall('/api/v2/customers/'+id,'GET',callback);
	},
	getByEmail: function(email){
		apiCall('/api/v2/customers?email='+email,'GET',callback);
	},
	create: function(data,callback){
		apiCall('/api/v2/customers','POST',callback,data);
	},
	update: function(id, data,callback){
		apiCall('/api/v2/customers/'+id,'POST',callback,data);
	},
	delete: function(id){
		apiCall('/api/v2/customers/'+id,'DELETE',callback);
	}
}

var payment = {
	getAll: function(filters,callback){
		var uri = filters ? '/api/v2/payments?'+qs.stringify(filters) : '/api/v2/payments';		
		apiCall(uri,'GET',callback)
	},	
	getById: function(id,callback){
		apiCall('/api/v2/payments/'+id,callback);
	},
	getByCustomer: function(filters,customer_id,callback){
		var uri = filters ? '/api/v2/customers/'+customer_id+'/payments?'+qs.stringify(filters) : '/api/v2/customers/'+customer_id+'/payments';
		apiCall(uri,'GET',callback);
	},
	getBySubscription: function(filters, subscription_id,callback){
		var uri = filters ? '/api/v2/subscriptions/'+subscription_id+'/payments?'+qs.stringify(filters) : '/api/v2/subscriptions/'+subscription_id+'/payments';
		apiCall(uri,'GET',callback);
	},
	create: function(data,callback){
		apiCall('/api/v2/payments','POST',callback,data);
	},
	update: function(id,data,callback){
		apiCall('/api/v2/payments/'+id,'POST',callback,data);
	},
	delete: function(id,callback){
		apiCall('/api/v2/payments/'+id,'DELETE',callback);
	}
}

var subscription = {
	getAll: function(filters,callback){
		var uri = filters ? '/api/v2/subscriptions'+qs.stringify(filters) : '/api/v2/subscriptions';
		apiCall(uri,'GET',callback)
	},
	getById: function(id,callback){
		apiCall('/api/subscriptions/'+id,callback);
	},
	getByCustomer: function(filters, customer_id,callback){
		var uri = filters ? '/api/v2/customers/'+customer_id+'/subscriptions?'+qs.stringify(filters) : '/api/v2/customers/'+customer_id+'/subscriptions';  
		apiCall(uri,'GET',callback);
	},
	create: function(data,callback){
		apiCall('/api/v2/subscriptions','POST',callback,data);
	},
	update: function(id,data,callback){
		apiCall('/api/v2/subscriptions/'+id,'POST',callback,data);
	},
	delete: function(id,callback){	
		apiCall('/api/v2/subscriptions/'+id,'DELETE',callback);
	}
}

var cities = {
	get: function(filters,callback){
		var uri = filters ? '/api/v2/cities?' + qs.stringify(filters) : '/api/v2/cities';
		apiCall(uri,'GET',callback);
	},
	getById: function(id,callback){
		apiCall('/api/v2/cities/'+id,'GET',callback);
	},
	getByName: function(name,callback){
		apiCall('/api/v2/cities?name='+name,'GET',callback);
	}

}

exports.payment = payment;
exports.customer = customer;
exports.subscription = subscription;
exports.cities = cities;
exports.settings = settings;