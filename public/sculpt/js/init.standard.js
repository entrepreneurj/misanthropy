$(document).ready(function(){

//This makes the dropdown menu button groups work
$('a.drop').click(function() {
$(this).parent().find('ul').toggle();
$(this).toggleClass('select').find('i').toggleClass('fa-rotate-180'); 
return false 
});

$('textarea').autosize();

$.localScroll();

});