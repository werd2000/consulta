import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { RoleUsuarioPipe } from './role-usuario.pipe';
import { UsuarioGooglePipe } from './usuario-google.pipe';
// import { EstadoPacientePipe } from './estado-paciente.pipe';
// import { AreaProfesionalPipe } from './area-profesional.pipe';
// import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    ImagenPipe,
    RoleUsuarioPipe,
    UsuarioGooglePipe
    // EstadoPacientePipe,
    // AreaProfesionalPipe,
    // UsuarioPipe,
    // SafeHtmlPipe
  ],
  exports: [
    ImagenPipe,
    RoleUsuarioPipe,
    UsuarioGooglePipe
    // EstadoPacientePipe,
    // AreaProfesionalPipe,
    // UsuarioPipe,
    // SafeHtmlPipe
  ]
})
export class PipesModule { }
