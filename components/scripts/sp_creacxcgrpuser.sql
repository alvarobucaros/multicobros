DELIMITER //

DROP PROCEDURE IF EXISTS sp_creacxcgrpuser// 
CREATE PROCEDURE sp_creacxcgrpuser(IN empresa INT, grupo INT, cpto INT,  cuotas INT, anno INT, mes INT, valor DECIMAL(10,0))
BEGIN
	DECLARE periodo Varchar(6);
    DECLARE i INT DEFAULT 0;
	DECLARE var_usuario INTEGER;
    DECLARE var_anno    INTEGER;
    DECLARE var_mes     INTEGER;
	DECLARE var_final   INTEGER DEFAULT 0;
	DECLARE cursor1 CURSOR FOR SELECT gu_idUsuario FROM grupousuario WHERE gu_idEmpresa=empresa AND gu_idGrupo=grupo;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final = 1;
	OPEN cursor1;

  bucle: LOOP
    FETCH cursor1 INTO var_usuario;
    IF var_final = 1 THEN
      LEAVE bucle;
    END IF;
	SET i=0;
    SET var_mes =  mes;
    SET var_anno = anno;
	WHILE (i < cuotas) DO
		SET periodo = var_anno;
		IF(var_mes  < 10) THEN SET periodo = CONCAT(periodo,'0');END IF;
		SET periodo = CONCAT(periodo,var_mes);		
		INSERT INTO  cobros(cb_idEmpresa, cb_idUsuario, cb_idConcepto, cb_periodo, cb_cuota, cb_saldo)
			VALUES (empresa, var_usuario, cpto, periodo, valor, valor  );
			SET var_mes = var_mes + 1;
			if (var_mes > 12)  THEN SET var_mes = 1; SET var_anno = var_anno + 1; END IF;
			set i = i + 1;
		END WHILE;
     
  END LOOP bucle;
  CLOSE cursor1;

END//
DELIMITER ;

-- 			empresa INT, grupo INT, cpto INT, cuotas INT, anno INT, mes INT, valor DECIMAL(10,0)
--   CALL sp_creacxcgrpuser(2,17,20,12, 2015,6,1500) ;

--   SELECT * FROM cobros;

-- drop procedure sp_creacxcgrpuser;

--  gu_idUsuario FROM grupousuario WHERE gu_idEmpresa=2 AND gu_idGrupo=17

