import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AbcdreportPage } from './abcdreport.page';

describe('AbcdreportPage', () => {
  let component: AbcdreportPage;
  let fixture: ComponentFixture<AbcdreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbcdreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbcdreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
