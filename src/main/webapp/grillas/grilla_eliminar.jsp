 <%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
<%@include  file="../chequearsesion.jsp" %>
<%    String usuario = (String) sesionOk.getAttribute("usuario");
String clasificadora = (String) sesionOk.getAttribute("clasificadora");
String user_name = (String) sesionOk.getAttribute("nombre_usuario");
   String calendario= request.getParameter("fecha");
  %>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
 
 <form method="post" id="formulario_eliminar">
           
     <table  id="grilla_eliminar" class="table"  data-row-style="rowStyle" data-toggle="table" data-click-to-select="true">
             
         
     
     <thead>
                   
         <tr>
                <th  >
                  Nro carro
                </th>
                <th  >
                  Fecha de puesta
                </th>
                 <th >
                  Tipo Huevo
                 </th>
                    <th>
                 Cantidad
                    </th>
                  <th>
                  ACCION
                </th>  </tr> 
              </thead>
              <tbody id="grilla_eliminar">
                  <%
                      Connection cn = conexion.crearConexion();
	// Asignar conexion al objeto manejador de datos
	fuente.setConexion(cn);
      ResultSet rs = fuente.obtenerDato("select  *,convert(varchar,fecha_puesta,103) as Fecha_eliminar "
              + "from lotes where convert(varchar,fecha,103)=convert(varchar,'"+calendario+"',103) "
                      + "and clasificadora='"+clasificadora+"'and tipo_huevo in ('RP','PI','R') and estado not in('E','C')");
       
    String tipohuevo="";
              
             
     while(rs.next()){
      
if(rs.getString("tipo_huevo").equals("G"))
{
    tipohuevo="Gigante";
}
if(rs.getString("tipo_huevo").equals("J"))
{
    tipohuevo="Jumbo";
}
if(rs.getString("tipo_huevo").equals("S"))
{
    tipohuevo="Super";
}
if(rs.getString("tipo_huevo").equals("A"))
{
    tipohuevo="A";
}
if(rs.getString("tipo_huevo").equals("B"))
{
    tipohuevo="B";
}
if(rs.getString("tipo_huevo").equals("C"))
{
    tipohuevo="C";
}
if(rs.getString("tipo_huevo").equals("7"))
{
    tipohuevo="4TA";
}

else {
tipohuevo=rs.getString("tipo_huevo");
}
 

 %>  
    
   
    <tr id="<%=rs.getString("cod_interno")%>">  
        
       <td id="nro_carro"><%=rs.getString("cod_carrito")%></td>
       <td id="fecha_puesta"><%=rs.getString("Fecha_eliminar")%></td>
       <td id="tipo_huevo"><%=tipohuevo%></td> 
       <td id="cantidad"><%=rs.getString("cantidad")%></td>
             <td>
            

         <input type="button"  onclick="validacion_eliminacion('<%=rs.getString("cod_interno")%>','<%=rs.getString("cod_carrito")%>')" class="btn btn-danger " value="Eliminar">
   
     
    
    
    
   
                                </td>  
                   </tr><%}%> </tbody>   
          </table>
       </form>
       
              
              
               
               
     
 
    
           
           
  
 
 

        
        
      
      
        




        
        
        
        
        
      