if(window.location.href.indexOf("sc")!=-1){
   
} else {
    window.location.href = '/Sistema/401';
}

if(window.location.href.indexOf("sc=2")){
	$('.menu-departamento a, .prateleira .shelf-qd-v1-image-link, h3.shelf-qd-v1-product-name a, .footer-qd-v1-links a').each(function(){
		var myLink = $(this).attr('href');
		var changeMyLink = $(this).attr('href', myLink+'?sc=2');
	});
}

if(window.location.href.indexOf("sc=3")){
	$('.menu-departamento a, .prateleira .shelf-qd-v1-image-link, h3.shelf-qd-v1-product-name a, .footer-qd-v1-links a').each(function(){
		var myLink = $(this).attr('href');
		var changeMyLink = $(this).attr('href', myLink+'?sc=3');
	});
}