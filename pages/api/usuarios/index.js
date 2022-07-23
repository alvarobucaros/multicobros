import { useState } from "react";
import {pool} from "../../../config/db";

export default async function handler(req, res) {
 
  switch(req.method){
    case 'GET':
      return await getUsers(req, res);

    case 'POST': 
      return await saveUsers(req, res);

    case 'PUT': 
      return await updateUsers(req, res);
      
    case 'DELETE':
      return await deleteUsers(req, res);
   //   return res.status(200).json('Delete products')
  }
}
  const getUsers = async (req,res)  => {
    let query   = req.query;
    const {e, op} = query;
   
    if (op==='user'){
    let sql= "SELECT id, us_idEmpresa, us_nombre, us_direccion, " 
    sql += " us_localidad, us_barrio, us_ciudad, us_email, us_codigo, " 
    sql += " us_tipoDoc, us_nroDoc, us_telefono, us_clave, us_estado, us_nivel " 
    sql += " FROM usuarios WHERE us_idEmpresa = " + e
    sql += " ORDER BY us_nombre";
    const [result] = await pool.query(sql);
    return res.status(200).json(result);
   
  }else if(op==='abono'){
    let sql= " SELECT usuarios.id, us_idEmpresa, us_nombre, us_email, us_codigo, "
    sql += " us_tipoDoc, us_nroDoc, us_telefono, em_autentica "
    sql += " FROM usuarios INNER JOIN empresas ON empresas.id = us_idEmpresa "
    sql += " WHERE us_estado  = 'A' AND us_idEmpresa = " + e;
    const [result] = await pool.query(sql);
    return res.status(200).json(result);
  }

  }
  const deleteUsers = async (req, res)  => {
    const {id} = req.body;
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?",{id})
    return res.status(200).json(result);
  }
  
  const saveUsers = async (req, res) => {
    const {us_idEmpresa,us_nombre,us_direccion,us_localidad,us_barrio,us_ciudad,us_email,us_tipoDoc,us_nroDoc,us_telefono,us_clave,us_estado,us_nivel} = req.body;
    const [result] = await pool.query("INSERT INTO usuarios SET ?",
    {us_idEmpresa,us_nombre,us_direccion,us_localidad,us_barrio,us_ciudad,us_email,us_tipoDoc,us_nroDoc,us_telefono,us_clave,us_estado,us_nivel})
    return res.status(200).json({us_idEmpresa,us_nombre,us_direccion,us_localidad,us_barrio,us_ciudad,us_email,us_tipoDoc,us_nroDoc,us_telefono,us_clave,us_estado,us_nivel, id: result.insertId });

  }
 
  const updateUsers = async (req, res) => {
    const {myname, description, price, createdat} = req.body;
    const [result] = await pool.query("INSERT INTO product SET ?",
                              {myname, description, price, createdat})
    return res.status(200).json({myname, description, price, createdat, id: result.insertId });

  }
