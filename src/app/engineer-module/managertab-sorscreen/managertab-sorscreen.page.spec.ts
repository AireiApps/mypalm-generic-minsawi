import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagertabSorscreenPage } from './managertab-sorscreen.page';

describe('ManagertabSorscreenPage', () => {
  let component: ManagertabSorscreenPage;
  let fixture: ComponentFixture<ManagertabSorscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagertabSorscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagertabSorscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
