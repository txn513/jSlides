(function ( $ ) {
    $.fn.jSlides = function() {
   		return this.each(function(){
			var mainDiv = $('<div class="main" id="main-temp"></div>');
			// var singleDiv = $('<div class="main-i" id="main-{{index}}"></div>');
			var ctrlDiv = $('<div class="ctrl" id="ctrl-temp"></div>');
			var img = $(this).find('img');
			// singleDiv.append('<div class="caption">'
			// 	+ '<h2>{{h2}}</h2>'
			// 	+ '<h3>{{h3}}</h3></div>'
			// 	);
			// mainDiv.append(singleDiv);
			// ctrlDiv.append('<a href="#" '
			// 	+'class="ctrl-i" id="ctrl-{{index}}" index="{{index}}"><img src="img/{{index}}.jpg"></a>')

			$(this).append(mainDiv).append(ctrlDiv);

			function g(id){
			if ( id.substr(0,1) == '.'){
						return document.getElementsByClassName(id.substr(1));
					}
				return document.getElementById(id);
			}

			function addSlides (){
				var data = [
						{img:1, h2:'Creative', h3:'DUET'},
						{img:2, h2:'Friendly', h3:'DEVIL'},
						{img:3, h2:'Tranquilent', h3:'COMPATRIOT'},
						{img:4, h2:'Insecure', h3:'HUSSLER'}
					];

				var main_arr = [];
				var ctrl_arr = [];
								
				for(var i=0; i<img.length; i++) {
					
					var _html_main = $('<div class="main" id="main-temp"></div>');
					_html_main.append('<div class="main-i" id="main-'+ i +'"></div>');
					_html_main.children('.main-i').append($(img[i]).clone(true))
					.append('<div class="caption">'
					+ '<h2>'+ data[i].h2 +'</h2>'
					+ '<h3>'+ data[i].h3 +'</h3></div>');

					var _html_ctrl = $('<div class="ctrl" id="ctrl-temp"><a href="javascript:;" class="ctrl-i" id="ctrl-'
					+ i +'" index="'+ i +'"></a></div>');
					_html_ctrl.children('a').append(img[i]);
					
					main_arr.push(_html_main.html());
					ctrl_arr.push(_html_ctrl.html());
				}
				$('#main-temp').html(main_arr.join(''));
				$('#ctrl-temp').html(ctrl_arr.join(''));
			
			}

			function fnClick(){
			var j = 0;
			for(var i=0; i<$('.ctrl-i').length; i++){
				
				$('.ctrl-i')[i].onclick = function(){
					j = this.getAttribute('index');
					switchSlides(j)
				}
			}
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
			
			addSlides();
			switchSlides(1);
			fnClick();
		});
   		
		
		
    };
 
}( jQuery ));