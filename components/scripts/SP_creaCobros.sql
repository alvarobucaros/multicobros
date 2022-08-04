DELIMITER $$
CREATE PROCEDURE sp_creacobros(IN empresa INT, cpto INT, usuario INT, cuotas INT, anno INT, mes INT, valor DECIMAL(10,0))
BEGIN
	DECLARE periodo Varchar(6);
    DECLARE i INT DEFAULT 0;
   
    WHILE (i < cuotas) DO
		SET periodo = anno;
		IF(mes  < 10) THEN SET periodo = CONCAT(periodo,'0');END IF;
		SET periodo = CONCAT(periodo,mes);		
		INSERT INTO  cobros(cb_idEmpresa, cb_idUsuario, cb_idConcepto, cb_periodo, cb_cuota, cb_saldo)
		VALUES (empresa, usuario, cpto, periodo, valor, valor  );
		SET mes = mes+1;
        if (mes > 12)  THEN SET mes = 1; SET anno = anno + 1; END IF;
        set i = i + 1;
	END WHILE;
END$$
DELIMITER $$

-- CALL sp_creacobros(2,31,7,12, 2015,6,1500) ;

-- SELECT * FROM cobros;

-- drop procedure sp_creacobros;




