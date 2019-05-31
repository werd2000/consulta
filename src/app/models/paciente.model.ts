// ========================================================
// Clase Paciente
// ========================================================

import { Domicilio } from './domicilio.model';
import { Contacto } from './contacto.model';
import { Ssocial } from './ssocial.model';
import { Familia } from './familia.model';

export class PacienteProfile {

    constructor(
        public apellido: string,
        public nombre: string,
        public tipoDoc: string,
        public nroDoc: string,
        public nacionalidad: string,
        public sexo: string,
        public fechaNac: string,
        public estado: string,
        public fechaAlta: string,
        public fechaBaja: string,
        public borrado: boolean,
        public domicilio?: Domicilio,
        public contactos?: Contacto[],
        public ssocial?: Ssocial,
        public familia?: Familia[],
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
