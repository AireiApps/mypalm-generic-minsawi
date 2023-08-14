import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HealthreportPage } from './healthreport.page';

describe('HealthreportPage', () => {
  let component: HealthreportPage;
  let fixture: ComponentFixture<HealthreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HealthreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
