<%@page import="javax.swing.JOptionPane"%>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@include  file="../chequearsesion.jsp" %>


<script> $("#buscar_retenido").on("keyup", function() {
                     var value = $(this).val().toLowerCase();
                     $("#tabla_retenido tr").filter(function() {
                     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                       });
  
</script>

   <script>
   
    $('#tabla_retenido td:last-child:contains(R)').closest('tr').css('background-color', '#FFA07A');
    $('#tabla_retenido td:last-child:contains(.)').closest('tr').css('background-color', '#00FFFF');
         $('#tabla_retenido td:last-child:contains(L)').closest('tr').css('background-color', '#90EE90');

          $('.record_table tr').click(function (event) {
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
        }
    });

    $("input[type='checkbox']").change(function (e) {
        if ($(this).is(":checked")) {
            $(this).closest('tr').addClass("highlight_row");
        } else {
            $(this).closest('tr').removeClass("highlight_row");
        }
    });  
   //$('#tabla_rep td:last-child:contains(R)').closest('tr').css('background-color', '#FFA07A').css('.record_table tr:hover { background: #eee; }');
    	$('#tabla_rep td:last-child:contains(R)').closest('tr').css('background-color', '#FFA07A');
    $('#tabla_rep td:last-child:contains(.)').closest('tr').css('background-color', '#00FFFF');
$("tr").not(':first').hover(
  function () {
    $(this).css("background","yellow");
  }, 
  function () {
    $('#tabla_retenido td:last-child:contains(R)').closest('tr').css('background-color', '#FFA07A');
    $('#tabla_retenido td:last-child:contains(.)').closest('tr').css('background-color', '#00FFFF');
     $('#tabla_retenido td:last-child:contains(L)').closest('tr').css('background-color', '#90EE90');
}
);
   //$('#tabla_rep td:last-child:contains(R)').hover("background","yellow");

               
        </script>
            <div   class="row">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    
                    <input class="form-control" id="buscar_retenido" type="text" placeholder="Buscar">
                        <table  id="tabla_retenido" data-row-style="rowStyle" class="table record_table"data-toggle="table" data-click-to-select="true">
              
              
               <thead>
                  <th>
                 Id
                </th>
                <th>
                 Carro
                </th>
                <th  >
                  Tipo
                </th>
                 <th>
                  Estado
                </th>
   
                 <th><input type="checkbox" id="box_retenidos"> 
                 <label for="box_retenidos">SELECCIONAR</label></th>
                   
              </thead>
              <tbody id="tabla_retenido">
                  <%
                      Connection cn = conexion.crearConexion();
       String hora_desde  = request.getParameter("inicio_retenido");
      String combo_estado=request.getParameter("combo_estado_retenido");
      String hora_fin  = request.getParameter("fin_retenido");
        String inicio_fin= hora_desde+"-"+hora_fin;
        String calendario=request.getParameter("fecha_retenido");
             String clasificadora               = (String) sesionOk.getAttribute("clasificadora");
             

      String estado_formateado="";
      if (combo_estado.equals("R")) {
              estado_formateado="'L'";
          }
      else if  (combo_estado.equals("L")) {
              estado_formateado="'Z','R'";  
          }


 
 //JOptionPane.showMessageDialog(null, estado_formateado );

     	// Asignar conexion al objeto manejador de datos
	fuente.setConexion(cn);/*
 ResultSet rs = fuente.obtenerDato("  select  lotes.cod_lote,lotes.cod_carrito,lotes.tipo_huevo    from lotes lotes, lotes_retenidos lr  "
         + "where "
         + "convert(int,right('00' + ltrim(rtrim(ltrim(rtrim(substring(lotes.hora_clasificacion,1,charindex('-',lotes.hora_clasificacion,1)-1))))),2))>='"+hora_desde+"' "
         + "and  convert(int,right('00' + ltrim(rtrim(ltrim(rtrim(substring(lotes.hora_clasificacion,1,charindex('-',lotes.hora_clasificacion,1)-1))))),2))<='"+hora_fin+"'  "
         + "and convert(int,right('00' + ltrim(rtrim(ltrim(rtrim(substring(lotes.hora_clasificacion,charindex('-',lotes.hora_clasificacion,1)+1,len(lotes.hora_clasificacion)))))),2))<='"+hora_fin+"'"
         + "and convert(int,right('00' + ltrim(rtrim(ltrim(rtrim(substring(lotes.hora_clasificacion, charindex('-',lotes.hora_clasificacion,1)+1,len(lotes.hora_clasificacion)))))),2))>='"+hora_desde+"' "
         + "and convert(varchar,lr.fecha,103)=convert(varchar,'"+calendario+"',103) and right(lotes.estado_liberacion,1)='"+estado_formateado+"' "
         + "and lotes.hora_clasificacion!='-' and lotes.tipo_huevo not in ('PI','R','RP') and  lotes.clasificadora='"+clasificadora+"' and lr.movimiento='a' and lotes.cod_lote=lr.cod_lote " );
    */
        ResultSet rs = fuente.obtenerDato("  select  *, replace(right (replace(estado_liberacion,'Z','R.'),1),'.','R.') as local   "
         + "from lotes "
         + "where "
         + "convert(int,right('00' + ltrim(rtrim(ltrim(rtrim(substring(hora_clasificacion,1,charindex('-',hora_clasificacion,1)-1))))),2))>='"+hora_desde+"' "
         + "and  convert(int,right('00' + ltrim(rtrim(ltrim(rtrim(substring(hora_clasificacion,1,charindex('-',hora_clasificacion,1)-1))))),2))<='"+hora_fin+"'  "
         + "and convert(int,right('00' + ltrim(rtrim(ltrim(rtrim(substring(hora_clasificacion,charindex('-',hora_clasificacion,1)+1,len(hora_clasificacion)))))),2))<='"+hora_fin+"'"
         + "and convert(int,right('00' + ltrim(rtrim(ltrim(rtrim(substring(hora_clasificacion, charindex('-',hora_clasificacion,1)+1,len(hora_clasificacion)))))),2))>='"+hora_desde+"' "
         + "and convert(varchar,fecha,103)='"+calendario+"' and right(estado_liberacion,1)in ("+estado_formateado+") "
         + "and hora_clasificacion!='-' and tipo_huevo not in ('PI','R','RP') and clasificadora='"+clasificadora+"'" );
    
     while(rs.next()){
          
 %>
      <tr>  
       <td class="chk"  ><%=rs.getString("cod_lote")%></td> 
       <td><%=rs.getString("cod_carrito")%></td>
       <td><%=rs.getString("tipo_huevo")%></td> 
       <td><%=rs.getString("local")%></td> 
       <td><input name="checks[]" class="checkbox" type='checkbox' value="<%=rs.getString("cod_lote")%>"/></td>
       <td style="display: none"><%=rs.getString("local")%></td>       
               
                
                
             
  
               <%}%>   </tr> </tbody>  
  
                        </table>
                </div> 
            </div> 
          </div> 
  
