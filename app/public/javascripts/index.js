$(function(){
	var keystate;

	$(document).mousedown(keydown);
	$(document).mouseup(keyup);
	$(document).bind('touchstart', keydown);
	$(document).bind('touchend', keyup);
	$(document).keydown(keydown);
	$(document).keyup(keyup);

	function keydown(event){
		event.preventDefault();
		event.stopPropagation();
		if(keystate != 'keydown'){
			keystate = 'keydown';
			controlLight("on");
		}
	}

	function keyup(event){
		event.preventDefault();
		event.stopPropagation();
		if(keystate != 'keyup'){
			keystate = 'keyup';
			controlLight("off");
		}
	}

	function controlLight(state){
		$.post('/rest/light/changestate', {state: state});
		visualizeLight(state);
	}

	// UI stuff:
	function visualizeLight(state){
		if(state == "on")
			$("#light").css('background-color', '#8F0000');
		if(state == "off")
			$("#light").css('background-color', '#E0E0F0');
	}
});