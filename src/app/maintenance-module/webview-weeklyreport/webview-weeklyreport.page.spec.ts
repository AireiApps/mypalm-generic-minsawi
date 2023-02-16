import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebviewWeeklyreportPage } from './webview-weeklyreport.page';

describe('WebviewWeeklyreportPage', () => {
  let component: WebviewWeeklyreportPage;
  let fixture: ComponentFixture<WebviewWeeklyreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewWeeklyreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebviewWeeklyreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
