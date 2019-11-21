import { Component, OnInit } from '@angular/core';
import { PacienteService, PersonalService, TurnosService, AreasService } from 'src/app/services/service.index';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public cargando: boolean;
  public cantPacientes: number;
  public cantPersonal: number;
  public cantTurnos: number;
  public cantAreas: number;
  fecha: moment.Moment;

  constructor(
    private pacientesService: PacienteService,
    private personalService: PersonalService,
    private turnosService: TurnosService,
    private areasService: AreasService
  ) { }

  ngOnInit() {
    this.fecha = moment();
    this.pacientesService.getPacientes()
      .subscribe( (pac) => {
        this.cantPacientes = pac.length;
      });

    this.personalService.getEmpleados()
      .subscribe( (pers) => {
        this.cantPersonal = pers.length;
      });

    this.turnosService.searchTurnos('fechaInicio', this.fecha.format('YYYY-MM-DD'))
      .subscribe( (turnos) => {
        console.log(turnos);
        this.cantTurnos = turnos.length;
      });

    this.areasService.getAreas()
      .subscribe( (areas) => {
        this.cantAreas = areas.length;
      });
  }

}
