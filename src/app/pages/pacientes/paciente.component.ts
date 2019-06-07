import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteProfile } from 'src/app/models/paciente.model';
import { Subscription } from 'rxjs';
import { PacienteService } from 'src/app/services/service.index';
import sweetAlert from 'sweetalert';
import * as moment from 'moment';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  paramId: any;
  paciente: PacienteProfile;
  cargando: boolean;
  suscription: Subscription[] = [];
  modo: string;
  actualizadoPor: Usuario;
  tabActual: number;

  constructor(
    public activatedRoute: ActivatedRoute,
    public route: Router,
    public pacientesService: PacienteService,
    public usuarioService: UsuarioService,
  ) {
    this.cargando = false;
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe( p => {
      this.modo = p[1].path;
    });
    this.activatedRoute.params.subscribe( params => {
      this.paramId = params.id;
      this.tabActual = params.tab;
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
    this.suscription.push(
      this.pacientesService.getPacienteId(id)
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
          if (this.paciente.actualizadoPor) {
              this.suscription.push(
              this.usuarioService.getUsuarioId(this.paciente.actualizadoPor)
                .subscribe( (usuario: Usuario) => {
                  this.cargando = true;
                  this.actualizadoPor = usuario;
                  this.cargando = false;
                }));
          }
        }
        )
      );
  }

  cambioTab(evento: any) {
    this.tabActual = evento.index;
  }

}