import { Injectable } from '@angular/core';
import { TipoContacto } from 'src/app/models/TipoContacto.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import sweetAlert from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class TipoContactoService {

  private tiposContactosCollection: AngularFirestoreCollection<TipoContacto>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.tiposContactosCollection = afs.collection<TipoContacto>('tipo-contacto');
  }

  borrarTipoContacto(tipo: TipoContacto) {
    this.afs.collection('tipo-contacto').doc(tipo._id).delete()
      .then(resp => {
        sweetAlert ('Datos borrados', `Los datos del tipo de contacto ${ tipo.tipo } se borraron correctamente`, 'success');
      })
      .catch( err => {
        sweetAlert ('Los datos no se borraron', `Los datos del tipo de contacto ${ tipo.tipo } no se borraron`, 'warning');
      });
  }

  // =====================================================================
  // Crea un Tipo de Contacto
  // =====================================================================
  crearTipo( tipo: TipoContacto ) {
    const id = this.afs.createId();
    tipo._id = id;
    return this.afs.collection('tipo-contacto').doc(id).set(tipo);
  }

  // ======================================================
  // Obtiene la lista de Tipos de Contactos
  // ======================================================
  getTiposContactos() {
    return this.tiposContactosCollection.valueChanges();
  }
}