import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup; 
  title = 'front-boostrap';
  submitted=false;
  msgAlert="";
  
  constructor(private formBuilder: FormBuilder , private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async loginCheck() {

    let data = this.loginForm.value
    let url = 'http://localhost:3000/signin';
    const response = await fetch(url , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();

    localStorage.setItem('TOKEN', result.token);

    this.msgAlert = "Ingreso correcto"
    this.openCorrect()
    setTimeout(() => {
      this.closeCorrect()
      this.router.navigate(['/view-person'])
    }, 2000)
    return;
  }

  openCorrect(){
    let alert: any = document.getElementById("alertCorrect");
    alert.classList.remove('d-none');
  }
  closeCorrect(){
    let alert: any = document.getElementById("alertCorrect");
    alert.classList.add('d-none');
  }
}
