function consultaCliente() {
    var emailUser = $('.box-login--form--input').val();
    var store = 'api';
    var name = 'CC';
    var fields = '?_fields=categoriaCliente,aprovado';
    var urlProtocol = window.location.protocol;
    var apiUrl = urlProtocol + '//adeliamendoncab2b.vtexcommercestable.com.br/' + store + '/dataentities/' + name + '/search/'+ fields;
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
        var teste = data[0].categoriaCliente;
        console.log(teste);
        var teste2 = data[0].aprovado;
        console.log(teste2);
    }).fail(function(data) {
        window.alert('Ocorreu um erro ao buscar seu e-mail');
    });
}