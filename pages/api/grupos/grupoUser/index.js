import {pool} from "../../../../config/db";

export default async function handler(req, res) {

    if(req.method === 'POST'){
        return await updateGruposUsuario(req, res);
    }
}



const updateGruposUsuario = async (req,res)  => {
    let e = req.query.e;
    let si  = req.query.si; 
    let gr   = req.query.gr; 
    let arr = si.split(',');
    console.log('emresa = '+e + 'data 0 '+arr[0]+arr[1]+' grupo '+gr)
}