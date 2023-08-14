import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompliancereportPage } from './compliancereport.page';

describe('CompliancereportPage', () => {
  let component: CompliancereportPage;
  let fixture: ComponentFixture<CompliancereportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompliancereportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompliancereportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
