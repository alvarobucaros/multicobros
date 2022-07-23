
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
        let sql = "SELECT  id, em_nombre, em_direccion, em_localidad, em_ciudad,  ";
        sql += " em_tipodoc, em_nrodoc, em_telefono, em_email, em_observaciones,  ";
        sql += " em_autentica,  em_consecRcaja, em_consecEgreso,  ";
        sql += "em_fchini, em_fchfin, em_estado, em_saldo ";
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
        const {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, cp_fechaHasta, 
               cp_valorCobro, cp_valorCuota, cp_estado, cp_aplica} = req.body;
        const [result] = await pool.query("INSERT INTO Empresas SET ?",
        {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
            cp_valorCobro, cp_valorCuota, cp_estado, cp_aplica})
        return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
            cp_fechaHasta, cp_valorCobro, cp_valorCuota, cp_estado, cp_aplica, 
            id: result.insertId });  
      }
     
      const updateEmpresas = async (req, res) => {
        const {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, cp_fechaHasta, 
            cp_valorCobro, cp_valorCuota, cp_estado, cp_aplica} = req.body;
        const [result] = await pool.query("UPDATE Empresas SET ?",
        {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
            cp_valorCobro, cp_valorCuota, cp_estado, cp_aplica})
        return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
            cp_fechaHasta, cp_valorCobro, cp_valorCuota, cp_estado, cp_aplica, 
            id: result.insertId }); 
      }
    

