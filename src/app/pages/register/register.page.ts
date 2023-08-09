import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  public message = "";
  public isToastOpen = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  ngOnInit() {
  }
  
  public setOpen(state: boolean){
    this.isToastOpen = state;
  }

  public async onSubmit() {
    try {
      const { email, password, name } = this.registerForm.value;
      if(!email || !password) return;
      const message = await this.authService.signUpWithEmail(email, password, name);
      this.message = message;
      this.router.navigateByUrl("/");
    } catch (message: any) {
      this.message = message;
    } finally {
      this.setOpen(true);
    }
  }
}
