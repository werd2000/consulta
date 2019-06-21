import { Injectable } from '@angular/core';
import { EmpleadoProfile } from 'src/app/models/empleado.model';
declare const $;

@Injectable({
  providedIn: 'root'
})
export class PrintPersonalService {

  private lista: string;
  private thead: string;
  public titulo: string;
  public win;

  constructor() { }

  crearFichaPersonal( empleado: EmpleadoProfile) {
    this.lista = '<div class="container">';
    this.lista += '<h2 class="text-center bg-secondary text-white">' + empleado.getNombreCompleto() + '</h2>';
    this.lista += '<table class="table table-sm">';
    this.lista += '<tbody>';

    this.imprimirPrincipal(empleado);
    this.imprimirDomicilio(empleado);
    this.imprimirContactos(empleado);
    this.imprimirDatosFamiliares(empleado);
    this.imprimirSSocial(empleado);

    this.lista += '</tbody>';
    this.lista += '</table>';
    this.lista += '</div>';
    this.lista += '</div>';
    return this.lista;
  }

  imprimirPrincipal(empleado: EmpleadoProfile) {
    this.lista += '<tr>';
    if (empleado.img) {
      this.lista += '<td rowspan="8" class="w-25"><img src="' + empleado.img + '"></td>';
    } else {
      // tslint:disable-next-line: max-line-length
      this.lista += '<td rowspan="8" class="w-25"><img src="https://firebasestorage.googleapis.com/v0/b/cronosapp-12a92.appspot.com/o/img%2Fpaciente%2Fno-img.jpg?alt=media&token=d4ca67cb-c8aa-4c52-9875-422af63fab34"></td>';
    }
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Nacionalidad</td>';
    this.lista += '<td colspan="2"><h5>' + empleado.nacionalidad + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Nro de Doc.</td>';
    this.lista += '<td colspan="2"><h5>' + empleado.nro_doc + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Fecha Nacimiento</td>';
    this.lista += '<td colspan="2"><h5>' + empleado.fecha_nac + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Sexo</td>';
    this.lista += '<td colspan="2"><h5>' + empleado.sexo + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Fecha Ingreso</td>';
    this.lista += '<td colspan="2"><h5>' + empleado.fechaAlta + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Fecha Egreso</td>';
    this.lista += '<td colspan="2"><h5>' + empleado.fechaBaja + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    if (empleado.observaciones) {
      this.lista += '<td colspan="3">' + empleado.observaciones + '</td>';
    }
    this.lista += '</tr>';
  }

  imprimirDomicilio(empleado: EmpleadoProfile) {
    this.lista += '<tr>';
    this.lista += '<td colspan="4"><h4 class="text-center bg-secondary text-white">Domicilio</h4></td>';
    this.lista += '</tr>';
    if (empleado.domicilio) {
      this.lista += '<tr>';
      this.lista += '<td>Calle:</td>';
      this.lista += '<td><h5>' + empleado.domicilio.calle + '</h5></td>';
      this.lista += '<td>Casa Nº:</td>';
      this.lista += '<td><h5>' + empleado.domicilio.casa_nro + '</h5></td>';
      this.lista += '</tr>';
      this.lista += '<tr>';
      this.lista += '<td>Barrio:</td>';
      this.lista += '<td><h5>' + empleado.domicilio.barrio + '</h5></td>';
      this.lista += '<td>C.P.:</td>';
      this.lista += '<td><h5>' + empleado.domicilio.cp + '</h5></td>';
      this.lista += '</tr>';
      this.lista += '<tr>';
      this.lista += '<td>Ciudad:</td>';
      this.lista += '<td><h5>' + empleado.domicilio.ciudad + '</h5></td>';
      this.lista += '<td>Provincia:</td>';
      this.lista += '<td><h5>' + empleado.domicilio.provincia + '</h5></td>';
      this.lista += '</tr>';
      this.lista += '<tr>';
      this.lista += '<td>País:</td>';
      this.lista += '<td><h5>' + empleado.domicilio.pais + '</h5></td>';
      this.lista += '<td>Lat - Lng:</td>';
      this.lista += '<td><h5>' + empleado.domicilio.lat + - + empleado.domicilio.lng + '</h5></td>';
      this.lista += '</tr>';
    } else {
      this.lista += '<td colspan="3">No hay datos aún.</td>';
    }
  }

  imprimirContactos(empleado: EmpleadoProfile) {
    this.lista += '<tr>';
    this.lista += '<td colspan="4"><h4 class="text-center bg-secondary text-white">Contactos</h4></td>';
    this.lista += '</tr>';
    if (empleado.contactos) {
      empleado.contactos.forEach(contacto => {
        this.lista += '<tr>';
        // this.lista += '<td>Tipo:</td>';
        this.lista += '<td><h5>' + contacto.tipo + '</h5></td>';
        // this.lista += '<td>Valor:</td>';
        this.lista += '<td><h5>' + contacto.valor + '</h5></td>';
        this.lista += '<td colspan="2">' + contacto.observaciones + '</td>';
        this.lista += '</tr>';
      });
    } else {
      this.lista += '<td colspan="3">No hay datos aún.</td>';
    }
    this.lista += '</tr>';
  }

  imprimirDatosFamiliares(empleado: EmpleadoProfile) {
    this.lista += '<tr>';
    this.lista += '<td colspan="4"><h4 class="text-center bg-secondary text-white">Datos familiares</h4></td>';
    this.lista += '</tr>';
    if (empleado.familiares) {
      empleado.familiares.forEach(familia => {
        this.lista += '<tr>';
        // this.lista += '<td>Tipo:</td>';
        this.lista += '<td><h5>' + familia.relacion + '</h5></td>';
        // this.lista += '<td>Valor:</td>';
        this.lista += '<td><h5>' + familia.apellido + '</h5></td>';
        this.lista += '<td><h5>' + familia.nombre + '</h5></td>';
        this.lista += '<td><h5>' + familia.nroDoc + '</h5></td>';
        this.lista += '</tr>';
        this.lista += '<tr>';
        this.lista += '<td colspan="4">' + familia.observaciones + '</td>';
        this.lista += '</tr>';
      });
    } else {
      this.lista += '<td colspan="3">No hay datos aún.</td>';
    }
    this.lista += '</tr>';
  }

  imprimirSSocial(empleado: EmpleadoProfile) {
    this.lista += '<tr>';
    this.lista += '<td colspan="4"><h4 class="text-center bg-secondary text-white"  >Obra Social</h4></td>';
    this.lista += '</tr>';
    if (empleado.ssocial) {
        this.lista += '<tr>';
        this.lista += '<td colspan="2"><h5>' + empleado.ssocial.obrasocial + '</h5></td>';
        this.lista += '<td colspan="2"><h5>' + empleado.ssocial.nafiliado + '</h5></td>';
        this.lista += '</tr>';
    } else {
      this.lista += '<td colspan="3">No hay datos aún.</td>';
    }
    this.lista += '</tr>';
  }

  crearListaPersonal(listado: EmpleadoProfile[]) {
    let html = '';
    for (const item of listado) {
      html += '<tr>';
      if (item.img === undefined) {
        html += '<td class=""><img src="" class="h-25 w-25"></td>';
      } else {
        html += '<td class=""><img src="' + item.img + '" width="40px"></td>';
      }
      html += '<td>' + item.apellido + '</td>';
      html += '<td>' + item.nombre + '</td>';
      html += '<td>' + item.nro_doc + '</td>';
      html += '<td>' + item.fecha_nac + '</td>';
      html += '</tr>';
    }
    return html;
  }

}
