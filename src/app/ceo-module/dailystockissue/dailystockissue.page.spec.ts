import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailystockissuePage } from './dailystockissue.page';

describe('DailystockissuePage', () => {
  let component: DailystockissuePage;
  let fixture: ComponentFixture<DailystockissuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailystockissuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailystockissuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
