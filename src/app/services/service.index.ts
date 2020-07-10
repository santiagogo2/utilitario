// Admin Services
export { RoleService } from './admin/role.service';

// Dashboard Services
	// Sala Situacional Services 
	export { CollaboratorsService } from './dashboard/sala-situacional/collaborators.service';
	// Admin
	export { AreaService } from './admin/sala-situacional/area.service';
	export { ArlService } from './admin/sala-situacional/arl.service';
	export { InsurerService } from './admin/sala-situacional/insurer.service';
	export { ProfileService } from './admin/sala-situacional/profile.service';
	export { UnitService } from './admin/sala-situacional/unit.service';

	// Contratacion Services
	export { ContractService } from './dashboard/contratacion/contract.service';
	export { ContractorService } from './dashboard/contratacion/contractor.service';
	// Admin
	export { SupervisorService } from './admin/contratacion/supervisor.service';
	export { SpendingCoordinatorService } from './admin/contratacion/spendingCoordinator.service';

	// UCI Services
	export { OccupationService } from './dashboard/uci/occupation.service';

	// Gestión del Riesgo services
	export { CaseService } from './dashboard/gestion-riesgo/case.service';
	export { ContactService } from './dashboard/gestion-riesgo/contact.service';
	export { SampleService } from './dashboard/gestion-riesgo/sample.service';
	export { PatientService } from './dashboard/gestion-riesgo/patient.service';
	export { FollowService } from './dashboard/gestion-riesgo/follow.service';
	// Admin
	export { ActivityService } from './admin/gestion-riesgo/activity.service';
	export { LocationService } from './admin/gestion-riesgo/location.service';
	export { UpgdService } from './admin/gestion-riesgo/upgd.service';
	export { UpzService } from './admin/gestion-riesgo/upz.service';

	// EPP Services
	export { EppTrackingService } from './dashboard/epp/eppTracking.service';
	export { DinamicaService } from './dashboard/epp/dinamica.service';

// Shared Services
export { ExportService } from './shared/export.service';
export { global } from './shared/global.service';
export { UserService } from './shared/user.service';