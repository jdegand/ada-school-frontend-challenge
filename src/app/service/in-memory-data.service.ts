import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Booking } from '../interface/booking.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bookings: Booking[] = [
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

    return bookings;
  }

}
