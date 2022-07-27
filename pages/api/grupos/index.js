
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
        let sql = "SELECT id, grp_empresa, grp_nombre, grp_detalle, grp_estado ";
        sql += " FROM grupos WHERE grp_empresa = ?" 
        sql += " ORDER BY grp_nombre ";
console.log(sql)        
        const [result] = await pool.query(sql,id);
        return res.status(200).json(result);
      }

      const deleteGrupos = async (req, res)  => { 
      }
      
      const saveGrupos = async (req, res) => {
        const {id, grp_empresa, grp_nombre, grp_detalle, grp_estado} = req.body;
        const sql = "INSERT INTO Grupos SET ?"
        const [result] = await pool.query(sql, 
                                    {grp_empresa, grp_nombre, grp_detalle, grp_estado})

        return res.status(200).json({grp_empresa, grp_nombre, grp_detalle, grp_estado, 
            id: result.insertId });  
      }
     
      const updateGrupos = async (req, res) => {
        const id = req.body.id;
        const { grp_empresa, grp_nombre, grp_detalle, grp_estado} = req.body;
        const [result] = await pool.query("UPDATE Grupos SET ? WHERE id = "+id,
        {grp_empresa, grp_nombre, grp_detalle, grp_estado})
        return res.status(200).json({grp_empresa, grp_nombre, grp_detalle, grp_estado, 
            id: result.insertId }); 
      }
     

