// var APItoken = "0a4be21bc623b80bfb893171a2f7b63f65406301c309d5888c6d2d5e391ffa3f5c15e617";
var APItoken = sessionStorage.getItem("token_type")+' '+ sessionStorage.getItem("Token");
var idSocio = sessionStorage.getItem("idSocio")
var mesesNom = new Array ("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");

$( document ).ready(function() {
  if (sessionStorage.getItem("idSocio") == null) {
    window.location.href="index.html";
  }
  $("#regresar").hide();
  getProyectos();
});
function getProyectos() {
  $.LoadingOverlay("show", {
    text : "Espere un momento por favor"
  });
    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     // url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=obras",
     url: "https://api-dev.cemexgo.com/v1/pjm/ph/partners/"+idSocio+"/projects",
     headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': APItoken, 'Ocp-Apim-Subscription-Key': 'e7a16bc768f34fed819c5919878e5714','Cache-Control': 'no-cache' },
     // data:{ "source":sessionStorage.getItem("Token"), "source1":sessionStorage.getItem("idUsuario")},
     beforeSend: function (event) {
     },
     success: function (server) {
       var nombre = server.fullName;
       nombre = nombre.split(" ");
       var nombre_usu = nombre[0];
       var apellido = nombre[1];
       $(".dropdown-user-link").attr('title', nombre_usu+' '+apellido);
       sessionStorage.setItem('tituloLogin', nombre_usu+' '+apellido);
       nombre_usu = nombre_usu.substring(0,1);
       apellido = apellido.substring(0,1);
       $("#nombre_login").append(nombre_usu+apellido);
       sessionStorage.setItem('nombreLogin', nombre_usu+apellido);
       // if (server.length > 0) {
         $.each(server.projects, function(a,b) {
             // sessionStorage.setItem("idObra", d.idObra);
             sessionStorage.setItem("projectId", b.projectId);
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

            $("#contenedorElementos").append('<div class="card-body letra" style="font-size:12px;border-top: 1px solid rgba(0,0,0,.125);"><div class="container"><div class="row mt-1"><div class="col-xl-6 col-lg-6 col-md-12 col-xs-12 bordeproyec"><div class="text-minuscula"><p class="mb-0 textColor">Producto</p><p class="mb-1">'+b.product+'</p></div><div class="bordepro"><p class="mb-0 textColor">Monto</p><p class="mb-0">$'+b.maximumQuota+'</p></div><div class=""><p class="mb-0 textColor">Duración</p><p class="mb-1">'+fechaI+' a '+fechaF+'</p></div></div><div class="col-xl-6 col-lg-6 col-md-12 col-xs-12" style="padding-left: 0px;"><div class="container"><div><p class="mb-0 textColor">Semanas</p></div><div class="row"><div class="col-xl-8 col-lg-8 col-md-12 col-xs-12"><div class="list-group"><li class="list-group-item" style="border:none;padding:0px;"><span class="float-xs-right">'+b.totalWeeks+'</span>Totales</li></div><div class="list-group"><li class="list-group-item" style="border:none;padding:0px;"><span class="float-xs-right">'+b.paidWeeks+'</span>Pagadas</li></div><div class="list-group"><li class="list-group-item" style="border:none;padding:0px;"><span class="float-xs-right">'+b.remainingWeeks+'</span>Restantes</li></div><div class="list-group"><li class="list-group-item" style="border:none;padding:0px;"><span class="float-xs-right">'+b.weeksDiscounted+'</span>Con descuento</li></div><div class="list-group mt-1"><li class="list-group-item textColor" style="border:none;padding:0px;color:#787477!important"><span class="float-xs-right">'+b.fines+'</span>Multas</li></div></div><div class="col-xl-4 col-lg-4 col-md-12 col-xs-12"><div class="form-group"><div class="btn-group-vertical ml-1" role="group" aria-label="Vertical button group"><button id="btn'+b.projectId+'" onclick="getProyectos1(\''+b.projectId+'\')" class="btn btn-proyec btn-warning" type="button" name="button"><i class="fas icon-proyec fa-chevron-right"></i> </button></div></div></div></div></div></div></div></div></div>');

            $("#btn"+b.projectId+"").click(function(event) {
              sessionStorage.setItem("idProyecto", b.projectId);
            });
            $("#codigoBarra").val(b.projectId)

         });
       // }

     },
     error: function (e) {

     }
   });
   getNoticias();
}
function getProyectos1(id) {
  var enlace = document.querySelector('.cambiar');
  enlace.textContent = "Proyectos       ";
  $("#duracion").empty();
  $("#proyecto").empty();
  $("#source10").empty();
  $("#source11").empty();
  $("#source12").empty();
  $("#source13").empty();
  $("#saldo_actual").empty();
  $("#saldo_semanal").empty();
  $("#saldo_pendiente").empty();
  $("#saldo_multas").empty();
  $("#total_multas").empty();
  $("#regresar").show();
  $("#contenedor_inicio").hide();
  // showLoading();
  $(".showProyec").show();
  $(".entregas").show();
  $(".ocultarProyec").show();
  $(".header").show();
  $(".contenedor_pagos").hide();
  $("#entregas").hide();
  $.LoadingOverlay("show", {
    text : "Espere un momento por favor"
  });
    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     url: "https://api-dev.cemexgo.com/v1/pjm/ph/partners/"+idSocio+"/projects",
     headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': APItoken, 'Ocp-Apim-Subscription-Key': 'e7a16bc768f34fed819c5919878e5714','Cache-Control': 'no-cache' },
     // data:{ "source":sessionStorage.getItem("Token"), "source1":sessionStorage.getItem("idUsuario")},
     beforeSend: function (event) {
     },
     success: function (server) {
       // console.log(server.obras);
       // if (server.length > 0) {
         $.each(server.projects, function(a,b) {
             if (id == b.projectId) {
               if (b.fines == 0) {
                 $(".content-multa").hide();
                 $("#content-saldo").removeClass('col-xl-3').attr('class', 'col-xl-4 col-lg-6 col-md-12 col-xs-12');
                 $("#content-semanal").removeClass('col-xl-3').attr('class', 'col-xl-4 col-lg-6 col-md-12 col-xs-12');
                 $("#content-otro").removeClass('col-xl-3').attr('class', 'col-xl-4 col-lg-6 col-md-12 col-xs-12');
               }
               else {
                 $(".content-multa").show();
                 $("#content-saldo").removeClass('col-xl-4').attr('class', 'col-xl-3 col-lg-6 col-md-12 col-xs-12');
                 $("#content-semanal").removeClass('col-xl-4').attr('class', 'col-xl-3 col-lg-6 col-md-12 col-xs-12');
                 $("#content-otro").removeClass('col-xl-4').attr('class', 'col-xl-3 col-lg-6 col-md-12 col-xs-12');
               }
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
               $("#duracion").append(''+fechaI+' a '+fechaF+'')
               $("#proyecto").append(b.product);
               $("#saldo_pendiente").append('$'+commaSeparateNumber(b.outstandingBalance)+'.00');
               $("#saldo_actual").append('$'+commaSeparateNumber(b.outstandingBalance)+'.00');
               $("#saldo_semanal").append('$'+commaSeparateNumber(b.maximumQuota)+'.00');
               $("#saldo_multas").append('$'+commaSeparateNumber(b.fines)+'.00');
               $("#cargo").val(b.outstandingBalance);
               $("#semanal").val(b.maximumQuota);

               $("#source10").append(b.totalWeeks);
               $("#source11").append(b.paidWeeks);
               $("#source12").append(b.remainingWeeks);
               $("#source13").append(b.weeksDiscounted);

               // SUMAS
               var semanal = parseInt(b.maximumQuota);
               var multas = parseInt(b.fines);
               var total = semanal + multas;

               $("#total_multas").append('$'+commaSeparateNumber(total)+'.00');
               $("#multa").val(total);
             }

         });
       // }
     },
     error: function (e) {

     }
   });
  getComprobantes(id)
}
function getEntregas() {
  var id = sessionStorage.getItem("idProyecto")
  $("#contenedorEntregas").empty();
  $("#totalEntregado").empty();
  $.LoadingOverlay("show", {
    text : "Espere un momento por favor"
  });
    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     // url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=entregas",
     url: "https://api-dev.cemexgo.com/v1/brm/ph/projects/"+id+"/deliveries",
     headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': APItoken, 'Ocp-Apim-Subscription-Key': 'e7a16bc768f34fed819c5919878e5714','Cache-Control': 'no-cache' },
     // data:{ "source":sessionStorage.getItem("Token"), "source1":id},
     success: function (server) {
       var total = 0;
       if (server.deliveries != '') {
         $.each(server.deliveries, function(a,b) {
           num = a+1;
           var fecha = new Date(b.date);
           let fechaEntrega = {
             dia : fecha.getDate(),
             mes : mesesNom[fecha.getMonth()],
             year : fecha.getFullYear()
           }
           var fechaE = ('0' + fechaEntrega.dia).slice(-2) + '-' + fechaEntrega.mes + '-' + fechaEntrega.year;

          $("#contenedorEntregas").append('<tr class="contenido text-center"><td class="col1">'+num+'</td><td class="col2">'+fechaE+'</td><td class="col3">'+'$'+b.totalAmount+'</td></tr>');
            var montoEntregado = parseFloat(b.totalAmount)
            total = total + montoEntregado;
         });
         $("#totalEntregado").append('$'+commaSeparateNumber(total));
       }else {
         $("#contenedorEntregas").append('<tr class="text-xs-center"><td colspan="3">Sin contenido</td></tr>');
         $("#totalEntregado").append('$0.00');
       }
      $.LoadingOverlay("hide");
     },
     error: function (e) {

     }
   });

}
function getComprobantes(id) {
  $("#contenedorComprobantes").empty();
    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     // url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=comprobantes",
     url: "https://api-dev.cemexgo.com/v1/brm/ph/projects/"+id+"/bills",
     headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': APItoken, 'Ocp-Apim-Subscription-Key': 'e7a16bc768f34fed819c5919878e5714','Cache-Control': 'no-cache' },
     // data:{ "source":sessionStorage.getItem("Token"), "source1":id},
     beforeSend: function (event) {
     },
     success: function (server) {
       if (server.bills != null) {
         $.each(server.bills, function(a,b) {
            var fecha = new Date(b.date);
            let fecha1nicio = {
              dia : fecha.getDate(),
              mes : mesesNom[fecha.getMonth()],
              year : fecha.getFullYear()
            }
            var fechaI = ('0' + fecha1nicio.dia).slice(-2) + '-' +fecha1nicio.mes + '-' + fecha1nicio.year;

            $("#contenedorComprobantes").append('<tr class="contenido"><td class="col1">'+b.method+'</td><td class="col2">'+fechaI+'</td><td class="col3">'+'$'+b.amount+'.00</td><td class="col4">'+b.folio+'</td></tr>');
         });
       }else {
         $("#contenedorComprobantes").append('<tr class="text-xs-center"><td colspan="4">Sin contenido</td></tr>');
       }
      $.LoadingOverlay("hide");
     },
     error: function (e) {

     }
   });
  // getPagos(id)
}
function getPagos(id) {

    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     // url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=pagos",
     url: "https://api-dev.cemexgo.com/v1/brm/ph/projects/"+id+"/payments",
     headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': APItoken, 'Ocp-Apim-Subscription-Key': 'e7a16bc768f34fed819c5919878e5714','Cache-Control': 'no-cache' },
     // data:{ "source":sessionStorage.getItem("Token"), "source1":id},
     beforeSend: function (event) {
     },
     success: function (server) {
       // console.log(server.obras);
       // if (server.length > 0) {
         $.each(server, function(a,b) {


         });
       // }
       // getCard();
     },
     error: function (e) {

     }
   });
}
function getCard() {

    $.ajax(
   {
     type: "POST",
     dataType: "JSON",
     url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=getcards",
     data:{ "source":sessionStorage.getItem("Token")},
     success: function (server) {
       if (server.length > 0) {
         $.each(server, function(a,b) {

         });
       }
     },
     error: function (e) {

     }
   });
}
// getCard()
function setCard() {
  var numeroTarjeta = $("#source1").val();
  var nombre = $("#source2").val();
  var apellidos = $("#apellidos").val();
  nombre1 = nombre +' '+ apellidos;
  var telefono = $("#telefono").val();
  var correo = $("#correo").val();
  var fechaExpFin = $("#source3").val();
  var fechaExpInicio = $("#source4").val();
  var ccv = $("#source5").val();
  // console.log(numeroTarjeta);
  if (numeroTarjeta !='' && nombre !='' && apellidos !='' && telefono !='' && correo !='' && fechaExpFin !='' && fechaExpInicio !='' && ccv !='') {
    $.LoadingOverlay("show", {
      text : "Espere un momento por favor"
    });
    $.ajax(
   {
     type: "POST",
     dataType: "JSON",
     url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=setcard",
     data:{"source1":numeroTarjeta, "source2":nombre1, "source3":fechaExpInicio, "source4":fechaExpFin, "source5": ccv, "source":sessionStorage.getItem("Token")},
     success: function (server) {
       if (server.http_code == '415' || server.http_code == '400' || server.http_code == '402' || server.http_code == '422') {
         Swal.fire(
           'Error',
           'No se pudo agregar la tarjeta.',
           'error',
         )
       }else {
         Swal.fire(
           'Proceso completado',
           'Tarjeta agregada correctamente.',
           'success',
         );

       }

       if (server.id) {
         setTarjeta(server.id,server.card_number,nombre,apellidos,telefono,correo,fechaExpInicio,fechaExpFin);
         $("#card1").hide();
         $("#source2").val('');
         $("#apellidos").val('');
         $("#source1").val('');
         $("#telefono").val('');
         $("#correo").val('');
         $("#source3").val('');
         $("#source4").val('');
         $("#source5").val('');
         mostrarTarjeta();
       }
       $.LoadingOverlay("hide");
     },
     error: function (e) {

     }
   });
 }else {
   Swal.fire(
     'Error',
     'Favor de llenar todos los campos!',
     'error',
   )
 }
}
$(".download").click(function() {
              html2canvas($(".divpng"), {
                  onrendered: function(canvas) {
                      theCanvas = canvas;
                      document.body.appendChild(canvas);
                      canvas.toBlob(function(blob) {
                        saveAs(blob, "CodigoOxxo.png");
                      });
                  }
              });
          });
function getCodigoOxxo() {
  var id = sessionStorage.getItem("idProyecto");
  var cargo = $("#cargo").val();
  var tipo_cargo = $( "#tipo_cargo" ).is( ":checked" );
  var tipo_semanal = $( "#tipo_semanal" ).is( ":checked" );
  var tipo_multa = $( "#tipo_multa" ).is( ":checked" );
  var tipo_otro = $( "#tipo_otro" ).is( ":checked" );

  if (tipo_cargo == true) {
    cargo = $("#cargo").val();
  }
  if (tipo_semanal == true) {
    cargo = $("#semanal").val();
  }
  if (tipo_multa == true) {
    cargo = $("#multa").val();
    // console.log(cargo);
  }
  if (tipo_otro == true) {
    cargo = $("#otro").val();
  }

    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     // url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=codigooxxo",
     url: "https://api-dev.cemexgo.com/v1/pjm/ph/projects/"+id+"/barcode/"+cargo+"",
      headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': APItoken, 'Ocp-Apim-Subscription-Key': 'e7a16bc768f34fed819c5919878e5714','Cache-Control': 'no-cache' },
     // data:{ "source":sessionStorage.getItem("Token"), "source1": id, "source2":cargo},
     success: function (server) {
       console.log(server);
       // if (server.length > 0) {
         // console.log(server.pagos);
         if (server != '') {
           JsBarcode("#codigo", server.barCode);
           JsBarcode("#codigo1", server.barCode);
           $("#PagoOxxo").show();
           var link = document.getElementById("codigo").getAttribute('src');
           if (typeof link === 'string') {
           }else {
             Swal.fire(
               'Error',
               'Ocurrió un error al momento de querer generar el código',
               'error',
             )
           }
         }else {
           Swal.fire(
             'Error',
             'No se pudo generar el código',
             'error',
           )
         }

       // }
     },
     error: function (e) {

     }
   });
}
$(".closeModal").on('click', function(event) {
  $("#PagoOxxo").hide();
});
$(".pagoBanamex").on('click', function(event) {
  $("#PagoBanamex").hide();
});
$(".modalSantander").on('click', function(event) {
  $("#modalSantander").hide();
});
function nombreUsuario() {
  $("#socio").append(sessionStorage.getItem("idSocio"))
}
function mostrarTarjeta() {
  $("#card").show();
  $(".footer").hide();
  $(".btnCard").remove("onclick", 'mostrarTarjeta()').attr("onclick", 'ocultarTargeta()');
}
function ocultarTargeta() {
  $("#card").hide();
  $(".footer").show();
  $(".btnCard").remove("onclick", 'ocultarTargeta()').attr("onclick", 'mostrarTarjeta()');
}
function pagoVentanilla() {
  $("#ventanilla").show();
  $(".footer").hide();
  $(".btnVentanilla").remove("onclick", 'pagoVentanilla()').attr("onclick", 'ocultarIconos()');
}
function pagoSantander() {
  $("#ventanilla1").show();
  $(".btnSantander").remove("onclick", 'pagoSantander()').attr("onclick", 'ocultarSantander()');
}
function ocultarSantander() {
  $("#ventanilla1").hide();
  $(".btnSantander").remove("onclick", 'ocultarSantander()').attr("onclick", 'pagoSantander()');
}
function santanderBanamex() {
  $("#santanderBanamex").show();
  $(".santanderBanamex").remove("onclick", 'santanderBanamex()').attr("onclick", 'ocultarsantanderBanamex()');
}
function ocultarsantanderBanamex() {
  $("#santanderBanamex").hide();
  $(".santanderBanamex").remove("onclick", 'ocultarsantanderBanamex()').attr("onclick", 'santanderBanamex()');
}
function registroTarjeta() {
  $("#card1").show();
  $("#card").hide();
  // $("#btnCard").attr('disabled', 'disabled');

}
function ocultarIconos() {
  $("#ventanilla").hide();
  $(".footer").show();
  $(".btnVentanilla").remove("onclick", 'ocultarIconos()').attr("onclick", 'pagoVentanilla()');
}

function setPagar() {
  var idTarjeta = $("#idTarjeta").val();
  if (sessionStorage.getItem('idcard') != null) {
    idTarjeta = sessionStorage.getItem('idcard');
  }

  var cargo = $("#cargo").val();
  var tipo_cargo = $( "#tipo_cargo" ).is( ":checked" );
  var tipo_semanal = $( "#tipo_semanal" ).is( ":checked" );
  var tipo_multa = $( "#tipo_multa" ).is( ":checked" );
  var tipo_otro = $( "#tipo_otro" ).is( ":checked" );

  if (tipo_cargo == true) {
    cargo = $("#cargo").val();
  }
  if (tipo_semanal == true) {
    cargo = $("#semanal").val();
  }
  if (tipo_multa == true) {
    cargo = $("#multa").val();
    // console.log(cargo);
  }
  if (tipo_otro == true) {
    cargo = $("#otro").val();
  }

  var nombreUsu = $("#nombreSocio").val();
  if (sessionStorage.getItem('nombreTarjeta') != null) {
    nombreUsu = sessionStorage.getItem('nombreTarjeta');
  }

  var apellido = $("#apellido").val();
  if (sessionStorage.getItem('apellidoTarjeta') != null) {
    apellido = sessionStorage.getItem('apellidoTarjeta');
  }

  var telefono = $("#numTelefono").val();
  if (sessionStorage.getItem('telefonoTarjeta') != null) {
    telefono = sessionStorage.getItem('telefonoTarjeta');
  }

  var correo = $("#correoUsu").val();
  if (sessionStorage.getItem('correoTarjeta') != null) {
    correo = sessionStorage.getItem('correoTarjeta');
  }

  if (idTarjeta != undefined) {
    $.LoadingOverlay("show", {
      text : "Espere un momento por favor"
    });

    $.ajax(
   {
     type: "POST",
     dataType: "JSON",
     url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=setcharge",
     data:{"source1":idTarjeta, "source2":cargo, "source3":nombreUsu, "source4":apellido, "source5": telefono, "source6": correo, "source":sessionStorage.getItem("Token")},
     success: function (server) {
       if (server.id) {
        alertify.confirm('<p style="color: #00205B;">Se procesará el pago en otra pestaña. Es una página segura del banco de tu elección.</p>','', function(){
            ValidURL(server.payment_method.url);

       },function(){ alertify.set('notifier','position', 'top-center');alertify.error('No se ha hecho ningún cambio. ')}).set('labels', {ok:'Continuar', cancel:'Cancelar'});

       }else {
         Swal.fire(
           'Error',
           'No se pudo realizar el pago',
           'error',
          )
       }

       if (server.id) {
         setConfirmarPago(server.id,server.amount);
         setTransaccion(server.card.id,server.id,server.order_id);
       }
      $.LoadingOverlay("hide");
     },
     error: function (e) {

     }
   });
 }else {
   Swal.fire(
     'Error',
     'Asegurese de tener una tarjeta registrada',
     'error',
    )
 }
}
function ValidURL(str) {
  var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(str)) {
    Swal.fire(
      'Error',
      'Acceso denegado',
      'error',
     )
    return false;
  } else {
    // return true;
    window.open(str);
  }
}
function setConfirmarPago(id,monto) {

    $.ajax(
   {
     type: "POST",
     dataType: "JSON",
     url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=setchargeconfirm",
     data:{ "source1":id, "source2":monto, "source":sessionStorage.getItem("Token")},
     success: function (server) {
       // if (server.length > 0) {
       console.log(server);


       // }
     },
     error: function (e) {

     }
   });
}
function setTarjeta(idopenpay,cardNumber,nombre,apellidos,telefono,correo,aExpiracion,mesExpiracion)
{
  // console.log(idopenpay+'**'+numeroTarjeta+'**'+nombre+'**'+apellidos+'**'+telefono+'**'+correo);
  // return 0;
  $.ajax(
  {
    type: "POST",
    dataType:"JSON",
    url: "./POST/?source1=patrimoniohoy&source2=settarjeta",
    data:{ "source1":sessionStorage.getItem("idSocio"), "source2":idopenpay, "source3":cardNumber,"source4":nombre,"source5":apellidos, "source6":telefono, "source7":correo, "source8":aExpiracion, "source9":mesExpiracion },
    beforeSend: function(event)
    {
    },
    success: function(server)
    {
      // location.reload();
      getTarjeta();
    },
    error: function(e)
    {
      console.log(e);
    }
  });

}
function setTransaccion(idTarjeta,idOperacion,idTransaccion)
{
    $.ajax(
   {
      type: "POST",
      dataType:"JSON",
      url: "./POST/?source1=patrimoniohoy&source2=settransaccion",
      data:{ "source1":sessionStorage.getItem("idSocio"), "source2":idTarjeta, "source3":idOperacion, "source4":idTransaccion},
      beforeSend: function(event)
      {
      },
      success: function(server)
      {


      },
      error: function(e)
      {
       console.log(e);
      }
   });

}
function delCard(id,id1)
{
  Swal.fire({
 title: 'Seguro que quiere eliminar?',
 text: "Esta tarjeta será eliminada!",
 icon: 'warning',
 showCancelButton: true,
 confirmButtonColor: '#3085d6',
 cancelButtonColor: '#d33',
 confirmButtonText: 'si, Eliminar!',
 cancelButtonText: 'Cancelar',
 }).then((result) => {

   if (result.value)
   {
     $.ajax(
     {
       type: "POST",
       dataType:"JSON",
       url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=delcardid",
       data:{ "source1":id, "source":sessionStorage.getItem("Token")},
       beforeSend: function(event)
       {
       },
       success: function(server)
       {
         $("#card"+id).remove();
         Swal.fire(
         'Eliminado!',
         'Su tarjeta ha sido eliminada.',
         'success'
         );

       deltarjeta(id1)

       },
       error: function(e)
       {
       console.log(e);
       }
       });

    }
  })

}
function deltarjeta(id1)
{

     $.ajax(
     {
       type: "POST",
       dataType:"JSON",
       url: "./POST/?source1=patrimoniohoy&source2=deltarjeta",
       data:{ "source1":id1},
       beforeSend: function(event)
       {
       },
       success: function(server)
       {
         $("#"+id1+"").remove();
         getTarjeta();
         // location.reload();
       },
       error: function(e)
       {
       console.log(e);
       }
       });

  //   }
  // })

}
function getTarjeta()
{
  $("#contenedorTarjetas").empty();
    $.ajax(
   {
      type: "POST",
      dataType:"JSON",
      url: "./GET/?source1=tarjeta&source2=gettarjeta",
      data:{ "source": sessionStorage.getItem("idSocio")},
      beforeSend: function(event)
      {
      },
      success: function(server)
      {
        if (server.length > 0) {
          $.each(server, function(a, b) {
            var botonEliminar = '<button id="btnEliminar" class="btn" data-toggle="tooltip" data-placement="top" title="Eliminar tarjeta" type="button" name="button" onclick="delCard(\''+b.idOpenPay+'\',\''+b._id+'\')"><i class="icon-trash-o"></i> Eliminar</button>';

            // if (sessionStorage.getItem("idSocio") == b.idUsuario) {
              $("#contenedorTarjetas").append('<div id="card'+b.idOpenPay+'" class="col-md-6"><div id="'+b.idOpenPay+'" class="card card1"><div class=""><i style="display:none;" id="check'+b.idOpenPay+'" class="fa fa-check" aria-hidden="true"></i><a role="button" id="'+b.idOpenPay+'" value="'+b.idOpenPay+'" style="text-decoration: none;color:black;"><img src="https://www.larepublica.net/storage/images/2019/01/07/20190107104518.mastercard.jpg" class="logo-card logo"></a></div><div class="row"><div class="text-left"></div><input value="'+b.mesExpiracion+' /" id="numCard" class="inputCard name" type="text" readonly="readonly"><input id="numCard1" value="'+b.aExpiracion+'" class="inputCard1 name" type="text" readonly="readonly"><input id="idTarjeta" class="inputCard1 name" type="text" readonly="readonly" style="display:none;"><input id="nombreSocio" value="'+b.nombre+'" class="inputCard1 name" type="text" readonly="readonly" style="display:none;"><input id="apellido" value="'+b.apellidos+'" class="inputCard1 name" type="text" readonly="readonly" style="display:none;"><input id="numTelefono" value="'+b.telefono+'" class="inputCard1 name" type="text" readonly="readonly" style="display:none;"><input id="correoUsu" value="'+b.correo+'" class="inputCard1 name" type="text" readonly="readonly" style="display:none;"><input id="inputName" class="inputName" type="text" value="'+b.nombre+' '+b.apellidos+'" style="display:;" readonly="readonly"><br><input id="inputNumber" class="inputNumber" value="'+b.numeroTarjeta+'" type="text" readonly="readonly"></div></div><br><div class="text-xs-center mb-2">'+botonEliminar+'</div></div>');
            // }

            $("#idTarjeta").val(b.idOpenPay);

            $("#"+b.idOpenPay+"").click(function(event) {
              sessionStorage.setItem('idcard', b.idOpenPay);
              sessionStorage.setItem('nombreTarjeta', b.nombre);
              sessionStorage.setItem('apellidoTarjeta', b.apellidos);
              sessionStorage.setItem('telefonoTarjeta', b.telefono);
              sessionStorage.setItem('correoTarjeta', b.correo);
              $("#check"+b.idOpenPay+"").show();
            });
          });
        }else {
          $("#contenedorTarjetas").append('<div class="col-xl-12 col-lg-12 col-md-12 col-xs-12"><div class="text-sm-center"><span>Sin tarjetas</span> </div></div>')
        }
        // $.LoadingOverlay("hide");

      },
      error: function(e)
      {
       console.log(e);
      }
   });

}

function procesoPagos() {
  var enlace = document.querySelector('.cambiar');
  enlace.textContent = "Pagos       ";
  $("#contenedorPagos").show();
  $(".ocultar").hide();
  $(".oculto").show();
  $(".ocultarProyec").hide();
  $(".contenedor_pagos").show();
}
function btnCancelar() {
  $("#card1").hide();
  $(".btnCard").remove("onclick", 'ocultarTargeta()').attr("onclick", 'mostrarTarjeta()');

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
function mostrarTabla() {
$("#comprobantes").hide();
$("#entregas").show();
$("#mostrarFlecha").show();
$("#ocultarFlecha").hide();
}
function ocultarTabla() {
  $("#comprobantes").show();
  $("#entregas").hide();
  $("#mostrarFlecha").hide();
  $("#ocultarFlecha").show();
}
function commaSeparateNumber(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}
function getNoticias() {

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
         $.each(server, function(a,b) {
           if (b.sectionDescription == "Noticias") {
             $("#contenedorNoticias").append('<li class="list-group-item pb-0"><h6 class="negrita" style="font-size:14px" >'+b.postName+'</h6><p style="font-size:12px">'+b.description+'</p> </li>');
           }

         });
         // $("#contenedorNoticias").append('<li class="list-group-item pb-0" style="height:110px;"></li>')
       }
       // swal.close();
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
       var total = 0;
       if (server != '') {
         $.each(server, function(a,b) {
           $("#contenedorNotificaciones").append('<li class="list-group-item pb-0"><h6 class="negrita" style="font-size:14px" ></h6><p class="justificado" style="font-size:12px">'+b.Message+'</p> </li>');

           $("#navNotificaiones").append('<a href="javascript:void(0)" class="list-group-item"><div class="media"><div class="media-body"><h6 class="media-heading"></h6><p class="notification-text font-small-3 text-muted">'+b.Message+'</p><small><time datetime="2015-06-11T18:29:20+08:00" class="media-meta text-muted"></time></small></div></div></a>');
           total++
           // setNotificacion(b.message,b.project,b.title);
         });
         // console.log(total);
         // $("#totalNot").append(total+' nuevos')
         $("#numeroNot").append(total)
       }else {
          $("#contenedorNotificaciones").append('<li class="list-group-item pb-0"><h6 class="negrita text-md-center" style="font-size:14px" >Sin contenido</h6><p class="justificado" style="font-size:12px"></p> </li>');

         $("#navNotificaiones").append('<a href="javascript:void(0)" class="list-group-item"><div class="media"><div class="media-body"><h6 class="media-heading">No tiene notificacones</h6><p class="notification-text font-small-3 text-muted"></p><small><time datetime="2015-06-11T18:29:20+08:00" class="media-meta text-muted"></time></small></div></div></a>');
       }
       $.LoadingOverlay("hide");
     },
     error: function (e) {
       $.LoadingOverlay("hide");
     }
   });
   getTarjeta();
}
function getImgAuto() {
  $("#autoservicios").show();
  $("#autoservicios1").hide();
  $("#autoservicios2").hide();
}
function getImgAuto1() {
  $("#autoservicios").hide();
  $("#autoservicios2").hide();
  $("#autoservicios1").show();
}
function getImgAuto2() {
  $("#autoservicios").hide();
  $("#autoservicios1").hide();
  $("#autoservicios2").show();
}
function updccv() {
  var idTarjeta = $("#idTarjeta").val();
  var ccv = $("#tarjetaccv").val();
  if (sessionStorage.getItem('idcard') != null) {
    idTarjeta = sessionStorage.getItem('idcard');
  }

  $.LoadingOverlay("show", {
    text : "Espere un momento por favor"
  });

  if (ccv !='') {
    $.ajax(
    {
      type: "POST",
      dataType: "JSON",
      url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=updcardid",
      data:{"source1":idTarjeta, "source":sessionStorage.getItem("Token"), "source3":ccv},
      success: function (server) {
        if (server.estatus == 'ok') {
          Swal.fire(
          'Actualizado!',
          'CCV actualizado correctamente.',
          'success'
          );
          $("#modalCVV").modal("hide");
          $("#tarjetaccv").val('');
          getTarjeta();

           swal.fire({
              // title: 'Se procesará el pago en otra pestaña',
              text: 'Continuar con el pago',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#37C937',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Pagar',
              // position: 'top',
              // width: '100%'
          }).then((result) => {
            if (result.value) {
              setPagar();
            }
          });

        }else {
          Swal.fire(
          'Error!',
          'No se pudo actualizar CCV.',
          'error'
          );
        }
        $.LoadingOverlay("hide");
      },
      error: function (e) {

      }
    });
  }else {
    Swal.fire(
    'Error!',
    'Ingrese su ccv por favor.',
    'error'
    );
  }


}

function alertaBanamex(){
  alertify.confirm('<p style="color: #00205B;font-weight: bold;">Serás direccionado a un sitio externo. ¿Estas seguro que deseas continuar?</p>','', function(){
      window.open('https://www.jarboss.com/script/Banamex/?source1=referenciadepago&source2=totalapagar', '_blank')

 },function(){ alertify.set('notifier','position', 'top-center');alertify.error('No se ha hecho ningún cambio. ')}).set('labels', {ok:'Continuar', cancel:'Cancelar'});
}
function alertaSantander(){
  alertify.confirm('<p style="color: #00205B;font-weight: bold;">Serás direccionado a un sitio externo. ¿Estas seguro que deseas continuar?</p>','', function(){
      window.open('https://www.jarboss.com/script/Santander/?source1=referenciadepago&source2=totalapagar', '_blank')

 },function(){ alertify.set('notifier','position', 'top-center');alertify.error('No se ha hecho ningún cambio. ')}).set('labels', {ok:'Continuar', cancel:'Cancelar'});
}
