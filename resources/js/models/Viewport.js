Ext.define('FSManager.models.Viewport', {
	extend:"Ext.data.Model",
	fields: [
		{name:'ID', mapping:'_id'},
		'Title', 
		'ReadOnly', 
		'TopBar',
		'BottomBar',
		'LeftBar',
		'RightBar',
		'Owner'
	],
	hasMany: {model:'DockUIDashboard', name:'dashboards'}/*,
	proxy: {
		type:'ajax',
		url: '/engine/server/UI/viewport/',
		reader:{
			root:'',
			type:'json'
		}
	}*/
});