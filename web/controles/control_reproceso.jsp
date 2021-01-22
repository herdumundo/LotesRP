 <%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="javax.swing.JOptionPane"%>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@include  file="../chequearsesion.jsp" %>
<%
                     Connection cn = conexion.crearConexion();
     // Asignar conexion al objeto manejador de datos
     fuente.setConexion(cn);   
        String  seleccionados  = request.getParameter("caja_check");
        String combo_disposicion=request.getParameter("disposicion");
        String fecha_clasificacion=request.getParameter("calendario_reproceso");
        String fecha_alimentacion=request.getParameter("calendario_alimentacion");
        String nro_mesa=request.getParameter("txt_nro_mesa");
        String  combo_disposicion_insert=request.getParameter("disposicion_insert");
        String lote="";
        String id_lote="";
        String cod_interno_retenido="";
        String fecha_bd="";
        String  cod_carrito="";
        String tipo_huevo="";
        String cod_clasificacion="";
        String fecha_puesta="";
        String hora_clasificacion="";
        String cod_lote="";
        String resp_clasificacion="";
        String u_medida="";
        String cantidad="";
        String estado="";
        String liber="";
        String clasificadora="";
        String empacadora="";
        String aviario="";
        String liberado_por="";
        String comentario="";
        String estado_liberacion="L";
        String zona_falla ="";
        String cod_cambio="";
        String disposicion="";
        String motivo_retencion="";
        String fecha_alimentacion_bd="";
        String cod_mesas_traslado="";
        String estado_retencion="";
        String estado_registro="";
        String tipo_almacenamiento="";     
     
        String estado_recuperado="";
        String sql_update,sql_insert,sql_update2;
        String[] elementos = seleccionados.split(",");
      
        
        
        if(combo_disposicion.equals(combo_disposicion_insert)){
         if (combo_disposicion.equals("6")||combo_disposicion.equals("7")||combo_disposicion.equals("27")||combo_disposicion.equals("8")){
           for(int i=0; i<elementos.length; i++){
                lote=elementos[i];
            
        sql_update= "update lotes_retenidos set estado_registro ='C',fecha_alimentacion='"+fecha_alimentacion+"' , "
                + "cod_mesa_traslado='"+nro_mesa+"' where cod_lote='"+lote+"' and estado_registro ='A' ";
                          PreparedStatement pss = cn.prepareStatement(sql_update);
                            pss.executeUpdate();
                                                 }   
                                    %>  
            <script> 

              swal({   
                            title: "REGISTRADO!",   
                            text: "",   
                            timer: 2000,   

                            showConfirmButton: false

                                }
                                    ); 
                            $.preloader.stop();
 </script>
<% }  
        
          if(combo_disposicion.equals("9")){
               
                 for(int i=0; i<elementos.length; i++){
                lote=elementos[i];
                sql_update= "update lotes_retenidos set estado_registro ='C' where cod_lote='"+lote+"' and estado_registro ='A' ";
                          PreparedStatement pss = cn.prepareStatement(sql_update);
                          pss.executeUpdate();
            }
%>    <script> 
                swal({   
		title: "REGISTRADO!",   
		text: "",   
		timer: 2000,   
               
		showConfirmButton: false
                        }
                        ); 
                $.preloader.stop();
        </script><%
        
                    } }



        
else{
            if (combo_disposicion.equals("8")||combo_disposicion.equals("6")||combo_disposicion.equals("7")||combo_disposicion.equals("27")){
            for(int i=0; i<elementos.length; i++){
                lote=elementos[i];
             /*   ResultSet rs3 = fuente.obtenerDato(" select * from lotes_retenidos where cod_lote='"+lote+"'");
        if (rs3.next()){
                id_lote=rs3.getString("id_lote");
                        }*/
        
        ResultSet rs2 = fuente.obtenerDato(" SELECT IsNULL(MAX(cod_interno),0)+ 1 AS s FROM lotes_retenidos");
        if (rs2.next()) {
            cod_interno_retenido= rs2.getString("s");
                        }

        ResultSet rs = fuente.obtenerDato(" select "
                        + "id_lote,  "
                        + "convert(varchar,fecha,103) as fechas,"
                        + "cod_carrito,"
                        + "tipo_huevo, "
                        + "cod_clasificacion,"
                        + "convert(varchar,fecha_puesta,103) as fecha_puesta,"
                        + "hora_clasificacion,"
                        + "cod_lote,"
                        + "resp_clasificacion,"
                        + "u_medida,"
                        + "cantidad,"
                        + "estado,"
                        + "clasificadora,"
                        + "empacadora,"
                        + "aviario,"
                        + "tipo_almacenamiento,"
                        + "comentario,"
                        + "motivo_retencion,"
                        + "estado_retencion,"
                        + "disposicion, estado_liberacion"
                        + " from lotes_retenidos where cod_lote='"+lote+"' and movimiento='A'");
        if (rs.next())                              {
                id_lote=rs.getString(1);
                fecha_bd=rs.getString(2);
                cod_carrito=rs.getString(3);
                tipo_huevo=rs.getString(4);
                cod_clasificacion=rs.getString(5);
                fecha_puesta=rs.getString(6);
                hora_clasificacion=rs.getString(7);
                cod_lote=rs.getString(8);
                resp_clasificacion=rs.getString(9);
                u_medida=rs.getString(10);
                cantidad=rs.getString(11);
                estado=rs.getString(12);
                clasificadora=rs.getString(13);
                empacadora=rs.getString(14);
                aviario=rs.getString(15);
                tipo_almacenamiento=rs.getString(16);
                liberado_por= (String) sesionOk.getAttribute("nombre_usuario");
                comentario=rs.getString(17);
                 motivo_retencion=rs.getString(18);
                 estado_retencion=rs.getString(19);
                 disposicion=rs.getString(20);
                liber=rs.getString(21);
                                                        }

       sql_update= "update lotes_retenidos set estado_registro ='C',movimiento ='C',fecha_alimentacion='"+fecha_alimentacion+"' , "
                + "cod_mesa_traslado='"+nro_mesa+"' where cod_lote='"+lote+"' and movimiento='a' ";
                            PreparedStatement pss = cn.prepareStatement(sql_update);
                            pss.executeUpdate();
            
          
           sql_insert = " insert into lotes_retenidos ("
                        + "cod_interno,"
                        + "fecha,"
                        + "cod_carrito,"
                        + "tipo_huevo,"
                        + "cod_clasificacion,"
                        + "fecha_puesta,"
                        + "hora_clasificacion,"
                        + "cod_lote,"                    
                        + "resp_clasificacion,"
                        + "u_medida,"
                        + "cantidad,"
                        + "estado,"
                        + "estado_liberacion"
                        + ",clasificadora,"
                        + "empacadora,"
                        + "aviario,"
                        + "tipo_almacenamiento,"
                        + "comentario,"
                        + "estado_retencion,"
                        + "disposicion,"
                        + "motivo_retencion,"
                        + "id_lote,"
                        + "estado_registro,"
                        + "fecha_alimentacion,movimiento)"
                        + "values("
                        +cod_interno_retenido+",'"
                        +fecha_bd+"','"
                        +cod_carrito+"','"
                        +tipo_huevo+"','"
                        +cod_clasificacion+ "','"
                        +fecha_puesta+"','"
                        +hora_clasificacion+"','"
                        +cod_lote+"','"
                        +resp_clasificacion+"','"
                        +u_medida+ "','"
                        +cantidad+"','"
                        +estado+"',"
                          + "'"+liber+"','"
                        +clasificadora+"','"
                        +empacadora+"','"
                        +aviario+"','"
                        +tipo_almacenamiento+"','"
                        +comentario+"','"
                        +estado_retencion+"','"
                        +combo_disposicion_insert+"','"
                        +motivo_retencion+"','"
                        +id_lote+"','C','"+fecha_alimentacion+"','A' )";

                        PreparedStatement ps = cn.prepareStatement(sql_insert);
                        ps.executeUpdate();  
           }   
         
            %>  
            <script> 

              swal({   
                            title: "REGISTRADO!",   
                            text: "",   
                            timer: 2000,   

                            showConfirmButton: false

                                }
                                    ); 
                            $.preloader.stop();
            </script>
<%
         
        }  
            
             if(combo_disposicion.equals("9")){
               
                 for(int i=0; i<elementos.length; i++){
                lote=elementos[i];
                ResultSet rs = fuente.obtenerDato(" select "
                        + "id_lote,  "
                        + "convert(varchar,fecha,103) as fechas,"
                        + "cod_carrito,"
                        + "tipo_huevo, "
                        + "cod_clasificacion,"
                        + "convert(varchar,fecha_puesta,103) as fecha_puesta,"
                        + "hora_clasificacion,"
                        + "cod_lote,"
                        + "resp_clasificacion,"
                        + "u_medida,"
                        + "cantidad,"
                        + "estado,"
                        + "clasificadora,"
                        + "empacadora,"
                        + "aviario,"
                        + "tipo_almacenamiento,"
                        + "comentario,"
                        + "motivo_retencion,"
                        + "estado_retencion,"
                        + "disposicion,estado_liberacaion"
                        + " from lotes_retenidos where cod_lote='"+lote+"' and movimiento='a'");
        if (rs.next()){
                id_lote=rs.getString(1);
                fecha_bd=rs.getString(2);
                cod_carrito=rs.getString(3);
                tipo_huevo=rs.getString(4);
                cod_clasificacion=rs.getString(5);
                fecha_puesta=rs.getString(6);
                hora_clasificacion=rs.getString(7);
                cod_lote=rs.getString(8);
                resp_clasificacion=rs.getString(9);
                u_medida=rs.getString(10);
                cantidad=rs.getString(11);
                estado=rs.getString(12);
                clasificadora=rs.getString(13);
                empacadora=rs.getString(14);
                aviario=rs.getString(15);
                tipo_almacenamiento=rs.getString(16);
                liberado_por= (String) sesionOk.getAttribute("nombre_usuario");
                comentario=rs.getString(17);
                 motivo_retencion=rs.getString(18);
                 estado_retencion=rs.getString(19);
                 disposicion=rs.getString(20);
                 liber=rs.getString(21);
            }
        ResultSet rs2 = fuente.obtenerDato(" SELECT IsNULL(MAX(cod_interno),0)+ 1 AS s FROM lotes_retenidos");
        if (rs2.next()){
            cod_interno_retenido= rs2.getString("s");
            
                       } 
        
        sql_update= "update lotes_retenidos set estado_registro ='C' ,movimiento ='C' "
            + "where cod_lote='"+lote+"' and movimiento='a' ";
                          PreparedStatement pss = cn.prepareStatement(sql_update);
                            pss.executeUpdate();
            
              sql_insert = " insert into lotes_retenidos ("
                        + "cod_interno,"
                        + "fecha,"
                        + "cod_carrito,"
                        + "tipo_huevo,"
                        + "cod_clasificacion,"
                        + "fecha_puesta,"
                        + "hora_clasificacion,"
                        + "cod_lote,"                    
                        + "resp_clasificacion,"
                        + "u_medida,"
                        + "cantidad,"
                        + "estado,"
                        + "estado_liberacion"
                        + ",clasificadora,"
                        + "empacadora,"
                        + "aviario,"
                        + "tipo_almacenamiento,"
                        + "comentario,"
                        + "estado_retencion,"
                        + "disposicion,"
                        + "motivo_retencion,"
                        + "id_lote,"
                        + "estado_registro,movimiento)"
                        + "values("
                        +cod_interno_retenido+",'"
                        +fecha_bd+"','"
                        +cod_carrito+"','"
                        +tipo_huevo+"','"
                        +cod_clasificacion+ "','"
                        +fecha_puesta+"','"
                        +hora_clasificacion+"','"
                        +cod_lote+"','"
                        +resp_clasificacion+"','"
                        +u_medida+ "','"
                        +cantidad+"','"
                        +estado+"',"
                          + "'"+liber+"','"
                        +clasificadora+"','"
                        +empacadora+"','"
                        +aviario+"','"
                        +tipo_almacenamiento+"','"
                        +comentario+"','"
                        +estado_retencion+"','"
                        +disposicion+"','"
                        +motivo_retencion+"','"
                        +id_lote+"','C','A' )";

                        PreparedStatement ps = cn.prepareStatement(sql_insert);
                        ps.executeUpdate();  
          
        /*  ResultSet rs1 = fuente.obtenerDato(" select * from lotes where cod_interno='"+id_lote+"'");
        if (rs1.next()){
             
         estado_recuperado=rs1.getString("estado_liberacion");
        }

        sql_update2= "update lotes set estado_liberacion ='"+estado_recuperado+"/L' where cod_interno='"+id_lote+"' ";
                            PreparedStatement ps4 = cn.prepareStatement(sql_update2);
                            ps4.executeUpdate();
             
             */
           }
%>    <script> 

  swal({   
		title: "REGISTRADO!",   
		text: "",   
		timer: 2000,   
               
		showConfirmButton: false
          
                    }
                        ); 
$.preloader.stop();
</script><%
        
}
         
       }    %>
           