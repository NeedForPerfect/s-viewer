import { Component, OnInit, NgZone, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItemsState } from 'src/app/core/store/reducer';
import { ItemUI } from 'src/app/core/models/item.model';
import { Subscription, Subject, combineLatest } from 'rxjs';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as worldHigh from "@amcharts/amcharts4-geodata/worldHigh"
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
  private mapChart: am4maps.MapChart;
  @ViewChild('mapChartViewPort') mapChartViewPort: ElementRef;
  morphedPolygon;
  mapPieChart: am4charts.PieChart;
  mapPieSeries: am4charts.PieSeries;
  mapPolygonSeries;
  countryLabel;

  constructor(
    private store: Store<{ itemsState: ItemsState }>,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      this.initMapChart();

      let chart = am4core.create(this.chartViewPort.nativeElement, am4charts.PieChart);
      // Add data
      chart.data = [];
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.labels.template.text = "{category} {value} T"
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
    this.subscribtions.add(combineLatest(this.chartUnabled, this.store).pipe(filter(val => !!val[0]), map((val: any) => val[1])).subscribe(({ itemsState }: { itemsState: ItemsState }) => {
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


  initMapChart() {

    this.mapChart = am4core.create(this.mapChartViewPort.nativeElement, am4maps.MapChart);

    try {
      this.mapChart.geodata = worldHigh.default;
      console.log(this.mapChart.geodata);
    }
    catch (e) {
      this.mapChart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
    }

    this.mapChart.projection = new am4maps.projections.Mercator();

    // zoomout on background click
    this.mapChart.chartContainer.background.events.on("hit", () => { this.zoomOut() });

    var colorSet = new am4core.ColorSet();
    var morphedPolygon;

    // map polygon series (countries)
    var polygonSeries = this.mapChart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    // specify which countries to include
    polygonSeries.include = ["IT", "CH", "FR", "DE", "GB", "ES", "PT", "IE", "NL", "LU", "BE", "AT", "DK"]

    // country area look and behavior
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.strokeOpacity = 1;
    polygonTemplate.stroke = am4core.color("#ffffff");
    polygonTemplate.fillOpacity = 0.5;
    polygonTemplate.tooltipText = "{name}";

    // desaturate filter for countries
    var desaturateFilter = new am4core.DesaturateFilter();
    desaturateFilter.saturation = 0.25;
    polygonTemplate.filters.push(desaturateFilter);

    // take a color from color set
    polygonTemplate.adapter.add("fill", function (fill, target) {
      return colorSet.getIndex(target.dataItem.index + 1);
    })

    // set fillOpacity to 1 when hovered
    var hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fillOpacity = 1;

    // what to do when country is clicked
    polygonTemplate.events.on("hit", (event) => {
      event.target.zIndex = 1000000;
      this.selectPolygon(event.target);
    })

    // Pie chart
    var pieChart = this.mapChart.seriesContainer.createChild(am4charts.PieChart);
    // Set width/heigh of a pie chart for easier positioning only
    pieChart.width = 100;
    pieChart.height = 100;
    pieChart.hidden = true; // can't use visible = false!

    // because defauls are 50, and it's not good with small countries
    pieChart.chartContainer.minHeight = 1;
    pieChart.chartContainer.minWidth = 1;

    var pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    pieSeries.data = [{ value: 100, category: "First port" }, { value: 20, category: "Second port" }, { value: 10, category: "Third port" }];
    this.mapPieChart = pieChart;

    var dropShadowFilter = new am4core.DropShadowFilter();
    dropShadowFilter.blur = 4;
    pieSeries.filters.push(dropShadowFilter);

    var sliceTemplate = pieSeries.slices.template;
    sliceTemplate.fillOpacity = 1;
    sliceTemplate.strokeOpacity = 0;

    var activeState = sliceTemplate.states.getKey("active");
    activeState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good

    var sliceHoverState = sliceTemplate.states.getKey("hover");
    sliceHoverState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good

    // we don't need default pie chart animation, so change defaults
    var hiddenState = pieSeries.hiddenState;
    hiddenState.properties.startAngle = pieSeries.startAngle;
    hiddenState.properties.endAngle = pieSeries.endAngle;
    hiddenState.properties.opacity = 0;
    hiddenState.properties.visible = false;

    // series labels
    var labelTemplate = pieSeries.labels.template;
    labelTemplate.nonScaling = true;
    labelTemplate.fill = am4core.color("#FFFFFF");
    labelTemplate.fontSize = 10;
    labelTemplate.background = new am4core.RoundedRectangle();
    labelTemplate.background.fillOpacity = 0.9;
    labelTemplate.padding(4, 9, 4, 9);
    labelTemplate.background.fill = am4core.color("#7678a0");

    // we need pie series to hide faster to avoid strange pause after country is clicked
    pieSeries.hiddenState.transitionDuration = 200;

    // country label
    var countryLabel = this.mapChart.chartContainer.createChild(am4core.Label);
    countryLabel.text = "Select a country";
    countryLabel.fill = am4core.color("#7678a0");
    countryLabel.fontSize = 40;

    countryLabel.hiddenState.properties.dy = 1000;
    countryLabel.defaultState.properties.dy = 0;
    countryLabel.valign = "bottom";
    countryLabel.align = "right";
    countryLabel.paddingRight = 50;
    countryLabel.hide(0);
    countryLabel.show();

    this.morphedPolygon = morphedPolygon;
    this.mapPieChart = pieChart;
    this.mapPieSeries = pieSeries;
    this.mapPolygonSeries = polygonSeries;
    this.countryLabel = countryLabel;

  }

  selectPolygon(polygon) {
    if (this.morphedPolygon != polygon) {
      var animation = this.mapPieSeries.hide();
      if (animation) {
        animation.events.on("animationended", () => {
          this.morphToCircle(polygon);
        })
      }
      else {
        this.morphToCircle(polygon);
      }
    }
  }

  fadeOut(exceptPolygon = null) {
    for (var i = 0; i < this.mapPolygonSeries.mapPolygons.length; i++) {
      var polygon = this.mapPolygonSeries.mapPolygons.getIndex(i);
      if (polygon != exceptPolygon) {
        polygon.defaultState.properties.fillOpacity = 0.5;
        polygon.animate([{ property: "fillOpacity", to: 0.5 }, { property: "strokeOpacity", to: 1 }], polygon.polygon.morpher.morphDuration);
      }
    }
  }

  zoomOut() {
    if (this.morphedPolygon) {
      this.mapPieSeries.hide();
      this.morphBack();
      this.fadeOut();
      this.countryLabel.hide();
      this.morphedPolygon = undefined;
    }
  }

  morphBack() {
    if (this.morphedPolygon) {
      this.morphedPolygon.polygon.morpher.morphBack();
      var dsf = this.morphedPolygon.filters.getIndex(0);
      dsf.animate({ property: "saturation", to: 0.25 }, this.morphedPolygon.polygon.morpher.morphDuration);
    }
  }

  morphToCircle(polygon) {
    var animationDuration = polygon.polygon.morpher.morphDuration;
    // if there is a country already morphed to circle, morph it back
    this.morphBack();
    // morph polygon to circle
    polygon.toFront();
    polygon.polygon.morpher.morphToSingle = true;
    var morphAnimation = polygon.polygon.morpher.morphToCircle();

    polygon.strokeOpacity = 0; // hide stroke for lines not to cross countries

    polygon.defaultState.properties.fillOpacity = 1;
    polygon.animate({ property: "fillOpacity", to: 1 }, animationDuration);

    // animate desaturate filter
    var filter = polygon.filters.getIndex(0);
    filter.animate({ property: "saturation", to: 1 }, animationDuration);

    // save currently morphed polygon
    this.morphedPolygon = polygon;

    // fade out all other
    this.fadeOut(polygon);

    // hide country label
    this.countryLabel.hide();

    if (morphAnimation) {
      morphAnimation.events.on("animationended", () => {
        this.zoomToCountry(polygon);
      })
    }
    else {
      this.zoomToCountry(polygon);
    }
  }

  zoomToCountry(polygon) {
    var zoomAnimation = this.mapChart.zoomToMapObject(polygon, 2.2, true);
    if (zoomAnimation) {
      zoomAnimation.events.on("animationended", () => {
        this.showPieChart(polygon);
      })
    }
    else {
      this.showPieChart(polygon);
    }
  }

  showPieChart(polygon) {
    polygon.polygon.measure();
    var radius = polygon.polygon.measuredWidth / 2 * polygon.globalScale / this.mapChart.seriesContainer.scale;
    this.mapPieChart.width = radius * 2;
    this.mapPieChart.height = radius * 2;
    this.mapPieChart.radius = radius;

    var centerPoint = am4core.utils.spritePointToSvg(polygon.polygon.centerPoint, polygon.polygon);
    centerPoint = am4core.utils.svgPointToSprite(centerPoint, this.mapChart.seriesContainer);

    this.mapPieChart.x = centerPoint.x - radius;
    this.mapPieChart.y = centerPoint.y - radius;

    var fill = polygon.fill;
    var desaturated = fill.saturate(0.3);

    for (var i = 0; i < this.mapPieSeries.dataItems.length; i++) {
      var dataItem = this.mapPieSeries.dataItems.getIndex(i);
      dataItem.value = Math.round(Math.random() * 100);
      dataItem.slice.fill = am4core.color(am4core.colors.interpolate(
        fill.rgb,
        am4core.color("#ffffff").rgb,
        0.2 * i
      ));

      dataItem.label.background.fill = desaturated;
      dataItem.tick.stroke = fill;
    }

    this.mapPieSeries.show();
    this.mapPieChart.show();

    this.countryLabel.text = "{name}";
    this.countryLabel.dataItem = polygon.dataItem;
    this.countryLabel.fill = desaturated;
    this.countryLabel.show();
  }

}
