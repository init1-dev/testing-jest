class Room {
    constructor(name, rate, discount) {
        this.name = name;
        this.bookings = [];
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date) {
        if(isNaN(Date.parse(date))) throw new Error('Invalid Date');

        const parsedDate = new Date(date);
        
        return this.bookings.some(booking => {
            const checkInDate = new Date(booking.checkIn);
            const checkOutDate = new Date(booking.checkOut);
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
    constructor(name, email, checkIn, checkOut, room, discount) {
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