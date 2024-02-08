import {pool} from "../../../config/db";

export default async function handler(req, res) {
 console.log(req.method)
    if (req.method == 'GET'){
        return await getDatos(req, res);
    }
    if (req.method == 'POST'){
        return await postDatos(req, res);
    }
}

const getDatos = async (req,res)  => {
    let arg = req.query.arg;
    let arr = arg.split('|');
    let op = arr[0];
    let e  = arr[1];
    let us = arr[2];
    if (op==='deudas'){      
        let sql = '';
        sql += " SELECT cobros.id , cb_idConcepto, cp_titulo ,cb_periodo ,cb_cuota ,cb_saldo ";
        sql += " FROM cobros ";
        sql += " INNER JOIN conceptos ON cb_idConcepto = conceptos.id  ";
        sql += " WHERE cb_idEmpresa = " + e + " AND cb_saldo > 0 AND cb_idUsuario = " + us;
        sql += " ORDER BY cb_periodo, cb_idConcepto  ";
        const [result] = await pool.query(sql);
        return res.status(200).json(result);         
    }
}

const postDatos = async (req,res)  => {
    let arg = req.query.arg;
   // 'aplica|'+empresa+'|'+usu+'|'+valor;
    let arr = arg.split('|');
    let op = arr[0];
    let e  = arr[1];
    let us = arr[2];
    let valor = arr[3];
    let url = e+","+us+","+valor+", @mensaje)";
    url = "sp_pagacuotas("+url;
    let sql = "CALL "+url;
  
    await pool.query(sql);
    sql = "SELECT @mensaje AS mensaje";
    const [result] = await pool.query(sql);
    return res.status(200).json(result); 
}