import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: ApiService;

  const mockBookings = [
    {
      "id": 1,
      "origin": "Bronx",
      "destination": "Jersey City",
      "occupants": 2,
      "date": new Date("04/30/2024"),
      "time": "09:30 AM"
    },
    {
      "id": 2,
      "origin": "Brooklyn",
      "destination": "Newark",
      "occupants": 1,
      "date": new Date("04/30/2024"),
      "time": "12:30 PM"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, HttpClientTestingModule],
      providers: [ApiService, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => ""
            },
          },
        },
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiService);
    spyOn(service, 'getBookings').and.returnValue(of(mockBookings));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch booking data on initialization', () => {
    component.ngOnInit();
    expect(component.bookings).toEqual(mockBookings);
  });
});
