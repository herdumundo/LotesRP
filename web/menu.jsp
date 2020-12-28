<!DOCTYPE html>
<html lang="es">
<%@ page session="true" %>
<%@include  file="chequearsesion.jsp" %>
<%    String usuario       = (String) sesionOk.getAttribute("usuario");
      String clasificadora = (String) sesionOk.getAttribute("clasificadora");
      String user_name = (String) sesionOk.getAttribute("nombre_usuario");
       String perfil = (String) sesionOk.getAttribute("perfil");
%>
<head>
  <title>MAEHARA</title>
  
    <link href="estilos/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="estilos/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet"  type="text/css" href="estilos/css/grilla.css">
    <link href="estilos/css/sweetalert.css" rel="stylesheet" type="text/css"/>
    <link href="estilos/estilo_calendario.css" rel="stylesheet" type="text/css"/>
    <link href="estilos/css/styles_loading.css" rel="stylesheet">  
      
  
</head>

 <body onload="traer_menu('<%=perfil%>');">   <!-- Navigation-->
  
   
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
     
      <a class="navbar-brand" href="#" onclick="traer_menu('<%=perfil%>')"><h6>CLASIFICADORA <%=clasificadora%> ||  <i class="fa fa-fw fa-user"></i>  USUARIO:<%=user_name%></h6></a>
   
 
   
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
     
     
      <ul class="navbar-nav ml-auto">
         
        
           
        <li class="nav-item">
          <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
            <i class="fa fa-fw fa-sign-out"></i>Cerrar sesion</a>
        </li>
      </ul>
    </div>
    
    
  </nav>
   
    <div class="container-fluid">
      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Menú</a>
        </li>
        <li class="breadcrumb-item active">REGISTRO DE CARROS</li>
      </ol>
      
      
     
  
      <div   id="contenido" class="row">
        
       </div>
      
       
      <div id="contenido_2" style="display:none ">
        
       </div>
      
       <div id="contenido_reporte" style="display:none ">
        
       </div> 
      
     
      <div id="contenido_visualizar" style="display:none ">
     
       </div>
       
       <div id="contenido_password" style="display:none ">
        
       </div>
      
       <div id="contenido_retenido" style="display:none ">
        
       </div>   
      
      <div id="contenido_eliminar" style="display:none ">
          </div>
      
       
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Mensaje?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Desea cerrar sesión?</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
            <a class="btn btn-primary" href="cerrarsesion.jsp">Cerrar</a>
          </div>
        </div>
      </div>
    </div>
     <script>
        $(function(){

          

            // Advanced example
            $('.example2').click(function(){

                $.preloader.start({
                    modal: true,
                    src : 'sprites2.png'
                });
 

            });

           

        });
    </script> 
         
     
   <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>-->

    <script src="jquery/sweetalert.min.js" type="text/javascript"></script>
    <script src="jquery/functions.js" type="text/javascript"></script>
    <script src="estilos/vendor/jquery/jquery.min.js"></script>
    <script src="estilos/vendor/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="estilos/vendor/jquery-easing/jquery.easing.min.js"></script>
    <script src="jquery/data_picker.js"></script>
    <script src="jquery/data_picker_2.js" type="text/javascript"></script>
    <script src="estilos/vendor/chart.js/Chart.min.js"></script>
    <script src="estilos/vendor/datatables/jquery.dataTables.js"></script>
    <script src="estilos/vendor/datatables/dataTables.bootstrap4.js"></script>
    <script src="estilos/js/sb-admin.min.js"></script>
    <script src="estilos/js/sb-admin-datatables.min.js"></script>
    <script src="estilos/js/sb-admin-charts.min.js"></script>
    <script src="plugins/gijgo-combined-1.9.11/js/popper.min.js" type="text/javascript"></script>
    <script src="jquery/multiselect.js"></script>
    <script src="jquery/efecto_carga.js"></script>
    <script src="filtro/filtro_eliminar.js?v=1.0.3" type="text/javascript"></script>
    <script src="jquery/traer_clases.js?v=1.0.3" type="text/javascript"></script>
    <script src="jquery/enviar_datos.js?v=1.0.3" type="text/javascript"></script>
    <script src="jquery/formulas.js?v=1.0.3" type="text/javascript"></script>
    <script src="jquery/contenedor_retenido.js?v=1.0.3" type="text/javascript"></script>
    <script src="jquery/animacion_retenido.js?v=1.0.3" type="text/javascript"></script>
    <script src="jquery/eliminar_fila_grilla.js?v=1.0.3" type="text/javascript"></script>
    <script type="text/javascript"   src="jquery/grilla_2.js"></script>
    <script src="jquery/jquery.preloaders.js" type="text/javascript"></script>
    <script src="jquery/contenedor_reproceso.js" type="text/javascript"></script>
    <script src="jquery/reprocesos.js" type="text/javascript"></script>

    </div> 
</body>

</html>
