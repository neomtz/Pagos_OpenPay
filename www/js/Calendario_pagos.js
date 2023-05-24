var APItoken = sessionStorage.getItem("token_type")+' '+ sessionStorage.getItem("Token");
$(document).ready(function() {
  getCalendarioPagos()
});
function getCalendarioPagos() {

    $.ajax(
   {
     type: "GET",
     dataType: "JSON",
     // url: "https://www.jarbossdev.com/Jaguar/API/GET/?source1=patrimoniohoy&source2=calendariopagos",
     url: "https://api-dev.cemexgo.com/v1/brm/ph/projects/"+sessionStorage.getItem("idProyecto")+"/calendars",
     headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': APItoken, 'Ocp-Apim-Subscription-Key': 'e7a16bc768f34fed819c5919878e5714','Cache-Control': 'no-cache' },
     // data:{ "source":sessionStorage.getItem("Token"), "source1":sessionStorage.getItem("idProyecto")},
     success: function (server) {
       if (server.length > 0) {
         $.each(server, function(a,b) {
           var fechaPagado = "";
           if (b.paymentDate != null) {
             var fecha1 = new Date(b.paymentDate);
             let fechaPago = {
               dia : fecha1.getDate(),
               mes : fecha1.getMonth() + 1,
               year : fecha1.getFullYear()
             }
             fechaPagado = ('0' + fechaPago.dia).slice(-2) + '-' + ('0' + fechaPago.mes).slice(-2) + '-' + fechaPago.year;

           }
           var fecha = new Date(b.expirationDate);
           let fechaExpiracion = {
             dia : fecha.getDate(),
             mes : fecha.getMonth() + 1,
             year : fecha.getFullYear()
           }

             var fechaVencimiento = ('0' + fechaExpiracion.dia).slice(-2) + '-' + ('0' + fechaExpiracion.mes).slice(-2) + '-' + fechaExpiracion.year;

             var check = '';
             if (b.paymentExecuted == true) {
               check = 'checked';
             }
             var semana = a+1;

           $("#contenedorCalendario").append('<div class="p-3 estiloColumnaCal"><div class="row"><div class="col"><h6>Semana <span>'+semana+'</span></h6></div><div class="col" style="text-align:right;"><input class="form-check-input" style="font-size:13px;" type="checkbox" value="" id="flexCheckDefault" '+check+'/ disabled></div></div><p>Limite pago: <span> '+fechaVencimiento+'</span> </p><p>Pagado: <span> '+fechaPagado+'</span> </p></div>');
         });
       }else {
         $("#contenedorCalendario").append('<div class="text-center"><h4></h4></div>')
       }

     },
     error: function (e) {

     }
   });

}
function impPdf() {
  $("#btnexportar").hide();
  const $elementoParaConvertir = document.body; // <-- Aquí puedes elegir cualquier elemento del DOM

    html2pdf()
      .set({
        margin: 0.5,
        filename: 'documento.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 3, // A mayor escala, mejores gráficos, pero más peso
          letterRendering: true,
        },
        jsPDF: {
          unit: "in",
          format: "a3",
          orientation: 'portrait' // landscape o portrait
        }
      })
      .from($elementoParaConvertir)
      .save()
      .catch(err => console.log(err));
  setTimeout(function(){
    $("#btnexportar").show();
  }, 500);
}
