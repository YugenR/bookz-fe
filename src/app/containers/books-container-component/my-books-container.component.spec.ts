import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBooksContainerComponent } from './my-books-container.component';

describe('BooksContainerComponentComponent', () => {
  let component: MyBooksContainerComponent;
  let fixture: ComponentFixture<MyBooksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBooksContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBooksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
