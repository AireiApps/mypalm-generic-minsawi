import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FfbReportsPage } from './ffb-reports.page';

describe('FfbReportsPage', () => {
  let component: FfbReportsPage;
  let fixture: ComponentFixture<FfbReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfbReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FfbReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
