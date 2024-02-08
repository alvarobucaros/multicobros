
import {pool} from "../../../config/db";
import md5 from 'js-md5'

export default async function handler(req, res) {
  switch(req.method){
    case 'GET':
      return await getUsers(req, res);

    case 'POST': 
      return await getLogin(req, res);

    case 'PUT': 
      return await updateUsers(req, res);
  }
}

const getUsers = async (req,res)  => {
  const dato = req.dt;
  const rec = dato.split('|');  
  const qry = "SELECT usuarios.id usuarioId, us_idEmpresa,  us_nombre, us_email, "
  qry += " us_clave, us_estado, us_nivel, us_idEmpresa empreasId, em_nombre"
  qry += " FROM usuarios INNER JOIN empresas ON empresas.id = us_idEmpresa"
  qry += " WHERE us_email = '"+rec[0]+"' OR us_telefono = '"+rec[0]+"'"
  qry += " OR us_nroDoc = '"+rec[0]+"'";
  const [result] = await pool.query(qry)
  return res.status(200).json(result);
}
const getLogin = async (req, res)  => {
    const dato = req.body.usu;
    const usu = dato.us_email;
    var qry = "SELECT usuarios.id usuarioId, us_idEmpresa,  us_nombre, us_email, "
    qry += " us_clave, us_estado, us_nivel, us_idEmpresa empreasId, em_nombre"
    qry += " FROM usuarios INNER JOIN empresas ON empresas.id = us_idEmpresa"
    qry += " WHERE us_email = '"+usu+"' OR us_telefono = '"+usu+"'  OR us_nroDoc = '"+usu+"'"
  
  // console.log(qry);
   const [result] = await pool.query(qry)
   return res.status(200).json(result);
    
  }

  const updateUsers = async (req, res) => {
    const id = req.body.id;
    const clave = req.body.clave;
    const pwd = md5(clave);
    var qry = "UPDATE usuarios SET us_clave = '" + pwd
    qry += "' WHERE id = '" + id +"'"
    const [result] = await pool.query(qry)
    return res.status(200).json({ok:result});
  }
