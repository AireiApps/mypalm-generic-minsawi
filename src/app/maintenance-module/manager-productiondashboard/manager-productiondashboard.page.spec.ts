import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerProductiondashboardPage } from './manager-productiondashboard.page';

describe('ManagerProductiondashboardPage', () => {
  let component: ManagerProductiondashboardPage;
  let fixture: ComponentFixture<ManagerProductiondashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerProductiondashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerProductiondashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
