import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoilerlogreportPage } from './boilerlogreport.page';

describe('BoilerlogreportPage', () => {
  let component: BoilerlogreportPage;
  let fixture: ComponentFixture<BoilerlogreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerlogreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoilerlogreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
