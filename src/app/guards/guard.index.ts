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
	export { UciEditGuard } from './dashboard/uci/uci-edit.guard';
	export { UciListGuard } from './dashboard/uci/uci-list.guard';
	export { UciRegisterGuard } from './dashboard/uci/uci-register.guard';
	export { UciReportsGuard } from './dashboard/uci/uci-reports.guard';