import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoVshourlypressurePage } from './ceo-vshourlypressure.page';

describe('CeoVshourlypressurePage', () => {
  let component: CeoVshourlypressurePage;
  let fixture: ComponentFixture<CeoVshourlypressurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoVshourlypressurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoVshourlypressurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
