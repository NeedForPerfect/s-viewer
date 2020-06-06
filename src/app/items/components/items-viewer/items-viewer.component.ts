import { Component, OnInit } from '@angular/core';
import { MockDataService, ItemsResponce } from 'src/app/core/services/mock-data.service';
import { CoffeItem } from 'src/app/core/models/item.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-items-viewer',
  templateUrl: './items-viewer.component.html',
  styleUrls: ['./items-viewer.component.scss']
})
export class ItemsViewerComponent implements OnInit {

  items: CoffeItem[] = [];

  constructor(
    private mockDataService: MockDataService
  ) { }

  ngOnInit(): void {
    this.mockDataService.getCoffeeItems(48, 2, 'COFFEE').subscribe((res: ItemsResponce<CoffeItem>) => {
      this.items = res.items;
    });
  }

}
