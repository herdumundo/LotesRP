  <%@page import="org.json.JSONObject"%>
<%@page import="javax.swing.JOptionPane"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="conexion_maehara" class="clases.bdconexion2" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<jsp:useBean id="fuente_maehara" class="clases.fuentedato2" scope="page"/>
 
<%@ page contentType="application/json; charset=utf-8" %>

<%@include  file="../chequearsesion.jsp" %>
<%    
    JSONObject ob = new JSONObject();
    Connection cn = conexion.crearConexion();
    Connection cnMaehara = conexion_maehara.crearConexion();
    fuente.setConexion(cn);
    fuente_maehara.setConexion(cnMaehara);
  String mensaje=null;
     String tipo_respuesta=null;
    try {
         
    
         // Crear objeto de conexion al DB     
     String fecha_puesta                = request.getParameter("fecha_puesta");
     String usuario                     = (String) sesionOk.getAttribute("usuario");
     String clasificadora               = (String) sesionOk.getAttribute("clasificadora");
     String nrocarro                    = request.getParameter("cod_carrito");
     String nombre_usuario = (String) sesionOk.getAttribute("nombre_usuario");
     String tipo_huevo                  = request.getParameter("tipo_huevo");
     String cantidad                    = request.getParameter("txt_cantidad");//SE PASA A AJAX
     String unidad_medida               = "GR";
     String categoria                   = (String) sesionOk.getAttribute("categoria");
     String hora_desde                  = request.getParameter("hora_desde");
     String hora_hasta                  = request.getParameter("hora_hasta");
     String fecha                       = request.getParameter("calendario_registro");
     String tipo_aviario                = request.getParameter("tipo_aviario");
     String responsable                 = request.getParameter("txt_responsable");
     String liberado                    = request.getParameter("txt_liberado");
     String comentario                  = request.getParameter("txt_obs");
     String cbox_reproceso              = request.getParameter("cbox_reproceso");
     String cbox_subproducto            = request.getParameter("cbox_sub");
     String cbox_zona                   = request.getParameter("cbox_zona_liberado");
     String combobox="";
     String empacadora_formateada="";
     String fecha_formateada=fecha.replace("/","");
     String  fecha_puesta_form=fecha_puesta.replace("/", "");
     String hora_desde_hasta;
     String fecha_bd_formateada=""; 
     String fecha_bd="" ; 
      String tipo_huevo_formateado=""; 
     String lote="";
     hora_desde_hasta=hora_desde+"-"+hora_hasta;    
        empacadora_formateada="N/A"; 
    
                                                 
      
        String fecha_puesta_form2= fecha_puesta.replace("/","");

        lote=nrocarro+"_"+fecha_puesta_form2+"_"+categoria+"_"+tipo_huevo;
     
     
     
            if(tipo_huevo.equals("8")){
             combobox=cbox_subproducto;
               tipo_huevo_formateado= "PI";
                                            }

            else if(tipo_huevo.equals("RP")) {
            combobox=cbox_reproceso;
               tipo_huevo_formateado= "RP";
                                        }
            else if(tipo_huevo.equals("9"))  {
            combobox=cbox_zona;
                     tipo_huevo_formateado= "R";

                                        }
            else    {
            combobox="N/A";
                    }
            
            
            ResultSet rs3 = fuente.obtenerDato("  select convert(varchar(10),GETDATE(),121) as fecha;" );
            if (rs3.next()){
            fecha_bd=rs3.getString("fecha");
            fecha_bd_formateada=fecha_bd.replace("-","");
                            } 
            int fechabd,fecha_registro,fecha_puesta_int;
                fechabd=Integer.parseInt(fecha_bd_formateada);
                fecha_registro=Integer.parseInt(fecha_formateada);
                fecha_puesta_int=Integer.parseInt(fecha_puesta_form);   
                
        ResultSet rs4 = fuente.obtenerDato(" select * from maehara.dbo.OIGN a inner join maehara.dbo.IGN1 b on "
                        + "a.docentry = b.docentry where  convert(varchar, a.docdate, 111) = convert(varchar, '"+fecha+"', 103) "
                                + "and b.itemcode = 'HVO-00001'" );
            if (rs4.isBeforeFirst()){
                  mensaje="No es posible generar registro. La fecha de clasificación ya ha sido costeada";
                    tipo_respuesta="0";
         
        }
                if (fecha_registro>fechabd) {
                    mensaje="Fecha de clasificacion incorrecta. Favor verifique";
                    tipo_respuesta="0";
      //
           }
      if (fecha_puesta_int>fecha_registro) {
     
          mensaje="Fecha de clasificacion incorrecta. Favor verifique";
                    tipo_respuesta="0";
         
         }

 
 if (fecha_registro<=fechabd && fecha_puesta_int<=fecha_registro  && !rs4.isBeforeFirst())  {
      
        String Insertar;

 
        Insertar = "   insert into lotes (fecha,cod_carrito,tipo_huevo,"
        + "cod_clasificacion,fecha_puesta,hora_clasificacion,cod_lote,"
        + "resp_clasificacion,u_medida,cantidad,estado,estado_liberacion"
        + ",clasificadora,empacadora,aviario,tipo_almacenamiento,liberado_por,"
        + "comentario,zona_falla,resp_control_calidad,clasificadora_actual,clasificadora_origen)"
        + "values( '"+fecha_formateada+"','"+nrocarro+"','"+tipo_huevo_formateado+"','"+categoria+
        "','"+fecha_puesta_form+"','"+hora_desde_hasta+"','"+lote+"',upper('"+responsable+"'),'"+unidad_medida+
        "','"+cantidad+"','A','L','"+clasificadora+"','"+empacadora_formateada+"','"+tipo_aviario+"','-',"
        + " upper('"+liberado+"'),upper('"+comentario+"'),'"+combobox+"','"+nombre_usuario+"','"+clasificadora+"','"+clasificadora+"')";
     
                    PreparedStatement ps = cn.prepareStatement(Insertar);
                    ps.executeUpdate(); 
                    mensaje="REGISTRADO CON EXITO.";
                    tipo_respuesta="1";
                    
                        }     
            ob.put("mensaje", mensaje);
            ob.put("tipo_respuesta", tipo_respuesta);
             } catch (Exception e) {
                mensaje=e.toString();
                tipo_respuesta="0";
     }
  
            out.print(ob);
 %>
   
   
   
 
          
          
          
          
          
         
