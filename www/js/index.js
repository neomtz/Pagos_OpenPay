$(document).ready(function(){
    $("#contrasena").keypress(function(e) {
        //no recuerdo la fuente pero lo recomiendan para
        //mayor compatibilidad entre navegadores.
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
            getAcceder();
        }
    });
    // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //   // true for mobile device
    //   $("#apkCemex").show();
    //   $("#formCemex").hide();
    //   $("#content-login").css('background-color', 'white');
    //   $("#content-login").css('height', '50%');
    //   // document.write("mobile device");
    // }else{
    //
    // }
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      $("#apkCemex").show();
      $("#formCemex").hide();
      $("#content-login").css('background-color', 'white');
      $("#content-login").css('height', '50%');
    }else {
      console.log('jdg');
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      $("#iosCemex").show();
      $("#formCemex").hide();
      $("#content-login").css('background-color', 'white');
      $("#content-login").css('height', '50%');
    }
});
function getAcceder()
{
  let token = "0a4be21bc623b80bfb893171a2f7b63f65406301c309d5888c6d2d5e391ffa3f5c15e617";

  let usuario = $("#usuario").val();
  let contrasena = $("#contrasena").val();

  if (usuario!="" && contrasena!="") {
    $("#acceder").text(' Accediendo...').css('color', 'white');
    $("#acceder").prepend('<i class="fas fa-spinner fa-spin"></i>')
    $.ajax(
  {
      type: "POST",
      dataType:"JSON",
      // url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=login",
      url: "https://api-dev.cemexgo.com/v6/secm/ph/oauth/token",
      data:{ "grant_type": 'password', "username":usuario, "password":contrasena},
      responseType:'json',
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded', 'Ocp-Apim-Subscription-Key': 'e7a16bc768f34fed819c5919878e5714','Cache-Control': 'no-cache' },
      beforeSend: function(event)
      {
      },
      success: function(server)
      {
        // console.log(server.access_token);
        if (server.access_token != '') {
          // var percent = 0;
          //  timerId = setInterval(function() {
          //      //increment progress bar
          //      percent += 5;
          //      // $('.progress-bar').css('width', percent+'%');
          //      $('.progress-bar').attr('aria-valuenow', percent);
          //      $('.progress-bar').attr('value', percent);
          //      $('.progress-bar').text(percent+'%');
          //
          //      //complete
          //      if (percent == 100) {
          //          clearInterval(timerId);
          //          $('.information').show();
          //      }
          //
          //  }, 1000);

          sessionStorage.setItem('idSocio', usuario);
          sessionStorage.setItem('Token', server.access_token);
          sessionStorage.setItem('token_type', server.token_type);
          sessionStorage.setItem('expires_in', server.expires_in);
          window.location.href="Inicio.html";

        }else {
          // Swal.fire({
          //   title: 'Error',
          //   text: 'El nombre de usuario o la contraseña son incorrectos.',
          //   imageAlt: 'Custom image',
          //   icon: 'error',
          //   confirmButtonText: 'Intentar de nuevo',
          // })
          // $(".swal2-confirm").click(function(event) {
          //   $("#usuario").val('');
          //   $("#contrasena").val('');
          // });
        }

      },
      error: function(e)
      {
        Swal.fire({
          title: 'Error',
          text: 'El nombre de usuario o la contraseña son incorrectos.',
          imageAlt: 'Custom image',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
        })
        $(".swal2-confirm").click(function(event) {
          $("#usuario").val('');
          $("#contrasena").val('');
          $("#acceder").text(' Iniciar sesión').css('color', 'white');
          $("#acceder").prepend('<i class="icon-unlock2"></i>')
        });
        console.log(e);
      }
   });
  } else {
    Swal.fire({
     icon: 'error',
     title: 'Error',
     text: 'Llena todos los campos por favor!',
     // footer: '<a href="">Why do I have this issue?</a>'
    })
  }
}
function mostrarPassword(){
		var cambio = document.getElementById("contrasena");
		if(cambio.type == "password"){
			cambio.type = "text";
			$('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
		}else{
			cambio.type = "password";
			$('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
		}
	}
