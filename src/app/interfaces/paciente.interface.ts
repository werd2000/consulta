// ====================================================
// Interface Paciente se extiende PersonaInterface y 
// permite la implementación rápida en otras interfaces
// o clases
// ====================================================

import { PersonaInterface } from './persona.interface';
import { DomicilioInterface } from './domicilio.interface';
import { ContactoInterface } from './contacto.interface';
import { SsocialInterface } from './ssocial.interface';

export interface PacienteInterface extends PersonaInterface {

    // La propiedad estado indica si el paciente está
    // activo, en espera, de alta o abandonó;
    estado: string;
    // TODO: Implementar un array de domicilios
    // permitiendo domicilio legal, real, fiscal
    domicilio?: DomicilioInterface;
    // Puedo guardar un array de contactos
    contactos?: ContactoInterface[];
    // Datos del seguro social
    ssocial?: SsocialInterface;
    // familia?: Familia[];
}