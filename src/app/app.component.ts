import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 's-viewer';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    console.log('On Init');
    //this.http.get(environment.apiUrl + 'hello').subscribe(res => console.log(res));
  }

}
