
import {pool} from "../../../config/db";

export default async function handler(req, res) {
 
    switch(req.method){
      case 'GET':
        return await getCarga(req, res);
  
      case 'POST': 
        return await saveMasCarga(req, res);
   
      case 'PUT': 
        return await updateCarga(req, res);
        
      case 'DELETE':
        return await deleteCarga(req, res);

      default:
            return;
    }

}
    const getCarga = async (req,res)  => {
        let id  = req.query.id;
        let sql = "SELECT id, cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, ";
        sql += "cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica ";
        sql += " FROM conceptos WHERE cp_idEmpresa = ?" 
        sql += " ORDER BY cp_titulo "
        const [result] = await pool.query(sql,id);
        return res.status(200).json(result);
      }

      const saveMasCarga = async (req,res)  => {
       console.log(req.us_codigo+' '+req.us_clave+' '+req.us_email); 

        const {id, us_idEmpresa, us_nombre, us_direccion,  us_localidad, 
          us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, 
          us_telefono, us_clave, us_estado, us_nivel } = req.body;
          console.log(us_codigo+' '+us_clave+' '+us_email); 
        const   [result] = await pool.query("INSERT INTO usuarios SET ?",
        {us_idEmpresa, us_nombre, us_direccion,  us_localidad, us_barrio, us_ciudad, 
          us_email, us_codigo, us_tipoDoc, us_nroDoc, us_telefono, us_clave, us_estado, 
          us_nivel} )
 
            return res.status(200).json({us_idEmpresa, us_nombre, us_direccion,  us_localidad, 
              us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, 
              us_telefono, us_clave, us_estado, us_nivel,
              id: result.insertId });       

      }
  
      const deleteCarga = async (req, res)  => {
        const {id} = req.body;
        const [result] = await pool.query("DELETE FROM conceptos WHERE id = ?",{id})
        return res.status(200).json(result);
      }
      
      const saveCarga = async (req, res) => {
        const {id, cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, cp_fechaHasta, 
               cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica} = req.body;
  
        const [result] = await pool.query("INSERT INTO Conceptos SET ?",
        {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
            cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica})
        return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
            cp_fechaHasta, cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica, 
            id: result.insertId });  
      }
     
      const updateCarga = async (req, res) => {
        const {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, cp_fechaHasta, 
            cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica} = req.body;
        const [result] = await pool.query("UPDATE Conceptos SET ?",
        {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
            cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica})
        return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
            cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica, 
            id: result.insertId }); 
      }
    

