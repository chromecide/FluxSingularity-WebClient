Ext.define('FSManager.applications.UserLogin',{
	extend: 'DockUI.Application',
	alias: 'widget.fsmanageruserlogin',
	view: 'icon',
	draggable:false,
	appProperties: {
		title:'FSManager User Login',
		version:'1.0'
	},
	title: 'Login',
	width: 300,
	initComponent: function(){
		Ext.apply(this, {
			items:[
				this.formPanel = Ext.create('Ext.form.FormPanel',{
					items:[
						{
							xtype:'textfield',
							name:'Username',
							fieldLabel: 'Username'
						},
						{
							xtype:'textfield',
							fieldLabel: 'Password',
							name: 'Password',
							inputType:'password'
						}
					]
				})
			],
			buttons:[
				{
					text:'Login',
					handler: this.onLoginClick,
					scope:this
				}
			]
		});
		
		this.callParent(arguments);
	},
	onLoginClick: function(){
		this.launcher.setIconCls('icon-loading');
		//create a message and add it to the message queue
		var data = {
			Source: this.id,
			Task: 'Modules.FSManager.Processes.ProcessLogin',
			Inputs:this.formPanel.getValues(),
			callback: {
				fn: this.callback,
				scope:this
			}
		};
		this.sendMessage(data);
	},
	callback: function(){
		console.log('back here');
	}
});