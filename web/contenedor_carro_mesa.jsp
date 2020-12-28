


<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>   
<%@include  file="chequearsesion.jsp" %>
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
                <br>
                  <div   class="row">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    
                    <input class="form-control" id="buscar_carromesa" type="text" placeholder="Buscar">
                        <table  id="tabla_carromesa" data-row-style="rowStyle" class="table"data-toggle="table" data-click-to-select="true">
              
              
                        </table>
                </div> 
            </div> 
          </div> 
                
                
            </div>
    
    
      <div class="modal fade" id="modal_carromesa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static"   data-keyboard="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
           <div >
                <a>INGRESAR NUMERO DE MESA AL CARRO NRO:</a><input type="button"  id="carro_numero_mesacarro" name="carro_numero_mesacarro" >   
                <br>       <br>       
                <input type="text" class=" form-control" style="display: none"   id="codigo_carro" name="codigo_carro" required > 
             </div>
             <div >
                  <input type="text" class=" form-control" placeholder="Codigo de mesa" id="codigo_mesa" name="codigo_mesa" required>
                 <br>       
            </div>
             <div >
                 <button type="button" id="boton_reg" class=" form-control btn btn-primary" onclick="validar_carro_mesa();">Registrar </button>
           </div><br><br>
          
           
        
 
                  <div > 
            <button class="form-control btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
           
         </div>
        </div>
      </div>
    </div>
    
    
</form>
