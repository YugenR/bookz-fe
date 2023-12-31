import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicContainerComponent} from './public-container.component';

describe('PublicContainerComponent', () => {
  let component: PublicContainerComponent;
  let fixture: ComponentFixture<PublicContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicContainerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PublicContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
