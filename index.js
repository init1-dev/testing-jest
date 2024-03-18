class Room {
    constructor({name, rate, discount}) {
        this.name = name;
        this.rate = rate;
        this.discount = discount;
        this.bookings = [];
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
        return;
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