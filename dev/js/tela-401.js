$('#login-bt').on('click', function(event){
    $('.box-app').addClass('hidden-box');
    $('.box-login').removeClass('hidden-box');
});

$('#cad-bt').on('click', function(event){
    $('.box-app').addClass('hidden-box');
    $('.box-cad').removeClass('hidden-box');
});

function loginUser() {
    var emailUser = $('.box-login--form--input').val();
    var store = 'adeliamendoncab2b';
    var name = 'CL';
    var fields = 'email='+emailUser+'';
    var urlProtocol = window.location.protocol;
    var apiUrl = urlProtocol + '//api.vtex.com/' + store + '/dataentities/' + name + '/search?&_fields='+ fields;
    var response;

    $.ajax({
        "headers": {
            "Accept": "application/vnd.vtex.masterdata.v10.profileSchema+json"
        },
        "url": apiUrl,
        "async" : false,
        "crossDomain": true,
        "type": "GET"
    }).success(function(data) {
        response = data[0];
        window.alert('O e-mail '+emailUser+' foi encontrado.');
    }).fail(function(data) {
        response = data;
        window.alert('O e-mail '+emailUser+' não possui cadastro em nossa base de dados.');
    });
    return response;
}