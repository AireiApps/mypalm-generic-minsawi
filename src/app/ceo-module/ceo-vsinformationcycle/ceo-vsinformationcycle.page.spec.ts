import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CeoVsinformationcyclePage } from './ceo-vsinformationcycle.page';

describe('CeoVsinformationcyclePage', () => {
  let component: CeoVsinformationcyclePage;
  let fixture: ComponentFixture<CeoVsinformationcyclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoVsinformationcyclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CeoVsinformationcyclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
