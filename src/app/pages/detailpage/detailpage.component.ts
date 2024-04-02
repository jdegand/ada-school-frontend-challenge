import { Component, Input, OnInit, inject, numberAttribute } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Booking } from '../../interface/booking.model';

@Component({
  selector: 'app-detailpage',
  standalone: true,
  imports: [],
  templateUrl: './detailpage.component.html',
  styleUrl: './detailpage.component.css'
})
export class DetailpageComponent implements OnInit {
  @Input({ transform: numberAttribute }) id!:number;
  apiService = inject(ApiService);
  booking!: Booking;
  
  ngOnInit() {
    this.apiService.getBookingById(this.id).subscribe((data) => {
      this.booking = data;
    });
  }
}
