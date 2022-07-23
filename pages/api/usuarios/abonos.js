import {pool} from "../../../config/db";

export default async function handler(req, res) {
  if(req.method === 'GET')
      return await getUsers(req, res);
}


const getUsers = async (req,res)  => {

    let empresa = req.query;

    var qry = " SELECT usuarios.id, us_idEmpresa, us_nombre, us_email, us_codigo, "
    qry += " us_tipoDoc, us_nroDoc, us_telefono, em_autentica "
    qry += " FROM usuarios INNER JOIN empresas ON empresas.id = us_idEmpresa "
    qry += " WHERE us_estado  = 'A' AND us_idEmpresa = " + empresa

    const [result] = await pool.query(qry,{empresa})
    return res.status(200).json(result);
  }

       