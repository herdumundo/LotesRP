/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import static java.lang.System.out;
import java.sql.Connection;
import java.util.Arrays;
import java.util.List;

/**
 *
 * @author hvelazquez
 */
public class controles {
    public static   Connection  connect ;
    public static   Connection  connectSesion;
    public static   Connection  connectSQLSERVER  ;

 
     public  static  void connectarBD(){
        try 
        {
            ConnectionSqlServer   conexion = new ConnectionSqlServer();
            connect = conexion.ConnectionSQLSERVER();
        }
        catch (Exception e)
        {
            String asd=e.getMessage();
        }
    }
     
     
      public  static  void connectarBDsesion(){
        try 
        {
            ConnectionSqlServerSesion   conexion = new ConnectionSqlServerSesion();
            connectSesion = conexion.ConnectionSQLSERVERSesion();
        }
        catch (Exception e)
        {
            String asd=e.getMessage();
        }
    }
     public  static  void DesconnectarBD(){
        try {
             connect.close();
            }
        catch (Exception e){
            String asd=e.getMessage();
        }
    }   
     
     public  static  void VerificarConexion(){
        try {
            if(connectSesion==null ){
                connectarBDsesion();
            }
            else if (connectSesion.isClosed()){
                connectarBDsesion();
            }
            
            }
        catch (Exception e){
            String asd=e.getMessage();
        }
    }
           
               
  
}
