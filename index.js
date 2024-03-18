class Room {
    constructor({name, rate, discount}) {
        this.name = name;
        this.rate = rate;
        this.discount = discount;
        this.bookings = [];
    }

    rateToCents() {
        const CENTS = 100;
        return (this.rate * (1 - this.discount / 100)) * CENTS;
    }

    isOccupied(date) {
        if(typeof(date) !== 'string') throw new Error('Invalid Input Format');
        if(isNaN(Date.parse(date))) throw new Error('Invalid Date');

        const parsedDate = new Date(date).getTime();
        
        return this.bookings.some(booking => {
            const checkInDate = new Date(booking.checkIn).getTime();
            const checkOutDate = new Date(booking.checkOut).getTime();
            return checkInDate <= parsedDate && checkOutDate > parsedDate;
        });
    }

    occupancyPercentage(startDate, endDate) {
        if(typeof(startDate) !== 'string' || typeof(endDate) !== 'string') {
            throw new Error('Invalid Input Format')
        };
        if(isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
            throw new Error('Invalid Date');
        }
        if(Date.parse(startDate) > Date.parse(endDate)){
            throw new Error('startDate cannot be greater than endDate');
        } 

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
        return Math.round( (daysOccupied / totalDays) * 100 );
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        return;
    }

    static availableRooms(rooms, startDate, endDate) {
        return;
    }
}

class Booking {
    constructor({name, email, checkIn, checkOut, room, discount}) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.room = room;
        this.discount = discount;
    }

    getFee() {
        return;
    }
}

module.exports = { Room, Booking };