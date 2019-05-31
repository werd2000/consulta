import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteProfile } from 'src/app/models/paciente.model';
import { Subscription } from 'rxjs';
import { PacienteService } from 'src/app/services/service.index';
import sweetAlert from 'sweetalert';
import * as moment from 'moment';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  paramId: any;
  paciente: PacienteProfile;
  cargando: boolean;
  suscription: Subscription;
  modo: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public route: Router,
    public pacientesService: PacienteService,
  ) {
    this.cargando = false;
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe( p => {
      this.modo = p[1].path;
    });
    this.activatedRoute.params.subscribe( params => {
      this.paramId = params.id;
      if (this.paramId !== 'nuevo') {
        this.cargarPaciente(this.paramId);
      } else {
        this.paciente = new PacienteProfile(
          '',
          '',
          'DNI',
          '',
          '',
          '',
          '',
          'ESPERA',
          moment().format('YYYY-MM-DD'),
          '',
          false,
          null,
          null,
          null,
          null,
          '',
          '',
          moment().format('YYYY-MM-DD'),
          '');
      }
    });
  }

  cargarPaciente( id: string ) {
    this.cargando = true;
    this.suscription = this.pacientesService.getPacienteId(id)
        .subscribe( (resp: any) => {
          if (resp === undefined) {
            sweetAlert('Error', 'No se encuentra un usuario con esa identificación', 'warning');
            this.route.navigate(['pacientes']);
          } else {
            this.paciente = new PacienteProfile(
              resp.apellido,
              resp.nombre,
              resp.tipo_doc,
              resp.nro_doc,
              resp.nacionalidad,
              resp.sexo,
              resp.fecha_nac,
              resp.estado,
              resp.fecha_alta,
              resp.fecha_baja,
              resp.borrado,
              resp.domicilio,
              resp.contactos,
              resp.ssocial,
              resp.familia,
              resp.img,
              resp.observaciones,
              resp.actualizadoEl,
              resp.actualizadoPor,
              resp._id
            );
          }
          this.cargando = false;
        });
  }

}
