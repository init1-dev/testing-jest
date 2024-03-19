const HUNDRED_PERCENT = 100;
const CENTS = 100;

class Room {

    constructor({name, rate, discount}) {
        this.name = name;
        this.rate = rate;
        this.discount = discount;
        this.bookings = [];
    }

    rateToCents() {
        return (this.rate * (1 - this.discount / HUNDRED_PERCENT)) * CENTS;
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
        return Math.round( (daysOccupied / totalDays) * HUNDRED_PERCENT );
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        if (!Array.isArray(rooms) ) throw new Error('Undefined rooms array');
        if (rooms.length === 0) throw new Error('Empty rooms array');

        let percentage = 0;
        rooms.forEach(room => {
            percentage += room.occupancyPercentage(startDate, endDate);
        });

        return Math.round(percentage / rooms.length);
    }

    static availableRooms(rooms, startDate, endDate) {
        if (!Array.isArray(rooms) ) throw new Error('Undefined rooms array');
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
        if(this.discount > 100) this.discount = 100;
        if(this.discount < 0) this.discount = 0;
        if(this.room.discount > 100 ) this.room.discount = 100;
        if(this.room.discount < 0) this.room.discount = 0;
        
        const bookingFee = this.room.rateToCents() * (1 - this.discount / HUNDRED_PERCENT);

        return bookingFee;
    }
}

module.exports = { Room, Booking };