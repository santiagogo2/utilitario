export var global = {
	// url: 'http://www.backend-rendicion-de-cuentas.subredsur.gov.co/public/api/',
	url: 'http://localhost/utilitario/api-utilitario/public/api/',
	roles: [
		{id:0, value: 'admin', name: 'Administrador'},
		{id:1, value: 'user', name: 'Usuario'}
	],
	area: [
		{id:0, value: 'ADMINISTRATIVA'},
		{id:1, value: 'APH'},
		{id:2, value: 'CALIDAD'},
		{id:3, value: 'CONSULTA EXTERNA - ABRAHAM LINCON'},
		{id:4, value: 'ESPACIO VIVIENDA'},
		{id:5, value: 'FACTURACIÓN'},
		{id:6, value: 'HOSPITALIZACIÓN'},
		{id:7, value: 'SIRC'},
		{id:8, value: 'TERAPIA RESPIRATORIA'},
		{id:9, value: 'TRANSLADOS INTERNOS'},
		{id:10, value: 'UCI NEONATOS'},
		{id:11, value: 'UNIDAD NEONATOS'},
		{id:12, value: 'URGENCIAS'},
		{id:13, value: 'VIGILANCIA SANITÁRIA'},
	],
	arls: [
		{id: 0, value: 'SURA'}
	],
	aseguradoras: [
		{id: 0, value: 'ALIANSALUD'},
		{id: 1, value: 'COMPENSAR'},
		{id: 2, value: 'FAMISANAR'},
		{id: 3, value: 'NUEVA EPS'},
		{id: 4, value: 'SALUD TOTAL'},
		{id: 5, value: 'SANITAS'},
		{id: 6, value: 'SURA'},
	],
	estados: [
		{id: 0, value: 'CUARENTENA'},
		{id: 1, value: 'HOSPITALIZADO'},
		{id: 2, value: 'RECUPERADO'},
		],
	manejos: [
		{id: 0, value: 'AMBULATORIO'},
		{id: 1, value: 'HOSPITALIZADO'},	
	],
	nexos: [
		{id: 0, value: 'DESCONOCIDO'},
		{id: 1, value: 'FAMILIAR'},	
		{id: 2, value: 'LABORAL'},	
		{id: 3, value: 'LABORAL DE OTRA ENTIDAD'},	
	],
	perfil: [
		{id:0, value: 'AUXILIAR ADMINISTRATIVO'},
		{id:1, value: 'AUXILIAR DE ENFERMERÍA'},
		{id:2, value: 'CONDUCTOR'},
		{id:3, value: 'CONDUCTOR APH'},
		{id:4, value: 'ENFERMERA'},
		{id:5, value: 'ENFERMERA SSO'},
		{id:6, value: 'MÉDICO AUDITOR'},
		{id:7, value: 'MÉDICO GENERAL'},
		{id:8, value: 'MÉDICO INTERNISTA'},
		{id:9, value: 'MÉDICO PEDIATRA'},
		{id:10, value: 'MÉDICO SSO'},
		{id:11, value: 'MÉDICO VETERINARIO'},
		{id:12, value: 'PROFESIONAL DE ENLACE'},
		{id:13, value: 'TERAPEUTA RESPIRATORIA'},
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
}