 <%@page import="javax.swing.JOptionPane"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@include  file="chequearsesion.jsp" %>
<%Connection cn = conexion.crearConexion();
     // Asignar conexion al objeto manejador de datos
     fuente.setConexion(cn);
  
         // Crear objeto de conexion al DB     
     String fecha_puesta                = request.getParameter("fecha_puesta");
     String usuario                     = (String) sesionOk.getAttribute("usuario");
     String clasificadora               = (String) sesionOk.getAttribute("clasificadora");
     String nrocarro2                    = request.getParameter("cod_carrito");
    
     String area="";
 String tipo_huevo                  = request.getParameter("tipo_huevo");
     String cantidad                    = request.getParameter("txt_cantidad");
     String unidad_medida               = request.getParameter("unidad_medida");
     String categoria                   = request.getParameter("categoria");
     String hora_desde                  = request.getParameter("hora_desde");
     String hora_hasta                  = request.getParameter("hora_hasta");
     String fecha                       = request.getParameter("calendario_registro");
     String tipo_aviario                = request.getParameter("tipo_aviario");
     String tipo_almacenamiento         = request.getParameter("tipo_almacenamiento");
     String responsable                 = request.getParameter("txt_responsable");
     String liberado                    = request.getParameter("txt_liberado");
     String comentario                  = request.getParameter("txt_obs");
      String carro_pantalla="";
     String cbox_reproceso              = request.getParameter("cbox_reproceso");
     String cbox_subproducto            = request.getParameter("cbox_sub");
     String cbox_zona                   = request.getParameter("cbox_zona_liberado");
     String combobox="";
     String empacadora="";
     String empacadora_formateada="";
     String fecha_formateada=fecha.replace("/","");
     String  fecha_puesta_form=fecha_puesta.replace("/", "");
     String hora_desde_hasta;
     String fecha_bd_formateada=""; 
     String fecha_bd="" ; 
     String codigo="";  
     String codigo_caja="";
     String tipo_huevo_formateado=""; 
     String unidad_format="";
     String deposito="";
     String nrocarro="";
     String lote="";
     String id_retenido="";
     hora_desde_hasta=hora_desde+"-"+hora_hasta;    
      
    if(clasificadora.equals("A")){
       area="CCHA";
                                    }
     if(clasificadora.equals("B")){
       area="CCHB";
                                    }
    if(clasificadora.equals("O")){
       area="OVO";
                                    }
          
       
        if(nrocarro2.length()<=2){
      nrocarro="PALLETS"+nrocarro2;
      }
      else {
       nrocarro=nrocarro2;
      }
     
        String fecha_puesta_form2= fecha_puesta.replace("/","");
        lote=nrocarro+"_"+fecha_puesta_form2+"_"+categoria+"_"+tipo_huevo;
        
        if(tipo_huevo.equals("1")||tipo_huevo.equals("2")||tipo_huevo.equals("3")||tipo_huevo.equals("4")||tipo_huevo.equals("5")||tipo_huevo.equals("6")||tipo_huevo.equals("7"))
        {   
    
            String[] empacadora_obs = request.getParameterValues("nro_empacadora");
               for(int i=0; i<empacadora_obs.length; i++)   {
               
                    if (empacadora_obs.length>1){
                        empacadora+=empacadora_obs[i]+"-";  
                        empacadora_formateada=empacadora.toString();
                        empacadora_formateada = empacadora_formateada.substring(0, empacadora_formateada.length() - 1);
                   }
                    if (empacadora_obs.length==1){
                        empacadora+=empacadora_obs[i];  
                        empacadora_formateada=empacadora.toString();
                   }
                                                            }
                        
   
          }
            if(tipo_huevo.equals("RP")||tipo_huevo.equals("9")||tipo_huevo.equals("8")||tipo_huevo.equals("SC"))
                                { 
                empacadora_formateada="N/A";
                                 }
     
            if(tipo_huevo.equals("8")){
             combobox=cbox_subproducto;
                                            }

            if(tipo_huevo.equals("RP")) {
            combobox=cbox_reproceso;
                                        }
            if(tipo_huevo.equals("9"))  {
            combobox=cbox_zona;
                                        }
            else    {
            combobox="N/A";
                    }
    
            if(tipo_huevo.equals("1"))  {
                tipo_huevo_formateado= "G";
               
                                        }
            if(tipo_huevo.equals("2"))  {
            
              tipo_huevo_formateado= "J";
               
                                        }
            if(tipo_huevo.equals("3"))  {
            
              tipo_huevo_formateado= "S";
               
                                        }
            if(tipo_huevo.equals("4"))  {
            
              tipo_huevo_formateado= "A";
               
                                        }
            if(tipo_huevo.equals("5"))  {
            
              tipo_huevo_formateado= "B";
               
                                        }
       
            if(tipo_huevo.equals("6"))  {
            
              tipo_huevo_formateado= "C";
               
                                        }
            if(tipo_huevo.equals("7"))  {
            
              tipo_huevo_formateado= "D";
               
                                        }
            if(tipo_huevo.equals("8"))  {
            
              tipo_huevo_formateado= "PI";
               
                                        }
            if(tipo_huevo.equals("SC")) {
            
              tipo_huevo_formateado= "SC";
               
                                        }
            if(tipo_huevo.equals("9"))  {
            
              tipo_huevo_formateado= "R";
               
                                        }
            if(tipo_huevo.equals("RP")) {
            
              tipo_huevo_formateado= "RP";
               
                                        }

            if(clasificadora.equals("A")){  deposito="6"; }
            if(clasificadora.equals("B")){  deposito="7";}
            if(clasificadora.equals("O")){  deposito="8"; }
         
         ResultSet rs_carro2 = fuente.obtenerDato(" use grupomaehara_prueba "
+ "select distinct clasificadora from lotes where cod_carrito='"+nrocarro+"' and clasificadora not in ('"+clasificadora+"') and estado='A'" );
         while(rs_carro2.next()){
carro_pantalla=rs_carro2.getString(1);

} 
         
         
         ResultSet rs1 = fuente.obtenerDato("use control_cajas SELECT IsNULL(MAX(nroReg),0)+ 1 AS s FROM stock_carritos");
        if (rs1.next()){
             codigo_caja = rs1.getString("s");
         
        } 
         ResultSet rs_retenido = fuente.obtenerDato(" use GrupoMaehara_prueba SELECT IsNULL(MAX(cod_interno),0)+ 1 AS s FROM lotes_retenidos");
        if (rs_retenido.next()){
             id_retenido = rs_retenido.getString("s");
         
        } 
          ResultSet rs2 = fuente.obtenerDato(" use GrupoMaehara_prueba SELECT IsNULL(MAX(cod_interno),0)+ 1 AS s FROM lotes");
        if (rs2.next()){
             codigo = rs2.getString("s");
                       } 
            String resul_str="";
            int resultado_unid=0;
            int cantidad_=0;
            int unidad_medi=0;
            if (unidad_medida.equals("1")){ unidad_format ="GR";}
            if (unidad_medida.equals("180")){ unidad_format ="CAJ";}
            if (unidad_medida.equals("360")){ unidad_format ="CAJ";}
            if (unidad_medida.equals("4320")){ unidad_format ="CAR";}
          
          
            if(unidad_medida.equals("180")){
              cantidad_=Integer.parseInt(cantidad);
              unidad_medi=Integer.parseInt(unidad_medida);
              resultado_unid= cantidad_*unidad_medi;
              resul_str=String.valueOf(resultado_unid);
              }
          
            if(unidad_medida.equals("360")){
              cantidad_=Integer.parseInt(cantidad);
              unidad_medi=Integer.parseInt(unidad_medida);
              resultado_unid= cantidad_*unidad_medi;
              resul_str=String.valueOf(resultado_unid);
              }
          
            if(unidad_medida.equals("4320")){
            
              resultado_unid= 4320;
              resul_str=String.valueOf(resultado_unid);
              }

            if(unidad_medida.equals("1")) {
            resul_str=  cantidad;
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
                
                
            if (tipo_huevo.equals("9")||tipo_huevo.equals("8")||tipo_huevo.equals("RP")||tipo_huevo.equals("SC")) {
         
                ResultSet rs4 = fuente.obtenerDato(" use maehara select * from maehara.dbo.OIGN a inner join maehara.dbo.IGN1 b on a.docentry = b.docentry where  convert(varchar, a.docdate, 111) = convert(varchar, '"+fecha+"', 103) and b.itemcode = 'HVO-00001'" );
            if (rs4.isBeforeFirst()){
            %> 
            <script>
               
               swal({   
		title: "No es posible generar registro. La fecha de clasificación ya ha sido costeada",   
		text: "",   
		timer: 2000,   
               
		showConfirmButton: false
          
                    }
                        ); 
           </script>
                 <%
        }
                if (fecha_registro>fechabd) {
        %> 
                <script>
               
               swal({   
		title: "Fecha de clasificacion incorrecta. Favor verifique",   
		text: "",   
		timer: 2000,   
               
		showConfirmButton: false
          
	}
               ); 
           </script>
        
        <%
           }
      if (fecha_puesta_int>fecha_registro) {
            %> 
         <script>
               
               swal({   
		title: "Fecha de clasificacion incorrecta. Favor verifique",   
		text: "",   
		timer: 2000,   
               
		showConfirmButton: false
                    }
                    ); 
           </script>
   <%
       
         }

 
 if (fecha_registro<=fechabd && fecha_puesta_int<=fecha_registro  && !rs4.isBeforeFirst())  {
      
        String Insertar,inserta_control_caja,actualizar_deposito;

 
            Insertar = " use GrupoMaehara_prueba  insert into lotes (cod_interno,fecha,cod_carrito,tipo_huevo,"
         + "cod_clasificacion,fecha_puesta,hora_clasificacion,cod_lote,"
         + "resp_clasificacion,u_medida,cantidad,estado,estado_liberacion"
         + ",clasificadora,empacadora,aviario,tipo_almacenamiento,liberado_por,comentario,zona_falla)"
          + "values('"+codigo+"','"+fecha_formateada+"','"+nrocarro+"','"+tipo_huevo_formateado+"','"+categoria+
         "','"+fecha_puesta_form+"','"+hora_desde_hasta+"','"+lote+"',upper('"+responsable+"'),'"+unidad_format+
         "','"+resul_str+"','A','L','"+clasificadora+"','"+empacadora_formateada+"','"+tipo_aviario+"','"+tipo_almacenamiento+
         "',upper('"+liberado+"'),upper('"+comentario+"'),'"+combobox+"')";
     
                    PreparedStatement ps = cn.prepareStatement(Insertar);
                      ps.executeUpdate(); 


 
                  /*  inserta_control_caja=" use control_cajas insert into stock_carritos (nroReg,almacen,codcarrito,fecha,estado,nromov,activo) "
                   + "values('"+codigo_caja+"','"+deposito+"','"+nrocarro+"',CURRENT_TIMESTAMP,'CARG','0','1')";

                    PreparedStatement ps2 = cn.prepareStatement(inserta_control_caja);
                           // ejecuta la sentencia SQL para insertar
                         ps2.executeUpdate();  
 
                    actualizar_deposito=" use control_cajas update stock_carritos"
                    + "   set activo='0' where codcarrito ='"+nrocarro+"' AND activo='1' and estado='a'";

                    PreparedStatement ps4 = cn.prepareStatement(actualizar_deposito);
                           // ejecuta la sentencia SQL para insertar
                         ps4.executeUpdate();  */ 
                        %> 
                 <a>reg</a>
                <%
                        }     } 



                if (tipo_huevo.equals("1")||tipo_huevo.equals("2")||
                    tipo_huevo.equals("3")||tipo_huevo.equals("4")
                ||tipo_huevo.equals("5")||tipo_huevo.equals("6")||tipo_huevo.equals("7")) {

                ResultSet rs4 = fuente.obtenerDato("use maehara select * from maehara.dbo.OIGN a inner join maehara.dbo.IGN1 b on a.docentry = b.docentry where  convert(varchar, a.docdate, 111) = convert(varchar, '"+fecha+"', 103) and b.itemcode = 'HVO-00001'" );
                    if (rs4.isBeforeFirst()){
                    %> 
      
                <script>
               
               swal({   
		title: "No es posible generar registro. La fecha de clasificación ya ha sido costeada",   
		text: "",   
		timer: 2000,   
               
		showConfirmButton: false
          
                    }
                    ); 
                    </script>
      
       
         <%
    }


    String carro_pantalla_sap="";
     ResultSet rs_sap2 = fuente.obtenerDato("use maehara select distinct t2.mnfserial, t0.whscode"
        + " from obtq t0  inner join oitm t1 on t0.itemcode=t1.itemcode inner join obtn t2 on t0.itemcode=t2.itemcode and t0.SysNumber=t2.SysNumber "
        + "where t2.MnfSerial='"+nrocarro+"' and t0.WhsCode not in ('"+area+"') and t0.quantity=4320");
                   while(rs_sap2.next()){
carro_pantalla_sap=rs_sap2.getString(2);

} 
   

 ResultSet rs_sap = fuente.obtenerDato(" use maehara select distinct t2.mnfserial, t0.whscode"
+ " from obtq t0  inner join oitm t1 on t0.itemcode=t1.itemcode inner join obtn t2 on t0.itemcode=t2.itemcode and t0.SysNumber=t2.SysNumber "
+ "where t2.MnfSerial='"+nrocarro+"' and t0.WhsCode not in ('"+area+"') and t0.quantity=4320");
                
   
                 if (rs_sap.isBeforeFirst()){
 
 %> 
        <script>
              
               var a,carro;
               a="<%=carro_pantalla_sap%>";
                carro="<%=nrocarro%>";
               swal({   
		title: "EL NUMERO DE CARRO "+carro+" SE ESTÁ  UTILIZANDO EN CLASIFICADORA "+a ,   
		text: "",   
		timer: 4000,   
               
		showConfirmButton: false
          
                    }
                    ); 
                    </script>
      
       
         <%
                                            }


 

  ResultSet rs_carro = fuente.obtenerDato(" use grupomaehara_prueba "
+ "select distinct clasificadora from lotes where cod_carrito='"+nrocarro+"' and clasificadora not in ('"+clasificadora+"') and estado='A'" );
                
  
                 if (rs_carro.isBeforeFirst()){


String Insertar_auditoria=""; 
Insertar_auditoria = " use GrupoMaehara_prueba insert into lotes_auditoria (cod_interno,fecha,cod_carrito,tipo_huevo,"
                        + "cod_clasificacion,fecha_puesta,hora_clasificacion,cod_lote,"
                        + "resp_clasificacion,u_medida,cantidad,estado,estado_liberacion"
                        + ",clasificadora,empacadora,aviario,tipo_almacenamiento,liberado_por,comentario,zona_falla)"
                         + "values('"+codigo+"','"+fecha_formateada+"','"+nrocarro+"','"+tipo_huevo_formateado+"','"+categoria+
                        "','"+fecha_puesta_form+"','"+hora_desde_hasta+"','"+lote+"',upper('"+responsable+"'),'"+unidad_format+
                        "','"+resul_str+"','A','L','"+clasificadora+"','"+empacadora_formateada+"','"+tipo_aviario+"','"+tipo_almacenamiento+
                        "',upper('"+liberado+"'),upper('"+comentario+"'),'"+combobox+"')";

                PreparedStatement ps = cn.prepareStatement(Insertar_auditoria);
                ps.executeUpdate(); 
 
                    %> 
      
                <script>
              
               var a,carro;
               a="<%=carro_pantalla%>";
               carro="<%=nrocarro%>";
               swal({   
		title: "EL NUMERO DE CARRO "+carro+" SE ESTÁ  UTILIZANDO EN CLASIFICADORA "+a ,   
		text: "",   
		timer: 4000,   
               
		showConfirmButton: false
          
                    }
                    ); 
                    </script>
      
        <%
                }

    ResultSet rs5 = fuente.obtenerDato(" use GrupoMaehara_prueba select * from lotes where cod_lote='"+lote+"' and estado='A' and clasificadora='"+clasificadora+"' and hora_clasificacion='"+hora_desde_hasta+"'" );
      if (rs5.isBeforeFirst()){
                
              %>
              
              <script>
               
               swal({   
		title: "Número de carrito duplicado para la fecha de puesta",   
		text: "",   
		timer: 2000,   
               
		showConfirmButton: false
          
                    }
               ); 
           </script> 
                <%
      }         
                if (fecha_registro>fechabd) {
                %> 
         
             <script>
               
               swal({   
		title: "Fecha de clasificacion incorrecta. Favor verifique",   
		text: "",   
		timer: 2000,   
               
		showConfirmButton: false
          
                    }
               ); 
           </script> 
          <%
        }
      if (fecha_puesta_int>fecha_registro) {
       %> 
        <script>
               
               swal({   
		title: "Fecha de clasificacion incorrecta. Favor verifique",   
		text: "",   
		timer: 2000,   
               
		showConfirmButton: false
          
	}
               ); 
           </script> 
                <%
       
         }
             if (fecha_registro<=fechabd && fecha_puesta_int<=fecha_registro && !rs5.isBeforeFirst() && !rs4.isBeforeFirst())  {//&&!rs_carro.isBeforeFirst()&&!rs_sap.isBeforeFirst()
      
            String Insertar,insertar_retenido,inserta_control_caja,actualizar_deposito;

           /* Insertar = " use GrupoMaehara_prueba insert into lotes (cod_interno,fecha,cod_carrito,tipo_huevo,"
                        + "cod_clasificacion,fecha_puesta,hora_clasificacion,cod_lote,"
                        + "resp_clasificacion,u_medida,cantidad,estado,estado_liberacion"
                        + ",clasificadora,empacadora,aviario,tipo_almacenamiento,liberado_por,comentario,zona_falla)"
                         + "values('"+codigo+"','"+fecha_formateada+"','"+nrocarro+"','"+tipo_huevo_formateado+"','"+categoria+
                        "','"+fecha_puesta_form+"','"+hora_desde_hasta+"','"+lote+"',upper('"+responsable+"'),'"+unidad_format+
                        "','"+resul_str+"','A','L','"+clasificadora+"','"+empacadora_formateada+"','"+tipo_aviario+"','"+tipo_almacenamiento+
                        "',upper('"+liberado+"'),upper('"+comentario+"'),'"+combobox+"')";

                PreparedStatement ps = cn.prepareStatement(Insertar);
                ps.executeUpdate(); */
 
   
 
 insertar_retenido = "use GrupoMaehara_prueba  insert into lotes_retenidos (id_lote,fecha,cod_carrito,tipo_huevo,"
                        + "cod_clasificacion,fecha_puesta,hora_clasificacion,cod_lote,"
                        + "resp_clasificacion,u_medida,cantidad,estado,estado_liberacion"
                        + ",clasificadora,empacadora,aviario,tipo_almacenamiento,liberado_por,comentario,zona_falla,estado_registro,"
                        + "cod_interno)"
                         + "values('"+codigo+"','"+fecha_formateada+"','"+nrocarro+"','"+tipo_huevo_formateado+"','"+categoria+
                        "','"+fecha_puesta_form+"','"+hora_desde_hasta+"','"+lote+"',upper('"+responsable+"'),'"+unidad_format+
                        "','"+resul_str+"','A','L','"+clasificadora+"','"+empacadora_formateada+"','"+tipo_aviario+"','"+tipo_almacenamiento+
                        "',upper('"+liberado+"'),upper('"+comentario+"'),'"+combobox+"','C','"+id_retenido+"')";

                PreparedStatement ps_retenido = cn.prepareStatement(insertar_retenido);
                ps_retenido.executeUpdate(); 
  



            /*inserta_control_caja=" use control_cajas insert into stock_carritos (nroReg,almacen,codcarrito,fecha,estado,nromov,activo) "
            + "values('"+codigo_caja+"','"+deposito+"','"+nrocarro+"',CURRENT_TIMESTAMP,'CARG','0','1')";

            PreparedStatement ps2 = cn.prepareStatement(inserta_control_caja);
                           // ejecuta la sentencia SQL para insertar
                     ps2.executeUpdate();  
 
            actualizar_deposito=" use control_cajas update stock_carritos"
            + "   set activo='0' where codcarrito ='"+nrocarro+"' AND activo='1' and estado='a'";

            PreparedStatement ps4 = cn.prepareStatement(actualizar_deposito);
                           // ejecuta la sentencia SQL para insertar
                 ps4.executeUpdate(); */  
  
       %> 
       <a>reg</a>
     <%
                }     
                        }   %>
   
   
   
 
          
          
          
          
          
         
