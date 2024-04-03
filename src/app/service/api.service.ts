import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Booking } from '../interface/booking.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  #bookingUrl = 'api/bookings/';
  #http = inject(HttpClient);

  getBookings() {
    return this.#http.get<Booking[]>(this.#bookingUrl);
  }

  addBooking(body: unknown) {
    return this.#http.post(this.#bookingUrl, body);
  }

  updateBooking(body: Booking) {
    return this.#http.put(this.#bookingUrl + body.id, body);
  }

  cancelBooking(id: number) {
    return this.#http.delete(this.#bookingUrl + id);
  }

  getBookingById(id: number) {
    return this.#http.get<Booking>(this.#bookingUrl + id);
  }
}
