import {pool} from "../../../config/db";

export default async function handler(req, res) { 

    switch(req.method){
      case 'GET':
        return await getIngreGastos(req, res);

      case 'POST': 
        return await saveIngreGastos(req, res);
  
      case 'PUT': 
        return await updateIngreGastos(req, res);

      default:
        return;
    }
}

const getIngreGastos = async (req, res) => {
  
}

const saveIngreGastos = async (req, res) => {
    const { id, ig_idEmpresa,ig_fecha ,ig_tipo ,ig_detalle ,ig_numero ,ig_documento ,
      ig_idUsuario ,ig_valor ,ig_saldo} = req.body;
    const sql = "INSERT INTO ingregasto SET ?"
    const [result] = await pool.query(sql, 
        {ig_idEmpresa,ig_fecha ,ig_tipo ,ig_detalle ,ig_numero ,ig_documento ,ig_idUsuario ,ig_valor ,ig_saldo})

    return res.status(200).json({ig_idEmpresa,ig_fecha ,ig_tipo ,ig_detalle ,ig_numero ,ig_documento ,ig_idUsuario ,ig_valor ,ig_saldo,
        id: result.insertId });  
  }
 
  const updateIngreGastos = async (req, res) => {
  
  }