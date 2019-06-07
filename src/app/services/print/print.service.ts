import { Injectable } from '@angular/core';
import { PacienteProfile } from 'src/app/models/paciente.model';
import { ProfesionalProfile } from '../../models/profesional.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioGooglePipe } from '../../pipes/usuario-google.pipe';
import { PrintUsuarioService } from './print.usuario.service';
declare const $;

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  private lista: string;
  private thead: string;
  public titulo: string;
  public win;

  constructor(
    public printUsuarioService: PrintUsuarioService
  ) { }

  crearEncabezadoLista(encabezado: string[]) {
    // Construct a table for printing
    this.lista = '<div class="container">';
    this.lista += '<div class="table-responsive">';
    this.lista += '<h1>' + this.titulo + '</h1>';
    this.lista += '<table class="table">';
    this.lista += this._crearThead(encabezado);
    this.lista += '<tbody>';
  }

  crearFinLista(listado: any[], tipo: string) {
    this.lista += '<tfoot>Un total de ' + listado.length + ' ' + tipo + '</tfoot>';
    this.lista += '</tbody>';
    this.lista += '</table>';
    this.lista += '</div>';
    this.lista += '</div>';
  }

  crearListaPacientes(encabezado: string[], listado: PacienteProfile[]) {
    this.crearEncabezadoLista(encabezado);
    for (const item of listado) {
      this.lista += '<tr>';
      if (item.img === undefined) {
        this.lista += '<td class=""><img src="" class="h-25"></td>';
      } else {
        this.lista += '<td class=""><img src="' + item.img + '" class="h-25"></td>';
      }
      this.lista += '<td>' + item.apellido + '</td>';
      this.lista += '<td>' + item.nombre + '</td>';
      this.lista += '<td>' + item.nro_doc + '</td>';
      this.lista += '<td>' + item.fecha_nac + '</td>';
      this.lista += '</tr>';
    }
    this.crearFinLista(listado, 'pacientes');
  }

  crearListaUsuarios(encabezado: string[], listado: Usuario[]) {
    this.crearEncabezadoLista(encabezado);
    for (const item of listado) {
      this.lista += '<tr>';
      if (item.img === undefined) {
        // tslint:disable-next-line: max-line-length
        this.lista += '<td class=""><img src="https://firebasestorage.googleapis.com/v0/b/cronosapp-12a92.appspot.com/o/img%2Fpaciente%2Fno-img.jpg?alt=media&token=d4ca67cb-c8aa-4c52-9875-422af63fab34" class="h-25"></td>';
      } else {
        this.lista += '<td class=""><img src="' + item.img + '" class="h-25"></td>';
      }
      this.lista += '<td>' + item.email + '</td>';
      this.lista += '<td>' + item.nombre + '</td>';
      this.lista += '<td>' + item.role + '</td>';
      this.lista += '<td>' + item.google + '</td>';
      this.lista += '</tr>';
    }
    this.crearFinLista(listado, 'usuarios');
  }

  crearFichaPaciente( paciente: PacienteProfile ) {
    // Construct a table for printing
    this.lista = '<div class="container">';
    this.lista += '<h3 class="text-center bg-primary text-white">' + this.titulo + '</h3>';
    // this.lista += '<h5>Actualizado el ' + paciente.actualizadoEl + ' por ' + paciente.actualizadoPor + '</h5>';

    this.lista += '<table class="table table-striped">';
    this.lista += '<tbody>';
    this.lista += '<tr>';
    if (paciente.img) {
      this.lista += '<td rowspan="8" class="w-25"><img src="' + paciente.img + '"></td>';
    } else {
      // tslint:disable-next-line: max-line-length
      this.lista += '<td rowspan="9" class="w-25"><img src="https://firebasestorage.googleapis.com/v0/b/cronosapp-12a92.appspot.com/o/img%2Fpaciente%2Fno-img.jpg?alt=media&token=d4ca67cb-c8aa-4c52-9875-422af63fab34"></td>';
    }
    this.lista += '<td colspan="3"><h2>' + paciente.getNombreCompleto() + '</h2></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Nacionalidad</td>';
    this.lista += '<td colspan="2"><h5>' + paciente.nacionalidad + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Nro de Doc.</td>';
    this.lista += '<td colspan="2"><h5>' + paciente.nro_doc + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Fecha Nacimiento</td>';
    this.lista += '<td colspan="2"><h5>' + paciente.fecha_nac + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Sexo</td>';
    this.lista += '<td colspan="2"><h5>' + paciente.sexo + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Fecha Ingreso</td>';
    this.lista += '<td colspan="2"><h5>' + paciente.fechaAlta + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Fecha Egreso</td>';
    this.lista += '<td colspan="2"><h5>' + paciente.fechaBaja + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Estado</td>';
    this.lista += '<td colspan="2"><h5>' + paciente.estado + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Observaciones</td>';
    // this.lista += '</tr>';
    // this.lista += '<tr>';
    if (paciente.observaciones) {
      this.lista += '<td colspan="2"><h5>' + paciente.observaciones + '</h5></td>';
    } else {
      this.lista += '<td colspan="2"><h5>No hay datos aún.</h5></td>';
    }
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td colspan="4" class="table-primary"><h4>Domicilio</h4></td>';
    this.lista += '</tr>';
    if (paciente.domicilio) {
      this.lista += '<tr>';
      this.lista += '<td>Calle:</td>';
      this.lista += '<td><h5>' + paciente.domicilio.calle + '</h5></td>';
      this.lista += '<td>Casa Nº:</td>';
      this.lista += '<td><h5>' + paciente.domicilio.casa_nro + '</h5></td>';
      this.lista += '</tr>';
      this.lista += '<tr>';
      this.lista += '<td>Barrio:</td>';
      this.lista += '<td><h5>' + paciente.domicilio.barrio + '</h5></td>';
      this.lista += '<td>C.P.:</td>';
      this.lista += '<td><h5>' + paciente.domicilio.cp + '</h5></td>';
      this.lista += '</tr>';
      this.lista += '<tr>';
      this.lista += '<td>Ciudad:</td>';
      this.lista += '<td><h5>' + paciente.domicilio.ciudad + '</h5></td>';
      this.lista += '<td>Provincia:</td>';
      this.lista += '<td><h5>' + paciente.domicilio.provincia + '</h5></td>';
      this.lista += '</tr>';
      this.lista += '<tr>';
      this.lista += '<td>País:</td>';
      this.lista += '<td><h5>' + paciente.domicilio.pais + '</h5></td>';
      this.lista += '<td>Lat - Lng:</td>';
      this.lista += '<td><h5>' + paciente.domicilio.lat + - + paciente.domicilio.lng + '</h5></td>';
      this.lista += '</tr>';
    } else {
      this.lista += '<td colspan="3">No hay datos aún.</td>';
    }
    this.lista += '</tr>';

    this.lista += '</tbody>';
    this.lista += '</table>';
    this.lista += '</div>';
    this.lista += '</div>';
  }

  private _crearThead( encabezado, estilo = '' ) {
    let thead;
    if (estilo !== '') {
      thead = '<thead style="' + estilo + '"><tr>';
      for (const enc of encabezado) {
        thead += '<th style="' + estilo + '">' + enc + '</th>';
      }
    } else {
      thead = '<thead class="thead-light"><tr>';
      for (const enc of encabezado) {
        thead += '<th>' + enc + '</th>';
      }
    }
    thead += '</tr></thead>';
    return thead;
  }

  imprimir() {
    // Open a new window
    this.win = window.open( '', '' );
    this.win.document.close();
    this.crearHeadPage();
    this.win.document.body.innerHTML = this.lista;
    $(this.win.document.body).addClass('dt-print-view');
    const ventana = this.win;
    ventana.setTimeout( () => {
      ventana.print(); // blocking - so close will not
      ventana.close(); // execute until this is done
    }, 1100 );
  }

  crearHeadPage() {
    let head = `<title> ${ this.titulo } </title>`;
    head += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css">';
    head += '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
    try {
      this.win.document.head.innerHTML = head; // Work around for Edge
    } catch (e) {
      $(this.win.document.head).html( head ); // Old IE
    }
  }

  crearPlanilla(encabezado, asistencias: any) {
    // Construct a table for printing
    this.lista = '<div class="container">';
    this.lista += '<div class="table-responsive">';
    this.lista += `<h1 class="text-center"> ${this.titulo} </h1>`;
    this.lista += '<table class="table" style="border: 1px solid">';
    this.lista += this._crearThead(encabezado, 'border: 1px solid');
    this.lista += '<tbody>';
    for (const item of asistencias) {
      this.lista += '<tr style="border: 1px solid">';
      this.lista += '<td style="border: 1px solid">' + item.fecha + '</td>';
      this.lista += '<td style="border: 1px solid"></td>';
      this.lista += '<td style="border: 1px solid">' + item.area + '</td>';
      this.lista += '<td style="border: 1px solid"></td>';
      this.lista += '</tr>';
    }
    this.lista += '</tbody>';
    this.lista += '</table>';
    this.lista += '</div>';
    this.lista += '</div>';
  }

  imprimirFichaUsuario(usuario: Usuario) {
    this.lista = '' + this.printUsuarioService.crearFichaUsuario(usuario, this.titulo);
  }
}
