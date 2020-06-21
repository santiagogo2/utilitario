

// Shared Guards
export { AdminGuard } from './shared/admin.guard';
export { IdentityGuard } from './shared/identity.guard';
export { LoginGuard } from './shared/login.guard';
export { ReporstGuard } from './shared/reports.guard';

// Dashboard Guards
	// Sala Situacional Guards
	export { SalaSituacionalGuard } from './dashboard/sala-situacional/sala-sitacional.guard';
	// Contratacion Guards
	export { ContratacionGuard } from './dashboard/contratacion/contratacion.guard';
	// UCI Guards
	export { UciGuard } from './dashboard/uci/uci.guard';
		// Ocupacion Guards
		export { UciOcupacionEditGuard } from './dashboard/uci/ocupacion/uci-ocupacion-edit.guard';
		export { UciOcupacionListGuard } from './dashboard/uci/ocupacion/uci-ocupacion-list.guard';
		export { UciOcupacionRegisterGuard } from './dashboard/uci/ocupacion/uci-ocupacion-register.guard';
		// Reports Guards
		export { UciReportsGuard } from './dashboard/uci/reports/uci-reports.guard';
	// Gestion del Riesgo Guards
	export { GestionRiesgoGuard } from './dashboard/gestion-riesgo/gestion-riesgo.guard';
	export { GestionRiesgoAdminGuard } from './dashboard/gestion-riesgo/gestion-riesgo-admin.guard';
		// Casos
		export { GestionRiesgoCasoEditGuard } from './dashboard/gestion-riesgo/caso/gestion-riesgo-caso-edit.guard';
		export { GestionRiesgoCasoListGuard } from './dashboard/gestion-riesgo/caso/gestion-riesgo-caso-list.guard';
		export { GestionRiesgoCasoRegisterGuard } from './dashboard/gestion-riesgo/caso/gestion-riesgo-caso-register.guard';