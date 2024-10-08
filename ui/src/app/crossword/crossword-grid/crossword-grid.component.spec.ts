import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrosswordGridComponent } from './crossword-grid.component';

describe('CrosswordGridComponent', () => {
  let component: CrosswordGridComponent;
  let fixture: ComponentFixture<CrosswordGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrosswordGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrosswordGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
