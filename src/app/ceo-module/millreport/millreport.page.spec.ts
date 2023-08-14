import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MillreportPage } from './millreport.page';

describe('MillreportPage', () => {
  let component: MillreportPage;
  let fixture: ComponentFixture<MillreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MillreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
