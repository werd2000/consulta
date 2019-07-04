import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalService, TurnosService, UsuarioService, PacienteService, ModalTurnoService } from 'src/app/services/service.index';
import { EmpleadoProfile } from 'src/app/models/empleado.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AddTurnoComponent } from './add-turno.component';
import { Turno } from 'src/app/models/turno.model';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit, OnDestroy {

  cargando: boolean;
  columns = [];
  widthColumn: string;
  turnos: any;
  suscriptor: Subscription[] = [];
  horario = ['08:00', '08:30', '09:00', '09:30'];
  fecha: moment.Moment;

  constructor(
    public personalService: PersonalService,
    public turnosService: TurnosService,
    public usuarioService: UsuarioService,
    public pacienteService: PacienteService,
    public modalTurnoService: ModalTurnoService,
    public dialog: MatDialog,
  ) {
    this.fecha = moment();
  }

  ngOnInit() {
    this.cargarTurnos();
  }

  cargarTurnos() {
    this.suscriptor.push(this.personalService.getEmpleados()
      .subscribe( (personal: EmpleadoProfile[]) => {
        this.columns = [];
        this.cargando = true;
        personal.forEach(profesional => {
          this.suscriptor.push(
            this.turnosService.getTurnosFechaProfesional(this.fecha.format('YYYY-MM-DD'), profesional._id)
              .subscribe(async (t: any) => {
                this.turnos = t;
                this.turnos.sort((a, b) => {
                    var x = a.horaInicio.toLowerCase();
                    var y = b.horaInicio.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });
                await this.turnos.forEach(this.paraMostrar.bind(this));
                this.columns.push({
                    head: profesional.apellido + ' ' + profesional.nombre,
                    campo: profesional.nombre,
                    id: profesional._id,
                    turnos: this.turnos
                  });
              })
            );
        });
        
        this.widthColumn = 100 / personal.length + '%';
        this.cargando = false;
      })
    );
  }

  paraMostrar(turno, index, array) {
    this.getPaciente(turno.idPaciente, array, index);
    this.getCreador(turno.creadoPor, array, index);
    this.getProfesional(turno.idProfesional, array, index);
    this.getEstilo(turno.estado, array, index);
  }

  public getCreador(idUsuario: string, array, index) {
    this.usuarioService.getUsuarioId(idUsuario)
        .subscribe( resp => {
          array[index].usuario = resp;
        });
  }

  public getPaciente(idPaciente: string, array, index) {
    return this.pacienteService.getPacienteId(idPaciente)
        .subscribe( resp => {
          array[index].paciente = resp;
        });
  }

  public getProfesional(idProfesional: string, array, index) {
    return this.personalService.getEmpleadolId(idProfesional)
      .subscribe( resp => {
        array[index].profesional = resp;
      });
  }

  getEstilo(estado, array, index) {
    switch (estado) {
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
  }


  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    })
  }

  nuevo(): void {
    const dialogRef = this.dialog.open(AddTurnoComponent, {
      width: '50%'
      // data: {name: this.name, animal: this.animal}
    });
    dialogRef.afterClosed().subscribe(result => {
        this.cargarTurnos();
    });

  }

  hoy() {
    this.fecha = moment();
    this.cargarTurnos();    
  }

  editarTurno(t: Turno) {
    const dialogRef = this.dialog.open(AddTurnoComponent, {
      width: '50%',
      data: t
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarTurnos();
      }
    });
  }

  eliminarTurno(t: any) {
    sweetAlert({
      title: 'Atención, está por borrar datos',
      text: 'Una vez borrados, no se podrán recuperar',
      icon: 'warning',
      buttons: ['Calcelar', 'Borrar'],
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this.turnosService.deleteTurno(t)
        .then(resp => {
            sweetAlert ('Datos borrados', `Los datos del turno ${ t.paciente.apellido } se borraron correctamente`, 'success');
            this.cargarTurnos();
        })
      }
    });
  }

}
