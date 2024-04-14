
import {pool} from "../../../config/db";

export default async function handler(req, res) {
 
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
  

  // 'opcion|'+empresa+'|'+cp+'|'+gr;

  let arg = req.query.arg;
  let arr = arg.split('|');
  let op = arr[0];
  let sql = '';

  if (op=='existe'){   
    let e=arr[1];
    let cp=arr[2];
    let gr=arr[3];  
    sql += " SELECT  cc_fechaProceso, sum(cc_valor) suma, sum(cc_saldo) saldo" 
    sql += " FROM cuentascobrar WHERE  cc_activa='A' AND cc_idEmpresa =  " + e
    sql += " AND cc_idConcepto = "+ cp+ " AND cc_idGrupo =  " + gr
    sql += " GROUP BY cc_fechaProceso ORDER BY cc_fechaProceso DESC "   ;
    const [result] = await pool.query(sql);
    return res.status(200).json(result);   
  }else 
  if(op=='todas'){
    sql += " SELECT  id, cc_idEmpresa, cc_idConcepto, cc_idGrupo, cc_fechaProceso,  cc_valor, cc_saldo, cc_activa " 
    sql += " FROM cuentascobrar WHERE  cc_activa='A' AND cc_idEmpresa =  " + e
    sql += " ORDER BY cc_fechaProceso DESC "   ;
    const [result] = await pool.query(sql);
    return res.status(200).json(result);    
  } 
  else 
  if(op=='traeGrupo'){
    let e=arr[1];
    let cp=arr[2];
    let gr=arr[3]; 
    sql += "SELECT id, cc_idEmpresa, cc_idConcepto, cc_idGrupo, cc_fechaProceso," 
    sql += " cc_valor,cc_saldo,cc_activa FROM cuentascobrar " 
    sql += " WHERE cc_idEmpresa = " + e + " AND cc_idConcepto =  "+ cp + 
    " AND cc_idGrupo = " + gr;
    const [result] = await pool.query(sql);
    return res.status(200).json(result); 
  } else
  if(op=='cobros'){
    sql += "SELECT count(*) as nro FROM cobros WHERE cb_idEmpresa = " + e + 
    " AND cb_idConcepto = "+ cp + " AND cb_saldo > 0 "
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
  if(op == 'ctaVlr'){
    let sql = "";
    sql += "SELECT cp_fechaDesde, cp_cuotas, cp_valorCuota "
    sql +=  "FROM conceptos WHERE id="+ cp + " AND cp_idEmpresa = "+e
    const [result] = await pool.query(sql);
    return res.status(200).json(result); 
  } else 
  if(op == 'crear'){
    let e=arr[1];
    let cp=arr[2];
    let gr=arr[3];
    let nrCtas=arr[4];
    let fecha=arr[5];
    let valor=arr[6];
    let dat = fecha.split('-');
    let url = e+","+gr+","+cp+","+nrCtas+","+dat[0]+","+dat[1]+","+valor+")";
    if (gr == 0){
      url = "sp_creacxcuser("+url;
    } else {
      url = "sp_creacxcgrpuser("+url;
    }
    let sql = "CALL "+url;
   
    const [result] = await pool.query(sql);
    return res.status(200).json(result); 
  }
}
