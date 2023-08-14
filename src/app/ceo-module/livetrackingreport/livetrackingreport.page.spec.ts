import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivetrackingreportPage } from './livetrackingreport.page';

describe('LivetrackingreportPage', () => {
  let component: LivetrackingreportPage;
  let fixture: ComponentFixture<LivetrackingreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivetrackingreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivetrackingreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
