import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupervisormillreportPage } from './supervisormillreport.page';

describe('SupervisormillreportPage', () => {
  let component: SupervisormillreportPage;
  let fixture: ComponentFixture<SupervisormillreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisormillreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupervisormillreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
