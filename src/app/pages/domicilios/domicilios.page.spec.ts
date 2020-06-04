import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomiciliosPage } from './domicilios.page';

describe('DomiciliosPage', () => {
  let component: DomiciliosPage;
  let fixture: ComponentFixture<DomiciliosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomiciliosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomiciliosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
