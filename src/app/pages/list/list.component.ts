import { Component, OnInit, inject } from '@angular/core';
import { Booking } from '../../interface/booking.model';
import { ApiService } from '../../service/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  apiService = inject(ApiService);
  bookings!: Booking[];

  ngOnInit() {
    this.apiService.getBookings().subscribe(data => {
      this.bookings = data;
    });
  }

}
