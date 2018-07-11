$('#login-bt').on('click', function(event){
    $('.box-app').addClass('hidden-box');
    $('.box-login').removeClass('hidden-box');
});

$('#cad-bt').on('click', function(event){
    $('.box-app').addClass('hidden-box');
    $('.box-cad').removeClass('hidden-box');
});

$('.back-home').on('click', function(event){
    $('.box-app').removeClass('hidden-box');
    $('.box-cad').addClass('hidden-box');
    $('.box-login').addClass('hidden-box');
});

$('.box-login--closebt').on('click', function(event){
    $('.box-app').removeClass('hidden-box');
    $('.box-cad').addClass('hidden-box');
    $('.box-login').addClass('hidden-box');  
});

function loginUser() {
    var emailUser = $('.box-login--form--input').val();
    var store = 'api';
    var name = 'CL';
    var singleMail = emailUser;
    var fields = 'categoria,approved,email';
    var where = 'email='+emailUser+'';
    var urlProtocol = window.location.protocol;

    var apiUrl = urlProtocol + '//adeliamendoncab2b.vtexcommercestable.com.br/' + store + '/dataentities/' + name + '/search/?_fields='+ fields + '&_where=' + where;

    $.ajax({
        "headers": {
            "Accept": "application/vnd.vtex.masterdata.v10.profileSchema+json"
        },
        "url": apiUrl,
        "async" : false,
        "crossDomain": true,
        "type": "GET"
    }).success(function(data) {
        var myEmail = data[0].email;
        var approved = data[0].approved;
        var categoria = data[0].categoria;

        if($(myEmail == singleMail)){
            if(approved == true && categoria == 'PLF'){
                window.location.href = '/?sc=2'; // Parametro URL Politica PLF
            } else {
                window.location.href = '/?sc=3'; // Parametro URL Politica Profissional
            }
        } else {
            window.alert('Nao');
        }
    }).fail(function(data) {
        window.alert('Ocorreu um erro ao buscar seu e-mail');
    });
}
