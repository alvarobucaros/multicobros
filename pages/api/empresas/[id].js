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
  sql += " em_fchini, em_fchfin, em_estado, em_saldo ";
  sql += " FROM empresas  WHERE id = " + id;  
  const [result] = await pool.query(sql);
  return res.status(200).json(result);
}

const deleteEmpresas = async (req, res)  => {
  const {id} = req.body;
  const [result] = await pool.query("DELETE FROM Empresas WHERE id = ?",{id})
  return res.status(200).json(result);
}

const updateEmpresas = async (req, res) => {
  const {id, em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,
         em_email, em_observaciones, em_autentica, em_consecAjustes,
         em_consecRcaja,em_consecEgreso, em_fchini, em_fchfin,
         em_estado, em_saldo} = req.body;

  const [result] = await pool.query("UPDATE Empresas SET ? WHERE id = "+id,
  {em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,
    em_email, em_observaciones, em_autentica, em_consecAjustes,
    em_consecRcaja,em_consecEgreso, em_fchini, em_fchfin,
    em_estado, em_saldo})
  return res.status(200).json({em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,
    em_email, em_observaciones, em_autentica, em_consecAjustes,
    em_consecRcaja,em_consecEgreso, em_fchini, em_fchfin,
    em_estado, em_saldo, 
      id: result.insertId }); 
}

const saveEmpresas = async (req, res) => {
  // const {id, em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,
  //        em_email, em_observaciones, em_autentica, em_consecAjustes,
  //        em_consecRcaja,em_consecEgreso, em_fchini,em_fchfin,
  //        em_estado,em_saldo, em_us_idEmpresa, em_us_nombre, em_us_direccion,
  //        em_us_localidad, em_us_barrio, em_us_ciudad, em_us_email,
  //        em_us_codigo, em_us_tipoDoc, em_us_nroDoc, em_us_clave, 
        //  em_us_telefono, em_us_estado, em_us_nivel} = req.body;

        // const updateConceptos = async (req, res) => {
        //   const {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, cp_fechaHasta, 
        //       cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica, cp_procentaje, cp_tipo} = req.body;
        //   const [result] = await pool.query("UPDATE Conceptos SET ?",
        //   {cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde,cp_fechaHasta, 
        //       cp_valorCobro, cp_cuotas,  cp_valorCuota, cp_estado, cp_aplica, cp_procentaje, cp_tipo})
        //   return res.status(200).json({cp_idEmpresa, cp_titulo, cp_descripcion, cp_fechaDesde, 
        //       cp_fechaHasta, cp_valorCobro,  cp_cuotas, cp_valorCuota, cp_estado, cp_aplica, 
        //       cp_procentaje, cp_tipo ,id: result.insertId }); 
        // }

 // if (id === 0)
//   {    
//       const [result] = await pool.query("INSERT INTO Empresas SET ?",
//       {em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,
//         em_email,em_observaciones,em_autentica,em_consecAjustes,
//         em_consecRcaja,em_consecEgreso,em_fchini,em_fchfin,em_estado,em_saldo})
//       res.status(200).json({em_nombre,em_direccion,em_ciudad,em_tipodoc,
//         em_nrodoc,em_telefono,em_email,em_observaciones,em_autentica,
//         em_consecAjustes,em_consecRcaja,em_consecEgreso,em_fchini,em_fchfin,
//         em_estado,em_saldo, id: result.insertId });

//         const [resultUs] = await pool.query("INSERT INTO Empresas SET ?",
//         {em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,
//           em_email,em_observaciones,em_autentica,em_consecAjustes,
//           em_consecRcaja,em_consecEgreso,em_fchini,em_fchfin,em_estado,em_saldo})
//         res.status(200).json({em_nombre,em_direccion,em_ciudad,em_tipodoc,
//           em_nrodoc,em_telefono,em_email,em_observaciones,em_autentica,
//           em_consecAjustes,em_consecRcaja,em_consecEgreso,em_fchini,em_fchfin,
//           em_estado,em_saldo, id: resultUs.insertId });
//           res.json({
//               empresa: { id },
//           });
//           console.log(empresa.id);
//         return;

//  //   const [resultUs] = await pool.query("INSERT INTO Empresas SET ?",
//  //     {us_idEmpresa, us_nombre, us_direccion, us_localidad, us_barrio, us_ciudad, us_email, 
//  //       us_codigo, us_tipoDoc, us_nroDoc, us_clave, us_telefono, us_estado, us_nivel })
//   }




//  else
//  {  
//      const [result] = await pool.query("UPDATE Empresas SET ? WHERE id = "+id,
//      {em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,em_email,
//          em_observaciones, em_autentica,em_consecRcaja,em_consecEgreso,em_consecAjustes,
//          em_fchini,em_estado,em_saldo})
//      return res.status(200).json({em_nombre,em_direccion,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,em_email,
//          em_observaciones, em_autentica,em_consecRcaja,em_consecEgreso,em_consecAjustes,
//          em_fchini,em_estado,em_saldo, 
//          id: result.insertId }); 
//    } 
}