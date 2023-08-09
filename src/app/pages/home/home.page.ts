import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authUser: AuthService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.authUser.user)
    }, 5000);
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
