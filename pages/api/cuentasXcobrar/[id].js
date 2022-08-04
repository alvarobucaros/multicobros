
import {pool} from "../../../config/db";

export default async function handler(req, res) {
 
    if(req.method === 'GET'){
        return await getctaXcobrar(req, res);
    }
}

const getctaXcobrar = async (req,res)  => {
    let id  = req.query.id;  
    let dato = id.split('|');
    let empresa = dato[0];
    let concepto = dato[1];  
    let grupo = dato[2];
 
       let sql = "SELECT id, cc_idEmpresa, cc_idConcepto, cc_idGrupo, cc_fechaProceso,  " 
       sql += " cc_valor, cc_saldo, cc_activa " 
       sql += " FROM cuentascobrar WHERE cc_idEmpresa = '" + empresa + "'"
       sql += " AND cc_idConcepto = '" + concepto + "' AND cc_idGrupo = '" + grupo   + "'"
       sql += " ORDER BY cc_fechaProceso DESC "   
   
        const [result] = await pool.query(sql )
        return res.status(200).json(result);
     }   