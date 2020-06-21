export var global = {

	// url: 'http://www.backend-rendicion-de-cuentas.subredsur.gov.co/public/api/',
	url: 'http://info-utilitario.subredsur.gov.co/public/api/',
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
		{ id: 2, name: 'CONTACTOS SEGUIMIENTO' },
		{ id: 3, name: 'SOSPECHOSOS' },
		{ id: 4, name: 'BROTE' },
		{ id: 5, name: 'DESPLEGABLE' },
	],
	unidadMedida: [
		{ id: 1, name: 'AÑOS' },
		{ id: 2, name: 'MESES' },
		{ id: 3, name: 'DÍAS' },
	],
	fuenteContagio: [
		{ id: 1, name: 'RELACIONADO' },
		{ id: 2, name: 'IMPORTADO' },
		{ id: 3, name: 'DESCONOCIDO' },
		{ id: 4, name: 'EN ESTUDIO' },
	]
}