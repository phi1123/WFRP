
/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a Worklight Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	
}

function renderBG () {
	var w = $(document).width();
	var h = $(document).height();
	w++;
	h++;
	//alert("w = "+w+" h = "+h)
	$('#html').css("background-image","url(\"images/bg_00.png\")");
	$('#html').css("background-size",w+"px "+h+"px");
	//$(html).css("background-repeat","no repeat");
	goToWelcome();
}

function goToWelcome() {
	$('#myContent').load('html/welcome.html',function () {
		$('#backButton').hide();
	});
}

function goToMenu(logged) {
	logged=false;
	if (logged==false) {
		$('#myContent').html('');
		$('#myContent').load('html/menu.html',function () {
			$('#myChars').attr("style","color:grey");
			$('#userName').hide();
			$('#backButton').show();
			$('#backButton').attr("onclick","goToWelcome()");
//			WL.App.overrideBackButton(goToWelcome());
		});
	}
}

function goToLogin() {
	alert("This feature is currently unavailable ^^'");
}

function goToSignUp() {
	alert("This feature is currently unavailable ^^'");
}

function goHome() {
	$('#myContent').html('');
	$('#myContent').load('html/home.html',function (){
		
	});
}
/* JavaScript content from js/main.js in folder iphone */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}