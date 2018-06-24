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

function insertConsulta() {
    var jsonSaveDadosUser = {
        "meuemail": $(".box-login--form--input").val()
    };

    var urlSaveDadosUser = 'https://adeliamendoncab2b.vtexcommercestable.com.br/api/dataentities/CC/documents/';

    $.ajax({
        headers: {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(jsonSaveDadosUser),
        type: 'PATCH',
        url: urlSaveDadosUser,
        success: function (data) {
          console.log(data);
          $(".box-login--form--input").val('');
        },
        error: function (data) {
          console.log(data);
        }
    });
}

function loginUser() {
    var emailUser = $('.box-login--form--input').val();
    var store = 'api';
    var name = 'CL';
    var singleMail = emailUser;
    var fields = 'email='+emailUser+'';
    var urlProtocol = window.location.protocol;
    var apiUrl = urlProtocol + '//adeliamendoncab2b.vtexcommercestable.com.br/' + store + '/dataentities/' + name + '/search?'+ fields;
    console.log(apiUrl);

    $.ajax({
        "headers": {
            "Accept": "application/vnd.vtex.masterdata.v10.profileSchema+json"
        },
        "url": apiUrl,
        "async" : false,
        "crossDomain": true,
        "type": "GET"
    }).success(function(data) {
        console.log(this);
        var myEmail = data[0].email;

        if($(myEmail == singleMail)){
            insertConsulta();
        }
        
    }).fail(function(data) {
        window.alert('Ocorreu um erro ao buscar seu e-mail');
    });
}