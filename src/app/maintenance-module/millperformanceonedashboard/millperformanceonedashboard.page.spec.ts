import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MillperformanceonedashboardPage } from './millperformanceonedashboard.page';

describe('MillperformanceonedashboardPage', () => {
  let component: MillperformanceonedashboardPage;
  let fixture: ComponentFixture<MillperformanceonedashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillperformanceonedashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MillperformanceonedashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
