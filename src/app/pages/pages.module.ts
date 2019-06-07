import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Módulos
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Pipe module
import { PipesModule } from '../pipes/pipes.module';


// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteComponent } from './pacientes/paciente.component';
import { PacientePrincipalComponent } from '../components/forms/paciente/pacientePrincipal.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuario/usuarios.component';
import { DomicilioComponent } from '../components/forms/domicilio/domicilio.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    PipesModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    // PagesComponent,
    DashboardComponent,
    PacientesComponent,
    PacienteComponent,
    PacientePrincipalComponent,
    UsuarioComponent,
    UsuariosComponent,
    DomicilioComponent
  ],
  exports: [
    // PagesComponent,
    DashboardComponent,
    PacientePrincipalComponent,
    UsuarioComponent,
    UsuariosComponent,
    DomicilioComponent
  ]
})
export class PagesModule { }