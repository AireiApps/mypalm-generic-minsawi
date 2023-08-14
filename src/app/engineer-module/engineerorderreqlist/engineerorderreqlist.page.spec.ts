import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EngineerorderreqlistPage } from './engineerorderreqlist.page';

describe('EngineerorderreqlistPage', () => {
  let component: EngineerorderreqlistPage;
  let fixture: ComponentFixture<EngineerorderreqlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineerorderreqlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EngineerorderreqlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
