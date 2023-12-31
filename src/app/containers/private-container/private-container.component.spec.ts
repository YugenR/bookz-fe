import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivateContainerComponent} from './private-container.component';

describe('PrivateContainerComponent', () => {
  let component: PrivateContainerComponent;
  let fixture: ComponentFixture<PrivateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivateContainerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
