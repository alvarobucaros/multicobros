
import {pool} from "../../../config/db";

export default async function handler(req, res) { 
  switch(req.method){
    case 'GET':
      return await getUsers(req, res);

    case 'POST': 
      return await saveUsers(req, res);

    case 'PUT': 
      return await updateUsers(req, res);
      
    case 'DELETE':
      return await deleteUsers(req, res);
      
      default:
        return;   
  }
}

  const getUsers = async (req,res)  => {
    let arg = req.query.arg;
    let arr = arg.split('|');
    let op = arr[0];
    let e  = arr[1];
     
    if (op==='user'){
    let sql= "SELECT id, us_idEmpresa, us_nombre, us_direccion, " 
    sql += " us_localidad, us_barrio, us_ciudad, us_email, us_codigo, " 
    sql += " us_tipoDoc, us_nroDoc, us_telefono, us_clave, us_estado, us_nivel " 
    sql += " FROM usuarios WHERE us_idEmpresa = " + e
    sql += " ORDER BY us_nombre";
    const [result] = await pool.query(sql);
    return res.status(200).json(result);
   
  }else if(op==='abono'){
    let sql= " SELECT usuarios.id, us_idEmpresa, us_nombre, us_email, us_codigo, "
    sql += " us_tipoDoc, us_nroDoc, us_telefono, em_autentica "
    sql += " FROM usuarios INNER JOIN empresas ON empresas.id = us_idEmpresa "
    sql += " WHERE us_estado  = 'A' AND us_idEmpresa = " + e;
    const [result] = await pool.query(sql);
    return res.status(200).json(result);
  }
  else if(op==='grupo'){    

    let sql = "(SELECT grupousuarios.id AS id, gu_idEmpresa AS empresa, " 
    sql += "gu_idUsuario AS usuario, " + gr + " AS grupo, us_nombre, 1 AS estado " 
    sql += " FROM grupousuarios  " 
    sql += " INNER JOIN  usuarios ON gu_idUsuario = usuarios.id WHERE gu_idGrupo = " + gr
    sql += " AND gu_idEmpresa = " + e + ")" 
    sql += " UNION " 
    sql += " (SELECT 0 AS id , us_idEmpresa AS empresa, id AS usuario, " + gr + " AS grupo," 
    sql += " us_nombre, 0 AS estado FROM usuarios  WHERE us_idEmpresa = " + e  
    sql += " AND id NOT IN ( SELECT gu_idUsuario FROM grupousuarios " 
    sql += " WHERE gu_idGrupo = " + gr + " AND gu_idEmpresa = " + e +"))" 
    sql += " ORDER BY us_nombre ";    
    const [result] = await pool.query(sql);
    return res.status(200).json(result);   
  }else 
  if(op==='anticipo'){
    let u  = arr[2];
    let sql= " SELECT an_Fecha, an_Saldo FROM anticipos WHERE an_idEmpresa  = " + e  
    sql += " AND an_idUsuario = " + u + " AND an_Saldo > 0 "
    const [result] = await pool.query(sql);
    return res.status(200).json(result);
  }else 
  if(op==='usuEmpresa'){
    let u  = arr[2];
    let sql= "SELECT us_nombre, us_tipoDoc, us_nroDoc, em_consecRcaja, em_saldo  " 
    sql += " FROM usuarios INNER JOIN empresas ON us_idEmpresa = empresas.id  " 
    sql += " WHERE usuarios.id = " + u 
    const [result] = await pool.query(sql);
    return res.status(200).json(result);
  }

  
}
  const deleteUsers = async (req, res)  => {
    const {id} = req.body;
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?",{id})
    return res.status(200).json(result);
  }
  
  const saveUsers = async (req, res) => {
    const {id, us_idEmpresa, us_nombre, us_direccion, us_localidad, us_barrio,
      us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, us_telefono, us_clave,
      us_estado, us_nivel} = req.body;
    if (id === 0){ 
      const [result] = await pool.query("INSERT INTO usuarios SET ?",
      {us_idEmpresa, us_nombre, us_direccion, us_localidad, us_barrio,
        us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, us_telefono, us_clave,
        us_estado, us_nivel})
      return res.status(200).json({us_idEmpresa, us_nombre, us_direccion, us_localidad, us_barrio, 
        us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, us_telefono, us_clave,
        us_estado, us_nivel, id: result.insertId });
    }
    else{
      const [result] = await pool.query("UPDATE usuarios SET ? WHERE id = "+id,
      {us_idEmpresa,us_nombre,us_direccion,us_localidad,us_barrio,us_ciudad,us_email, us_codigo,us_tipoDoc,us_nroDoc,us_telefono,us_clave,us_estado,us_nivel})     
      return res.status(200).json({us_idEmpresa,us_nombre,us_direccion,us_localidad,us_barrio,us_ciudad,us_email, us_codigo,us_tipoDoc,us_nroDoc,us_telefono,us_clave,us_estado,us_nivel, id: result.insertId }); 
    }
  }
 
  const updateUsers = async (req, res) => {
   
  }
  