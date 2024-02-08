import { pool } from "../../../config/db";

export const saveEmpresas = async (req, res) => {
    const { em_nombre, em_direccion, em_ciudad, em_tipodoc, em_nrodoc, em_telefono, em_email, em_observaciones, em_autentica, em_consecRcaja, em_consecEgreso, em_consecAjustes, em_fchini, em_estado, em_saldo } = req.body;
    if (id === 0) {
        const [result] = await pool.query("INSERT INTO Empresas SET ?",
            {
                em_nombre, em_direccion, em_ciudad, em_tipodoc, em_nrodoc, em_telefono, em_email,
                em_observaciones, em_autentica, em_consecRcaja, em_consecEgreso, em_consecAjustes,
                em_fchini, em_estado, em_saldo
            });
        return res.status(200).json({
            em_nombre, em_direccion, em_ciudad, em_tipodoc, em_nrodoc,
            em_telefono, em_email, em_observaciones, em_autentica, em_consecRcaja, em_consecEgreso,
            em_consecAjustes, em_fchini, em_estado, em_saldo,
            id: result.insertId
        });
    }

    else {

        const { em_nombre, em_direccion, em_ciudad, em_tipodoc, em_nrodoc, em_telefono, em_email, em_observaciones, em_autentica, em_consecRcaja, em_consecEgreso, em_consecAjustes, em_fchini, em_estado, em_saldo } = req.body;
        const [result] = await pool.query("UPDATE Empresas SET ?",
            {
                em_nombre, em_direccion, em_ciudad, em_tipodoc, em_nrodoc, em_telefono, em_email,
                em_observaciones, em_autentica, em_consecRcaja, em_consecEgreso, em_consecAjustes,
                em_fchini, em_estado, em_saldo
            });
        return res.status(200).json({
            em_nombre, em_direccion, em_ciudad, em_tipodoc, em_nrodoc,
            em_telefono, em_email, em_observaciones, em_autentica, em_consecRcaja, em_consecEgreso,
            em_consecAjustes, em_fchini, em_estado, em_saldo,
            id: result.insertId
        });
    }
};
