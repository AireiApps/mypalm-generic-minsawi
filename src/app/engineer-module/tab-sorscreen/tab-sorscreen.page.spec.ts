import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabSorscreenPage } from './tab-sorscreen.page';

describe('TabSorscreenPage', () => {
  let component: TabSorscreenPage;
  let fixture: ComponentFixture<TabSorscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSorscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabSorscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
