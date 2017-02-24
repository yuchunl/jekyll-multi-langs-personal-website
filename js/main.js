$(document).ready(function() {

  $(function(){
    $('.profile').hover(function(){
        $(this).attr('src','images/photo3.jpg');
        $('.message').css({
          opacity: '1',
        });
        $('.message .arrow-int').css({
          opacity: '1',
        });
        $('.message .arrow-int').css({
          opacity: '1',
        });

    },function(){
        $(this).attr('src','images/photo.jpg');
        $('.message').css({
          opacity: '0',
        });
        $('.message .arrow-int').css({
          opacity: '0',
        });
        $('.message .arrow-int').css({
          opacity: '0',
        });        
    });
  })


  $(".menu-toggle").on('click', function() {
    $(this).toggleClass("on");
    $('.menu-section').toggleClass("on");
    $("nav ul").toggleClass('hidden');
  });
});



