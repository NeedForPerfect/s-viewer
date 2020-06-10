import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalculatedDataBySelectedComponent } from './view-calculated-data-by-selected.component';

describe('ViewCalculatedDataBySelectedComponent', () => {
  let component: ViewCalculatedDataBySelectedComponent;
  let fixture: ComponentFixture<ViewCalculatedDataBySelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCalculatedDataBySelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCalculatedDataBySelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
