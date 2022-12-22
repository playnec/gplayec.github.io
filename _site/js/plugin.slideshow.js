/**
 * plugin slideshow
 */
(function($){
    
    $.fn.slideshow = function(options){

        options = jQuery.extend({
            time: 5000,
            kind: 'slide',
            mouseEventStop: false
        }, options);

        var self = $(this);
        var large = self.find('.items .item').length, _large;
        var wdt = self.width(); // static width
        var hwt = wdt * large;

        var index = 0, x_val = 0; // dinamic index and x margin 

        var hvContent = self.find('.hv-content').css({position:'relative',width:'100%'});
        var items = self.find('.items').css({position:'relative',display:'block',margin:0});

        self.css({overflow:'hidden',maxWidth:'100%',position:'relative'});

        var tools = {

            fade: function(){

                self.find('.item').css({position:'static',top:0, marginTop:0});
    
                this.init = function(callback){
    
                }
    
                this.reset = function(){
    
                }
    
            },

            slide: function(){

                var _self = this;
                
                hvContent.css({width:hwt*2});
                items.css({width:hwt,float:'left'});
    
                hvContent.append(items.clone());

                index = 0; // set in 0 items index
                x_val = 0; // recalcule x margin
    
                this.setup = function(){
    
                    wdt = self.width(); // resizing width
                    hwt = wdt * large; // resizing content width
                    x_val = -wdt;
                    _large = self.find('.item').length; // Get again clone items length
    
                    self.find('.hv-content').width(hwt * 2);
                    self.find('.items').width(hwt);
    
                    self.find('.item').css({ position: 'relative', maxWidth: wdt, display: 'block', float: 'left', margin: 0 });
    
                }
    
                this.start = function(type = 'animate'){
    
                    if(index == large){ // end cycle
            
                        index = 0;
                        x_val = -wdt;
        
                        self.find('.items:first-child').appendTo(self.find('.hv-content')).css({marginLeft:0});
                    }
        
                    if(type == 'animate'){
                        self.find('.items:first-child').stop().animate({marginLeft:x_val},300);
                    }else{
                        self.find('.items:first-child').css({marginLeft:x_val},300);
                    }
                    
                    x_val = x_val - wdt; // width calcule;
        
                    index++;
        
                }
    
                this.setup();
                this.intervale = setInterval(this.start, options.time);
    
            }

        }

        var _fn = new tools[options.kind];
        var inWidth = self.innerWidth();

        $(window).on('resize', function(e){

            var _inWidth = self.innerWidth();
            clearInterval(_fn.intervale);

            if(!(inWidth == _inWidth)){

                _fn.setup();
                x_val = 0;
                _fn.start(null);
                _fn.intervale = setInterval(_fn.start, options.time);
                
                inWidth = _inWidth; //set width to resize value;

            }

        });

        if(options.mouseEventStop){
            self.mouseover(function(){
                clearInterval(_fn.intervale); // Stop interval time;
            }).mouseout(function(){
                _fn.intervale = setInterval(_fn.start, options.time); // Resume interval time;
            });
        }

        /*var slideInterval, 
        slide = function(callback){
            
            index = 0; // set in 0 items index
            x_val = 0; // recalcule x margin

            wdt = self.width(); // resizing width
            hwt = wdt * large; // resizing content width
            x_val = -wdt;
            _large = self.find('.item').length; // Get again clone items length
            
            self.find('.hv-content').width(hwt*2);
            self.find('.items').width(hwt);

            self.find('.item').css({position:'relative',maxWidth:wdt,display:'block',float:'left',margin:0});

            slideInterval = setInterval(callback, 2000);

        },
        resetSlide = function(type = 'animate'){

            if(index == large){ // end cycle
    
                index = 0;
                x_val = -wdt;

                self.find('.items:first-child').appendTo(self.find('.hv-content')).css({marginLeft:0});
            }

            if(type == 'animate'){
                self.find('.items:first-child').stop().animate({marginLeft:x_val},300);
            }else{
                self.find('.items:first-child').css({marginLeft:x_val},300);
            }
            
            x_val = x_val - wdt; // width calcule;

            index++;

        }

        slide(resetSlide);

        $(window).on('resize', function(target){
            slide(resetSlide);
            clearInterval(slideInterval);
            resetSlide(null);
        });*/
        
    }

}(jQuery));