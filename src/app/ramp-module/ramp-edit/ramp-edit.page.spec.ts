import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RampEditPage } from './ramp-edit.page';

describe('RampEditPage', () => {
  let component: RampEditPage;
  let fixture: ComponentFixture<RampEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RampEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RampEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
