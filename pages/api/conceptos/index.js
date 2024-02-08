import {pool} from "../../../config/db";

export default async function handler(req, res) {

    switch(req.method){
      case 'GET':
        return await getConceptos(req, res);
  
      case 'POST': 
        return await saveConceptos(req, res);
  
      case 'PUT': 
        return await updateConceptos(req, res);
        
      case 'DELETE':
        return await deleteConceptos(req, res);

      default:
            return;
    }

}
    const getConceptos = async (req,res)  => {
 
        const dato = req.body.cpto;
 
        let sql = "SELECT id, cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, ";
        sql += "cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica ";
        sql += " FROM conceptos WHERE id =  " + dato
  
        const [result] = await pool.query(sql);
        return res.status(200).json(result);
      }
    
      const deleteConceptos = async (req, res)  => {
        const {id} = req.body;
        const [result] = await pool.query("DELETE FROM conceptos WHERE id = ?",{id})
        return res.status(200).json(result);
      }
      
      const saveConceptos = async (req, res) => {
        const {id, cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, cp_fechaHasta, 
               cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica} = req.body;
        if (id === 0){     
          const [result] = await pool.query("INSERT INTO Conceptos SET ?",
            {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
            cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica})
            return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
            cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica, id: result.insertId });  
        }
        else{
          const [result] = await pool.query("UPDATE Conceptos SET ? WHERE id = "+id,
          {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
              cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica})
          return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
              cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica, 
              id: result.insertId }); 
        }
      }
     
      const updateConceptos = async (req, res) => {
        const {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, cp_fechaHasta, 
            cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica} = req.body;
        const [result] = await pool.query("UPDATE Conceptos SET ?",
        {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
            cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica})
        return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
            cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica, 
            id: result.insertId }); 
      }
    

