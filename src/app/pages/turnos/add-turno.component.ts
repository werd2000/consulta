import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PacienteProfile } from 'src/app/models/paciente.model';
import { Area } from 'src/app/models/area.model';
import { EmpleadoProfile } from 'src/app/models/empleado.model';
import { ModalTurnoService, PacienteService, AreasService, TurnosService, UsuarioService, PersonalService } from 'src/app/services/service.index';
import * as moment from 'moment';
import { ERRORES, MY_FORMATS } from 'src/app/config/config';
import { MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MAT_DIALOG_DATA } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Turno } from 'src/app/models/turno.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { isString } from 'util';

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
  // styleUrls: ['./add-turno.component.css']
})
export class AddTurnoComponent implements OnInit {

  error = ERRORES;
  forma: FormGroup;
  pacientes: PacienteProfile[];
  areas: Area[];
  profesionales: EmpleadoProfile[];
  estados =
    ['PROGRAMADO', 'RE PROGRAMADO', 'PACIENTE ESPERANDO', 'DEMORADO', 'CANCELADO POR PACIENTE', 'CANCELADO POR PROFESIONAL', 'REALIZADO'];
  horario = { inicio: '08:00', fin: '20:00', paso: 300 };
  turno: Turno;
  @Output() guardado;
  pacientesConFiltro: Observable<any[]>;
  
  constructor(
    public dialogRef: MatDialogRef<AddTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Turno,
    public modalTurnoService: ModalTurnoService,
    public pacienteService: PacienteService,
    public areasService: AreasService,
    public turnosService: TurnosService,
    public usuarioService: UsuarioService,
    public profesionalService: PersonalService,
  ) {
    this.guardado = new EventEmitter();
  }

  ngOnInit() {
    this.cargarPacientes();
    this.cargarAreas();
    this.cargarProfesionales();

    const fechaHoy = moment().format('YYYY-MM-DD');    

    if (!this.data) {
      this.turno = new Turno(
        '',
        '',
        fechaHoy,
        null,
        fechaHoy,
        null,
        '',
        '',
        fechaHoy,
        fechaHoy,
        '');
    } else {
      this.turno = this.data;
    }    

    this.forma = new FormGroup({
      idPaciente: new FormControl(this.turno.idPaciente, Validators.required),
      fechaInicio: new FormControl(this.turno.fechaInicio, Validators.required),
      horaInicio: new FormControl(this.turno.horaInicio, Validators.required),
      fechaFin: new FormControl(this.turno.fechaFin, Validators.required),
      horaFin: new FormControl(this.turno.horaFin, Validators.required),
      area: new FormControl(this.turno.area, Validators.required),
      idProfesional: new FormControl(this.turno.idProfesional, Validators.required),
      estado:  new FormControl(this.turno.estado, Validators.required),
      observaciones: new FormControl(this.turno.observaciones)
    });

    this.pacientesConFiltro = this.forma.controls.idPaciente.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): PacienteProfile[] {
    if (isString(value)) {
      const filterValue = value.toUpperCase();
      if (this.pacientes) {
        return this.pacientes.filter(
          pacs => pacs.apellido.toUpperCase().includes(filterValue) || pacs.nombre.toUpperCase().includes(filterValue) );
      }
    }
  }

  displayFn(paciente?: PacienteProfile): string | undefined {
    return paciente ? paciente.apellido + ' ' + paciente.nombre : undefined;
  }

  cargarPacientes() {
    this.pacienteService.getPacientes()
      .subscribe( (pacs: PacienteProfile[]) => {
        this.pacientes = pacs;
      });
  }

  cargarProfesionales() {
    this.profesionalService.getEmpleados()
      .subscribe( (prof: EmpleadoProfile[]) => {
        this.profesionales = prof;
      });
  }

  cargarAreas() {
    this.areasService.getAreas()
      .subscribe( areas => {
        this.areas = areas;
      });
  }

  cerrarModal() {
    this.dialogRef.close();    
  }

  guardarTurno() {
    
    const turno = this.forma.value;
    turno.creacion = moment().format('YYYY-MM-DD');
    turno.actualizado = moment().format('YYYY-MM-DD');
    turno.creadoPor = this.usuarioService.usuario._id;
    turno.idPaciente = this.forma.controls.idPaciente.value._id;
    if (this.turno._id) {
      turno._id = this.turno._id;
      this.turnosService.updateTurno(turno);
    } else {
      this.turnosService.createTurno(turno);
    }
    this.guardado.emit(true);
    this.dialogRef.close();
  }

  actualizarHoraFin() {
    let arrayHora = this.forma.controls.horaInicio.value.split(':');
    let hora = parseInt(arrayHora[0]);
    let min = parseInt(arrayHora[1]);
    let nuevoMin = min + 30;
    let nuevaHora = hora;
    if (nuevoMin >= 60) {
      nuevoMin = nuevoMin - 60;
      nuevaHora += 1;
    }
    if (nuevaHora >= 24) {
      nuevaHora = 0;
    }
    let strNuevoMin = nuevoMin + '';
    if (nuevoMin < 10) {
      strNuevoMin = '0' + nuevoMin;
    }
    let strNuevaHora = nuevaHora + '';
    if (nuevaHora <= 9 ) {
      strNuevaHora = '0' + nuevaHora;
    }
    let strHoraFin = strNuevaHora + ':' + strNuevoMin;

    this.forma.controls.horaFin.setValue(strHoraFin);
  }

}