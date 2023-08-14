import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApprovalsHomePage } from './approvals-home.page';

describe('ApprovalsHomePage', () => {
  let component: ApprovalsHomePage;
  let fixture: ComponentFixture<ApprovalsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalsHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovalsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
