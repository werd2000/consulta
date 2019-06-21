import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteComponent } from './pacientes/paciente.component';
import { LoginGuard } from '../guards/login.guard';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './usuario/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PersonalComponent } from './personal/personal.component';
import { EmpleadoComponent } from './personal/empleado.component';

const PAGESROUTES: Routes = [
    {
        path: '',
        // redirectTo: '/dashboard',
        // pathMatch: 'full',
        component: PagesComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [ LoginGuard ]
            },
            {
                path: 'pacientes',
                component: PacientesComponent,
                canActivate: [ LoginGuard ],
                data: { titulo: 'Lista de pacientes' }
            },
            { path: 'paciente/:id', component: PacienteComponent, data: { titulo: 'Creación de paciente' } },
            { path: 'paciente/editar/:id/:tab', component: PacienteComponent, data: { titulo: 'Edición de paciente' } },
            { path: 'paciente/editar/:id', component: PacienteComponent, data: { titulo: 'Edición de paciente' } },
            { path: 'paciente/ver/:id', component: PacienteComponent, data: { titulo: 'Ver paciente' } },
            {
                path: 'personal',
                component: PersonalComponent,
                canActivate: [ LoginGuard ],
                data: { titulo: 'Lista de personal' }
            },
            { path: 'empleado/:id', component: EmpleadoComponent, data: { titulo: 'Creación de empleado' } },
            { path: 'empleado/ver/:id', component: EmpleadoComponent, data: { titulo: 'Ver empleado' } },
            { path: 'empleado/editar/:id/:tab', component: EmpleadoComponent, data: { titulo: 'Edición de empleado' } },
            { path: 'empleado/editar/:id', component: EmpleadoComponent, data: { titulo: 'Edición de empleado' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Lista de usuarios' } },
            { path: 'usuario/ver/:id', component: UsuarioComponent, data: { titulo: 'Ver usuario' } },
            { path: 'usuario/editar/:id', component: UsuarioComponent, data: { titulo: 'Editar usuario' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(PAGESROUTES);
