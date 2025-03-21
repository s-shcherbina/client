import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassQuizComponent } from './pass-quiz.component';

describe('PassQuizComponent', () => {
  let component: PassQuizComponent;
  let fixture: ComponentFixture<PassQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
