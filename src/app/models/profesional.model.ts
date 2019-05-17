import { Domicilio } from './domicilio.model';
import { Contacto } from './contacto.model';
import { Ssocial } from './ssocial.model';
import { Profesion } from './profesion.model';

export class ProfesionalProfile {
    constructor(
        public apellido: string,
        public nombre: string,
        public tipo_doc: string,
        public nro_doc: string,
        public cuil: string,
        public nacionalidad: string,
        public sexo: string,
        public fecha_nac: string,
        public domicilio?: Domicilio,
        public contactos?: Contacto[],
        public profesion?: Profesion[],
        public ssocial?: Ssocial,
        public img?: string,
        public borrado?: boolean,
        public _id?: string
    ) { }
}
