import Booking, { BookingInterface } from "./Booking";

const HUNDRED_PERCENT = 100;
const CENTS = 100;

export interface RoomInterface {
    name: string;
    rate: number;
    discount: number;
    bookings: Booking[] | [];
}

class Room {
    name: string;
    rate: number;
    discount: number;
    bookings: Booking[];

    constructor({name, rate, discount, bookings}: RoomInterface) {
        this.name = name;
        this.rate = rate;
        this.discount = discount;
        this.bookings = bookings;
    }

    rateToCents():number {
        return (this.rate * (1 - this.discount / HUNDRED_PERCENT)) * CENTS;
    }

    isOccupied(date: string): boolean {
        if(isNaN(Date.parse(date))) throw new Error('Invalid Date');

        const parsedDate = new Date(date).getTime();
        
        return this.bookings.some(booking => {
            const checkInDate = new Date(booking.checkIn).getTime();
            const checkOutDate = new Date(booking.checkOut).getTime();
            return checkInDate <= parsedDate && checkOutDate > parsedDate;
        });
    }

    daysBooked(startDate: string, endDate: string): {daysOccupied: number, totalDays: number} {
        const start = new Date(startDate);
        const end = new Date(endDate);

        let daysOccupied = 0;
        let totalDays = 0;

        while (start <= end) {
            totalDays += 1;
            if( this.isOccupied(start.toString()) ){
                daysOccupied += 1;
            }
            start.setDate(start.getDate() + 1);
        }
        return {daysOccupied, totalDays};
    }

    occupancyPercentage(startDate: string, endDate: string): number {
        if(isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
            throw new Error('Invalid Date');
        }
        if(Date.parse(startDate) > Date.parse(endDate)){
            throw new Error('startDate cannot be greater than endDate');
        } 

        const { daysOccupied, totalDays } = this.daysBooked(startDate, endDate);
        
        return Math.round( (daysOccupied / totalDays) * HUNDRED_PERCENT );
    }

    static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
        let percentage = 0;
        rooms.forEach(room => {
            percentage += room.occupancyPercentage(startDate, endDate);
        });

        return Math.round(percentage / rooms.length);
    }

    static availableRooms(rooms: Room[], startDate: string, endDate: string): Room[] {
        if (rooms.length === 0) throw new Error('Empty rooms array');
        
        const roomsAvaible = rooms.filter(room => {
            if(room.occupancyPercentage(startDate, endDate) > 0){
                return false;
            } else {
                return true;
            }
        });
        return roomsAvaible;
    }
}

export default Room;