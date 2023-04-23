select * from users ORDER BY rol 
select * from ratings
select * from solicitudes
select s.id AS id_solicitud, u.id AS id_user, CONCAT(u.nombres, ' ', u.apellidos) nombre_completo, u.cedula, 
p.nombre, s.fecha, s.hora
from solicitudes s
INNER JOIN profesiones p ON p.id = s.id_profesion
INNER JOIN users u ON u.id = s.id_user OR u.id = s.id_trabajador
WHERE s.id =2
select * from trabajadores 
select CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, u.cedula, u.telefono, p.nombre as profesion, t.zonas, 
t.descripcion 
from trabajadores t
INNER JOIN users u ON u.id = t.id_user
INNER JOIN profesiones p ON p.id = t.id_profesion
WHERE t.id_user = 9 AND id_profesion = 24

SELECT s.id AS id_solicitud, u.id AS id_user, s.status,
        CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, p.nombre AS categoria, s.fecha, s.hora,
        s.fecha_ejecucion
        from solicitudes s
        INNER JOIN profesiones p ON p.id = s.id_profesion
        INNER JOIN users u ON u.id = s.id_trabajador
        WHERE s.id_user = (18)
        ORDER BY id_solicitud
		