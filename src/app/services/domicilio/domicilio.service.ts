import { Injectable } from '@angular/core';
import { PacienteService } from '../paciente/paciente.service';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  constructor(
    public pacienteService: PacienteService,
  ) { }

  guardarDomicilio(persona: any, tipo: string) {
    if (tipo === 'paciente') {
      this.pacienteService.updatePaciente(persona);
    }
  }
}
