import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PortafolioPage } from './portafolio.page';

describe('PortafolioPage', () => {
  let component: PortafolioPage;
  let fixture: ComponentFixture<PortafolioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortafolioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PortafolioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
