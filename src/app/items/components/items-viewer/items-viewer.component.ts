import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-viewer',
  templateUrl: './items-viewer.component.html',
  styleUrls: ['./items-viewer.component.scss']
})
export class ItemsViewerComponent implements OnInit {

  items = new Array(25).fill(null);

  constructor() { }

  ngOnInit(): void {
  }

}
