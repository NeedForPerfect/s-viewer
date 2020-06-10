import { Component, OnInit, NgZone, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItemsState } from 'src/app/core/store/reducer';
import { ItemUI } from 'src/app/core/models/item.model';
import { Subscription, Subject, combineLatest, forkJoin } from 'rxjs';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { map, filter } from 'rxjs/operators';
am4core.useTheme(am4themes_animated);

export interface PieChartData {
  T: number;
  country: string;
}

@Component({
  selector: 'app-view-calculated-data-by-selected',
  templateUrl: './view-calculated-data-by-selected.component.html',
  styleUrls: ['./view-calculated-data-by-selected.component.scss']
})
export class ViewCalculatedDataBySelectedComponent implements OnInit {

  selectedItems: ItemUI[];
  subscribtions = new Subscription();
  chartUnabled = new Subject();

  private chart: am4charts.PieChart;
  @ViewChild('chartViewPort') chartViewPort: ElementRef;

  constructor(
    private store: Store<{ itemsState: ItemsState }>,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create(this.chartViewPort.nativeElement, am4charts.PieChart);
      // Add data
      chart.data = [];
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "T";
      pieSeries.dataFields.category = "country";
      this.chart = chart;
      this.chartUnabled.next(true);
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
    this.subscribtions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeChartData();
  }

  subscribeChartData() {
    this.subscribtions.add( combineLatest(this.chartUnabled, this.store).pipe(filter(val => !!val[0]), map((val: any) => val[1])).subscribe(({ itemsState }: { itemsState: ItemsState }) => {
      this.selectedItems = itemsState.selectedItems;
      this.chart.data = this.selectedItems.reduce((acc: PieChartData[], curr: ItemUI) => {
        let existedCountryIndex = acc.findIndex(a => a.country.trim().toLocaleLowerCase() === curr.origin.trim().toLocaleLowerCase());
        console.log(existedCountryIndex);
        if (existedCountryIndex !== -1) {
          let existedCountry = acc[existedCountryIndex];
          acc[existedCountryIndex] = { ...existedCountry, T: +existedCountry.T + +curr.netWeightLBS };
          return acc;
        } else {
          return [...acc, { T: curr.netWeightLBS, country: curr.origin }];
        }
      }, []);
      this.cd.detectChanges();
    }));
  }


  // {
  //   "country": "Lithuania",
  //   "litres": 501.9
  // }, {
  //   "country": "Czech Republic",
  //   "litres": 301.9
  // }, {
  //   "country": "Ireland",
  //   "litres": 201.1
  // }, {
  //   "country": "Germany",
  //   "litres": 165.8
  // }, {
  //   "country": "Australia",
  //   "litres": 139.9
  // }, {
  //   "country": "Austria",
  //   "litres": 128.3
  // }, {
  //   "country": "UK",
  //   "litres": 99
  // }, {
  //   "country": "Belgium",
  //   "litres": 60
  // }, {
  //   "country": "The Netherlands",
  //   "litres": 50
  // }

}
