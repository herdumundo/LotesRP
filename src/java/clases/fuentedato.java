
package clases;

/**
 *
 * @author ANTONIO PORTILLO>
 */
import java.sql.*;

public class fuentedato {

    Connection conexion;

    public fuentedato() {
        conexion = null;
    }

    public void setConexion(Connection conexion) {
        this.conexion = conexion;
    }

    public ResultSet obtenerDato(String s) throws Exception {
        Statement statement = conexion.createStatement();
        ResultSet resultset = statement.executeQuery(s);
        return resultset;
    }

    public void actualizarDato(String s) throws Exception {
        Statement statement = conexion.createStatement();
        statement.executeUpdate(s);
    }

    public long contarRegistro(String s) throws Exception {
        Statement statement = conexion.createStatement();
        ResultSet resultset = statement.executeQuery(s);
        resultset.next();
        return (long)resultset.getInt(1);
    }
}
