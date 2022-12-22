/*
 * name: Form Plugin
 * project: Modular
 * email: manyandamariano@hotmail.com
 */

// redirect resquest
$('button[name=redirect]').click(function(event){
    $(location).attr('href', $(this).val());
}),

/* Event button get action */
$('.button-submit.get').click(function(){

    var action = $(this).attr('action'), data = $(this).data(), query = []
    $.get(action, data, function(response){
        for(var index in data){
            if(data.hasOwnProperty(index)){
                query.push(encodeURIComponent(index)+'='+encodeURIComponent(data[index]))
            }
        }
        action = Object.keys(data).length ? action +'?' + query.join('&') : action
        $(location).attr('href', action)
    })
    
})

//Emitt modal event by hash
$(document).ready(function(event){
    //Emit event ready
})

var responseJS = function(url, data, type = 'post'){

    return $[type](url, data, function(response){

        if(response.message){ // Response only status with message

            $('#form-messages').html($(response.message)).show()

            $('button.btn-close').click(function(){
                $('#form-messages').hide().empty()
            })

        }else

        if(response.html){

            if($.modal._content){
                $.modal.content(response.html) // Response reload content html into opened modal
            }

        }else
        if(response.location){ // Response redirect a url location
            
            $(location).attr('href', response.location)

        }else
        if(response.reload){

            $(location).attr('href', window.location.pathname)

        }

    })

}

$(document).submit(function(event){
    
    var target = $(event.target)

    if(target.is('[method=post].modal-form')){ // Modal reload
        
        $.modal.open()

        $.modal.loading()

        responseJS(target.attr('action'), target.edata(), 'post').done(function(response) {
            
            $.modal.complete()

            if(response.action == 'close'){
                $.modal.close()
            }

        }).fail(function () {

            alert('Ocurrió un problema con el servidor intente de nuevo.')

        })

    }else

    if(target.is('[method=post].form-submit')){

        responseJS(target.attr('action'), target.edata(), 'post').done(function(response){
            
            if(response.action == 'close'){
                $.modal.close()
            }

        })

    }

    event.preventDefault()
})

/* Document event */
$(document).click(function(event){

    var target = $(event.target)

    if(target.is('.modal-open.post')){

        $.modal.open()

        if(target.is('button[name=action]')){

            $.modal.loading()

            responseJS(target.val(), target.data(), 'post').done(function(response){

                $.modal.complete()

            })

        }else

        if(target.is('a[href]')){

            $.modal.loading()

            responseJS(target.attr('href'), target.data(), 'post').done(function(response){

                if(response.message){
                    $.modal.close()
                }

            })

        }

        event.preventDefault()

    }else

    if(target.is('.button-submit.post')){

        if(target.is('button[name=action]')){

            responseJS(target.val(), target.data(), 'post').done(function(response){

                if(response.action == 'close'){
                    $.modal.close()
                    //$('#label-status').text(response.order.state);
                    //target.prop('disabled', true)
                }

            })

        }

    }else

    if(target.is('.submit-link.post')){

        responseJS(target.attr('href'), [], 'post')

        event.preventDefault()
    }else

    /* Event button post action */
    if(target.is('select.select-submit.post')){

        target.change(function(){
            $(this.form).submit()
        })

    }

});