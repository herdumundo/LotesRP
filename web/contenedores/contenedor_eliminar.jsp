 
 
 
    <%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <%@include  file="../chequearsesion.jsp" %>
<%    String usuario = (String) sesionOk.getAttribute("usuario");
String clasificadora = (String) sesionOk.getAttribute("clasificadora");
String user_name = (String) sesionOk.getAttribute("nombre_usuario");

%>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
 
  
      
 
     <div class="container-fluid">
        
   
         <input   style="display: none"id="text_id_eliminar" name="text_id_eliminar" type="text" >
       
       
     <div class="input-append">  
        <input id="calendario_eliminar" data-format="dd/mm/yyyy"  width="276" />
  </div>  
          <button   class="btn btn-primary " onclick="traer_detalle_eliminar($('#calendario_eliminar').val());filtro_eliminar(); visible_div_eliminar()">BUSCAR</button> 
    <br>
        <div id="div_eliminar" style="display:none" class="input-append">
            
        <div   class="row">
        <div class="col-md-12">
        <div class="panel panel-primary">
        <div class="panel-heading" > </div>
        
         <input class="form-control" id="buscar_eliminar" type="text" placeholder="Buscar">
          <table  id="grilla_eliminar"   data-row-style="rowStyle" data-toggle="table" data-click-to-select="true">
             
          </table>
        </div> </div> </div>  
        </div>      
        </div>
        
        
        
        
      