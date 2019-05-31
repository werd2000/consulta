import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PacienteService } from './paciente/paciente.service';
import { PrintService } from './print/print.service';
import { ExportPdfService } from './exportPdf/export-pdf.service';
import { EmpresaService } from './empresa/empresa.service';
import { CopyService } from './copy/copy.service';
import { CsvService } from './csv/csv.service';
import { TipoDocService } from './tipoDoc/tipo-doc.service';
import { SexoService } from './sexo/sexo.service';
import { FechaEdadService } from './fechaEdad/fecha-edad.service';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    PacienteService,
    PrintService,
    ExportPdfService,
    EmpresaService,
    CopyService,
    CsvService,
    TipoDocService,
    SexoService,
    FechaEdadService
  ]
})
export class ServiceModule { }