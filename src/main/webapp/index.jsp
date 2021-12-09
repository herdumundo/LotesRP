<html lang="en">
<%@ page session="true" %>
<%@ page language="java" import="java.sql.*" %>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <title>Acceso al Sistema</title>
  
  <link href="css/loading_efecto.css" rel="stylesheet" type="text/css"/>
  <!-- Custom fonts for this template-->
  <link href="estilos/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Custom styles for this template-->
  <script src="jquery/cancel_atras.js"></script>

<body onload="nobackbutton();">
<div class="wrapper fadeInDown">
  <div id="formContent">
      
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">
              <img src="img/yemita5.png" width="130" height="130" alt=""/>
    </div>
          <form action="logincontrol.jsp" method="post" autocomplete="off">
          
              
              <div class="form-group">
            <input class="form-control" id="exampleInputPassword1" name="usuario" type="text" placeholder="Ingrese su usuario" autocomplete="off" required>
          </div>
          <div class="form-group">
            <input class="form-control" id="exampleInputPassword1" name="pass" type="password" placeholder="Contraseña" autocomplete="off" required>
          </div>
          <div class="form-group">
            
          </div>
              <button class="btn btn-primary alert-light btn-block"  type="submit"><b>Ingresar</b> </button>
        
        <%
          //Mensaje de error  
            if(request.getParameter("error") != null){  %>
            <div class="alert alert-primary" role="alert">
                <span class="glyphicon glyphicon-exclamation-sign"></span>
           <%=request.getParameter("error")!=null?request.getParameter("error"):""%>
            </div>
              <% } %>
        
        </form>
       
      </div>
    </div>
      
  <!-- Bootstrap core JavaScript-->
  <script src="estilos/vendor/jquery/jquery.min.js"></script>
  <script src="estilos/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- Core plugin JavaScript-->
  <script src="estilos/vendor/jquery-easing/jquery.easing.min.js"></script>
</body>

</html>
