import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionFreetextComponent } from './add-question-freetext.component';

describe('AddQuestionFreetextComponent', () => {
  let component: AddQuestionFreetextComponent;
  let fixture: ComponentFixture<AddQuestionFreetextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionFreetextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionFreetextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
