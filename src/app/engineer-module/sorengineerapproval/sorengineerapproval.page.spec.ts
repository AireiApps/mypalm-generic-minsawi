import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SorengineerapprovalPage } from './sorengineerapproval.page';

describe('SorengineerapprovalPage', () => {
  let component: SorengineerapprovalPage;
  let fixture: ComponentFixture<SorengineerapprovalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorengineerapprovalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SorengineerapprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
