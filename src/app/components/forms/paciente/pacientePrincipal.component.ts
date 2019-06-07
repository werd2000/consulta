import { Component, OnInit, Input } from '@angular/core';
import { PacienteProfile } from 'src/app/models/paciente.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  TipoDocService,
  SexoService,
  FechaEdadService,
  PacienteService,
  UsuarioService,
} from 'src/app/services/service.index';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS, ERRORES } from 'src/app/config/config';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';
import { PrintService } from '../../../services/print/print.service';

@Component({
  selector: 'app-paciente-principal',
  templateUrl: './pacientePrincipal.component.html',
  styleUrls: ['./pacientePrincipal.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class PacientePrincipalComponent implements OnInit {

  @Input() paciente: PacienteProfile;
  @Input() modo: string;
  ver: boolean;
  forma: FormGroup;
  listaEstadosPacientes = ['ESPERA', 'EVALUACION', 'DEVOLUCION', 'TRATAMIENTO', 'ALTA', 'ABANDONO', 'DERIVADO'];
  listaSexos: string[];
  listaTipoDoc: string[];
  edad: string;
  imagenTemp;
  error = ERRORES;

  constructor(
    public tipoDocService: TipoDocService,
    public sexoService: SexoService,
    public fechaEdadService: FechaEdadService,
    public router: Router,
    private location: Location,
    public pacienteService: PacienteService,
    public printService: PrintService,
    public usuarioService: UsuarioService,
  ) {  }

  ngOnInit() {
    if (this.modo === 'ver') {
      this.ver = true;
    }
    this.crearFormulario();
    this.listaTipoDoc = this.tipoDocService.tipo_doc;
    this.listaSexos = this.sexoService.sexo;
    this.edad = this.fechaEdadService.calcularEdad(this.paciente.fecha_nac);
  }

  crearFormulario() {
      this.forma = new FormGroup({
        nombre: new FormControl(
          { value: this.paciente.nombre,
            disabled: this.ver
          },
          Validators.required
          ),
        apellido: new FormControl({
          value: this.paciente.apellido,
          disabled: this.ver
        }, Validators.required),
        tipo_doc: new FormControl({
          value: this.paciente.tipo_doc,
          disabled: this.ver
        }),
        nro_doc: new FormControl({
          value: this.paciente.nro_doc,
          disabled: this.ver
         }, Validators.required),
        sexo: new FormControl({
          value: this.paciente.sexo,
          disabled: this.ver}),
        nacionalidad: new FormControl({
          value: this.paciente.nacionalidad,
          disabled: this.ver}),
        fecha_nac: new FormControl({
          value: this.paciente.fecha_nac,
          disabled: this.ver}),
        fecha_alta: new FormControl({
          value: this.paciente.fechaAlta,
          disabled: this.ver}),
        fecha_baja: new FormControl({
          value: this.paciente.fechaBaja,
          disabled: this.ver}),
        estado: new FormControl({
          value: this.paciente.estado,
          disabled: this.ver}),
        observaciones: new FormControl({
          value: this.paciente.observaciones,
          disabled: this.ver})
      });
      // this.forma.setValue(this.paciente);
  }

  guardar() {
    if (this.forma.valid) {
      const paciente = this.forma.value;
      this.controlFechaNac(paciente);
      this.controlFechaAlta(paciente);
      this.controlFechaBaja(paciente);
      paciente.actualizadoPor = this.usuarioService.usuario._id;
      paciente.actualizadoEl = moment().format('YYYY-MM-DD');

      if (this.paciente._id === undefined) {
        console.log(paciente);
        this.pacienteService.createPaciente(paciente);
      } else {
        paciente._id = this.paciente._id;
        this.pacienteService.updatePaciente(paciente);
      }
    }

  }

  editarPaciente() {
    this.router.navigate(['/paciente/editar/' + this.paciente._id]);
  }

  cancelar() {
    this.location.back();
  }

  imprimirPaciente() {
    this.printService.titulo = 'Datos del Paciente';
    this.printService.crearFichaPaciente(this.paciente);
    this.printService.imprimir();
  }

  controlFechaNac(paciente) {
    if (this.forma.value.fecha_nac) {
      if ( moment.isMoment(this.forma.value.fecha_nac)) {
        paciente.fecha_nac = this.forma.value.fecha_nac.format('YYYY-MM-DD');
      } else {
        paciente.fecha_nac = this.forma.value.fecha_nac;
      }
    } else {
      paciente.fecha_nac = '';
    }
  }

  controlFechaAlta(paciente) {
    if (this.forma.value.fecha_alta) {
      if ( moment.isMoment(this.forma.value.fecha_alta)) {
        paciente.fecha_alta = this.forma.value.fecha_alta.format('YYYY-MM-DD');
      } else {
        paciente.fecha_alta = this.forma.value.fecha_alta;
      }
    } else {
      paciente.fecha_alta = '';
    }
  }

  controlFechaBaja(paciente) {
    if (this.forma.value.fecha_baja) {
      if ( moment.isMoment(this.forma.value.fecha_baja)) {
        paciente.fecha_baja = this.forma.value.fecha_baja.format('YYYY-MM-DD');
      } else {
        paciente.fecha_baja = this.forma.value.fecha_baja;
      }
    } else {
      paciente.fecha_baja = '';
    }
  }

  calcularEdad(event) {
    this.edad = this.fechaEdadService.calcularEdad(this.forma.value.fecha_nac.format('YYYY-MM-DD'));
  }

}
