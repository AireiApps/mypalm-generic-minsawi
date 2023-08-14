import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeomaintenancereportPage } from './ceomaintenancereport.page';

describe('CeomaintenancereportPage', () => {
  let component: CeomaintenancereportPage;
  let fixture: ComponentFixture<CeomaintenancereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeomaintenancereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeomaintenancereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
