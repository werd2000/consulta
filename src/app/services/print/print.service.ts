import { Injectable } from '@angular/core';
import { PacienteProfile } from 'src/app/models/paciente.model';
import { ProfesionalProfile } from '../../models/profesional.model';
declare const $;

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  private lista: string;
  private thead: string;
  public titulo: string;
  public win;

  constructor() { }

  // crearLista(encabezado: string[], listado: PacienteProfile[] | ProfesionalProfile[], tipo: string ) {
  crearLista(encabezado: string[], listado: PacienteProfile[], tipo: string ) {
    // Construct a table for printing
    this.lista = '<div class="container">';
    this.lista += '<div class="table-responsive">';
    this.lista += '<h1>' + this.titulo + '</h1>';
    this.lista += '<table class="table">';
    this.lista += this._crearThead(encabezado);
    this.lista += '<tfoot>Un total de ' + listado.length + ' ' + tipo + '</tfoot>';
    this.lista += '<tbody>';
    for (const item of listado) {
      this.lista += '<tr>';
      this.lista += '<td class=""><img src="' + item.img + '" class="h-25"></td>';
      this.lista += '<td>' + item.apellido + '</td>';
      this.lista += '<td>' + item.nombre + '</td>';
      this.lista += '<td>' + item.nroDoc + '</td>';
      this.lista += '<td>' + item.fechaNac + '</td>';
      this.lista += '</tr>';
    }
    this.lista += '</tbody>';
    this.lista += '</table>';
    this.lista += '</div>';
    this.lista += '</div>';
  }

  crearFicha( paciente: PacienteProfile, tipo: string ) {
    // Construct a table for printing
    this.lista = '<div class="container">';
    this.lista += '<h3 class="text-center bg-primary text-white">' + this.titulo + '</h3>';
    // this.lista += '<h5>Actualizado el ' + paciente.actualizadoEl + ' por ' + paciente.actualizadoPor + '</h5>';

    this.lista += '<table class="table">';
    this.lista += '<tbody>';
    this.lista += '<tr>';
    if (paciente.img) {
      this.lista += '<td rowspan="8" class="w-25"><img src="' + paciente.img + '"></td>';
    } else {
// tslint:disable-next-line: max-line-length
      this.lista += '<td rowspan="8" class="w-25"><img src="https://firebasestorage.googleapis.com/v0/b/cronosapp-12a92.appspot.com/o/img%2Fpaciente%2Fno-img.jpg?alt=media&token=d4ca67cb-c8aa-4c52-9875-422af63fab34"></td>';
    }
    this.lista += '<td colspan="2"><h1>' + paciente.getNombreCompleto() + '</h1></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Nacionalidad</td>';
    this.lista += '<td><h5>' + paciente.nacionalidad + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Nro de Doc.</td>';
    this.lista += '<td><h5>' + paciente.nroDoc + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Fecha Nacimiento</td>';
    this.lista += '<td><h5>' + paciente.fechaNac + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Sexo</td>';
    this.lista += '<td><h5>' + paciente.sexo + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Fecha Ingreso</td>';
    this.lista += '<td><h5>' + paciente.fechaAlta + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Fecha Egreso</td>';
    this.lista += '<td><h5>' + paciente.fechaBaja + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td>Estado</td>';
    this.lista += '<td><h5>' + paciente.estado + '</h5></td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    this.lista += '<td colspan="3">Observaciones</td>';
    this.lista += '</tr>';
    this.lista += '<tr>';
    if (paciente.observaciones) {
      this.lista += '<td colspan="3">' + paciente.observaciones + '</td>';
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
}
