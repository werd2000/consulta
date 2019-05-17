import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
// import { EstadoPacientePipe } from './estado-paciente.pipe';
// import { AreaProfesionalPipe } from './area-profesional.pipe';
// import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    ImagenPipe,
    // EstadoPacientePipe,
    // AreaProfesionalPipe,
    // UsuarioPipe,
    // SafeHtmlPipe
  ],
  exports: [
    ImagenPipe,
    // EstadoPacientePipe,
    // AreaProfesionalPipe,
    // UsuarioPipe,
    // SafeHtmlPipe
  ]
})
export class PipesModule { }
