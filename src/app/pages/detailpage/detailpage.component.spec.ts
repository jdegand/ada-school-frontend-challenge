import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpageComponent } from './detailpage.component';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DetailpageComponent', () => {
  let component: DetailpageComponent;
  let fixture: ComponentFixture<DetailpageComponent>;
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailpageComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 1,
              },
            },
          },
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailpageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
