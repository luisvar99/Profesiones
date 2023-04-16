select * from users ORDER BY id desc limit 1
--DELETE FROM users WHERE apellidos ='Prueba'
--select * from profesiones 
delete from profesiones where nombre like 'M%'
select * from trabajadores 
select CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, u.cedula, u.telefono, p.nombre as profesion, t.zonas, 
t.descripcion 
from trabajadores t
INNER JOIN users u ON u.id = t.id_user
INNER JOIN profesiones p ON p.id = t.id_profesion
WHERE t.id_user = 9 AND id_profesion = 24