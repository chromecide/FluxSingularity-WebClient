Ext.define('FSManager.models.RouterMessage', {
	extend:"Ext.data.Model",
	fields: [
		{name:	'MessageId'},
		{name:	'Destination'},
		{name:	'Source'},
		{name: 	'Task'},
		{name: 	'Inputs'},
		{name: 	'Status'}
	]
});