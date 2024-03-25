import Room, { RoomInterface } from "./Room"

const HUNDRED_PERCENT = 100;

export interface BookingInterface {
    name: string
    email: string
    checkIn: string
    checkOut: string
    discount: number
    room: Room | null
}

class Booking implements BookingInterface {
    name: string
    email: string
    checkIn: string
    checkOut: string
    discount: number
    room: Room | null

    constructor({name, email, checkIn, checkOut, room, discount}: BookingInterface) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.room = room;
        this.discount = discount;
    }

    getFee() {
        if(this.room && this.room.discount > 100 ) this.room.discount = 100;
        if(this.room && this.room.discount < 0) this.room.discount = 0;
        const minDiscount: number = Math.min(100, this.discount);
        const maxDiscount: number = Math.max(0, minDiscount);

        const daysBooked = this.room?.daysBooked(this.checkIn, this.checkOut).daysOccupied || 0;
        
        let fee: number = 0;
        if (this.room) {
            fee = this.room.rateToCents() - (maxDiscount / HUNDRED_PERCENT) * this.room.rateToCents();
        }

        return fee * daysBooked;
    }
}

export default Booking;