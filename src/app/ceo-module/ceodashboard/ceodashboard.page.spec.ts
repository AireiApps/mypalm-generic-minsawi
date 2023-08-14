import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeodashboardPage } from './ceodashboard.page';

describe('CeodashboardPage', () => {
  let component: CeodashboardPage;
  let fixture: ComponentFixture<CeodashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeodashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeodashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
