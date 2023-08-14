import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EngineerorderreqAddPage } from './engineerorderreq-add.page';

describe('EngineerorderreqAddPage', () => {
  let component: EngineerorderreqAddPage;
  let fixture: ComponentFixture<EngineerorderreqAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineerorderreqAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EngineerorderreqAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
