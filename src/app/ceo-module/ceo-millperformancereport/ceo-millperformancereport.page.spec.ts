import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoMillperformancereportPage } from './ceo-millperformancereport.page';

describe('CeoMillperformancereportPage', () => {
  let component: CeoMillperformancereportPage;
  let fixture: ComponentFixture<CeoMillperformancereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoMillperformancereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoMillperformancereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
