import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormaPagosPage } from './forma-pagos.page';

describe('FormaPagosPage', () => {
  let component: FormaPagosPage;
  let fixture: ComponentFixture<FormaPagosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaPagosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormaPagosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
