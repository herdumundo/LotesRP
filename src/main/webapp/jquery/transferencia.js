  var ruta_contenedores="./contenedores/";
  var ruta_controles="./controles/";
  var ruta_grillas="./grillas/";
  var ruta_consultas="./consultas/";
  
function cargar_datos_key_trans() {
        if (event.keyCode == 13 || event.which == 13) {
            consulta_lotes_transferencias_reprocesos ($('#txt_lote').val());
        }
}

function cargar_datos_key_trans_subproducto() {
        if (event.keyCode == 13 || event.which == 13) {
            consulta_lotes_transferencias_subproductos ($('#txt_lote').val());
        }
}
function cargar_datos_key_trans_procesar() 
{
        if (event.keyCode == 13 || event.which == 13) 
        {
            consulta_lotes_procesar ($('#txt_lote').val());
        }
}

function consulta_lotes_transferencias_reprocesos(carro) {
   
         $.ajax({
             type: "POST",
            url: ruta_consultas+'consulta_lotes_transferencias_reprocesos.jsp',
            data: ({ carro: carro}),
            beforeSend: function() {
               $('#div_cargar').show();
                       },           
            success: function (data) {
               $('#div_cargar').hide();
           $.each(data,function(i, item)
           {  
               if(item.estado==="0"){
                        aviso_existencia(item.cod_carrito);
               }
               else {
                     cargar_grilla_trans(item.tipo_huevo,item.cod_carrito,item.cod_interno,item.cantidad,item.fecha_puesta,item.desFallaZona);   
               }
            }    );
               $('#txt_lote').val('');
               
             } 
        });
}



function cargar_grilla_trans(tipo_huevo,cod_carrito,cod_interno,cantidad,fecha_puesta,desFallaZona) {
  
   if (checkId(cod_interno)) {
        return aviso_duplicado();
    }  
   
   var planchas=parseInt(cantidad)/30;
  var unidades=parseInt(cantidad)-(parseInt(planchas)*30);
  
  
    $('#grilla_transfer tbody').prepend('<tr class="suma" id="row'+cod_interno + '" > '+
            '<td for="id"><b>' + cod_interno +'</b></td>'+
            '<td><b>' + cod_carrito     + '</b></td>'+
            '<td><b>' + cantidad        + '</b></td>'+
            '<td><b>' +  parseInt(planchas)         + '</b></td>'+
            '<td><b>' + unidades        + '</b></td>'+
            '<td><b>' + fecha_puesta    + '</b></td>'+
            '<td><b>' + tipo_huevo      +'</b></td>'+
            '<td><b>' + desFallaZona      +'</b></td>'+
            '<td><input type="button" value="ELIMINAR" name="remove" id="' + cod_interno + '" class="btn btn-danger btn_remove"></td> ');
    
} 
 


function consulta_lotes_transferencias_subproductos(carro) {
   
         $.ajax({
             type: "POST",
            url: ruta_consultas+'consulta_lotes_transferencias_subproductos.jsp',
            data: ({ carro: carro}),
            beforeSend: function() {
               $('#div_cargar').show();
                       },           
            success: function (data) {
               $('#div_cargar').hide();
           $.each(data,function(i, item)
           {  
               if(item.estado==="0"){
                        aviso_existencia(item.cod_carrito);
               }
               else {
                     cargar_grilla_trans_subproductos(item.tipo_huevo,item.cod_carrito,item.cod_interno,item.cantidad,item.fecha_puesta,item.estado_costeo,item.cod_lote,item.desFallaZona);   
               }
            }    );
               $('#txt_lote').val('');
               
             } 
        });
}
 
 
function cargar_grilla_trans_subproductos(tipo_huevo,cod_carrito,cod_interno,cantidad,fecha_puesta,
estado_costeo,cod_lote,desFallaZona) {
  
   if (checkId(cod_interno)) {
        return aviso_duplicado();
    }  
   
   var planchas=parseInt(cantidad)/30;
  var unidades=parseInt(cantidad)-(parseInt(planchas)*30);
  
  
    $('#grilla_transfer tbody').prepend('<tr class="suma" id="row'+cod_interno + '" > '+
            '<td for="id"><b>' + cod_interno +'</b></td>'+
            '<td><b>' + cod_carrito     + '</b></td>'+
            '<td><b>' + cantidad        + '</b></td>'+
            '<td><b>' +  parseInt(planchas)         + '</b></td>'+
            '<td><b>' + unidades        + '</b></td>'+
            '<td><b>' + fecha_puesta    + '</b></td>'+
            '<td><b>' + tipo_huevo      +'</b></td>'+
            '<td><b>' + estado_costeo      +'</b></td>'+
            '<td><b>' + cod_lote      +'</b></td>'+
            '<td><b>' + desFallaZona      +'</b></td>'+
            '<td><input type="button" value="ELIMINAR" name="remove" id="' + cod_interno + '" class="btn btn-danger btn_remove"></td> ');
    
} 
 

 
function checkId(id) 
{
    let ids = document.querySelectorAll('#grilla_transfer td[for="id"]');

    return [].filter.call(ids, td => td.textContent === id).length === 1;
}
function aviso_duplicado() 
{
    swal.fire({
        type: 'error',
        title: "CARRO DUPLICADO",
        confirmButtonText: "CERRAR"
    });
} 

function aviso_existencia(nro_carro) {
    swal.fire({
        type: 'error',
        title: "CARRO NO EXISTE, "+ nro_carro,
        confirmButtonText: "CERRAR"
    });
} 

$(document).on('click', '.btn_remove', function () {
    var button_id = $(this).attr("id");
    //cuando da click obtenemos el id del boton
    $('#row' + button_id + '').remove(); //borra la fila
    //limpia el para que vuelva a contar las filas de la tabla
    $("#adicionados").text("");
    var nFilas = $("#grilla_transfer tr").length;
    $("#adicionados").append(nFilas - 1);
    calcular_tipos_grilla();
    // obtener_fila();     
});




function enviar_datos_transferencia()
{
    var filas = document.querySelectorAll("#grilla_transfer tbody tr");
    jsonObj = [];
    var cont=0;
    filas.forEach(function (e) 
    {
        // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td");
        item = {}
        item ["cod_interno"]    = columnas[0].textContent;
        item ["cod_carrito"]    = columnas[1].textContent;
        item ["cantidad"]       = columnas[2].textContent;
         jsonObj.push(item);
         cont++;
    });
    
    var destino=$("#cbox_destino").val();
    if($("#cbox_destino").val()==null)
    {
        aviso_error("DEBE SELECCIONAR EL DESTINO");
    }
    else if($("#cbox_chofer").val()==null)
    {
        aviso_error("DEBE SELECCIONAR EL CHOFER");
    }
    else if($("#cbox_camion").val()==null)
    {
        aviso_error("DEBE SELECCIONAR EL CAMION");
    }
    else if(cont==0)
    {
        aviso_error("DEBE INGRESAR LOTE");
    }   
    else
    {
        var json_string = JSON.stringify(jsonObj);
        confirmar_registro_transfer(json_string,'control_registro_transferencia_rp');     
    }
}

function enviar_datos_transferencia_subproductos()
{
    var filas = document.querySelectorAll("#grilla_transfer tbody tr");
    jsonObj = [];
    var cont=0;
    filas.forEach(function (e) 
    {
        // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td");
        item = {}
        item ["cod_interno"]    = columnas[0].textContent;
        item ["cod_carrito"]    = columnas[1].textContent;
        item ["cantidad"]       = columnas[2].textContent;
        item ["estado_costeo"]  = columnas[7].textContent;
        item ["cod_lote"]       = columnas[8].textContent;
         jsonObj.push(item);
         cont++;
    });
    
    var destino=$("#cbox_destino").val();
    if($("#cbox_destino").val()==null)
    {
        aviso_error("DEBE SELECCIONAR EL DESTINO");
    }
    else if($("#cbox_chofer").val()==null)
    {
        aviso_error("DEBE SELECCIONAR EL CHOFER");
    }
    else if($("#cbox_camion").val()==null)
    {
        aviso_error("DEBE SELECCIONAR EL CAMION");
    }
    else if(cont==0)
    {
        aviso_error("DEBE INGRESAR LOTE");
    }   
    else
    {
        var json_string = JSON.stringify(jsonObj);
        confirmar_registro_transfer(json_string,'control_registro_transferencia_sp'); //subproducto     
    }
}
function aviso_error(mensaje){
          swal.fire
            ({
            type: 'error',
            title: mensaje,
            confirmButtonText: "CERRAR"
            }); 
   
}
function confirmar_registro_transfer(valor,pagina) {
 
    Swal.fire({
           title: 'TRANSFERENCIA DE LOTES',
           text: "DESEA TRANSFERIR LOS LOTES?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
           confirmButtonText: 'SI, TRANSFERIR!',
           cancelButtonText: 'NO, CANCELAR!'
    }).then((result) => {
        if (result.value) {

        $.ajax({
            type: "POST",
            url: ruta_controles+pagina+'.jsp',
            data: ({
                valor:valor ,chofer:$('#cbox_chofer').val(),destino:$('#cbox_destino').val(),camion:$('#cbox_camion').val() }),
            beforeSend: function ()
            {
                Swal.fire({
                title: 'PROCESANDO!',
                html: 'ESPERE<strong></strong>...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft();
                }, 1000);
                }
                });   
            },
            success: function (data) 
            {
                aviso_registro_transfer(data.tipo_respuesta,data.mensaje);
            } 
            });
      
        }
        });

     
}
 

 
 
  
function aviso_registro_transfer(tipo,mensaje) 
{
  
    if (tipo == "1") 
    {
        swal.fire({
            type: 'success',
            title: mensaje,
            confirmButtonText: "CERRAR"
        });
                traer_menu($('#perfil').val());
    }
    else
    {
        swal.fire
            ({
            type: 'error',
            title: mensaje,
            confirmButtonText: "CERRAR"
            });
     }
}
 
function calcular_tipos_grilla(){
     // obtenemos todas las filas del tbody
    var filas = document.querySelectorAll("#grilla_transfer tbody tr");
    var total_tipoCC = 0;
    var total_tipoCA = 0;
    var total_tipoCB = 0;
    var total_tipoCD = 0;
    var total_tipoCS = 0;
    var total_tipoCG = 0;
    var total_tipoCJ = 0;
    // recorremos cada una de las filas
    $('#tipo_ca').val('0');
    $('#tipo_cb').val('0');
    $('#tipo_cc').val('0');
    $('#tipo_cd').val('0');
    $('#tipo_cs').val('0');
    $('#tipo_cj').val('0');
    $('#tipo_cg').val('0');
 var c=0;
    filas.forEach(function (e) {
       
      //  if(c>0){
        // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td");
        // obtenemos los valores de la cantidad y importe
        var cantidad_tipoCC = parseFloat(columnas[3].textContent);
        var cantidad_tipoCA = parseFloat(columnas[3].textContent);
        var cantidad_tipoCB = parseFloat(columnas[3].textContent);
        var cantidad_tipoCD = parseFloat(columnas[3].textContent);
        var cantidad_tipoCS = parseFloat(columnas[3].textContent);
        var cantidad_tipoCJ = parseFloat(columnas[3].textContent);
        var cantidad_tipoCG = parseFloat(columnas[3].textContent); 
        var tipo_carro =  columnas[4].textContent;
         
         //alert(tipo_carro);
 
        if (tipo_carro == 'G' && cantidad_tipoCG=="2160") {
            total_tipoCG += cantidad_tipoCG;
            $('#tipo_cg').val(parseInt(total_tipoCG) / 2160);

        }

        if (tipo_carro == 'J' && cantidad_tipoCJ == "4320") {
            total_tipoCJ += cantidad_tipoCJ;
            $('#tipo_cj').val(parseInt(total_tipoCJ) / 4320);

        }
        if (tipo_carro == 'S' && cantidad_tipoCS == "4320") {
            total_tipoCS += cantidad_tipoCS;
            $('#tipo_cs').val(parseInt(total_tipoCS) / 4320);

        }
        if (tipo_carro == 'A' && cantidad_tipoCA == "4320") {
            total_tipoCA += cantidad_tipoCA;
            $('#tipo_ca').val(parseInt(total_tipoCA) / 4320);

        }
        if (tipo_carro == 'B' && cantidad_tipoCB == "4320") {
            total_tipoCB += cantidad_tipoCB;
            $('#tipo_cb').val(parseInt(total_tipoCB) / 4320);

        }
        if (tipo_carro == 'C' && cantidad_tipoCC == "4320") {

            total_tipoCC += cantidad_tipoCC;
            $('#tipo_cc').val(parseInt(total_tipoCC) / 4320);

        }
        if (tipo_carro == 'D' && cantidad_tipoCD == "4320") {
            total_tipoCD += cantidad_tipoCD;

            $('#tipo_cd').val(parseInt(total_tipoCD) / 4320);
        } //}
    c++;
    });
}



function validar_transferencia_almacenamiento(){
    
 var cbox_camion=$('#cbox_camion').val();   
 var cbox_destino=$('#cbox_destino').val();   
 var cbox_chofer=$('#cbox_chofer').val();   
 var x = document.getElementById("grilla_transfer").rows.length;
   if(cbox_camion=="-" ||cbox_destino.length==0||cbox_chofer=="-"|| x=="1") {
      
      swal.fire({
            type: 'error',
            title: "ERROR COMPLETAR DATOS ",
            confirmButtonText: "CERRAR"
                        });
        
  } 
  else {
      
     enviar_datos_transferencia('A');    
  }
 
    
}

function validar_transferencia_procesar(){
    
 var cbox_camion=$('#cbox_camion').val();   
 var cbox_destino=$('#cbox_destino').val();   
 var cbox_chofer=$('#cbox_chofer').val();   
 var x = document.getElementById("grilla_transfer").rows.length;

  if(cbox_camion=="-" ||cbox_destino.length==0||cbox_chofer=="-"|| x=="1") {
      
      swal.fire({
            type: 'error',
            title: "ERROR COMPLETAR DATOS ",
            confirmButtonText: "CERRAR"
                        });
        
  } 
  else {
      
     enviar_datos_transferencia('P');    
  }    
}