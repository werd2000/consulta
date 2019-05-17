import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';

const PAGESROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'pacientes', component: PacientesComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(PAGESROUTES);
