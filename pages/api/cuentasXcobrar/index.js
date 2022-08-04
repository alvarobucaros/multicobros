
import {pool} from "../../../config/db";

export default async function handler(req, res) {
 console.log(req.method)
    switch(req.method){
      case 'GET':
        return await getctaXcobrar(req, res);
    
      case 'POST': 
        return await savectaXcobrar(req, res);
  
      case 'PUT': 
        return await updatectaXcobrar(req, res);
        
      case 'DELETE':
        return await deletectaXcobrar(req, res);

      default:
            return;
    }
}

const getctaXcobrar = async (req,res)  => {

  let e  = req.query.e;
  let cp = req.query.cp; 
  let gr = req.query.gr; 
  let op = req.query.op; 
  
  if (op=='existe'){   
    let sql = '';
    sql += " SELECT  cc_fechaProceso, sum(cc_valor) suma, sum(cc_saldo) saldo" 
    sql += " FROM cuentascobrar WHERE  cc_activa='A' AND cc_idEmpresa =  " + e
    sql += " AND cc_idConcepto = "+ cp+ " AND cc_idGrupo =  " + gr
    sql += " GROUP BY cc_fechaProceso ORDER BY cc_fechaProceso DESC "   ;

    const [result] = await pool.query(sql);
    return res.status(200).json(result);   
   
  }else if(op=='todas'){
    let sql = '';
    sql += " SELECT  id, cc_idEmpresa, cc_idConcepto, cc_idGrupo, cc_fechaProceso,  cc_valor, cc_saldo, cc_activa " 
    sql += " FROM cuentascobrar WHERE  cc_activa='A' AND cc_idEmpresa =  " + e
    sql += " ORDER BY cc_fechaProceso DESC "   ;
    const [result] = await pool.query(sql);
    return res.status(200).json(result);    
  }
}
  
const savectaXcobrar = async (req,res)  => {
  let arg = req.query.arg;
  let arr = arg.split('|');
  let op = arr[0];
  let e  = arr[1];
  let cp = arr[2];
  if(op = 'ctaVlr'){
    let sql = "";
    sql += "SELECT cp_fechaDesde, cp_cuotas, cp_valorCuota "
    sql +=  "FROM conceptos WHERE id="+ cp + " AND cp_idEmpresa = "+e
    const [result] = await pool.query(sql);
    return res.status(200).json(result); 
  } 
}