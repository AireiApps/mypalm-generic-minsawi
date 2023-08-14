import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeohomePage } from './ceohome.page';

describe('CeohomePage', () => {
  let component: CeohomePage;
  let fixture: ComponentFixture<CeohomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeohomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeohomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
