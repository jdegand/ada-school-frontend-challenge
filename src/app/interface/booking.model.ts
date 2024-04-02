export interface Booking {
    id?: number,
    origin: string;
    destination: string;
    occupants: number,
    date: Date,
    time: string
}