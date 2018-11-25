/**
 *  Class for general tools
 */

app.factory("Tools", ['$route', '$location', '$http',function($route, $location, $http){
	
	function makeid(size)
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < size; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}
	 
	var showWait = function(){
		HoldOn.open({
			theme:"sk-cube-grid",
			message:"Carregando",
			backgroundColor: "#FFF",
			textColor:"#333"
		});
	}
	
	var hideWait = function(){
		HoldOn.close();
	}
	
	function refresh(){
		$route.reload();
	}
	
	function redirect(path){
		$location.path(path);
		refresh();
	}
	
	function setActiveMenu(menu){
		$(".main-sidebar li.active").removeClass("active");
		if(!Array.isArray(menu)){
			console.error("Erro na função setActiveMenu(Array): O parâmetro deve ser um array.")
			return;
		}
		
		for(i = 0; i < menu.length; i++){
			$(menu[i]).addClass("active");
		}
		
	}
	
	return {
		showWait: showWait,
		hideWait: hideWait,
		refresh: refresh,
		redirect: redirect,
		makeid: makeid,
		setActiveMenu: setActiveMenu
	}
}])