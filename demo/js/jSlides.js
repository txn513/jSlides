;(function ( $ ) {
    $.fn.jSlides = function(options) {
   		return this.each(function(){
			var mainDiv = $('<div class="main" id="main-temp"></div>');
			// var singleDiv = $('<div class="main-i" id="main-{{index}}"></div>');
			var ctrlDiv = $('<div class="ctrl" id="ctrl-temp"></div>');
			var img = $(this).find('img');
			//default settings
			var settings = {
				img1: {h2:'Creative', h3:'DUET'},
				img2: {h2:'Friendly', h3:'DEVIL'},
				img3: {h2:'Tranquilent', h3:'COMPATRIOT'},
				img4: {h2:'Insecure', h3:'HUSSLER'},
				autoplay: false,
				time: 3000,
				width: 1280,
				height: 500
			}
			
			options = $.extend(settings, options);
			//var objNum = Object.getOwnPropertyNames(settings).length;
			
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
					_html_main.append('<div class="main-i" id="main-'+ i +'" style="position: absolute; '
						+'opacity: 0; transition: all 1s;"></div>');
					_html_main.children('.main-i').append($(img[i]).clone(true))
					.append('<div class="caption" style="position: absolute; top: 80px; left: 350px;">'
					+ '<h2 style="transition: all 0.8s 1s; color: #ccc; font-size: 32px; '
					+ 'margin-left: 0; margin-bottom: 10px;">'+ options['img'+(i+1)].h2 + '</h2>'
					+ '<h3 style="transition: all 0.8s 1s; font-size: 24px; margin-left: 0px;">'
					+ options['img'+(i+1)].h3 +'</h3></div>');

					var _html_ctrl = $('<div class="ctrl" id="ctrl-temp" style="position: absolute; ' 
					+ 'height: 13px; bottom: -13px; text-align: center;">' 
					+ '<a href="javascript:;" class="ctrl-i" id="ctrl-'
					+ i +'" index="'+ i +'" style="position: relative; display: inline-block; ' 
					+ 'height: 13px; background-color: #888; top: 0; transition: all 0.8s; ' 
					+ 'margin-left: 4px; float: left;"></a></div>');
					_html_ctrl.children('a').append(img[i]);
					
					main_arr.push(_html_main.html());
					ctrl_arr.push(_html_ctrl.html());
				}
				$('#main-temp').html(main_arr.join(''));
				$('#ctrl-temp').html(ctrl_arr.join(''));

				_setStyle();
			
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
				var main= $('#main-'+n);
				var ctrl= $('#ctrl-'+n);
				
				var clear_main = $('.main-i');
				var clear_ctrl = $('.ctrl-i');

				clear_main.each(function(){
					$(this).removeClass('active').css('opacity', 0);
				});

				clear_ctrl.each(function(){
					$(this).removeClass('active').css('background-color','#888');;
				});
				// for(var i = 0; i < clear_main.length; i++){
					
				// 	$(clear_main[i]).removeClass('active');
				// 	$(clear_ctrl[i]).removeClass('active');
				// }
				main.addClass('active');
				ctrl.addClass('active');
				_setPosition();
				_setActiveStyle();
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
				}, options.time);
			}

			//set sliders and active slider position
			var _setPosition = function(){
				$('.slider .main img').css('height',options.height+'px');
				var imgWidth = parseInt($('.slider .main img').css('width'));
				$('.slider .main .main-i').css('left',((-(imgWidth-options.width)/2) - options.width/2)+'px');
				$('.slider .main .active').css({
					'left': (-(imgWidth-options.width)/2)+'px'
				});
			}

			//set active element styles
			var _setActiveStyle = function(){
				$('.slider .main .active').css({
					'opacity': 1
				});
				$('.slider .active .caption h2').css({
					'margin-left': '-35px'
				});
				$('.slider .active .caption h3').css({
					'margin-left': '45px'
				});
				$('.slider .ctrl .active').css({
					'background': '#db7093'
				});
			}

			//set slider width&height and control width&height
			var _setSize = function(){
				$('.slider').css({
					'width': options.width+'px',
					'height': options.height+'px'
				});
				$('.slider .main').css({
					'width': options.width+'px',
					'height': options.height+'px'
				});
				$('.slider .ctrl').css('width',options.width+'px');
				$('.slider .ctrl .ctrl-i').css('width',(options.width-4*(img.length-1))/img.length + 'px');
			}

			// set basic styles
			var _setStyle = function(){
				//.slider
				$('.slider').css({
					'position': 'relative',
					'margin': '0 auto'
				});
				$('.slider .main').css({
					'position': 'relative',
					'overflow': 'hidden'
				});
				$('.slider .ctrl .ctrl-i:first').css({
					'margin-left': 0
				});
				$('.slider .ctrl .ctrl-i img').css({
					'position': 'absolute',
					'width': '100%',
					'bottom': '13px',
					'left': 0,
					'transition': 'all 0.8s',
					'opacity': 0
				});
				$('.slider .ctrl .ctrl-i').hover(function(){
					$(this).children('img').css('opacity', 1);
				}, function(){
					$(this).children('img').css('opacity', 0);
				});

				$('.slider .ctrl .ctrl-i').hover(function(){
					$(this).css('background-color', '#555');
				}, function(){
					$(this).css('background-color', '#888');
					$('.slider .ctrl .ctrl-i.active').css('background-color', '#db7093');
				})
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