import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalService, TurnosService, UsuarioService, PacienteService, ModalTurnoService } from 'src/app/services/service.index';
import { EmpleadoProfile } from 'src/app/models/empleado.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AddTurnoComponent } from './add-turno.component';
import { TurnosFunctions } from './turnos.functions';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MY_FORMATS } from 'src/app/config/config';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class TurnosComponent implements OnInit, OnDestroy {

  cargando: boolean;
  columns = [];
  widthColumn: string;
  turnos: any;
  suscriptor: Subscription[] = [];
  // horario = ['08:00', '08:30', '09:00', '09:30'];
  fecha: moment.Moment;
  turnosFunction: any;

  constructor(
    public personalService: PersonalService,
    public turnosService: TurnosService,
    public usuarioService: UsuarioService,
    public pacienteService: PacienteService,
    public modalTurnoService: ModalTurnoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.fecha = moment();
    this.turnosFunction = new TurnosFunctions(
      this.usuarioService,
      this.pacienteService,
      this.personalService
    );
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
                await this.turnos.forEach(
                  this.turnosFunction.paraMostrar.bind(this)
                );                
                
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


  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    })
  }

  nuevo(): void {
    const dialogRef = this.dialog.open(AddTurnoComponent, {
      width: '50%',
      data: this.fecha.format('YYYY-MM-DD')
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
      this.cargarTurnos();
    });

  }

  hoy() {
    this.fecha = moment();
    this.cargarTurnos();    
  }

  diaAnterior() {
    const diaAnterior = moment(this.fecha).subtract(1, 'days');
    this.fecha = diaAnterior;
    this.cargarTurnos();
  }

  diaSiguiente() {
    const diaSiguiente = moment(this.fecha).add(1, 'days');
    this.fecha = diaSiguiente;
    this.cargarTurnos();
  }

  cambiarFecha(event) {
    this.fecha = event.value;
    this.cargarTurnos();
  }

}
