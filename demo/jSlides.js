;(function ( $ ) {
    $.fn.jSlides = function(options) {
   		return this.each(function(){
			var mainDiv = $('<div class="main" id="main-temp"></div>');
			// var singleDiv = $('<div class="main-i" id="main-{{index}}"></div>');
			var ctrlDiv = $('<div class="ctrl" id="ctrl-temp"></div>');
			var img = $(this).find('img');
			var settings = {
				img1: {h2:'Creative', h3:'DUET'},
				img2: {h2:'Friendly', h3:'DEVIL'},
				img3: {h2:'Tranquilent', h3:'COMPATRIOT'},
				img4: {h2:'Insecure', h3:'HUSSLER'},
				autoplay: false,
				time: 3000,
				width: 600,
				height: 400
			}
			// $(img[0]).css('height', '400px');
			// alert($(img[0]).css('width'));
			options = $.extend(settings, options);
			var objNum = Object.getOwnPropertyNames(settings).length;
			
			$(this).append(mainDiv).append(ctrlDiv);

			

			var _g = function(id){
			if ( id.substr(0,1) == '.'){
						return document.getElementsByClassName(id.substr(1));
					}
				return document.getElementById(id);
			}

			var _addSlides = function(){
				var main_arr = [];
				var ctrl_arr = [];
								
				for(var i=0; i<img.length; i++) {
					
					var _html_main = $('<div class="main" id="main-temp"></div>');
					_html_main.append('<div class="main-i" id="main-'+ i +'"></div>');
					_html_main.children('.main-i').append($(img[i]).clone(true))
					.append('<div class="caption">'
					+ '<h2>'+ options['img'+(i+1)].h2 +'</h2>'
					+ '<h3>'+ options['img'+(i+1)].h3 +'</h3></div>');

					var _html_ctrl = $('<div class="ctrl" id="ctrl-temp"><a href="javascript:;" class="ctrl-i" id="ctrl-'
					+ i +'" index="'+ i +'"></a></div>');
					_html_ctrl.children('a').append(img[i]);
					
					main_arr.push(_html_main.html());
					ctrl_arr.push(_html_ctrl.html());
				}
				$('#main-temp').html(main_arr.join(''));
				$('#ctrl-temp').html(ctrl_arr.join(''));
			
			}

			var _fnClick = function(){
				var j = 0;
				for(var i=0; i<$('.ctrl-i').length; i++){
					
					$('.ctrl-i')[i].onclick = function(){
						j = this.getAttribute('index');
						_switchSlides(j)
					}
				}
			}
			var _switchSlides = function(n){
				var main= _g('main-'+n);
				var ctrl= _g('ctrl-'+n);
				
				var clear_main = _g('.main-i');
				var clear_ctrl = _g('.ctrl-i');

				for(var i = 0; i < clear_main.length; i++){
					
					clear_main[i].className = "main-i";
					clear_ctrl[i].className = "ctrl-i";
				}
				main.className += " active";
				ctrl.className += " active";
				_setPosition();
			}
			var _autoPlay = function(){
				var i = 0;
				setInterval(function(){
					_switchSlides(i);
					if(i == img.length-1){
						i = 0;
					}else{
						i++;
					}
				}, settings.time);
			}
			var _setPosition = function(){
				$('.slider .main img').css('height',settings.height+'px');
				var imgWidth = parseInt($('.slider .main img').css('width'));
				$('.slider .main .main-i').css('left',(-(imgWidth-settings.width)/2)*2+'px');
				$('.slider .main .active').css('left', (-(imgWidth-settings.width)/2)+'px');
			}
			var _setSize = function(){
				$('.slider').css({
					'width': settings.width+'px',
					'height': settings.height+'px'
				});
				$('.slider .main').css({
					'width': settings.width+'px',
					'height': settings.height+'px'
				});
			}
			// 执行插件
			_addSlides();
			_setSize();
			_switchSlides(0);
			_fnClick();
			if(options.autoplay){
				_autoPlay();
			};
		});
    };
 
}( jQuery ));