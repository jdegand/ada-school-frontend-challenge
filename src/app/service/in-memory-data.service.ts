import { Injectable } from '@angular/core';
import { Booking } from '../interface/booking.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  private idCount = 2;

  private fakeDB: Booking[] = [
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

  create(booking: Booking) {
    return this.fakeDB.push({ id: this.idCount++, ...booking });
  }

  delete(id: number) {
    return this.fakeDB.filter(db => db.id !== id);
  }

  findAll() {
    return this.fakeDB;
  }

}
