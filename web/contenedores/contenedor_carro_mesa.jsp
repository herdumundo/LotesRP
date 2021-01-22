 <%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>   
<%@include  file="../chequearsesion.jsp" %>
      <%
          String area_registro = (String) sesionOk.getAttribute("clasificadora"); 
          
          String area_format="";
          
          if (area_registro.equals("A")||area_registro.equals("B")) {
              area_format="cch";
          }
          
          if (area_registro.equals("O")) {
              area_format="ovo";
          }
                  
              
          Connection cn = conexion.crearConexion();
	 
	fuente.setConexion(cn);           //CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        ResultSet rs = fuente.obtenerDato("SELECT  convert(varchar,getdate(),103) as fecha,REPLACE(CONVERT(VARCHAR(10), GETDATE(), 5),'-','') ");
       while(rs.next()){          
 %>    
    
<form method="post" id="formulario_carro_mesa">
     <br> <br>
            <div class="input-append">  
            <span class="input-group-addon">Fecha de clasificación</span>
            <input id="calendario_mesa" name="calendario_mesa" data-format="dd/mm/yyyy"  width="276"  value="<%=rs.getString(1)%>"   />
           
          
            <%}
            %>  <br>
            </div> 
            
            <input type="button" class="form-control"  value="Buscar" onclick="traer_grilla_carromesa($('#calendario_mesa').val())" >
 
     <div id="div_grilla_carromesa">
              
                
                
            </div>
     
    
    
</form>
