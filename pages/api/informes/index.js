import {pool} from "../../../../config/db";

export default async function handler(req, res) {

    if(req.method === 'GET'){
        return await traeInformacion(req, res);
    }
}

const traeInformacion = async (req,res)  => {
    let e = req.query.e;
    let ar  = req.query.ar;  // argumentos
 
    console.log('emresa = '+e + 'data 0 '+ar)
// Trae todos encabezados de cuentas por cobrar
    sql = "SELECT CONCAT(cp_titulo,'-',cp_descripcion) concepto,  grp_nombre, cc_fechaProceso, "
    sql += " cp_cuotas, cp_valorCuota, cc_valor,cc_saldo "
    sql += " FROM cuentascobrar "
    sql += " INNER JOIN conceptos ON conceptos.id = cc_idConcepto "
    sql += " INNER JOIN grupos ON grupos.id = cc_idGrupo"
    sql += " WHERE grp_empresa=cc_idEmpresa AND cp_idEmpresa=cc_idEmpresa  AND cc_idEmpresa=" + e 
    sql += " UNION "
    sql += " SELECT CONCAT(cp_titulo,'-',cp_descripcion) concepto, 'TODOS' grp_nombre, cc_fechaProceso, "
    sql += " cp_cuotas, cp_valorCuota, cc_valor, cc_saldo FROM cuentascobrar"
    sql += " INNER JOIN conceptos ON conceptos.id = cc_idConcepto "
    sql += " WHERE cc_idGrupo=0  AND cp_idEmpresa=cc_idEmpresa  AND cc_idEmpresa= "+ e
}

