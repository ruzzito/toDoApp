import { Injectable } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  User,
  sendPasswordResetEmail,
  updateProfile,
  signOut
} from 'firebase/auth';
import { ERRORS_MESSAGES } from '../config';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private USER = new Subject<User | null> ();

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.USER.next(user);
    }) 
  }

  public get user(): User | null{
    return this.auth.currentUser;
  }

  public get $user(): Observable<User | null> {
    return this.USER.asObservable();
  }

  public recoveryPassword(email: string) :Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        await sendPasswordResetEmail(this.auth, email);
        resolve('Se ha enviado un email para recuperar tu contraseña.');
      } catch (error: any) {
        console.log(error);
        const message = ERRORS_MESSAGES[error.code] || 'Un error inesperado al intentar recuperar la contraseña';
        reject(message);
      }
    })
  }

  public signInWithEmail(
    email: string,
    password: string
  ): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        await signInWithEmailAndPassword(
          this.auth,
          email,
          password
        );
        resolve('Logueado exitosamente');
      } catch (error: any) {
        console.log(error);
				if (typeof error === 'string') return reject(error);
				reject(ERRORS_MESSAGES[error.code]);
      }
    });
  }

  public signUpWithEmail(
    email: string,
    password: string,
    displayName: string
  ): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const response = await createUserWithEmailAndPassword(
          this.auth,
          email,
          password,
        );
        console.log(response);
        resolve('Se ha registrado exitosamente');
        this.updateUser({ displayName })
      } catch (error: any) {
        console.log(error);
				if (typeof error === 'string') return reject(error);
				reject(ERRORS_MESSAGES[error.code]);
      }
    });
  }

  public updateUser(userData: any){
    return new Promise<string>(async (resolve, reject) => {
      try {
        if (!this.user) throw "Un error inesperado ocurrió"; 
        await updateProfile(this.user, userData)
        resolve('Usuario actualizado exitosamente');
      } catch (error: any) {
        console.log(error);
				if (typeof error === 'string') return reject(error);
				reject(ERRORS_MESSAGES[error.code]);
      }
    });
  }

  public signOut(){
    return new Promise<string>(async (resolve, reject) => {
      try {
        await signOut(this.auth);
        resolve('Usuario deslogeado exitosamente');
      } catch (error: any) {
        console.log(error);
				if (typeof error === 'string') return reject(error);
				reject(ERRORS_MESSAGES[error.code]);
      }
    });
  }
}