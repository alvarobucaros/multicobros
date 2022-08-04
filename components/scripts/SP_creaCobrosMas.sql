DELIMITER //

DROP PROCEDURE IF EXISTS mi_procedure//
CREATE PROCEDURE mi_procedure(IN empresa INT, grupo INT, cpto INT,  cuotas INT, anno INT, mes INT, valor DECIMAL(10,0))
BEGIN
	DECLARE periodo Varchar(6);
    DECLARE i INT DEFAULT 0;
	DECLARE var_usuario INTEGER;
	DECLARE var_final INTEGER DEFAULT 0;
	DECLARE cursor1 CURSOR FOR SELECT gu_idUsuario FROM grupousuario WHERE gu_idEmpresa=empresa AND gu_idGrupo=grupo;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final = 1;
	OPEN cursor1;

  bucle: LOOP
    FETCH cursor1 INTO var_usuario;
    IF var_final = 1 THEN
      LEAVE bucle;
    END IF;
	SET i=0;
	WHILE (i < cuotas) DO
		SET periodo = anno;
		IF(mes  < 10) THEN SET periodo = CONCAT(periodo,'0');END IF;
		SET periodo = CONCAT(periodo,mes);		
		INSERT INTO  cobros(cb_idEmpresa, cb_idUsuario, cb_idConcepto, cb_periodo, cb_cuota, cb_saldo)
			VALUES (empresa, var_usuario, cpto, periodo, valor, valor  );
			SET mes = mes+1;
			if (mes > 12)  THEN SET mes = 1; SET anno = anno + 1; END IF;
			set i = i + 1;
		END WHILE;
     
  END LOOP bucle;
  CLOSE cursor1;

END//
DELIMITER ;

-- 			empresa INT, grupo INT, cpto INT, cuotas INT, anno INT, mes INT, valor DECIMAL(10,0)
--   CALL mi_procedure(2,17,21,12, 2015,6,1500) ;

--   SELECT * FROM cobros;

-- drop procedure mi_procedure;

--  gu_idUsuario FROM grupousuario WHERE gu_idEmpresa=2 AND gu_idGrupo=17

