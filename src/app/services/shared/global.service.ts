export var global = {

	// url: 'http://www.backend-rendicion-de-cuentas.subredsur.gov.co/public/api/',
	url: 'http://info-utilitario.subredsur.gov.co/public/api/',
	urlDinamica: 'http://172.17.2.81/api-rest-dinamica/public/api/',
	estados: [
		{id: 1, value: 'CUARENTENA'},
		{id: 2, value: 'HOSPITALIZADO'},
		{id: 3, value: 'RECUPERADO'},
		{id: 4, value: 'UCI'},
		{id: 5, value: 'FALLECIDO'},
	],
	manejos: [
		{id: 1, value: 'AMBULATORIO'},
		{id: 2, value: 'HOSPITALIZADO'},	
	],
	modalidad: [
		{id: 1, value: 'PRESENCIAL'},
	],
	nexos: [
		{id: 1, value: 'DESCONOCIDO'},
		{id: 2, value: 'FAMILIAR'},	
		{id: 3, value: 'LABORAL'},	
		{id: 4, value: 'LABORAL DE OTRA ENTIDAD'},
	],
	respuestas: [
		{id: 1, value: 'SI'},
		{id: 2, value: 'NO'},
	],
	sexo: [
		{id: 1, value: 'FEMENINO'},
		{id: 2, value: 'MASCULINO'},
	],
	tipoDocumento: [
		{ id: 1, value: 'CC - CÉDULA DE CIUDADANIA' },
		{ id: 2, value: 'TI - TARJETA DE IDENTIDAD' },
		{ id: 3, value: 'RC - REGISTRO CIVIL' },
		{ id: 4, value: 'PA - PASAPORTE' },
		{ id: 5, value: 'CE - CÉDULA DE EXTRANJERÍA' },
		{ id: 6, value: 'PEP - PERMISO ESPECIAL DE PERMANENCIA' },
		{ id: 7, value: 'AS - ADULTO SIN IDENTIFICACIÓN' },
		{ id: 8, value: 'MS - MENOR SIN IDENTIFICACIÓN' },
		{ id: 9, value: 'OTRO' },
	],
	tipoVinculacion: [
		{ id: 1, value: 'OPS' },
		{ id: 2, value: 'PLANTA' },
	],

	clasificacionCaso: [
		{ id: 1, name: 'POSITIVO' },
		{ id: 2, name: 'SEGUIMIENTO DE CONTACTOS' },
		{ id: 3, name: 'PROBABLE' },
		{ id: 4, name: 'DESCARTADO' },
		{ id: 5, name: 'BROTE' },
	],
	unidadMedida: [
		{ id: 1, name: 'AÑOS' },
		{ id: 2, name: 'MESES' },
		{ id: 3, name: 'DÍAS' },
	],
	gruposEdad: [
		{ id: 1, name: 'MENORES DE 1 AÑO - LACTANTES' },
		{ id: 2, name: '1 AÑO - LACTANTES' },
		{ id: 3, name: '2 A 4 AÑOS - PRESCOLARES' },
		{ id: 4, name: '5 A 19 AÑOS - ESCOLARES' },
		{ id: 5, name: '20 A 39 AÑOS - ADULTOS JÓVENES' },
		{ id: 6, name: '40 A 59 AÑOS - ADULTOS' },
		{ id: 7, name: 'MAYORES DE 60 AÑOS - ADULTOS MAYORES' },
	],
	fuenteContagio: [
		{ id: 1, name: 'RELACIONADO' },
		{ id: 2, name: 'IMPORTADO' },
		{ id: 3, name: 'DESCONOCIDO' },
		{ id: 4, name: 'EN ESTUDIO' },
	],
	pertenenciaEtnica: [
		{ id: 1, name: 'INDÍGENA' },
		{ id: 2, name: 'ROM, GITANO' },
		{ id: 3, name: 'RAIZAL' },
		{ id: 4, name: 'PALENQUERO' },
		{ id: 5, name: 'NEGRO, MULATO, AFROCOLOMBIANO' },
		{ id: 6, name: 'OTRO' },
	],
	grupoPoblacional: [
		{ id: 1, name: 'DISCAPACITADOS' },
		{ id: 2, name: 'MIGRANTES' },
		{ id: 3, name: 'GESTANTES' },
		{ id: 4, name: 'POBLACIÓN INFANTIL A CARGO DEL ICBF' },
		{ id: 5, name: 'DESMOVILIZADOS' },
		{ id: 6, name: 'VÍCTIMAS DE VIOLENCIA ARMADA' },
		{ id: 7, name: 'DESPLAZADOS' },
		{ id: 8, name: 'CARCELARIOS' },
		{ id: 9, name: 'INDIGENTES' },
		{ id: 10, name: 'MADRES COMUNITARIAS' },
		{ id: 11, name: 'CENTROS PSIQUIÁTRICOS' },
		{ id: 12, name: 'OTROS GRUPOS POBLACIONALES' },
	],
	tipoCasos: [
		{ id: 1, name: 'INDICE' },
		{ id: 2, name: 'CONTACTO' },
	],
	tipoContactos: [
		{ id: 1, name: 'LABORAL' },
		{ id: 2, name: 'SOCIAL' },
		{ id: 3, name: 'RELIGIOSO' },
		{ id: 4, name: 'FAMILIAR EXTENSA' },
		{ id: 5, name: 'FAMILIAR NUCLEAR' },
		{ id: 6, name: 'OTRO' },
	],
	vinculos: [
		{ id: 1, name: 'CASO INDICE' },
		{ id: 2, name: 'PADRE' },
		{ id: 3, name: 'MADRE' },
		{ id: 4, name: 'HERMAN@' },
		{ id: 5, name: 'ABUL@' },
		{ id: 6, name: 'TI@' },
		{ id: 7, name: 'PRIM@' },
		{ id: 8, name: 'CUÑAD@' },
		{ id: 9, name: 'PAREJA' },
		{ id: 10, name: 'COMPAÑER@ DE TRABAJO' },
		{ id: 11, name: 'HIJ@' },
		{ id: 12, name: 'VECIN@' },
		{ id: 13, name: 'NIET@' },
		{ id: 14, name: 'OTRO' },
	],
	estadosFinal: [
		{ id: 1, name: 'ACTIVO' },
		{ id: 2, name: 'CERRADO' },
	],
	tomaMuestras: [
		{ id: 1, name: 'SI' },
		{ id: 2, name: 'PENDIENTE' },
	],
	resultados: [
		{ id: 1, name: 'POSITIVO' },
		{ id: 2, name: 'NEGATIVO' },
		{ id: 3, name: 'PENDIENTE' },
	],
	services: [
		{ id: 1, name: 'ÁREA ADMINISTRATIVA' },
		{ id: 2, name: 'CONSULTA EXTERNA' },
		{ id: 3, name: 'HOSPITALIZACIÓN' },
		{ id: 4, name: 'URGENCIAS' },
	],
	epps: [
		{ id: 1, name: 'BATA DESECHABLE' },
		{ id: 2, name: 'CARETA' },
		{ id: 3, name: 'GUANTES' },
		{ id: 4, name: 'MONOGAFAS' },
		{ id: 5, name: 'TAPABOCAS DESECHABLE' },
		{ id: 6, name: 'TAPABOCAS N95' },
	],
	nacionalidades: [
		{ id: 1, name: 'COLOMBIANO' },
		{ id: 2, name: 'VENEZOLANO' },
		{ id: 3, name: 'PERUANO' },
	],
	profesionales: [
		{ id: 1, name: 'PEPITO PEREZ UNO' },
		{ id: 2, name: 'PEPITO PEREZ DOS' },
		{ id: 3, name: 'PEPITO PEREZ TRES' },
	],
	auxiliares: [
		{ id: 1, name: 'PEPITO PEREZ UNO' },
		{ id: 2, name: 'PEPITO PEREZ DOS' },
		{ id: 3, name: 'PEPITO PEREZ TRES' },
	],
	tiposSeguimiento: [
		{ id: 1, name: 'EFECTIVO' },
		{ id: 2, name: 'FALLIDO' },
	],
	estadoPaciente: [
		{ id: 1, name: 'SANO' },
		{ id: 2, name: 'ENFERMO' },
	],
	eventos: [
		{ id: 1, name: '345 - Vigilancia Centinela Enfermedad Similiar a influenza ESI - IRAG' },
		{ id: 2, name: '346 - Infección Respiratoria Aguda por Virus Nuevo' },
		{ id: 3, name: '348 - Infección Respiratoria Aguda Grave - IRAG - Inusitada' },
	],
	fuentesNotificacion: [
		{ id: 1, name: 'NR - Notificación Rutinaria' },
		{ id: 2, name: 'BAI - Busqueda Activa Institucional' },
		{ id: 3, name: 'VI - Vigilancia Intensificada' },
		{ id: 4, name: 'Busqueda Activa Comunitaria' },
	],
	condicionesIEC: [
		{ id: 1, name: 'EFECTIVA' },
		{ id: 2, name: 'FALLIDA' },
		{ id: 3, name: 'INTERLOCAL NORTE' },
		{ id: 4, name: 'INTERLOCAL CENTRO ORIENTE' },
		{ id: 5, name: 'INTERLOCAL SUROCCIDENTE' },
		{ id: 6, name: 'OTRA CIUDAD' },
	],
	tiposRegimen: [
		{ id: 1, name: 'C: CONTRIBUTIVO' },
		{ id: 2, name: 'E: ESPECIAL' },
		{ id: 3, name: 'S: SUBSIDIADO' },
		{ id: 4, name: 'P: EXCEPCIÓN' },
		{ id: 5, name: 'N: NO ASEGURADO' },
		{ id: 6, name: 'I: INDETERMINADO/PENDIENTE' },
	],
	tiposBrote: [
		{ id: 1, name: 'BROTE FAMILIA' },
		{ id: 2, name: 'BROTE RELACIONADO CON IPS' },
		{ id: 3, name: 'BROTE INSTITUCIONAL' },
	],
	ultimosContactos: [
		{ id: 1, name: '7 DÍAS O MENOS' },
		{ id: 2, name: 'ENTRE 8 Y 14 DÍAS' },
		{ id: 3, name: '15 DÍAS O MAS' },
	],
	condiciones: [
		{ id: 1, name: 'DOMICILIO' },
		{ id: 2, name: 'HOSPITALIZADO' },
		{ id: 3, name: 'FALLECIDO' },
	],
	temas: [
		{ id: 1, name: 'TEMA 1' },
		{ id: 2, name: 'TEMA 2' },
		{ id: 3, name: 'TEMA 3' },
	],
}