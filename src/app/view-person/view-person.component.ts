import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import validateToken from '../middleware/validateToken';

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.css']
})
export class ViewPersonComponent implements OnInit {
  token:any = ""
  data: any = []
  filter:string = ""
  dataFilter: any = []

  constructor(private router: Router) {}

  ngOnInit() {
    validateToken(this.router);
    this.token = localStorage.getItem('token');
    this.viewPerson();
  }

  async viewPerson(){
    let url = 'http://localhost:3000/viewUsers';

    const response = await fetch(url , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': this.token
      },
    })

    const result = await response.json();


    this.data = result.data;
    this.dataFilter = result.data;
  }

  async filtrarItems() {
    if (this.data.length > 0) {
      this.dataFilter = await this.data.filter((item: { name: string }) => {
        return item.name.toLowerCase().includes(this.filter.toLowerCase());
      });
    }
  }
  
}
