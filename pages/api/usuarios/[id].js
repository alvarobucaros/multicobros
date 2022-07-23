import {pool} from "../../../config/db";

export default async function handler(req, res) {
  if(req.method === 'GET')
      return await getUsers(req, res);
}

  const getUsers = async (req,res)  => {
    let id  = req.query.id;
    let sql = "SELECT id, us_idEmpresa, us_nombre, us_direccion, " 
    sql += " us_localidad, us_barrio, us_ciudad, us_email, us_codigo, " 
    sql += " us_tipoDoc, us_nroDoc, us_telefono, us_clave, us_estado, us_nivel " 
    sql += " FROM usuarios WHERE us_idEmpresa = ? " 
    sql += " ORDER BY us_nombre"
    const [result] = await pool.query(sql,id);
    return res.status(200).json(result);
  }
  