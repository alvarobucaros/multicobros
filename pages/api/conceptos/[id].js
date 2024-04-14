
import {pool} from "../../../config/db";

export default async function handler(req, res) {
 
    switch(req.method){
      case 'GET':
        return await getConceptos(req, res);
  
      case 'POST': 
        return await getMasConceptos(req, res);
   
      case 'PUT': 
        return await updateConceptos(req, res);
        
      case 'DELETE':
        return await deleteConceptos(req, res);

      default:
            return;
    }

}
    const getConceptos = async (req,res)  => {
        let id  = req.query.id;
        let sql = "SELECT id, cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, ";
        sql += "cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, ";
        sql += "cp_aplica, cp_procentaje, cp_tipo ";
        sql += " FROM conceptos WHERE cp_idEmpresa = ?" 
        sql += " ORDER BY cp_tipo, cp_titulo "
        const [result] = await pool.query(sql,id);
        return res.status(200).json(result);
      }

      const getMasConceptos = async (req,res)  => {
        let id  = req.query.id;
        let sql = "SELECT id, cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, ";
        sql += "cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica ";
        sql += " FROM conceptos WHERE cp_estado='A' AND cp_tipo = 'C' AND cp_idEmpresa = ?" 
        sql += " ORDER BY cp_titulo "
        const [result] = await pool.query(sql,id);
        return res.status(200).json(result);     
      }
  
      const deleteConceptos = async (req, res)  => {
        const {id} = req.body;
        const [result] = await pool.query("DELETE FROM conceptos WHERE id = ?",{id})
        return res.status(200).json(result);
      }
      
      const saveConceptos = async (req, res) => {
        const {id, cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, cp_fechaHasta, 
               cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica} = req.body;
  
        const [result] = await pool.query("INSERT INTO Conceptos SET ?",
        {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
            cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica})
        return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
            cp_fechaHasta, cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica, 
            id: result.insertId });  
      }
     
      const updateConceptos = async (req, res) => {
        const {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, cp_fechaHasta, 
            cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica} = req.body;
        const [result] = await pool.query("UPDATE Conceptos SET ?",
        {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
            cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica})
        return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
            cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica, 
            id: result.insertId }); 
      }
    

