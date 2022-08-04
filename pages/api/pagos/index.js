import {pool} from "../../../config/db";

export default async function handler(req, res) {
 console.log(req.method)
    if (req.method == 'GET'){
        return await getDatos(req, res);
    }
}

const getDatos = async (req,res)  => {
    let arg = req.query.arg;
    let arr = arg.split('|');
    let op = arr[0];
    let e  = arr[1];
    let cp = arr[2];
    if (op==='deudas'){      
        let sql = '';
        sql += " SELECT cobros.id , cb_idConcepto, cp_titulo ,cb_periodo ,cb_cuota ,cb_saldo "
        sql += " FROM cobros "
        sql += " INNER JOIN conceptos ON cb_idConcepto = conceptos.id  "
        sql += " WHERE cb_idEmpresa = " + e + " AND cb_saldo > 0 AND cb_idUsuario = 49"
        
    console.log(sql);
        const [result] = await pool.query(sql);
        return res.status(200).json(result);   
          
    }
}