import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccuredchargesreportPage } from './accuredchargesreport.page';

describe('AccuredchargesreportPage', () => {
  let component: AccuredchargesreportPage;
  let fixture: ComponentFixture<AccuredchargesreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccuredchargesreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccuredchargesreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
