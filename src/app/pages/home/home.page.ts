import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public formulario = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });
  public isModalOpen = false;

  constructor(private authUser: AuthService, private router: Router, private tasksService: TasksService) { }
  
  ngOnInit() {
    setTimeout(() => {
      console.log(this.authUser.user)
    }, 5000);
  }
  
  public async onSubmit() {
    if(this.formulario.invalid)return;
    try {
      const response = await this.tasksService.set(this.formulario.value);
      console.log("Guardado exitosamente", response);
    } catch (error) {
      console.log(error);
    }
  }

  public setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public get userName(): string {
    return this.authUser.user?.displayName || "desconocida";
  }

  public async signOut(){
    try {
      await this.authUser.signOut();  
      this.router.navigateByUrl("/login")
    } catch (error) {
      console.log(error);
    }
  }

}
