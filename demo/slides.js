 var data = [
			{img:1, h2:'Creative', h3:'DUET'},
			{img:2, h2:'Friendly', h3:'DEVIL'},
			{img:3, h2:'Tranquilent', h3:'COMPATRIOT'},
			{img:4, h2:'Insecure', h3:'HUSSLER'}
		];

var g = function (id){
			if ( id.substr(0,1) == '.'){
				return document.getElementsByClassName(id.substr(1));
			}
			return document.getElementById(id);
		}

function addSlides (){
	var main_arr = [];
	var ctrl_arr = [];
	var main_slides = g('main-temp').innerHTML
								.replace(/^\s*/,'')
								.replace(/\s*$/,'');

	var ctrl_thumb = g('ctrl-temp').innerHTML
								.replace(/^\s*/,'')
								.replace(/\s*$/,'');

	for(i in data) {
		var _html_main = main_slides
								.replace(/{{index}}/g, data[i].img)
								.replace(/{{h2}}/g, data[i].h2)
								.replace(/{{h3}}/g, data[i].h3);
		var _html_ctrl =  ctrl_thumb
								.replace(/{{index}}/g, data[i].img);

		main_arr.push(_html_main);
		ctrl_arr.push(_html_ctrl);
	}

	g('main-temp').innerHTML = main_arr.join('');
	g('ctrl-temp').innerHTML = ctrl_arr.join('');

}

function switchSlides (n){
	var main= g('main-'+n);
	var ctrl= g('ctrl-'+n);
	
	var clear_main = g('.main-i');
	var clear_ctrl = g('.ctrl-i');

	for(var i = 0; i < clear_main.length; i++){
		
		clear_main[i].className = "main-i";
		clear_ctrl[i].className = "ctrl-i";
	}
	main.className += " active";
	ctrl.className += " active";
}

window.onload = function (){
	addSlides();
	switchSlides(1);
}


