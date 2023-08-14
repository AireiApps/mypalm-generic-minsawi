import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EngineerorderreqDetailPage } from './engineerorderreq-detail.page';

describe('EngineerorderreqDetailPage', () => {
  let component: EngineerorderreqDetailPage;
  let fixture: ComponentFixture<EngineerorderreqDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineerorderreqDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EngineerorderreqDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
