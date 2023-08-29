import { Injectable } from '@angular/core';
import { COLLECTIONS, ERRORS_MESSAGES } from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private db = firebase.firestore();
  private COLLECTION_NAME = COLLECTIONS.TASKS;

  constructor() { 
    
  }

  public set(data: any, id?: string) {
    const docId = id || new Date().getTime().toString();

    return new Promise<string>(async (resolve, reject) => {
      try {
        await this.db.collection(this.COLLECTION_NAME).doc(docId).set(data);
        resolve('Tarea guardada exitosamente.');
      } catch (error: any) {
        console.log(error);
				if (typeof error === 'string') return reject(error);
				reject(ERRORS_MESSAGES["unexpected-error"]);
      }
    });
  }

  public delete(data:any, id: string) {
    this.db.collection(this.COLLECTION_NAME).add(data
      )
  }

  public getAll(){
    const subject = new Subject();

    this.db.collection(this.COLLECTION_NAME).onSnapshot((data) => {
      const body = data.docs.map((doc) => {
        return doc.data()
      })
      subject.next(body);
    });
    return subject.asObservable();
  }
}
