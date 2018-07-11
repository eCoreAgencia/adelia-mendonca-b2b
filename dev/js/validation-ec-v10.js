if(window.location.href.indexOf("sc")!=-1){
   
} else {
    window.location.href = '/Sistema/401';
}

$(document).ready(function(){
	if(document.location.href.indexOf('?sc=2') > -1 ) {
		$('.owl-item .box-banner a, .menu-departamento a, .bread-crumb li a, a.product-image, .header-qd-v1-user-links a, .header-qd-v1-logo a, .prateleira .shelf-qd-v1-image-link, h3.shelf-qd-v1-product-name a, .footer-qd-v1-links a').each(function(){
			var myLink = $(this).attr('href');
			var changeMyLink = $(this).attr('href', myLink+'?sc=2');
        });
        
        $('.orderBy select option').each(function(){
            var myVal = $(this).attr('value');
            var changeVal = $(this).attr('value', myVal+'?sc=2');
        });
	}
	
	if(document.location.href.indexOf('?sc=3') > -1 ) {
		$('.owl-item .box-banner a, .menu-departamento a, .bread-crumb li a, a.product-image, .header-qd-v1-user-links a, .header-qd-v1-logo a, .prateleira .shelf-qd-v1-image-link, h3.shelf-qd-v1-product-name a, .footer-qd-v1-links a').each(function(){
			var myLink = $(this).attr('href');
			var changeMyLink = $(this).attr('href', myLink+'?sc=3');
        });
        
        $('.orderBy select option').each(function(){
            var myVal = $(this).attr('value');
            var changeVal = $(this).attr('value', myVal+'?sc=3');
        });
	}
});