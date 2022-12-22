(function($) {
    // save data in object
    $.fn.edata = function(options){
        
        var unindexed_array = $(this).serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    };

    $.fn.imageConvert = function(){
        
        var button = $(this);
        var inputFile = $(document.createElement('input')).attr({type:'file',name:'media[images][]'});
        
        inputFile.on('change', function(event){

            var buttonText = button.text();
            button.text('Loading...').prop("disabled",true);
            var preview = $(document.createElement('img'));

            $(this.files).each(function(index, file){
                
                var inputCustom = inputFile.clone();

                canvasResize(file, {
                    width: 150,
                    height: 0,
                    crop: false,
                    quality: 100,
                    callback: function(data, width, height){
                        
                        preview.attr({src: data, width: width, height: height})
                        .css({width: width, height: height});

                        $('div#media-list').append(preview,inputCustom);
                        button.text(buttonText).prop("disabled", false);
                    }
                });

            });
            
        });

        $(this).click(function(){inputFile.click()});
    }

}(jQuery));