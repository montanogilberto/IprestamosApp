import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvalDetailPage } from './aval-detail.page';

describe('AvalDetailPage', () => {
  let component: AvalDetailPage;
  let fixture: ComponentFixture<AvalDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvalDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvalDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
