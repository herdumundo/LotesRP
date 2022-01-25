<%@page import="java.sql.CallableStatement"%>
<%@page import="com.microsoft.sqlserver.jdbc.SQLServerDataTable"%>
<%@page import="java.util.ArrayList"%>
<%@page import="clases.aviarios"%>
<%@page import="com.fasterxml.jackson.databind.ObjectMapper"%>
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
    // Crear objeto de conexion al DB     
    String fecha_puesta                 = request.getParameter("fecha_puesta");
    String usuario                      = (String) sesionOk.getAttribute("usuario");
    String clasificadora                = (String) sesionOk.getAttribute("clasificadora");
    String nrocarro                     = request.getParameter("cod_carrito");
    String nombre_usuario               = (String) sesionOk.getAttribute("nombre_usuario");
    String tipo_huevo                   = request.getParameter("tipo_huevo");
    String cantidad                     = request.getParameter("txt_cantidad_total");//SE PASA A AJAX
    String unidad_medida                = "GR";
    String categoria                    = (String) sesionOk.getAttribute("categoria");
    String hora_desde                   = request.getParameter("hora_desde");
    String hora_desde_minutos           = request.getParameter("hora_inicio_form");
    String hora_hasta_minutos           = request.getParameter("hora_final_form");
    String fecha_fin                    = request.getParameter("fecha_clas_final");
    String hora_hasta                   = request.getParameter("hora_hasta");
    String fecha                        = request.getParameter("calendario_registro");
    String tipo_aviario                 = request.getParameter("tipo_aviario");
    String responsable                  = request.getParameter("txt_responsable");
    String liberado                     = request.getParameter("txt_liberado");
    String comentario                   = request.getParameter("txt_obs");
    String cbox_reproceso               = request.getParameter("cbox_reproceso");
    String cbox_subproducto             = request.getParameter("cbox_sub");
    String cbox_zona                    = request.getParameter("cbox_zona_liberado");
    String  aviarios []                 = request.getParameterValues("cbox_aviarios");
    String combobox="";
    String fecha_formateada=fecha.replace("/","");
    String  fecha_puesta_form=fecha_puesta.replace("/", "");
    String tipo_huevo_formateado=""; 
    String lote="";
      int  tipo_respuesta=0;          
      String mensaje="";
   
     try 
     {
        SQLServerDataTable DataTableGrilla = new SQLServerDataTable();
        DataTableGrilla.addColumnMetadata("aviario" ,   java.sql.Types.VARCHAR);
        if(aviarios!=null)
        {
            for(int i=0; i<aviarios.length; i++)   
            {
                DataTableGrilla.addRow(aviarios[i]);
            } 
        }
        String fecha_puesta_form2= fecha_puesta.replace("/","");
        lote=nrocarro+"_"+fecha_puesta_form2+"_"+categoria+"_"+tipo_huevo;
        if(tipo_huevo.equals("8"))
        {
            combobox=cbox_subproducto;
            tipo_huevo_formateado= "PI";
        }
        else if(tipo_huevo.equals("RP")) 
        {
            combobox=cbox_reproceso;
            tipo_huevo_formateado= "RP";
        }
        else if(tipo_huevo.equals("9"))  
        {
            combobox=cbox_zona;
            tipo_huevo_formateado= "R";
        }
        else    
        {
            combobox="N/A";
        }
            
            cn.setAutoCommit(false);
            CallableStatement  callableStatement=null;   
            callableStatement = cn.prepareCall("{call mae_ptc_insert_mis(?,?,?,?,?,?,?,?,?,?,  ?,?,?,?,?,?,?,?,?,?,    ?,?,?,?,?,?,?,?,? )}");
            callableStatement .setString(1,  fecha_puesta );
            callableStatement .setString(2,  fecha );
            callableStatement .setString(3, clasificadora);
            callableStatement .setString(4, nrocarro);
            callableStatement .setString(5, lote);
            callableStatement .setString(6, "N/A");
            callableStatement .setString(7, "");
            callableStatement .setString(8, "N/A");
            callableStatement .setString(9, tipo_huevo_formateado);
            callableStatement .setInt   (10,   Integer.parseInt(cantidad)   );  
            callableStatement .setString(11, unidad_medida);
            callableStatement .setString(12, categoria);
            callableStatement .setString(13, hora_desde);
            callableStatement .setString(14, hora_hasta);            
            callableStatement .setString(15, tipo_aviario);
            callableStatement .setString(16, "-");
            callableStatement .setString(17, "N/A");
            callableStatement .setString(18, responsable);
            callableStatement .setString(19, comentario);
            callableStatement .setString(20, liberado);
            callableStatement .setString(21, combobox);//ZONA
            callableStatement .setString(22, nombre_usuario);
            callableStatement .setString(23, "N/A");
            callableStatement .setString(24, hora_desde_minutos);//FALTA
            callableStatement .setString(25, hora_hasta_minutos);//FALTA
            callableStatement .setString(26, fecha_fin);//FALTA
            callableStatement .setObject(27, DataTableGrilla );
         
            callableStatement.registerOutParameter("estado_registro", java.sql.Types.INTEGER);
            callableStatement.registerOutParameter("mensaje", java.sql.Types.VARCHAR);
            callableStatement.execute();
            tipo_respuesta = callableStatement.getInt("estado_registro");
            mensaje= callableStatement.getString("mensaje");
            if (tipo_respuesta==0)
            {
                cn.rollback(); 
            }   
            else  
            {
                 //cn.rollback(); 
                 cn.commit();
            }

        } catch (Exception e) {
               mensaje=e.toString();
              tipo_respuesta=0;
     }
  
            ob.put("mensaje", mensaje);
            ob.put("tipo_respuesta", tipo_respuesta);
            
            out.print(ob);
 %> 