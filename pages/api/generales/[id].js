
import {pool} from "../../../config/db";

export default async function handler(req, res) {
 
    switch(req.method){
      case 'GET':
        return await getGeneral(req, res);
  
      case 'POST': 
        return await saveGeneral(req, res);
  
      case 'PUT': 
        return await updateGeneral(req, res);
        
      case 'DELETE':
        return await deleteGeneral(req, res);

      default:
            return;
    }
}

const getGeneral = async (req,res)  => {
  let id  = req.query.id;  
  let dato = id.split('|');
  let campos = dato[0];
  let tabla = dato[1];  
  let donde = dato[2];
  let orden = dato[3];

  let sql = "SELECT " + campos + " FROM " + tabla + " WHERE " + donde
  sql += " ORDER BY " + orden    

  const [result] = await pool.query(sql)
  return res.status(200).json(result);

}

const saveGeneral = async (req,res)  => {
    let id  = req.query.id;
}
const updateGeneral = async (req,res)  => {
    let id  = req.query.id;
}
const deleteGeneral = async (req,res)  => {
    let id  = req.query.id;
    let dato = id.split('|');
    let tabla = dato[0];
    id = dato[1]
    let sql = "DELETE FROM "+tabla+" WHERE id = "+ id   
    const [result] = await pool.query(sql)
    return res.status(200).json(result);
}