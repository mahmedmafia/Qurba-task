import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGlassSvgComponent } from './search-glass-svg.component';

describe('SearchGlassSvgComponent', () => {
  let component: SearchGlassSvgComponent;
  let fixture: ComponentFixture<SearchGlassSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchGlassSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchGlassSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
