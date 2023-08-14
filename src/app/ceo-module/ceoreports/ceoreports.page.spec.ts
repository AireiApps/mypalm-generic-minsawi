import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoreportsPage } from './ceoreports.page';

describe('CeoreportsPage', () => {
  let component: CeoreportsPage;
  let fixture: ComponentFixture<CeoreportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoreportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
