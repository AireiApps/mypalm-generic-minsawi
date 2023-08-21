import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FourhoursentryPage } from './fourhoursentry.page';

describe('FourhoursentryPage', () => {
  let component: FourhoursentryPage;
  let fixture: ComponentFixture<FourhoursentryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourhoursentryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FourhoursentryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
