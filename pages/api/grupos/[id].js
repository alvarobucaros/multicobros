
import {pool} from "../../../config/db";

export default async function handler(req, res) {
 
    switch(req.method){
      case 'GET':
        return await getGrupos(req, res);
  
      case 'POST': 
        return await saveGrupos(req, res);
  
      case 'PUT': 
        return await updateGrupos(req, res);
        
      case 'DELETE':
        return await deleteGrupos(req, res);

      default:
        return;
    }
}

    const getGrupos = async (req,res)  => {
        let id  = req.query.id;
        let sql = "SELECT id, grp_idEmpresa, grp_nombre, grp_detalle, grp_estado ";
        sql += " FROM grupos WHERE grp_idEmpresa = ?" 
        sql += " ORDER BY grp_nombre ";
        const [result] = await pool.query(sql,id);
        return res.status(200).json(result);
      }

      const getMasGrupos = async (req,res)  => {
        let id  = req.query.id;
        let sql = "SELECT id, grp_idEmpresa, grp_nombre, grp_detalle, grp_estado ";
        sql += " FROM grupos WHERE id = ?" 
        sql += " ORDER BY grp_nombre ";
        const [result] = await pool.query(sql,id);
        return res.status(200).json(result);        
      }
  
      const deleteGrupos = async (req, res)  => {
        const {id} = req.body;
        const [result] = await pool.query("DELETE FROM Grupos WHERE id = ?",{id})
        return res.status(200).json(result);
      }
      
      const saveGrupos = async (req, res) => {
        const {id, grp_idEmpresa, grp_nombre, grp_detalle, grp_estado} = req.body;
        const sql = "INSERT INTO Grupos SET ?"
        const [result] = await pool.query(sql, 
        {grp_idEmpresa, grp_nombre, grp_detalle, grp_estado})
console.log(sql);
        return res.status(200).json({grp_idEmpresa, grp_nombre, grp_detalle, grp_estado, 
            id: result.insertId });  
      }
     
      const updateGrupos = async (req, res) => {
        const {id, grp_idEmpresa, grp_nombre, grp_detalle, grp_estado} = req.body;
        const [result] = await pool.query("UPDATE Grupos SET ?",
        {grp_idEmpresa, grp_nombre, grp_detalle, grp_estado})
        return res.status(200).json({grp_idEmpresa, grp_nombre, grp_detalle, grp_estado, 
            id: result.insertId }); 
      }
    

