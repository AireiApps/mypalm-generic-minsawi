import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SustainchecklistPage } from './sustainchecklist.page';

describe('SustainchecklistPage', () => {
  let component: SustainchecklistPage;
  let fixture: ComponentFixture<SustainchecklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SustainchecklistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SustainchecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
