import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { PacienteProfile } from '../../models/paciente.model';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacienteDoc: AngularFirestoreDocument<PacienteProfile>;
  private pacientesCollection: AngularFirestoreCollection<PacienteProfile>;
  // public pacientes: PacienteProfile[] = [];
  public paciente: PacienteProfile;

  constructor(
    public router: Router,
    public afs: AngularFirestore,
  ) {
    this.pacientesCollection = afs.collection<PacienteProfile>('pacientes');
  }

  // ======================================================
  // Obtiene la lista de pacientes
  // ======================================================
  getPacientes() {
    return this.afs.collection('pacientes', ref => ref.orderBy('apellido'))
      .valueChanges();
  }

}
