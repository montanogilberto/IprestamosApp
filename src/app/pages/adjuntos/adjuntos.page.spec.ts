import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdjuntosPage } from './adjuntos.page';

describe('AdjuntosPage', () => {
  let component: AdjuntosPage;
  let fixture: ComponentFixture<AdjuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdjuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
