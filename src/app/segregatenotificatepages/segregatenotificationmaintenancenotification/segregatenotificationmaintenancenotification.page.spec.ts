import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SegregatenotificationmaintenancenotificationPage } from './segregatenotificationmaintenancenotification.page';

describe('SegregatenotificationmaintenancenotificationPage', () => {
  let component: SegregatenotificationmaintenancenotificationPage;
  let fixture: ComponentFixture<SegregatenotificationmaintenancenotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegregatenotificationmaintenancenotificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SegregatenotificationmaintenancenotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
