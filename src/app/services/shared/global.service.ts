export var global = {

	// url: 'http://www.backend-rendicion-de-cuentas.subredsur.gov.co/public/api/',
	url: 'http://info-utilitario.subredsur.gov.co/public/api/',
	estados: [
		{id: 0, value: 'CUARENTENA'},
		{id: 1, value: 'HOSPITALIZADO'},
		{id: 2, value: 'RECUPERADO'},
		{id: 3, value: 'UCI'},
		],
	manejos: [
		{id: 0, value: 'AMBULATORIO'},
		{id: 1, value: 'HOSPITALIZADO'},	
	],
	modalidad: [
		{id: 1, value: 'PRESENCIAL'},
	],
	nexos: [
		{id: 0, value: 'DESCONOCIDO'},
		{id: 1, value: 'FAMILIAR'},	
		{id: 2, value: 'LABORAL'},	
		{id: 3, value: 'LABORAL DE OTRA ENTIDAD'},	
	],
	respuestas: [
		{id: 0, value: 'SI'},
		{id: 1, value: 'NO'},
	],
	sexo: [
		{id: 0, value: 'FEMENINO'},
		{id: 1, value: 'MASCULINO'},
	],
	tipoDocumento: [
		{ id: 0, value: 'CÉDULA DE CIUDADANIA' }
	],
	tipoVinculacion: [
		{ id: 0, value: 'OPS' },
		{ id: 1, value: 'PLANTA' },
	],
}