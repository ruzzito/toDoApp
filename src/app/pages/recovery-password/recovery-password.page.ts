import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage implements OnInit {
  public formulario = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  
  public message = "";
  public isToastOpen = false;
  
  constructor(private authService: AuthService) { }
  
  ngOnInit() {
  }
  
  public setOpen(state: boolean){
    this.isToastOpen = state;
  }
  
  public async onSubmit() {
    try {
      console.log(this.formulario.value);
      const { email } = this.formulario.value;
      if(!email) return;
      const response = await this.authService.recoveryPassword(email);
      this.message = response;
    } catch (error: any) {
      this.message = error;
    } finally {
      this.setOpen(true);
    }
  }
}
