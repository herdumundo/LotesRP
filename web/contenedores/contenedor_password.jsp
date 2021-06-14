 
    <%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
        <%@include  file="../chequearsesion.jsp" %>
<%    String usuario = (String) sesionOk.getAttribute("usuario");
String clasificadora = (String) sesionOk.getAttribute("clasificadora");
String user_name = (String) sesionOk.getAttribute("nombre_usuario");
String cod_usuario = (String) sesionOk.getAttribute("cod_usuario");

%>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
  
   
    <div class="content-wrapper">
    <div class="container-fluid">
        <form id="frm_agregar" name="frm_agregar" action="controles/control_cambio_pass.jsp" method="POST">
         <span class="input-group-addon">USUARIO</span> 
  
         <input type="text" class="form-control" name="usuario"  value="<%=usuario%> " readonly="readonly" required="true">
                  <br><br>
         
         <div class="input-append">  
       
         
                 <input name="txt_pass" id="txt_pass" type="text"  placeholder="INGRESE NUEVA CONTRASEÑA"required class="form-control">
                </div>   
             <br><br>
          
           <input type="submit" value="CAMBIAR" id="btn_registrar" name="btn_registrar" class="form-control btn btn-primary " style="  height:70px"/>
 
  
    
        </form>
     
                  <input  class="form-control btn btn-warning "  style="  height:70px" type="button" onclick="traer_menu()"value="CANCELAR" />
 
      
    </div></div>
                  
                 
         
        
        
        
      
