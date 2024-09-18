import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClueListComponent } from './clue-list.component';

describe('ClueListComponent', () => {
  let component: ClueListComponent;
  let fixture: ComponentFixture<ClueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClueListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
