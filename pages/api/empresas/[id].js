
import {pool} from "../../../config/db";

export default async function handler(req, res) {

    switch(req.method){
      case 'GET':
        return await getEmpresas(req, res);
  
      case 'POST': 
        return await saveEmpresas(req, res);
  
      case 'PUT': 
        return await updateEmpresas(req, res);
        
      case 'DELETE':
        return await deleteEmpresas(req, res);

      default:
            return;
    }
}

const getEmpresas = async (req,res)  => {
  let id  = req.query.id;
  let sql = "SELECT  id, em_nombre, em_direccion, em_ciudad,  ";
  sql += " em_tipodoc, em_nrodoc, em_telefono, em_email, em_observaciones,  ";
  sql += " em_autentica, em_consecRcaja, em_consecEgreso, em_consecAjustes,  ";
  sql += " em_fchini, em_estado, em_saldo ";
  sql += " FROM empresas  WHERE id = ?"  

  const [result] = await pool.query(sql,id);
  return res.status(200).json(result);
}

const deleteEmpresas = async (req, res)  => {
  const {id} = req.body;
  const [result] = await pool.query("DELETE FROM Empresas WHERE id = ?",{id})
  return res.status(200).json(result);
}

const saveEmpresas = async (req, res) => {
  const {id, em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,em_email,
     em_observaciones, em_autentica,em_consecRcaja,em_consecEgreso,em_consecAjustes,
     em_fchini,em_estado,em_saldo} = req.body;
  if (id === 0)
  {    
      const [result] = await pool.query("INSERT INTO Empresas SET ?",
      {em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,em_email, 
      em_observaciones, em_autentica,em_consecRcaja,em_consecEgreso,em_consecAjustes,
      em_fchini,em_estado,em_saldo})
  return res.status(200).json({em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,
    em_telefono,em_email, em_observaciones, em_autentica,em_consecRcaja,em_consecEgreso,
    em_consecAjustes,em_fchini,em_estado,em_saldo, 
      id: result.insertId });  
  }
  else
  {  
      const [result] = await pool.query("UPDATE Empresas SET ? WHERE id = "+id,
      {em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,em_email,
          em_observaciones, em_autentica,em_consecRcaja,em_consecEgreso,em_consecAjustes,
          em_fchini,em_estado,em_saldo})
      return res.status(200).json({em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,em_email,
          em_observaciones, em_autentica,em_consecRcaja,em_consecEgreso,em_consecAjustes,
          em_fchini,em_estado,em_saldo, 
          id: result.insertId }); 
    } 
}