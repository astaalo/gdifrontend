$(document).ready(function(){
    $('.input-mat').focus(function (e) {
        div = e.target.parentElement;
            $(div).addClass('active');
    })
    $('.input-mat').focusout(function (e) {
        div = e.target.parentElement;
        if (this.value) {
            $(div).addClass('active');
        }else {
            $(div).removeClass('active');
        }
    })
  });