import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreMaterialsearchpagePage } from './store-materialsearchpage.page';

describe('StoreMaterialsearchpagePage', () => {
  let component: StoreMaterialsearchpagePage;
  let fixture: ComponentFixture<StoreMaterialsearchpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMaterialsearchpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreMaterialsearchpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
