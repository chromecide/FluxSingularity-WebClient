Ext.define('FSManager.WebClient',{
	extend:'DockUI.Viewport',
	require: [
		'FSManager.models.Viewport'
	],
	viewportStore: null,
	router: null,
	constructor: function(){
		this.splashScreen.show();
		
		this.callParent(arguments);
		
		this.router = Ext.create('FSManager.Router',{
			
		});
		
		if(!this.viewportStore){
			this.viewportStore = new Ext.data.Store({
				model:'FSManager.models.Viewport',
				listeners:{
					add: this.onViewportAdd,
					scope:this
				}
			});
			this.viewportStore.add({
				Title:'Flux Singularity',
				ReadOnly:false,
				TopBar:{
					Enabled:true,
					Title: 'Flux Singularity',
					items:[
						{
							xtype: 'applicationlaunchertoolbarbutton',
							text: 'Trace Viewer',
							iconCls: 'icon-eye',
							application:{
								appName: 'FSManager.applications.TraceViewer',
								appCfg:{}
							}
						},
						{
							xtype: 'applicationlaunchertoolbarbutton',
							text: 'About',
							iconCls: 'icon-information',
							application:{
								appName: 'FSManager.applications.UserLogin',
								appCfg:{}
							}
						},
						{
							xtype: 'applicationlaunchertoolbarbutton',
							text: 'Login',
							iconCls: 'icon-lock',
							application:{
								appName: 'FSManager.applications.UserLogin',
								appCfg:{
									
								}
							}
						}
					]
				},
				LeftBar:{
					Enabled:true,
					Title: 'Debug',
					Applications:[
						//FSManager.applications.TraceViewer
						{
							Name:'FSManager.applications.TraceViewer'
						},
						//DockUI.ApplicationExplorer
						{
							Name:'DockUI.ApplicationExplorer'
						}
					]
				}
			});
		}
		this.splashScreen.hide();
	},
	splashScreen: new Ext.window.Window({
		modal:true,
		closable: false,
		title: 'Please Wait...',
		items: [
			{
				xtype:'panel',
				html:'<center><img src="resources/images/FS_LOGO.png" width="176"/></center>'
			}
		]
	}),
	
	/*
	 * Viewport Functions
	 */
	onViewportAdd: function(store, records, index, e){
		if(store.getCount()==1){
			this.loadViewport(records[0]);
		}
	},
	onViewportUpdate: function(){
		
	}
	/*
	 * End Viewport Functions
	 */
});