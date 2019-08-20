import { UsuarioService, PacienteService, PersonalService } from 'src/app/services/service.index';
import * as moment from 'moment';

export class TurnosFunctions {

    constructor(
        private usuarioService: UsuarioService,
        private pacienteService: PacienteService,
        private personalService: PersonalService
    ) {}

    paraMostrar(turno, index, array) {
      this.pacienteService.getPacienteId(turno.idPaciente)
          .subscribe( resp => {
            array[index].paciente = resp;
          });      
      
      this.usuarioService.getUsuarioId(turno.creadoPor)
        .subscribe( resp => {
          array[index].usuario = resp;
        });

      this.personalService.getEmpleadolId(turno.idProfesional)
        .subscribe( resp => {
          array[index].profesional = resp;
        });

        switch (turno.estado) {
          case 'PROGRAMADO':
            array[index].estilo = 'turno-programado';
            array[index].estiloText = 'text-primary';
            break;
          case 'RE PROGRAMADO':
            array[index].estilo = 'turno-reprogramado';
            array[index].estiloText = 'text-primary';
            break;
          case 'DEMORADO':
            array[index].estilo = 'turno-demorado';
            array[index].estiloText = 'text-warning';
            break;
          case 'CANCELADO POR PACIENTE':
            array[index].estilo = 'turno-cancelo-paciente';
            array[index].estiloText = 'text-danger';
            break;
          case 'CANCELADO POR PROFESIONAL':
            array[index].estilo = 'turno-cancelo-profesional';
            array[index].estiloText = 'text-info';
            break;
          case 'REALIZADO':
            array[index].estilo = 'turno-realizado';
            array[index].estiloText = 'text-success';
            break;
          default:
            array[index].estilo = 'border-primary';
            array[index].estiloText = 'text-primary';
            break;
        }

        let inicio = moment(turno.horaInicio,'HH:mm');
        let fin = moment(turno.horaFin,'HH:mm');
        let duracion = moment.duration(fin.diff(inicio)).minutes();
        if (duracion === 0) {
          duracion = moment.duration(fin.diff(inicio)).hours();
          if (duracion === 1) {
            duracion = 60;
          }
        }        
        array[index].duracion = duracion;

        let entrada = moment('08:00','HH:mm');
        let min = moment.duration(inicio.diff(entrada)).minutes();
        let hs = moment.duration(inicio.diff(entrada)).hours() * 60;
        let top = (hs + min) * 2;        
        if (index != 0) {
          top = top - (duracion * 2 * index);
          array[index].top = top  + 'px';
        }
        
        if (turno.horaInicio === '09:20') {
          console.log("dif entre inicio y entrada", min);
          console.log('Hora de inicio',turno.horaInicio);
          console.log('top', top);
        }
        if (top >= 500) {
          top = top - 300;
        }
        array[index].top = top  + 'px';
    }

}