
import {pool} from "../../../../config/db";

export default async function handler(req, res) {

    if(req.method === 'GET'){
        return await getGruposUsuario(req, res);
    }
}

const getGruposUsuario = async (req,res)  => {
    
    let id  = req.query.id;  
    let llave = id.split('|');
    let empresa = llave[0];
    let grupo  = llave[1]
    let sql = "(SELECT grupousuario.id AS id, gu_idEmpresa AS empresa, " 
    sql += "gu_idUsuario AS usuario, gu_idGrupo AS grupo, us_nombre, 1 AS estado " 
    sql += " FROM grupousuario  " 
    sql += " INNER JOIN  usuarios ON gu_idUsuario = usuarios.id WHERE gu_idGrupo = " + grupo
    sql += " AND gu_idEmpresa = " + empresa +")" 
    sql += " UNION " 
    sql += " (SELECT 0 AS id , us_idEmpresa AS empresa, id AS usuario, 0 AS grupo," 
    sql += " us_nombre, 0 AS estado FROM usuarios  WHERE us_idEmpresa = " + empresa  
    sql += " AND id NOT IN ( SELECT gu_idUsuario FROM grupousuario " 
    sql += " WHERE gu_idGrupo = " + grupo + " AND gu_idEmpresa = " + empresa +"))" 
    sql += " ORDER BY us_nombre ";
    const [result] = await pool.query(sql);
    return res.status(200).json(result);        
  }