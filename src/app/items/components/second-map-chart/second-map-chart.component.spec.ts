import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondMapChartComponent } from './second-map-chart.component';

describe('SecondMapChartComponent', () => {
  let component: SecondMapChartComponent;
  let fixture: ComponentFixture<SecondMapChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondMapChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondMapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
