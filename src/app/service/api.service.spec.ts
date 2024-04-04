import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
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
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get bookings', () => {
    service.getBookings().subscribe(bookings => {
      expect(bookings).toEqual(mockBookings);
    });

    const req = httpTestingController.expectOne('api/bookings/');
    expect(req.request.method).toEqual('GET');
    req.flush(mockBookings);
  });

  it('should add a booking', () => {
    const mockBooking = {
      "origin": "Bronx",
      "destination": "Newark",
      "occupants": 5,
      "date": new Date("04/31/2024"),
      "time": "3:00 PM"
    };
    service.addBooking(mockBooking).subscribe(response => {
      expect(response).toEqual(mockBooking);
    });

    const req = httpTestingController.expectOne('api/bookings/');
    expect(req.request.method).toEqual('POST');
    req.flush(mockBooking);
  });

  it('should get booking by id', () => {
    const mockBooking = {
      "origin": "Bronx",
      "destination": "Newark",
      "occupants": 5,
      "date": new Date("04/31/2024"),
      "time": "3:00 PM"
    };

    service.getBookingById(1).subscribe(booking => {
      expect(booking).toEqual(mockBooking);
    });

    const req = httpTestingController.expectOne('api/bookings/1');
    expect(req.request.method).toEqual('GET');

    req.flush(mockBooking);
  });

});