/** function createClientes(data) {
	var newData = {
		firstName: data.nome,
		lastName: data.sobrenome,
		email: data.email,
		birthDate: data.datanascimento,
		homePhone: data.telefone,
		phone: data.celular,
	}
	var storename = 'adeliamendoncab2b';
	var dataEntity = 'CL';
	var url = '//api.vtexcrm.com.br/'+storename+'/dataentities/'+dataEntity+'/documents/';
	//	docId = createDoc(jsonSaveDadosUser, urlSaveDadosUser);

	$.ajax({
		headers: {
			'Accept': 'application/vnd.vtex.ds.v10+json',
			'Content-Type': 'application/json',
		},
		data: JSON.stringify(newData),
		type: 'PATCH',
		url: url,
		async: false,
		success: function (data) {

			console.log('CLIENTE INSERIDO');

		},
		error: function (data) {
        if(data.responseText){
					var r = JSON.parse(data.responseText);
					console.log(r.Message);
				}else{
					console.log('CLIENTE ERROR');
				}
      }
	});

}

function checkUserApproved(data){
	var newData = data;
	var storename = 'adeliamendoncab2b';
	var dataEntity = 'CL';
	var url = 'https://adeliamendoncab2b.vtexcommercestable.com.br/api/dataentities/CL/search?email='+data.email+'&approved=true';
	//	docId = createDoc(jsonSaveDadosUser, urlSaveDadosUser);

	$.ajax({
		headers: {
			'Accept': 'application/vnd.vtex.ds.v10+json',
			'Content-Type': 'application/json',
		},
		data: JSON.stringify(data),
		type: 'GET',
		url: url,
		async: false,
		success: function (data) {

			if (data[0] === undefined) {
				createDoc(newData);
				createClientes(newData);
			}else{
				window.location.href = '/login';
			}

		},
		error: function (data) {
        if(data.responseText){
					var r = JSON.parse(data.responseText);
					console.log(r.Message);
				}else{
					console.log('Erro na verificacao 2');
				}
      }
	});
	return docId;
}

function createDoc(data){
	var storename = 'adeliamendoncab2b';
	var dataEntity = 'PC';
	var url = '//api.vtexcrm.com.br/'+storename+'/dataentities/'+dataEntity+'/documents/';
	//	docId = createDoc(jsonSaveDadosUser, urlSaveDadosUser);

	$.ajax({
		headers: {
			'Accept': 'application/vnd.vtex.ds.v10+json',
			'Content-Type': 'application/json',
		},
		data: JSON.stringify(data),
		type: 'PATCH',
		url: url,
		async: false,
		success: function (data) {

			docId = data.DocumentId;
			console.log(docId,data);
			var file = $("#file")[0].files;

			sendFile(file,docId,storename,dataEntity);


		},
		error: function (data) {
        if(data.responseText){
					var r = JSON.parse(data.responseText);
					console.log(r.Message);
				}else{
					console.log('Houve um erro tente novamente mais tarde.');
				}
      }
	});
	return docId;
}

function sendFile(file, docId, storename, entity){

	var fileData = new FormData();

	$.each(file, function(key, value){
		fileData.append(key, value)
	});

	//api.vtexcrm.com.br/rdlay/dataentities/TC/documents//1000039"

	$.ajax({
		url: '//api.vtexcrm.com.br/'+storename+'/dataentities/'+entity+'/documents//'+docId+'/file/attachments',
		type: 'POST',
		data: fileData,
		contentType: false,
		processData: false,
		success: function(data){
			console.log('succeed', data);
		},
		error: function(data){
			console.log('failed', data);
		}
	});
}

*/

function validadeForm() {
	//Variables
	var valid = true;
	//check fieldset
	if ($("#nome").val().length == 0) {
		valid = false;
	}
	if ($("#sobrenome").val().length == 0) {
		valid = false;
	}
	if ($("#datanascimento").val().length == 0) {
		valid = false;
	}
	if ($("#profissao").val() == null) {
		valid = false;
	}
	if ($("#confemail").val().length == 0) {
		valid = false;
	}
	if ($("#telefone").val().length == 0 && $("#celular").val().length == 0) {
		valid = false;
	}
	if ($("#cidade").val() == null) {
		valid = false;
	}
	if ($("#estado").val() == null) {
		valid = false;
	}
	return valid;
};

/**
 * sendCadastrar
 */

function getConvertData() {
	var data = {
		nome: $("#nome").val(),
		sobrenome: $("#sobrenome").val(),
		datanascimento: $("#datanascimento").val(),
		profissao: $("#profissao").val(),
		email: $("#confemail").val(),
		telefone: $("#telefone").val(),
		celular: $("#celular").val(),
		cidade: $("#cidade").val(),
		estado: $("#estado").val()
	};
	return data;
}

function sendCadastrar() {
	//Variables
	var data = {
		"firstName": $("#nome").val(),
		"lastName": $("#sobrenome").val(),
		"birthDate": $("#datanascimento").val(),
		"profissao": $("#profissao").val(),
		"email": $("#confemail").val(),
		"homePhone": $("#telefone").val(),
		"phone": $("#celular").val(),
		"nomecidade": $("#cidade").val(),
		"nomeestado": $("#estado").val()
	};


	//check fields has valid
	if (validadeForm()) {
		//start loading
		$('#btnFinalizar').text("Efetuando cadastro...");
		$('#btnFinalizar').prop("disabled", true);
		//check file send
		if ($('#file')[0].files[0]) {
			//send file
			uploadFile(data);
		} else {
			//Request
			$.ajax({
				type: 'POST',
				url: 'https://www.lojaadeliamendonca.com.br/resales',
				crossDomain: true,
				data: data,
				dataType: 'json',
				success: function (responseData, textStatus, jqXHR) {
					//checkUserApproved(getConvertData());
					//show
					$('#btnFinalizar').text("Cadastro efetuado com sucesso.");
					$('#btnFinalizar').prop("disabled", true);
					$('#messageSuccess').show();
					$('#cadprof').hide();
					$('#messageError').hide();
				},
				error: function (responseData, textStatus, errorThrown) {
					//take responseText
					console.log(responseData);
					$('#messageError').show();
					$('#btnFinalizar').prop("disabled", false);
					$('#btnFinalizar').text("Finalizar cadastro");
				}
			});
		}
	} else {
		//colocar aqui alerta de cadastro nÃ¯Â¿Â½o esta completo
		$('#messageError').show();
	}
};
/**
 * saveData
 * @param {Object} data
 */
function saveData(data) {
	//Variables
	var url = "https://www.lojaadeliamendonca.com.br/resales";
	var xhttp = null;
	//check compatibility browser
	if (window.XMLHttpRequest) {
		//create
		xhttp = new XMLHttpRequest();
	} else {
		// code for older browsers
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// Ajax call to app control-admin
	xhttp.addEventListener('readystatechange', function () {
		//check response
		if (this.readyState == 4 && this.status == 200) {
			//show
			//checkUserApproved(getConvertData());
			$('#btnFinalizar').text("Cadastro efetuado com sucesso.");
			$('#btnFinalizar').prop("disabled", true);
			$('#messageSuccess').show();
			$('#cadprof').hide();
			$('#messageError').hide();
		} else if (this.readyState == 4 && this.status == 413) {
			//take responseText
			console.log(this.responseText);
			$('#messageSuccess').hide();
			$('#messageError').show();
			$('#btnFinalizar').prop("disabled", false);
			$('#btnFinalizar').text("Finalizar cadastro");
		} else if (this.readyState == 4 && this.status == 500) {
			//take responseText
			console.log(this.responseText);
			$('#messageSuccess').hide();
			$('#messageError').show();
			$('#btnFinalizar').prop("disabled", false);
			$('#btnFinalizar').text("Finalizar cadastro");
		} else if (this.readyState == 4 && this.status == 400) {
			//take responseText
			console.log(this.responseText);
			$('#messageSuccess').hide();
			$('#messageError').show();
			$('#btnFinalizar').prop("disabled", false);
			$('#btnFinalizar').text("Finalizar cadastro");
		}
	});
	//event end
	xhttp.addEventListener('loadend', function () {
		//thats all folks
	});
	// event error
	xhttp.addEventListener('error', function (event) {
		//logger
		console.error(event);
	});
	//event time out
	xhttp.addEventListener('timeout', function (event) {

	});
	//event abort
	xhttp.addEventListener('abort', function (event) {
		//logger
		console.error(event);
	});
	//send
	xhttp.open("POST", url, true);
	//Send the proper header information along with the request
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(data));
};

/**
 * uploadFile
 * @param {Object} data
 */
function uploadFile(data) {
	//Variables
	var url = "https://www.lojaadeliamendonca.com.br/sendfile";
	var file = $('#file')[0].files[0];
	var numberRandom = Math.floor((Math.random() * 100) + 1);
	var xhttp = null;
	var loadbar = document.getElementById('progressBarValue');
	//check compatibility browser
	if (window.XMLHttpRequest) {
		//create
		xhttp = new XMLHttpRequest();
	} else {
		// code for older browsers
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//ajax
	if (file) {
		// Ajax call to app control-admin
		xhttp.addEventListener('readystatechange', function () {
			//check response
			if (this.readyState == 4 && this.status == 200) {
				//addEventListener
				data.attachment = $('#file')[0].files[0];
				$('#messageError').hide();
				//saveData
				setTimeout(function(){
					saveData(data);
				}, 2000)
				
			} else if (this.readyState == 4 && this.status == 413) {
				//logger
				console.log(this.responseText);
				$('#messageError').show();
				$('#btnFinalizar').prop("disabled", false);
				$('#btnFinalizar').text("Finalizar cadastro");
			} else if (this.readyState == 4 && this.status == 500) {
				//get
				console.log(this.responseText);
				$('#messageError').show();
				$('#btnFinalizar').prop("disabled", false);
				$('#btnFinalizar').text("Finalizar cadastro");
			} else if (this.readyState == 4 && this.status == 400) {
				//window
				$('#erroanexo').show();
				$('#btnFinalizar').prop("disabled", false);
				$('#btnFinalizar').text("Finalizar cadastro");
			}
		});
		//event start
		xhttp.addEventListener('loadstart', function () {
			//clear percentage
			$('#progressBar').show();
			loadbar.style.width = 0 + "%";
		});
		//progress ajax
		xhttp.upload.addEventListener('progress', function (event) {
			//check length
			if (event.lengthComputable) {
				//Event.total the total bytes seted by the header
				var percentComplete = parseInt((event.loaded / event.total) * 100);
				//set percentual
				loadbar.style.width = percentComplete + "%";
			}
		});
		//event end
		xhttp.addEventListener('loadend', function () {
			//thats all folks
		});
		// event error
		xhttp.addEventListener('error', function (event) {
			//logger
			console.error(event);
		});
		//event time out
		xhttp.addEventListener('timeout', function (event) {});
		//event abort
		xhttp.addEventListener('abort', function (event) {
			//logger
			console.error(event);
		});
		//send
		xhttp.open("POST", url, true);
		//Send the proper header information along with the request
		xhttp.setRequestHeader("Content-Type", "application/octet-stream");
		xhttp.setRequestHeader("filename", "file_" + numberRandom + getExtensionFile(file));
		xhttp.setRequestHeader("filesize", file.size);
		xhttp.setRequestHeader("fileextension", getExtensionFile(file));
		xhttp.setRequestHeader("data", JSON.stringify(data));
		xhttp.send(file);
	} else {
		//show error
		$('#messageError').show();
		cb(false);
	}
};

/**
 * getExtensionFile
 * @param {Object} file
 * @return {String} ext
 */
function getExtensionFile(file) {
	//Variables
	var ext = null;
	//check minetypes
	if (file) {
		//take minetypes
		ext = file.name.substring(file.name.indexOf('.'), file.name.length);
	} else {
		//alert
		$('#messageError').show();
	}
	//return
	return ext;
};


