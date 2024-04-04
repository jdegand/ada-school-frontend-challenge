import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpageComponent } from './detailpage.component';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('DetailpageComponent', () => {
  let component: DetailpageComponent;
  let fixture: ComponentFixture<DetailpageComponent>;
  let service: ApiService;

  const mockBooking = {
    "id": 2,
    "origin": "Brooklyn",
    "destination": "Newark",
    "occupants": 1,
    "date": new Date("04/30/2024"),
    "time": "12:30 PM"
  }

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
    spyOn(service, 'getBookingById').and.returnValue(of(mockBooking));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch booking data on initialization', () => {
    component.ngOnInit();
    expect(component.booking).toEqual(mockBooking);
  });
});
