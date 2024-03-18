const { Room, Booking } = require('./index');

const roomTemplate = { 
    name: "Room1", 
    rate: 5, 
    discount: 0, 
    bookings: [] 
}

const bookingTemplate = {
    name: "John Doe", 
    email: "john@doe.com" 
}

describe('Room Availability', () => {
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, checkIn: "2024-03-15", checkOut: "2024-03-18", room: room, discount: 0});
    const booking2 = new Booking({...bookingTemplate, checkIn: "2024-03-18", checkOut: "2024-03-20", room: room, discount: 15});
    const booking3 = new Booking({...bookingTemplate, checkIn: "2024-03-25", checkOut: "2024-03-29", room: room, discount: 50});

    test('should return false if room is not occupied on given date', () => {
        room.bookings = [booking1];
        expect(room.isOccupied("2024-03-14")).toBe(false);
    });

    test('should return true if room is occupied on given date', () => {
        room.bookings = [booking1, booking2];
        expect(room.isOccupied("2024-03-17")).toBe(true);
    });

    test('should return false if the room is vacated that same day', () => {
        room.bookings = [booking3];
        expect(room.isOccupied("2024-03-22")).toBe(false);
    });

    test('should return Invalid Date if the date format is invalid', () => {
        expect(() => room.isOccupied("hola")).toThrow('Invalid Date');
    });

    test('should return Invalid Date if the date is invalid', () => {
        expect(() => room.isOccupied("2024-03-32")).toThrow('Invalid Date');
    });

    test('should return Invalid Date if the date is a number', () => {
        expect(() => room.isOccupied(12)).toThrow('Invalid Input Format');
    });
});

describe('Room Occupancy', () => {
    
    test('should return correct percentage of occupancy within range of dates', () => {
        expect(room1.occupancyPercentage()).toBe(true);
    });

    
    test('should return correct total occupancy percentage across all rooms', () => {
        expect(Room.totalOccupancyPercentage()).toBe(true);
    });

    
    test('should return array of all rooms not occupied for entire duration', () => {
        expect(Room.availableRooms()).toBe(true);
    });

});

// describe('Booking', () => {
//     const booking = new Booking();

//     test('should return correct fee including discounts on room and booking', () => {
//         expect(booking.getFee().toBe(true));
//     });

// });