import {pool} from "../../../config/db";


export default async function updateClave(req, res) {
    return await updateUsers(req, res);
}


const md5 = require('js-md5');

///let id  = req.query.id;
const updateUsers = async (req, res) => {
    var qry = "UPDATE usuarios SET us_clave = ? WHERE id = ?"
    const  us_clave = req.query.us_clave;
    const id = req.query.id;
    const pwd = md5(us_clave);
   const [result] = await pool.query(qry,{pwd, id})
    return res.status(200).json({ok:result});
  }
