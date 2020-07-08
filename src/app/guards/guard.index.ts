

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
		// Caracterización de pacientes
		export { GestionRiesgoCaracterizacionListGuard } from './dashboard/gestion-riesgo/caracterizacion/gestion-riesgo-caracterizacion-list.guard';
		export { GestionRiesgoCaracterizacionRegisterGuard } from './dashboard/gestion-riesgo/caracterizacion/gestion-riesgo-caracterizacion-register.guard';
		// Toma de muestras
		export { GestionRiesgoTomaMuestrasEditGuard } from './dashboard/gestion-riesgo/toma-muestras/gestion-riesgo-toma-muestras-edit.guard';
		export { GestionRiesgoTomaMuestrasListGuard } from './dashboard/gestion-riesgo/toma-muestras/gestion-riesgo-toma-muestras-list.guard';
		export { GestionRiesgoTomaMuestrasRegisterGuard } from './dashboard/gestion-riesgo/toma-muestras/gestion-riesgo-toma-muestras-register.guard';
		// Seguimientos
		export { GestionRiesgoSeguimientoGuard } from './dashboard/gestion-riesgo/seguimientos/gestion-riesgo-seguimiento.guard';
		export { GestionRiesgoSeguimientoEditGuard } from './dashboard/gestion-riesgo/seguimientos/gestion-riesgo-seguimiento-edit.guard';
		export { GestionRiesgoSeguimientoListGuard } from './dashboard/gestion-riesgo/seguimientos/gestion-riesgo-seguimiento-list.guard';
		export { GestionRiesgoSeguimientoRegisterGuard } from './dashboard/gestion-riesgo/seguimientos/gestion-riesgo-seguimiento-register.guard';
	// EPP Guards
	export { EppGuard } from './dashboard/epp/epp.guard';
	export { EppAdminGuard } from './dashboard/epp/epp-admin.guard';
		// Casos
		export { EppSeguimientoEditGuard } from './dashboard/epp/seguimiento/epp-seguimiento-edit.guard';
		export { EppSeguimientoListGuard } from './dashboard/epp/seguimiento/epp-seguimiento-list.guard';
		export { EppSeguimientoRegisterGuard } from './dashboard/epp/seguimiento/epp-seguimiento-register.guard';