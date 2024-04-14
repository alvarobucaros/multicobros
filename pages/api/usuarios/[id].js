import {pool} from "../../../config/db";


export default async function handler(req, res) {
 
  switch(req.method){
    case 'GET':
      return await getUsers(req, res);

    case 'POST': 
      return await getUsers(req, res);
 
    case 'PUT': 
      return await updateUsers(req, res);
      
    case 'DELETE':
      return await deleteUsers(req, res);

    default:
          return;
  }

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
  
  const deleteUsers = async (req, res)  => {
    const {id} = req.body;
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?",{id})
    return res.status(200).json(result);
  }
  
  const saveUsers = async (req, res) => {
    const {id, us_idEmpresa, us_nombre, us_direccion,  us_localidad, 
      us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, 
      us_telefono, us_clave, us_estado, us_nivel } = req.body;

    const [result] = await pool.query("INSERT INTO usuarios SET ?",
    {us_idEmpresa, us_nombre, us_direccion,  us_localidad, 
      us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, 
      us_telefono, us_clave, us_estado, us_nivel})
    return res.status(200).json({us_idEmpresa, us_nombre, us_direccion,  us_localidad, 
      us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, 
      us_telefono, us_clave, us_estado, us_nivel, 
        id: result.insertId });  
  }
 
  const updateUsers = async (req, res) => {
    const {us_idEmpresa, us_nombre, us_direccion,  us_localidad, 
      us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, 
      us_telefono, us_clave, us_estado, us_nivel} = req.body;
    const [result] = await pool.query("UPDATE usuarios SET ?",
    {cus_idEmpresa, us_nombre, us_direccion,  us_localidad, 
      us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, 
      us_telefono, us_clave, us_estado, us_nivel})
    return res.status(200).json({us_idEmpresa, us_nombre, us_direccion,  us_localidad, 
      us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, 
      us_telefono, us_clave, us_estado, us_nivel, 
        id: result.insertId }); 
  }


