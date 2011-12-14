Ext.ns('FS.services');
Ext.define('FSManager.Router', {
	extend: Ext.util.Observable,
	config:{
	
	},
	callbacks:{},
	lastMessageId:0,
	defaultCallback: function(message){
		
		switch(message.get('Task')){
			case 'Kernel.ShowMessage':
				var inputs = message.get('Inputs');
				Ext.Msg.alert(inputs.Title, inputs.Message);
				break;
			default:
			
				break;
		}
	},
	remoteStore: new Ext.data.Store({
    	model:'FSManager.models.RouterMessage',
    	autoSync:true,
		proxy: {
			type: 'ajax',
	        url : 'router.php',
	        batchActions: true, 
	        reader: {
	            type: 'json',
	            root: 'Messages'
	        }
	    }
    }),
    localStore: new Ext.data.Store({
    	model:'FSManager.models.RouterMessage',
    	proxy:{
    		type:'memory',
    		reader:{
    			type:'json'
    		}
    	}
    }), 
	queue:function(data){
		this.addTrace('Queueing Message');
		data.MessageId = 'm'+this.createMessageId();
		this.addTrace('&nbsp;&nbsp;Message ID: '+data.MessageId);
		data.Status = 'Queued';
		
		if(!data.Destination){
			data.Destination = 'Kernel';
		}
		
		var callback = data.callback;
		
		if(callback){
			var evalString = '';
			
			evalString = 'this.callbacks.'+data.MessageId+' = callback';
			
			eval(evalString);
		}
		var addedMessage = this.remoteStore.add(data);
		this.localStore.add(addedMessage);
		return addedMessage.messageID;
	},
	startPoll: function(){
		this.pollTimer = setInterval('FS.services.Router.load()', 5000);
	},
	stopPoll: function(){
		clearInterval(this.pollTimer);
	},
	load: function(){
		this.stopPoll();
		this.remoteStore.load({
			callback: function(){
				this.startPoll();
			},
			scope: this
		});
	},
	beforeSync: function(){
		return true;
	},
	createMessageId: function(){
		this.lastMessageId++;
		return this.lastMessageId;
	},
	constructor:function(){
		this.localStore.on('add', this.processLocalStore, this);
		this.remoteStore.getProxy().afterRequest = this.afterProxyRequest;
		
		this.addEvents({
            "trace" : true,
            "message_recieved" : true
        });
	},
	processLocalStore: function(store){
		store.each(function(record){
			this.addTrace('Processing Local Message Store');
			var messageId = record.get('MessageId');
			var callback = this.callbacks[messageId];
			var messageStatus = record.get('Status');
			this.addTrace('&nbsp;&nbsp;- Message ID: '+messageId);
			this.addTrace('&nbsp;&nbsp;- Status: '+messageStatus);
			switch(messageStatus){
				case 'Queued':
				case 'Closed':
				case 'Pending':
					//do nothing
					break;
				case 'Error':
				case 'Processed':
					if(callback){
						if(callback.fn){
							if(!callback.scope){
								callback.scope = this;
							}
						}else{
							callback.fn = callback;
							callback.scope=this;
						}
						this.callbacks[messageId] = null;
						
						Ext.Function.defer(callback.fn, 10, callback.scope, [record.get('Responses')]);
					}else{
						console.log(this.callbacks);
					}
					break;
				case 'New':
					this.defaultCallback(record);
					break;
				case '':
				default:
					record.set('Status', 'Pending');
					break;
			}
		}, this);
	},
	postProcessor: function(jsonData){
		this.addTrace('Processing Response');
		if(jsonData.Errors){
			if(jsonData.Errors!=null){
				this.addTrace('&nbsp;&nbsp;- Errors Occurred: ');
			}
		}else{
			if(jsonData.Messages){
				for(var i=0; i<jsonData.Messages.length;i++){
					var message = jsonData.Messages[i];
					var oldMessageIndex = this.localStore.find('MessageId', message.MessageId);
					var oldMessage = false;
					
					if(oldMessageIndex>-1){
						this.localStore.remove(oldMessageIndex);
						oldMessage = this.localStore.getAt(oldMessageIndex);
						this.localStore.add(message);
					}else{
						this.localStore.add(message);
					}
				}
			}
		}
	},
	updateMessage: function(message, data){
		this.addTrace('Updating Message');
		//console.log(data);
		for(var l in data){
			this.addTrace('&nbsp;&nbsp;- '+l+': '+data[l]);
			message.set(l, data[l]);
		}
		return message;
	},
	afterProxyRequest: function(request){
		FS.services.Router.postProcessor(this.reader.jsonData);
	},
	addTrace:function($message){
		this.fireEvent('trace', $message);
	}
},
function(){
	FS.services.Router = new FSManager.Router();
});