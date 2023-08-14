import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailystockreportPage } from './dailystockreport.page';

describe('DailystockreportPage', () => {
  let component: DailystockreportPage;
  let fixture: ComponentFixture<DailystockreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailystockreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailystockreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
