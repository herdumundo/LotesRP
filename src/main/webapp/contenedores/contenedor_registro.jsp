  <%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <jsp:useBean id="conexion" class="clases.bdconexion1" scope="page" />
 <jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>   
<%@include  file="../chequearsesion.jsp" %>
      <%
        String area_registro = (String) sesionOk.getAttribute("clasificadora"); 
        String area_format=    (String) sesionOk.getAttribute("area_fallas");
        Connection cn = conexion.crearConexion();
        fuente.setConexion(cn);  
        String fecha="";//CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        String indate="";//CAMBIAR BASE DE DATOS                                                                                                                                                                                                                                                                                                                                                                                                                //CAMBIAR BASE DE DATOS       
        ResultSet rs = fuente.obtenerDato("SELECT  convert(varchar,getdate(),111) as fecha,REPLACE(CONVERT(VARCHAR(10),  convert(varchar,getdate(),103), 5),'/','') ");
       while(rs.next()){     
        fecha=rs.getString(1);
        indate=rs.getString(2);
        }
 %>    
     
 <form method="post"   id="form-reprocesos">
    <input id="id_date" name="id_date"  type="hidden"     value="<%=indate%>"   />
    <input id="id_clasificadora" name="id_clasificadora"   type="hidden"   value="<%=area_registro%>"   />
    <div class="input-group">
        <label class="form-control-placeholder"><b>   Fecha de clasificación inicial</b></label>
        <input id="calendario_registro" name="calendario_registro"  class="datepicker" value="<%=fecha%>"    required/>
    </div> 
    <br> 
    <div class="input-group">
        <label class="form-control-placeholder"><b>   Fecha puesta</b></label>
        <input id="fecha_puesta" name="fecha_puesta"  class="datepicker"  value="<%=fecha%>" placeholder="Fecha puesta"  required/>
    </div> 
    <br><!-- comment -->
    <div class="input-group">
        <label class="form-control-placeholder"><b>   Tipo de huevo</b></label>
        <select class="form-control" name="tipo_huevo" id="tipo_huevo"   onchange="limpiar_campos();cargar_unidad_medida();visualizar_zona_liberado()" required >
            <OPTION value="" selected  >SELECCIONAR TIPO</OPTION>
            <OPTION VALUE="8">SUBPRODUCTO</OPTION>
            <OPTION VALUE="9">R</OPTION>
            <OPTION VALUE="RP">RP</OPTION>
        </select>  
    </div>        
    <div class="form-group">
        <div class="input-group">
            <input name="cod_carrito" id="cod_carrito" type="number"  autocomplete="off"  class="form-control" placeholder="Codigo carrito,Mesa,Pallet" required   >
        <span class="input-group-addon">-</span>
            <div class="input-append">  
                <select class="form-control" name="unidad_medida" id="unidad_medida"  onchange="limpiar_cantidad()" > </select>
            </div>
         </div>
    </div>
    <br>
    <div class="form-group">
        <div class="input-group">
            <label class="form-control-placeholder"><b>   Cantidad</b></label>
            <input name="txt_cantidad" id="txt_cantidad" style="display: none"  type="text"   class="form-control"   >
        </div>
       
        <div class="input-group" style="display: none" id="div_kgramos">
            <input name="txt_kg" id="txt_kg"  type="number" class="form-control"  placeholder="KILOGRAMOS"  >
            <span class="input-group-addon">-</span>
            <input name="txt_gramos" id="txt_gramos"   type="number" class="form-control"  placeholder="GRAMOS"  >
        </div>
        
        <div class="input-group" id="div_cant_plancha">
            <input name="txt_plancha" id="txt_plancha"  type="number" class="form-control"  placeholder="PLANCHAS" onkeyup="calculo()">
            -<input name="txt_unidad" id="txt_unidad"  type="number" class="form-control"  placeholder="UNIDADES" onkeyup="calculo()">
          <span class="input-group-addon">-</span>
        </div> 
    </div>
     
    <div class="form-group">
        Hora inicial
        <div class="input-group">
            <select class="form-control"  name="hora_desde" id="hora_desde" onchange="validar_fechaInicial_fechaFinal()" required >
                <OPTION selected value="">Hora inicio</OPTION>
                <OPTION VALUE="01">1</OPTION>
                <OPTION VALUE="02">2</OPTION>
                <OPTION VALUE="03">3</OPTION>
                <OPTION VALUE="04">4</OPTION>
                <OPTION VALUE="05">5</OPTION>
                <OPTION VALUE="06">6</OPTION>
                <OPTION VALUE="07">7</OPTION> 
                <OPTION VALUE="08">8</OPTION>
                <OPTION VALUE="09">9</OPTION>
                <OPTION VALUE="10">10</OPTION> 
                <OPTION VALUE="11">11</OPTION>
                <OPTION VALUE="12">12</OPTION>
                <OPTION VALUE="13">13</OPTION> 
                <OPTION VALUE="14">14</OPTION>
                <OPTION VALUE="15">15</OPTION>
                <OPTION VALUE="16">16</OPTION> 
                <OPTION VALUE="17">17</OPTION>
                <OPTION VALUE="18">18</OPTION>
                <OPTION VALUE="19">19</OPTION> 
                <OPTION VALUE="20">20</OPTION>
                <OPTION VALUE="21">21</OPTION>
                <OPTION VALUE="22">22</OPTION>
                <OPTION VALUE="23">23</OPTION>
                <OPTION VALUE="00">00</OPTION>
            </select>   
            <span class="input-group-addon">-</span>
            <select class="form-control"   name="minuto_desde" id="minuto_desde" onchange="validar_fechaInicial_fechaFinal()" required >
                <OPTION selected value="">Minutos incio</OPTION>
                <OPTION VALUE="00">00</OPTION>
                <OPTION VALUE="01">01</OPTION>
                <OPTION VALUE="02">02</OPTION>
                <OPTION VALUE="03">03</OPTION>
                <OPTION VALUE="04">04</OPTION>
                <OPTION VALUE="05">05</OPTION>
                <OPTION VALUE="06">06</OPTION>
                <OPTION VALUE="07">07</OPTION> 
                <OPTION VALUE="08">08</OPTION>
                <OPTION VALUE="09">09</OPTION>
                <OPTION VALUE="10">10</OPTION> 
                <OPTION VALUE="11">11</OPTION>
                <OPTION VALUE="12">12</OPTION>
                <OPTION VALUE="13">13</OPTION> 
                <OPTION VALUE="14">14</OPTION>
                <OPTION VALUE="15">15</OPTION>
                <OPTION VALUE="16">16</OPTION> 
                <OPTION VALUE="17">17</OPTION>
                <OPTION VALUE="18">18</OPTION>
                <OPTION VALUE="19">19</OPTION> 
                <OPTION VALUE="20">20</OPTION>
                <OPTION VALUE="21">21</OPTION>
                <OPTION VALUE="22">22</OPTION>
                <OPTION VALUE="23">23</OPTION>
                <OPTION VALUE="24">24</OPTION>
                <OPTION VALUE="25">25</OPTION>
                <OPTION VALUE="26">26</OPTION>
                <OPTION VALUE="27">27</OPTION>
                <OPTION VALUE="28">28</OPTION>
                <OPTION VALUE="29">29</OPTION>
                <OPTION VALUE="30">30</OPTION>
                <OPTION VALUE="31">31</OPTION> 
                <OPTION VALUE="32">32</OPTION>
                <OPTION VALUE="33">33</OPTION>
                <OPTION VALUE="34">34</OPTION> 
                <OPTION VALUE="35">35</OPTION>
                <OPTION VALUE="36">36</OPTION>
                <OPTION VALUE="37">37</OPTION> 
                <OPTION VALUE="38">38</OPTION>
                <OPTION VALUE="39">39</OPTION>
                <OPTION VALUE="40">40</OPTION> 
                <OPTION VALUE="41">41</OPTION>
                <OPTION VALUE="42">42</OPTION>
                <OPTION VALUE="43">43</OPTION> 
                <OPTION VALUE="44">44</OPTION>
                <OPTION VALUE="45">45</OPTION>
                <OPTION VALUE="46">46</OPTION>
                <OPTION VALUE="47">47</OPTION>
                <OPTION VALUE="48">48</OPTION>
                <OPTION VALUE="49">49</OPTION>
                <OPTION VALUE="50">50</OPTION>
                <OPTION VALUE="51">51</OPTION>
                <OPTION VALUE="52">52</OPTION>
                <OPTION VALUE="53">53</OPTION>
                <OPTION VALUE="54">54</OPTION>
                <OPTION VALUE="55">55</OPTION>
                <OPTION VALUE="56">56</OPTION>
                <OPTION VALUE="57">57</OPTION>
                <OPTION VALUE="58">58</OPTION>
                <OPTION VALUE="59">59</OPTION>
            </select>  
        </div> 
    </div>
    <br>
    <div class="input-group">
        <label class="form-control-placeholder"><b>   Fecha final de clasificacion</b></label>
        <input   id="fecha_clas_final"  name="fecha_clas_final" class="datepicker" placeholder="FECHA FINAL "  value="<%=fecha%>"  onchange="validar_fechaInicial_fechaFinal()"  required >
    </div> 
    <div class="form-group">
        Hora final
        <div class="input-group">
            <select class="form-control"  name="hora_hasta" id="hora_hasta" onchange="validar_fechaInicial_fechaFinal()" required >
                <OPTION selected value="">Hora inicio</OPTION>
                <OPTION VALUE="01">1</OPTION>
                <OPTION VALUE="02">2</OPTION>
                <OPTION VALUE="03">3</OPTION>
                <OPTION VALUE="04">4</OPTION>
                <OPTION VALUE="05">5</OPTION>
                <OPTION VALUE="06">6</OPTION>
                <OPTION VALUE="07">7</OPTION> 
                <OPTION VALUE="08">8</OPTION>
                <OPTION VALUE="09">9</OPTION>
                <OPTION VALUE="10">10</OPTION> 
                <OPTION VALUE="11">11</OPTION>
                <OPTION VALUE="12">12</OPTION>
                <OPTION VALUE="13">13</OPTION> 
                <OPTION VALUE="14">14</OPTION>
                <OPTION VALUE="15">15</OPTION>
                <OPTION VALUE="16">16</OPTION> 
                <OPTION VALUE="17">17</OPTION>
                <OPTION VALUE="18">18</OPTION>
                <OPTION VALUE="19">19</OPTION> 
                <OPTION VALUE="20">20</OPTION>
                <OPTION VALUE="21">21</OPTION>
                <OPTION VALUE="22">22</OPTION>
                <OPTION VALUE="23">23</OPTION>
                <OPTION VALUE="00">00</OPTION>
            </select>   
            <span class="input-group-addon">-</span>
            <select class="form-control"   name="minuto_hasta" id="minuto_hasta" onchange="validar_fechaInicial_fechaFinal()" required  >
                <OPTION selected value="">Minutos fin</OPTION>
                <OPTION VALUE="00">00</OPTION>
                <OPTION VALUE="01">01</OPTION>
                <OPTION VALUE="02">02</OPTION>
                <OPTION VALUE="03">03</OPTION>
                <OPTION VALUE="04">04</OPTION>
                <OPTION VALUE="05">05</OPTION>
                <OPTION VALUE="06">06</OPTION>
                <OPTION VALUE="07">07</OPTION> 
                <OPTION VALUE="08">08</OPTION>
                <OPTION VALUE="09">09</OPTION>
                <OPTION VALUE="10">10</OPTION> 
                <OPTION VALUE="11">11</OPTION>
                <OPTION VALUE="12">12</OPTION>
                <OPTION VALUE="13">13</OPTION> 
                <OPTION VALUE="14">14</OPTION>
                <OPTION VALUE="15">15</OPTION>
                <OPTION VALUE="16">16</OPTION> 
                <OPTION VALUE="17">17</OPTION>
                <OPTION VALUE="18">18</OPTION>
                <OPTION VALUE="19">19</OPTION> 
                <OPTION VALUE="20">20</OPTION>
                <OPTION VALUE="21">21</OPTION>
                <OPTION VALUE="22">22</OPTION>
                <OPTION VALUE="23">23</OPTION>
                <OPTION VALUE="24">24</OPTION>
                <OPTION VALUE="25">25</OPTION>
                <OPTION VALUE="26">26</OPTION>
                <OPTION VALUE="27">27</OPTION>
                <OPTION VALUE="28">28</OPTION>
                <OPTION VALUE="29">29</OPTION>
                <OPTION VALUE="30">30</OPTION>
                <OPTION VALUE="31">31</OPTION> 
                <OPTION VALUE="32">32</OPTION>
                <OPTION VALUE="33">33</OPTION>
                <OPTION VALUE="34">34</OPTION> 
                <OPTION VALUE="35">35</OPTION>
                <OPTION VALUE="36">36</OPTION>
                <OPTION VALUE="37">37</OPTION> 
                <OPTION VALUE="38">38</OPTION>
                <OPTION VALUE="39">39</OPTION>
                <OPTION VALUE="40">40</OPTION> 
                <OPTION VALUE="41">41</OPTION>
                <OPTION VALUE="42">42</OPTION>
                <OPTION VALUE="43">43</OPTION> 
                <OPTION VALUE="44">44</OPTION>
                <OPTION VALUE="45">45</OPTION>
                <OPTION VALUE="46">46</OPTION>
                <OPTION VALUE="47">47</OPTION>
                <OPTION VALUE="48">48</OPTION>
                <OPTION VALUE="49">49</OPTION>
                <OPTION VALUE="50">50</OPTION>
                <OPTION VALUE="51">51</OPTION>
                <OPTION VALUE="52">52</OPTION>
                <OPTION VALUE="53">53</OPTION>
                <OPTION VALUE="54">54</OPTION>
                <OPTION VALUE="55">55</OPTION>
                <OPTION VALUE="56">56</OPTION>
                <OPTION VALUE="57">57</OPTION>
                <OPTION VALUE="58">58</OPTION>
                <OPTION VALUE="59">59</OPTION>
            </select>   
        </div> 
    </div>
    <label class="form-control-placeholder"><b>Aviarios disponibles segun horario</b></label>
    <div class="input-group" id="div_aviarios">
        <input   type="checkbox" class="checkbox"    data-toggle="toggle" data-on="NO APLICA"     data-off="APLICA"   id="chkToggle_aviario"   data-onstyle="success" data-offstyle="warning">
        <select  name="cbox_aviarios"   id="cbox_aviarios" class="form-control"  multiple="multiple"  style="height: 20%"  required>
                    
        </select>
    </div>
    <div class="form-group" id="div_grupo_aviario_almacenamiento" style="display: none">
        <div class="input-group">
            <select class="form-control"   name="tipo_aviario" id="tipo_aviario" required >
                 <OPTION VALUE="M">M</OPTION>
             </select>   
            <span class="input-group-addon">-</span>
        </div> 
    </div>    
    <div id="div_reproceso_liberado" style="display:none">
        <select class="form-control" name="cbox_reproceso" id="cbox_reproceso">
            <OPTION value="" selected >Tipo de reproceso</OPTION>
            <%   ResultSet rs1 = fuente.obtenerDato("select * from fallas with(nolock) where area in ('ccho','"+area_format+"') and tipo in ('rep') and estado='A'");
            while(rs1.next()){  %>
            <OPTION VALUE="<%=rs1.getString("codigo")%>"><%=rs1.getString("desfallazona")%></OPTION> <% }%>
        </select>   
    </div>
    <div id="div_sub_liberado" style="display:none">
        <select class="form-control" name="cbox_sub" id="cbox_sub">
            <OPTION value="" selected>Tipo de subproducto</OPTION>
            <% ResultSet rs3 = fuente.obtenerDato("select * from fallas  with(nolock) where area in ('ccho','"+area_format+"') and tipo in ('sub') and estado='A'");
            while(rs3.next()){ %>
            <OPTION VALUE="<%=rs3.getString("codigo")%>"><%=rs3.getString("desfallazona")%></OPTION> <% }%>
        </select>   
    </div>
    <div id="div_zona_liberado" style="display:none">
        <select class="form-control" name="cbox_zona_liberado" id="cbox_zona_liberado">
            <OPTION value="" selected >Zona</OPTION>
            <%  ResultSet rs2 = fuente.obtenerDato("select * from fallas with(nolock) where area in ('ccho','"+area_format+"') and tipo in ('rot', 'ROS') and estado='A'");
                while(rs2.next()){ %>
            <OPTION VALUE="<%=rs2.getString("codigo")%>"><%=rs2.getString("desfallazona")%></OPTION> <% }%>
        </select>   
    </div>
    <br>
    <div class="form-group" id="div_responsable_liberado">
        <div class="input-group">
            <input name="txt_responsable" style="text-transform: uppercase;" autocomplete="off" id="txt_responsable" type="text" class="form-control" placeholder="Responsable">
        </div>  
    </div>   
        
    <input name="txt_obs" style="text-transform: uppercase;" id="txt_obs" type="text" autocomplete="off"    class="form-control" placeholder="Comentario">
    <br><br>
    <input name="text_resultado"    id="text_resultado" type="hidden"   lass="form-control">
    <input type="submit" value="Registrar" id="btn_registrar" name="btn_registrar" class="form-control btn btn-primary "    />
    <br> <br> <br>
</form> 