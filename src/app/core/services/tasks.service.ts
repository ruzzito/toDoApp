import { Injectable } from '@angular/core';
import { COLLECTIONS } from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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

    return this.db.collection(this.COLLECTION_NAME).doc(docId).set(data);
  }

  public delete(data:any, id: string) {
    this.db.collection(this.COLLECTION_NAME).add(data
      )

  
  }
}
