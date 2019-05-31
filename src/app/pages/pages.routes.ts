import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteComponent } from './pacientes/paciente.component';

const PAGESROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'pacientes', component: PacientesComponent, data: { titulo: 'Lista de pacientes' } },
    { path: 'paciente/:id', component: PacienteComponent, data: { titulo: 'Creación de paciente' } },
    { path: 'paciente/ver/:id', component: PacienteComponent, data: { titulo: 'Edición de paciente' } },
    { path: 'paciente/editar/:id', component: PacienteComponent, data: { titulo: 'Edición de paciente' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(PAGESROUTES);
