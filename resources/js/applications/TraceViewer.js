Ext.define('FSManager.applications.TraceViewer',{
	extend: 'DockUI.Application',
	alias: 'widget.fsmanagertraceviewer',
	view: 'icon',
	appProperties: {
		title:'DockUI Trace Viewer',
		version:'1.0'
	},
	title: 'Trace Viewer',
	width: 300,
	initComponent: function(){
		var vp = Ext.getCmp('dockui-viewport');
		this.addListeners();
		
		this.displayPanel = Ext.create('Ext.panel.Panel',{
			html:'',
			height: 400
		});
		
		Ext.apply(this, {
			items:[
				this.displayPanel
			]
		});
		
		this.callParent(arguments);
	},
	destroy: function(){
		this.clearListeners();
		this.callParent(arguments);
	},
	addListeners: function(){
		FS.services.Router.on('trace', this.onTrace, this);
	},
	clearListeners: function(){
		FS.services.Router.un('trace', this.onTrace);
	},
	onTrace: function(message){
		this.updateDisplay(this.displayPanel.html+message+'<br/>');
	},
	updateDisplay: function(html){
		this.displayPanel.update(html);
	},
	getAppSettingsForm: function(){
		
	}
});