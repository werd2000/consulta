// ========================================================
// Clase Paciente implementa la interface PacienteInterface
// ========================================================

import { Domicilio } from './domicilio.model';
import { Contacto } from './contacto.model';
import { Ssocial } from './ssocial.model';
import { PacienteInterface } from '../interfaces/paciente.interface';

export class PacienteProfile implements PacienteInterface {

    constructor(
        public apellido: string,
        public nombre: string,
        public tipo_doc: string,
        public nro_doc: string,
        public nacionalidad: string,
        public sexo: string,
        public fecha_nac: string,
        public estado: string,
        public borrado: boolean,
        public fechaAlta: string,
        public domicilio?: Domicilio,
        public contactos?: Contacto[],
        public ssocial?: Ssocial,
        // public familia?: Familia[],
        public img?: string,
        public observaciones?: string,
        public actualizadoEl?: string,
        public actualizadoPor?: string,
        public _id?: string
    ) { }

    getNombreCompleto() {
        return this.apellido + ' ' + this.nombre;
    }
}
