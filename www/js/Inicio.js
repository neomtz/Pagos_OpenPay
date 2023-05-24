let APItoken = "0a4be21bc623b80bfb893171a2f7b63f65406301c309d5888c6d2d5e391ffa3f5c15e617";
var mesesNom = new Array ("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");

$( document ).ready(function() {
  if (sessionStorage.getItem("idUsuario") == null) {
    window.location.href="index.html";
  }
  getProyectos();
});
nombreUsuario();
const showLoading = function() {
  swal.fire({
    title: 'Estamos cargando tu información',
    text: 'Espere por favor',
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    // timer: 2000,
    onOpen: () => {
      swal.showLoading();
    }
  }).then(
    () => {},
    (dismiss) => {
      if (dismiss === 'timer') {
        console.log('closed by timer!!!!');
        swal({
          title: 'Finished!',
          type: 'success',
          timer: 2000,
          showConfirmButton: false
        })
      }
    }
  )
};
function getProyectos() {
  // showLoading();
  $.LoadingOverlay("show", {
    text : "Espere un momento por favor"
  });

    $.ajax(
   {
     type: "POST",
     dataType: "JSON",
     url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=obras",
     data:{ "source":sessionStorage.getItem("Token"), "source1":sessionStorage.getItem("idUsuario")},
     beforeSend: function (event) {
     },
     success: function (server) {
       // console.log(server.estatus);
       // if (server.estatus == "error") {
       //   window.location.href="index.html";
       // }
       // if (server.length > 0) {

         $.each(server.obras.projects, function(a,b) {
           sessionStorage.setItem("idObra", server.obras.partnerID);
           sessionStorage.setItem("nombreUsuario", server.fullName);
             // if (c < 2) {
             var fecha = new Date(b.startDate);
             var fecha1 = new Date(b.finishDate);

             let fecha1nicio = {
               dia : fecha.getDate(),
               mes : mesesNom[fecha.getMonth()],
               year : fecha.getFullYear()
             }

             let fechaFinal = {
               dia : fecha1.getDate(),
               mes : mesesNom[fecha1.getMonth()],
               year : fecha1.getFullYear()
             }

               var fechaI = ('0' + fecha1nicio.dia).slice(-2) + '-' + fecha1nicio.mes + '-' + fecha1nicio.year;

               var fechaF = ('0' + fechaFinal.dia).slice(-2) + '-' + fechaFinal.mes + '-' + fechaFinal.year;
               // console.log(fechaF);

               $("#contenedorElementos").append('<div class="card-body letra" style="font-size:12px;border-top: 1px solid rgba(0,0,0,.125);"><div class="container"><div class="row mt-1"><div class="col-xl-5 col-lg-5 col-md-5 col-xs-12 bordeproyec"><div class=""><p class="mb-0 textColor">Producto</p><p class="mb-1">'+b.product+'</p></div><div class="bordepro"><p class="mb-0 textColor">Monto</p><p class="mb-0">$'+b.maximumQuota+'</p></div><div class=""><p class="mb-0 textColor">Duración</p><p class="mb-1">'+fechaI+' a '+fechaF+'</p></div></div><div class="col-xl-7 col-lg-7 col-md-7 col-xs-12" style="padding-left: 0px;"><div class="container"><div><p class="mb-0 textColor">Semanas</p></div><div class="row"><div class="col-xl-7 col-lg-6 col-md-12 col-xs-12"><div class="list-group"><li class="list-group-item" style="border:none;padding:0px;"><span class="float-xs-right">'+b.totalWeeks+'</span>Totales</li></div><div class="list-group"><li class="list-group-item" style="border:none;padding:0px;"><span class="float-xs-right">'+b.paidWeeks+'</span>Pagadas</li></div><div class="list-group"><li class="list-group-item" style="border:none;padding:0px;"><span class="float-xs-right">'+b.remainingWeeks+'</span>Restantes</li></div><div class="list-group"><li class="list-group-item" style="border:none;padding:0px;"><span class="float-xs-right">'+b.weeksDiscounted+'</span>Con descuento</li></div><div class="list-group mt-1"><li class="list-group-item textColor" style="border:none;padding:0px;color:#787477!important"><span class="float-xs-right">'+b.fines+'</span>Multas</li></div></div><div class="col-xl-5 col-lg-6 col-md-12 col-xs-12"><div class="form-group"><div class="btn-group-vertical ml-3" role="group" aria-label="Vertical button group"><a href="Proyectos.html"><button class="btn btn-proyec btn-warning" type="button" name="button"><i class="fas fa-chevron-right"></i>  </button></a></div></div></div></div></div></div></div></div></div>')

             // }

         });
       // }
       getNoticias();
     },
     error: function (e) {

     }
   });
}
function getNoticias() {

    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     url: "https://jarbossdev.com/webapi.PatrimonioHoy/api/Posts/GetAllPosts",
     // data:{ },
     beforeSend: function (event) {
     },
     success: function (server) {
       if (server.length > 0) {
         $.each(server, function(a,b) {
           if (b.sectionDescription == "Noticias") {
             $("#contenedorNoticias").append('<li class="list-group-item pb-0"><h6 class="negrita" style="font-size:14px" >'+b.postName+'</h6><p style="font-size:12px">'+b.description+'</p> </li>');
           }

         });
         // $("#contenedorNoticias").append('<li class="list-group-item pb-0" style="height:110px;"></li>')
       }
       // swal.close();
       $.LoadingOverlay("hide");
     },
     error: function (e) {

     }
   });
   getNotificaciones();
}
function getNotificaciones() {

    $.ajax(
   {
     type: "POST",
     dataType: "JSON",
     url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=getnotificaciones",
     data:{ 'source':sessionStorage.getItem("Token"), 'source1':sessionStorage.getItem("idUsuario") },
     beforeSend: function (event) {
     },
     success: function (server) {
       var total = 0;
        $.each(server.notificaciones, function(a,b) {
          $("#contenedorNotificaciones").append('<li class="list-group-item pb-0"><h6 class="negrita" style="font-size:14px" >'+b.title+'</h6><p class="justificado" style="font-size:12px">'+b.message+'</p> </li>');

          $("#navNotificaiones").append('<a href="javascript:void(0)" class="list-group-item"><div class="media"><div class="media-body"><h6 class="media-heading">'+b.title+'</h6><p class="notification-text font-small-3 text-muted">'+b.message+'</p><small><time datetime="2015-06-11T18:29:20+08:00" class="media-meta text-muted"></time></small></div></div></a>');
          total++
          // setNotificacion(b.message,b.project,b.title);
        });
        // console.log(total);
        // $("#totalNot").append(total+' nuevos')
        $("#numeroNot").append(total)

       // $.LoadingOverlay("hide");
     },
     error: function (e) {

     }
   });
}

function setNotificacion(mensaje,proyecto,titulo)
{
  // console.log(mensaje+'**'+proyecto+'**'+titulo);
  // return 0;
  $.ajax(
  {
    type: "POST",
    dataType:"JSON",
    url: "./POST/?source1=patrimoniohoy&source2=setnotificaciones",
    data:{ "source1":sessionStorage.getItem("idUsuario"), "source2":mensaje, "source3":proyecto,"source4":titulo },
    beforeSend: function(event)
    {
    },
    success: function(server)
    {
      console.log(server);
    },
    error: function(e)
    {
      console.log(e);
    }
  });

}
function salir() {
  Swal.fire({
  // title: '¿Seguro que desea cerrar sesión?',
  text: "¿Seguro que desea cerrar sesión?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: "Cancelar",
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
function nombreUsuario() {
  $("#socio").append(sessionStorage.getItem("idUsuario"));
  // $("#nombre").append(sessionStorage.getItem("nombreUsuario"));
}
