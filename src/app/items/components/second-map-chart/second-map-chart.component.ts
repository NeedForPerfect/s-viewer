import { Component, OnInit, ViewChild } from '@angular/core';
import * as worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import * as echarts from 'echarts';

@Component({
  selector: 'app-second-map-chart',
  templateUrl: './second-map-chart.component.html',
  styleUrls: ['./second-map-chart.component.scss']
})
export class SecondMapChartComponent implements OnInit {

  options: any;
  constructor() { }

  initChart(event) {
    console.log(event);
  }

  loadData() {
    echarts.registerMap('USA', worldHigh.default, {
      Alaska: {              // 把阿拉斯加移到美国主大陆左下方
        left: -131,
        top: 25,
        width: 15
      },
      Hawaii: {
        left: -70,        // 夏威夷
        top: 28,
        width: 5
      },
      'Puerto Rico': {       // 波多黎各
        left: -76,
        top: 26,
        width: 2
      }
    });
  }

  ngOnInit(): void {
this.loadData();
    this.options = {
      title: {
        text: 'USA Population Estimates (2012)',
        subtext: 'Data from www.census.gov',
        sublink: 'http://www.census.gov/popest/data/datasets.html',
        left: 'right'
      },
      tooltip: {
        show: true,
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function (params) {
          let value: any = (params.value + '').split('.');
          value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
          return params.seriesName + '<br/>' + params.name + ': ' + value;
        }
      },
      visualMap: {
        left: 'left',
        min: 500000,
        max: 38000000,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        text: ['High', 'Low'],           // 文本，默认为数值文本
        calculable: true
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          clickable: true,
          name: 'USA PopEstimates',
          type: 'map',
          roam: true,
          map: 'USA',
          emphasis: {
            label: {
              show: false
            }
          },
          // 文本位置修正
          textFixed: {
          
          },
          data: [
          ]
        }
      ]
    };
  }


}
