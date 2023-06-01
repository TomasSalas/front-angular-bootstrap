import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  rol:any = "";
  constructor(private router: Router){}
  ngOnInit(){
    this.rol = localStorage.getItem('rol');
  }

  logoutPage(){
    this.openAlertLogout();
    setTimeout(() => {
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('DATA')
      this.router.navigate(['/'])
    }, 2000);
  }

  openAlertLogout(){
    let alert: any = document.getElementById("alertLogout");
    alert.classList.remove('d-none');
  }
}
