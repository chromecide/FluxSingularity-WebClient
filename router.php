<?php
session_start();

require_once('../FluxSingularity-Server/Kernel/DataClassLoader.php');
require_once('../FluxSingularity-Server/Kernel/DataNormalisation.util.php');
require_once('../FluxSingularity-Server/Kernel/DataValidation.util.php');

//Set the Paths to the Kernel and Modules folders
DataClassLoader::addPath('Kernel', realpath('../FluxSingularity-Server'));
DataClassLoader::addPath('Modules', realpath('../FluxSingularity-Server'));

$config = array(
	'KernelStore'=>array(
		'Driver'=>'MongoDB',
		'Database'=>'fluxs',
		'Username'=>'sysadmin',
		'Password'=>'syspass'
	)/*,
	'User'=>array(
		'Username'=>'justin.pradier',
		'Password'=>"aedyn1"
	)*/
);

//create a Kernel Instance
try{
	$FSKernel = DataClassLoader::createInstance('Kernel', $config);	
}catch(Exception $e){
	echo 'Could not load the Flux Singularity Kernel: '.$e->getMessage();
}

$process = $FSKernel->runProcess(
	'Modules.FSManager.Processes.Router', 
	array(
		'Inputs'=>array(
			'Enabled'=>DataClassLoader::createInstance('Kernel.Data.Primitive.Boolean', true)
		)
	)
);

if($process){
	$errors = $process->getOutputValue('Errors');
	if($errors->Count()>0){
		print_r($process->getTrace());
	} 
}

die();
if(!$task = $FSKernel->runTask('Modules.FSManager.Tasks.LoadRouterMessage', array('Enabled'=>DataClassLoader::createInstance('Kernel.Data.Primitive.Boolean', true), false))){
	//need to return a JSON error object that can be interpreted by the Javascript router
	echo 'error loading data';
}else{
	$messages = $task->getOutputValue('Messages');
	$errors = $task->getOutputValue('Errors');
	
	for($i=0;$i<=$messages->Count();$i++){
		$message = $messages->getItem($i);
		
		$messageTaskName = $message->getValue('Task');
		
		$task = $FSKernel->runTask($messageTaskName);
		
		
	}
	
	$ret = array(
		'Messages'=>$messages->toBasicObject(),
		'Errors'=>$errors
	);
	
	echo json_encode($ret);
	/*for($i=0;$i<$data->Count();$i++){
		$item = $data->getItem($i);
	}*/
}
?>