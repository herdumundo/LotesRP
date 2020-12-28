<html lang="en">
<%@ page session="true" %>
<%@ page language="java" import="java.sql.*" %>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Acceso al Sistema</title>
  
  <link href="estilos/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom fonts for this template-->
  <link href="estilos/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Custom styles for this template-->
  <link href="estilos/css/sb-admin.css" rel="stylesheet">
  <script src="jquery/cancel_atras.js"></script>
</head>

<body onload="nobackbutton();" class="bg-dark">
  <div class="container ">
    <div class="card card-login mx-auto mt-5 ">
      <div class="card-header bg-primary ">Login</div>
      <div class="card-body">
          <form action="logincontrol.jsp" method="post" autocomplete="off">
          
              
              <div class="form-group">
            <label for="exampleInputUser">Usuario</label>
            <input class="form-control" id="exampleInputPassword1" name="usuario" type="text" placeholder="Ingrese su usuario" autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
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
      
      
      
      
      
  </div>
  <!-- Bootstrap core JavaScript-->
  <script src="estilos/vendor/jquery/jquery.min.js"></script>
  <script src="estilos/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- Core plugin JavaScript-->
  <script src="estilos/vendor/jquery-easing/jquery.easing.min.js"></script>
</body>

</html>
