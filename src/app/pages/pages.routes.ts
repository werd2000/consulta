import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteComponent } from './pacientes/paciente.component';
import { LoginGuard } from '../guards/login.guard';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './usuario/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';

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
            { path: 'paciente/ver/:id', component: PacienteComponent, data: { titulo: 'Ver paciente' } },
            { path: 'paciente/editar/:id/:tab', component: PacienteComponent, data: { titulo: 'Edición de paciente' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Lista de usuarios' } },
            { path: 'usuario/ver/:id', component: UsuarioComponent, data: { titulo: 'Ver usuario' } },
            { path: 'usuario/editar/:id', component: UsuarioComponent, data: { titulo: 'Editar usuario' } },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(PAGESROUTES);
