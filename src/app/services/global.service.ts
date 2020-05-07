export var global = {
	// url: 'http://www.backend-rendicion-de-cuentas.subredsur.gov.co/public/api/',
	url: 'http://localhost:8080/rendicion-de-cuentas/api-rest-rendicion-de-cuentas/public/api/',
	roles: [
		{id: 1, value: 'admin', name: 'Administrador'},
		{id:2, value: 'user', name: 'Usuario'}
	],
	arls: [
		{id: 1, value: 'SURA'}
	],
	aseguradoras: [
		{id: 1, value: 'ALIANSALUD'},
		{id: 2, value: 'COMPENSAR'},
		{id: 3, value: 'FAMISANAR'},
		{id: 4, value: 'NUEVA EPS'},
		{id: 5, value: 'SALUD TOTAL'},
		{id: 6, value: 'SANITAS'},
		{id: 7, value: 'SURA'},
	],
	estados: [
		{id: 1, value: 'CUARENTENA'},
		{id: 2, value: 'HOSPITALIZADO'},
		{id: 3, value: 'RECUPERADO'},
		],
	manejos: [
		{id: 1, value: 'AMBULATORIO'},
		{id: 2, value: 'HOSPITALIZADO'},	
	],
	respuestas: [
		{id: 1, value: 'SI'},
		{id: 2, value: 'NO'},
	],
	sexo: [
		{id: 1, value: 'MASCULINO'},
		{id: 2, value: 'FEMENINO'},
		{id: 3, value: 'INTERSEXUAL'}
	],
	tipoDocumento: [
		{ id: 1, value: 'CÉDULA DE CIUDADANIA' }
	],
}