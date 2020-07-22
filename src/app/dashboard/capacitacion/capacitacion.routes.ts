import { Routes, RouterModule } from '@angular/router';

// Components
import { CapacitacionComponent } from './capacitacion.component';

const capacitacionRoutes: Routes = [
    { path: '', component: CapacitacionComponent, data: { titulo: 'Capacitaciones' } },
];
export const CAPACITACION_ROUTES = RouterModule.forChild( capacitacionRoutes );