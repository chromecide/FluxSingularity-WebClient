<html>
	<head>
		<title>Flux Singularity</title>
		<link rel="stylesheet" type="text/css" href="/vendors/ext-4.0.2a/resources/css/ext-all.css"/>
		<link rel="stylesheet" type="text/css" href="/vendors/DockUI_0_2/DockUI.css"/>
		<link rel="stylesheet" type="text/css" href="/resources/css/fluxsingularity.com.css"/>
		
		<script type="text/javascript" src="/vendors/ext-4.0.2a/ext.js"></script>
	  	<script type="text/javascript" src="/vendors/ext-4.0.2a/ext-all-debug.js"></script>	
	  	
	  	<script type="text/javascript" src="/vendors/DockUI_0_2/Models.js"></script>
	  	
	  	<script type="text/javascript" src="/resources/js/models/Viewport.js"></script>
	  	<script type="text/javascript" src="/resources/js/models/RouterMessage.js"></script>
	  	
	  	<!--script type="text/javascript" src="/engine/client/kernel/Services/Router.js"></script>-->
	  	
	  	<script language="javascript">
	  		Ext.Loader.setConfig({
				enabled:true,
				enableCacheBuster:true
		  	});
	  		
        	Ext.Loader.setPath('DockUI', '/vendors/DockUI_0_2');
        	Ext.Loader.setPath('FSManager', '/resources/js');

        	//Ext.require('FSManager.System.Clients.Web');
        	
        	var CLIENT;
        	var Router;
        	
        	Ext.onReady(function(){
        		Ext.create('FSManager.WebClient',{
        			
        		});
        		/*
        		  
        		 CLIENT = Ext.create('FSManager.System.Clients.Web',{
        			
        		});
        		
        		CLIENT.initSession();
        		*/
			});
	  	</script>
	</head>
	<body>
		<script language="javascript">
			
			
		</script>
		<!-- script src="/engine/client/boot.js"></script-->
	</body>
</html>