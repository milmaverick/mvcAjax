$(document).ready(async function(){
	//	await getPage();
	await pagination();
	await isLogged();
	//Отправка комментария--------------------

	$("#form").submit(function(){
		var elem = this;
		var formData = new FormData(this);
		var email = formData.get('email');
		var name =  formData.get('name');
		var text =  formData.get('text');

		if(formData.get('name')){

			if(formData.get('uploadimage')){
				if(!formData.get('uploadimage').type.match(/(.png)|(.jpeg)|(.jpg)|(.gif)$/i))  {
					alert('НЕ тот формат. Картинка дожна быть : JPG, GIF, PNG');
					return false;
				}
			}

			if(email != 0)
			{
				if(isValidEmailAddress(email))
				{
					$.ajax({
						type: "POST",
						url: "action/upload.php",
						data:  formData,
						processData: false,
						contentType: false,
						success: function(data)
						{
							if(data=='true')
							{
								$('#form')[0].reset();
								$('#alert-success-msg').show();
								setTimeout(function(){
									$('#alert-success-msg').hide();
								}, 5000);
							}
							else{
								alert(data);
							}
						}
					});
				}
				else{
					alert('Заполните корректно email');
				}
			}
		}
		return false;
	});


	//Вход В админку---------------------------------------
	$('#signinBtn').on('click', function(){
		var admin = $("#admin").val();
		var passwd = $("#password1").val();
		if(admin != 0 && passwd != 0)
		{
			var params =
			{
				'admin' : admin,
				'passwd' : passwd ,
			};
			$.ajax({
				url : 'admin/logIn' ,
				method : 'POST' ,
				data : {
					params : params,
				},
			}).done(function( msg ) {
				if(msg=="true") {
					showCom(1);
					//getPage();
					$('#form2')[0].reset();
					$(".modal").modal("hide");
					$('#alert-success').html('Успешный вход!');
					$("#alert-success").show();
					setTimeout(function(){
						$('#alert-success').hide();
					}, 5000);
					$("#logOut").show();
					$("#login").hide();
					$('.res a').show();
					$('#signinBtn').hide();
				}
				else{
					$('#alert-danger').html(msg);
					$("#alert-danger").show();
					setTimeout(function(){
						$('#alert-danger').hide();
					}, 5000);
				}
			});
		}
		else{
			alert('Заполните логин и пароль');
		}
		return false;
	});


	//Выход из админки--------------

	$('#logOut').on('click', function(){
		$.ajax({
			url : 'admin/logOut' ,
			method : 'POST' ,

			success : function(data){

				showCom(1);
				//	getPage();
				$('.alert').hide();
				$('.res a').hide();
				$("#logOut").hide();
				$("#login").show();
				$('#signinBtn').show();
			},
			error : function(data){

				alert("ошибка");
			}
		});
	});

	//Измениние комментария--------------------------------



	//Форма для Входа в админку-------------------------

	$('#login').on('click', ()=> {
		$('#form2').show();
		$('#signInFormButton').show();
		$('#formChange').hide();
		$('#formChangeButton').hide();
	});
});

//вывести все комментарии--------------------------------

function showCom(page){
	//	console.log('sdsd ' + page);
	// var sort = $('select').val();
	// console.log('sdsd '+sort);
	$.ajax({
		url : 'index/irsad' ,
		method : 'POST' ,
		data : {
			page : page,
		},
		success : function(comments){
			$("#content").html(comments);
		},
		error : function(){
			alert("ошибка");
		}
	});
}



//Форма для изменения комментарий ------------------------------------------------



//Пропустить комментарий ------------------------------------------------

function accessElement(id){
	$.ajax({
		url : 'action/admin.php' ,
		method : 'POST' ,
		data : {
			action : 'access',
			id : id,
		},
		success : function(comments){
			$('#comment'+id).removeClass('deleteElement');
			$('#return'+id).hide();
			$('#delete'+id).show();

		},
		error : function(comments){
			alert("ошибка");
		}
	});
}

//Пагинация страниц комментарий ------------------------------------------------------

function pagination(page=1){
	console.log('pagination');
	$.ajax({
		url : 'index/pagination' ,
		method : 'POST' ,
		data : {
			page :page,
		},
		success : function(comments){
			//alert(comments);
			// alert( "Значение: " + comments['responseText'] );
			$(".pagination").html(comments);
		},
		error : function(comments){
			alert(comments);
		}
	});
	showCom(page);
	//	showCom(page);
}

function isLogged (){
	$.ajax({
		url : 'admin/isLog' ,
		method : 'POST' ,
		data : {
			action : 'isLogged',
		},
	}).done(function( msg ) {
		if(msg=="true"){
			$("#logOut").show();
			$("#login").hide();
			$('.res a').show();
		}
		else{
			$("#logOut").hide();
			$("#login").show();
			$('.res a').hide();
		}
	})
}

function getPage() {
	$.ajax({
		url : 'index/getPage',
		method : 'GET' ,
		success : function(comments){
			//comments=JSON.parse(comments);
			pagination(comments);
			//			console.log(comments);
		},
		error : function(comments){
			//	alert(comments);
			alert( "Значение: " + comments['responseText'] );
			console.log(comments);
		}
	});
}

//Влидация email ---------------------------------------------------------

function isValidEmailAddress(emailAddress) {
	var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
	return pattern.test(emailAddress);
}
