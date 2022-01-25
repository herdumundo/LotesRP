<!DOCTYPE html>
<html lang="es">
<%@ page session="true" %>
<%@include  file="chequearsesion.jsp" %>
<%      String usuario       = (String) sesionOk.getAttribute("usuario");
        String clasificadora = (String) sesionOk.getAttribute("clasificadora");
        String CCH = (String) sesionOk.getAttribute("area_cch");
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
        <link href="estilos/css/bootstrap4-toggle.min.css" rel="stylesheet" type="text/css"/>
        <link href="lib/themes/main.css?v=1.0.2" rel="stylesheet" />
        <link href="lib/themes/default.css?v=1.0.2" rel="stylesheet" id="theme_base" />
        <link href="lib/themes/default.date.css?v=1.0.2" rel="stylesheet" id="theme_date" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head><!-- comment -->
 

 <body onload="traer_menu('<%=perfil%>');">   <!-- Navigation-->
     <input type="hiden" id="perfil" value="<%=perfil%>">
     <input type="hiden" id="area_login" value="<%=clasificadora%>">
   
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
     
      <a class="navbar-brand" href="#" onclick="traer_menu('<%=perfil%>')"><h6><%=CCH%> ||  <i class="fa fa-fw fa-user"></i>  USUARIO:<%=user_name%></h6></a>
   
 
   
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
      
    
      
      <br>
      <br>
      <br>
     
  
      <div   id="contenido" class="row">
        
       </div>
      
       
      <div id="contenido_registros">
        
       </div>
      <br> <br>
        
       
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
      
    <footer class="py-4 bg-light mt-auto fixed-bottom bg-dark">
        <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Grupo Maehara 2021 V.1.0</div>
                            <div>
                                 ·
                                <a href="#">Centro de clasificaciones de huevos.</a>
                            </div>
                        </div>
        </div>
    </footer>

    <script src="jquery/sweetalert.min.js" type="text/javascript"></script>
    <script src="estilos/vendor/jquery/jquery.min.js"></script>
    <script src="estilos/vendor/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="estilos/vendor/jquery-easing/jquery.easing.min.js"></script>
    <script src="jquery/data_picker.js"></script>
    <script src="jquery/data_picker_2.js" type="text/javascript"></script>
    <script src="estilos/vendor/datatables/jquery.dataTables.js"></script>
    <script src="estilos/vendor/datatables/dataTables.bootstrap4.js"></script>
    <script src="estilos/js/sb-admin.min.js"></script>
    <script src="estilos/js/sb-admin-datatables.min.js"></script>
    <script src="plugins/gijgo-combined-1.9.11/js/popper.min.js" type="text/javascript"></script>
    <script src="jquery/multiselect.js"></script>
    <script src="lib/picker.js?v=3.0"></script>
    <script src="lib/picker.date.js?v=3.0"></script>
    <script src="lib/legacy.js?v=3.0"></script>    <script src="estilos/js/bootstrap4-toggle.js" type="text/javascript"></script>
    <script src="jquery/traer_clases.js?v=3.0" type="text/javascript"></script>
    <script src="jquery/formulas.js?v=3.0" type="text/javascript"></script>
    <script src="jquery/transferencia.js" type="text/javascript"></script>
    </div> 
</body>

</html>
