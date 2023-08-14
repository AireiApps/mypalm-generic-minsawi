import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoBoilerlogreportPage } from './ceo-boilerlogreport.page';

describe('CeoBoilerlogreportPage', () => {
  let component: CeoBoilerlogreportPage;
  let fixture: ComponentFixture<CeoBoilerlogreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoBoilerlogreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoBoilerlogreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
