var token = "0a4be21bc623b80bfb893171a2f7b63f65406301c309d5888c6d2d5e391ffa3f5c15e617";
var APItoken = sessionStorage.getItem("token_type")+' '+ sessionStorage.getItem("Token");

$( document ).ready(function() {
  if (sessionStorage.getItem("idSocio") == null) {
    window.location.href="index.html";
  }
  getNoticias();
  $("#nombre_login").append(sessionStorage.getItem('nombreLogin'));
  $(".dropdown-user-link").attr('title', sessionStorage.getItem('tituloLogin'));
});

function getNoticias() {
  $.LoadingOverlay("show", {
    text : "Espere un momento por favor"
  });
    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     url: "https://jarbossdev.com/webapi.PatrimonioHoy/api/Posts/GetAllPosts",
     headers: { 'Cache-Control': 'no-cache' },
     beforeSend: function (event) {
     },
     success: function (server) {
       var contador = 0
       if (server.length > 0) {

         // console.log(server);
         $.each(server, function(a,b) {
           if (b.sectionId == 1) {
             $("#source1").append('<li style="cursor:pointer" onclick="getNoticias1(\''+b.postId+'\')" type="button" value="'+b.postId+'" class="list-group-item pb-0" data-toggle="modal" data-target="#defaultSize"><h6 class="letra" style="font-size:14px" >'+b.postName+'</h6><p style="font-size:12px">'+b.description+'</p> </li>');

           }else {
             contador++
             $("#pasos").append('<li class="list-group-item pb-0"><div class="d-flex justify-content-between align-item-center"><span class="tag mt-1 tag tag-primary tag-pill float-xs-left">'+contador+'</span><span class="ml-1 letra" style="font-size:14px" >'+b.postName+'</span><div class="ml-2" style="margin-left: 36px!important;"><p class="justificado" style="font-size:12px">'+b.description+'</p></div></div></li>');
           }

         });
         // $("#source1").append('<li class="list-group-item pb-0" style="height:110px;"></li>')
       }else {
         $("#source1").append('<li class="list-group-item text-md-center pb-0"><h6 class="letra" style="font-size:14px" >Sin contenido</h6></li>');
       }
       getPasos();
     },
     error: function (e) {

     }
   });
}
function getNoticias1(id) {
  $("#tituloNot,#contenidoNot").empty();
    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     url: "https://jarbossdev.com/webapi.PatrimonioHoy/api/Posts/GetAllPosts",
     headers: { 'Cache-Control': 'no-cache' },
     beforeSend: function (event) {
     },
     success: function (server) {

       if (server.length > 0) {
         // console.log(server);
         $.each(server, function(a,b) {
           if (b.sectionDescription == "Noticias") {
             if (id == b.postId) {
               $("#tituloNot").append(b.postName);
               $("#contenidoNot").append(b.description);
             }
           }

         });
       }
     },
     error: function (e) {

     }
   });
}

function getPasos() {

    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     url: "https://www.jarbossdev.com/webapi.PatrimonioHoy/api/Steps/GetAllSteps",
     headers: { 'Cache-Control': 'no-cache' },
     beforeSend: function (event) {
     },
     success: function (server) {

       if (server.length > 0) {
         // console.log(server);

         $.each(server, function(a,b) {
           // $("#pasos").append('<li class="list-group-item pb-0"><div class="d-flex justify-content-between align-item-center"><span class="tag mt-1 tag tag-primary tag-pill float-xs-left">'+b.stepId+'</span><span class="ml-1 letra" style="font-size:14px" >'+b.stepName+'</span><div class="ml-2" style="margin-left: 36px!important;"><p class="justificado" style="font-size:12px">'+b.description+'</p></div></div></li>');


         });
         // $("#pasos").append('<li class="list-group-item pb-0" style="height:110px;">')
       }else {
         $("#pasos").append('<li class="list-group-item text-md-center pb-0"><h6 class="letra" style="font-size:14px" >Sin contenido</h6></li>');
       }

     },
     error: function (e) {

     }
   });
   getNotificaciones();
}
function getNotificaciones() {
  var id = sessionStorage.getItem("projectId")
    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     // url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=getnotificaciones",
     url: "https://api-dev.cemexgo.com/v1/pjm/ph/projects/"+id+"/notifications",
     headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': APItoken, 'Ocp-Apim-Subscription-Key': 'e7a16bc768f34fed819c5919878e5714','Cache-Control': 'no-cache' },
     // data:{ 'source':sessionStorage.getItem("Token"), 'source1':sessionStorage.getItem("idUsuario") },
     beforeSend: function (event) {
     },
     success: function (server) {
       if (server != '') {
         var total = 0;
          $.each(server, function(a,b) {
            $("#contenedorNotificaciones").append('<li class="list-group-item pb-0"><p class="justificado" style="font-size:12px">'+b.Message+'</p> </li>');

            $("#navNotificaiones").append('<a href="javascript:void(0)" class="list-group-item"><div class="media"><div class="media-body"><p class="notification-text font-small-3 text-muted">'+b.Message+'</p><small><time datetime="2015-06-11T18:29:20+08:00" class="media-meta text-muted"></time></small></div></div></a>');
            total++
          });
          // $("#totalNot").append(total+' nuevos')
          $("#numeroNot").append(total)
       }else {
         $("#contenedorNotificaciones").append('<li class="list-group-item text-md-center pb-0"><h6 class="letra" style="font-size:14px" >Sin contenido</h6></li>');
       }

       $.LoadingOverlay("hide");
     },
     error: function (e) {

     }
   });
}
function getContacto() {

    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     url: "https://www.jarbossdev.com/webapi.PatrimonioHoy/api/Support/GetSupport",
     // data:{ },
     beforeSend: function (event) {
     },
     success: function (server) {

       if (server.length > 0) {
         // console.log(server);

       }
     },
     error: function (e) {

     }
   });
}
function nombreUsuario() {
  $("#socio").append(sessionStorage.getItem("idUsuario"))
}
function salir() {
  Swal.fire({
  // title: '¿Seguro que desea cerrar sesión?',
  text: "¿Seguro que desea cerrar sesión?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Salir'
}).then((result) => {
  if (result.isConfirmed) {
    sessionStorage.clear();
   window.location.href="index.html";
    Swal.fire(
      'Sesión finalizada',
      'Adios.',
      'success'
    )
  }
})
}
function grupoNoticias() {
  $("#collapse2").show();
  $("#collapse").remove("onclick", 'grupoNoticias()').attr("onclick", 'ocultarNoticias()');
}
function ocultarNoticias() {
  $("#collapse2").hide();
  $("#collapse").remove("onclick", 'ocultarNoticias()').attr("onclick", 'grupoNoticias()');
}
