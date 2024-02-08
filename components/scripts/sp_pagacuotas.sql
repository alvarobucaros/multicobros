DELIMITER $$
CREATE PROCEDURE sp_pagacuotas(IN empresa INT, usuario INT,  valor DECIMAL(10,0), OUT mensaje VARCHAR(1024))
BEGIN
	DECLARE saldo DECIMAL;
    DECLARE auxiliar DECIMAL;
    DECLARE vlr DECIMAL;
    DECLARE cpto INTEGER;
    DECLARE periodo INTEGER;
	DECLARE var_usuario INTEGER;
	DECLARE var_final INTEGER DEFAULT 0;
	DECLARE cursor1 CURSOR FOR SELECT id, cb_idConcepto, cb_periodo 
					FROM cobros WHERE cb_idEmpresa = empresa AND cb_saldo > 0 AND cb_idUsuario = usuario 
					ORDER BY cb_periodo, cb_idConcepto;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final = 1;
    
    SET mensaje = 'historia';
	SET cpto = 0;
    SET saldo = valor;
    SET auxiliar = 0;
 	OPEN cursor1;
	bucle: LOOP
		FETCH cursor1 INTO var_usuario, cpto, periodo;
		IF var_final = 1 THEN
		  LEAVE bucle;
		END IF;
		IF saldo = 0 THEN
		  LEAVE bucle;
		END IF;
		SELECT  cb_saldo  INTO vlr FROM cobros  WHERE ID = var_usuario;
        IF saldo >= vlr THEN 
			SET auxiliar = 0; 
            SET saldo = saldo - vlr;    
            SET mensaje = concat( mensaje, '|T,',cpto,',',periodo,',',vlr);
		ELSE
            SET auxiliar = saldo;
            SET saldo = 0;
            SET mensaje = concat( mensaje, '|P,',cpto,',',periodo,',',auxiliar);
		
        END IF;    
		 UPDATE cobros SET cb_saldo = auxiliar WHERE id = var_usuario;
	END LOOP bucle;
  CLOSE cursor1;

END$$
DELIMITER $$

-- CALL sp_pagacuotas(2,21,185000, @mensaje); SELECT @mensaje;

-- SELECT * FROM cobros;

-- drop procedure sp_pagacuotas;



