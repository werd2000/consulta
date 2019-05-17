import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PacienteService } from './paciente/paciente.service';
import { PrintService } from './print/print.service';
import { ExportPdfService } from './exportPdf/export-pdf.service';
import { EmpresaService } from './empresa/empresa.service';
import { CopyService } from './copy/copy.service';
import { CsvService } from './csv/csv.service';




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
    CsvService
  ]
})
export class ServiceModule { }