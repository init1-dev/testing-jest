const { Room, Booking } = require('./index');

describe('Room', () => {

    const roomTemplate = { name: "Room1", rate: 5, discount: 0 }
    const bookingTemplate = { name: "John Doe", email: "john@doe.com", checkIn: null, checkOut: null, room: null, discount: 0 }

    const room1 = new Room({...roomTemplate});
    room1.bookings = [booking1, booking2];

    const room2 = new Room({name: "Room2", rate: 3, discount: 50});
    room2.bookings = [booking2, booking3];

    const room3 = new Room({name: "Room3", rate: 4, discount: 15});
    room3.bookings = [booking3];
    
    const booking1 = new Booking({...bookingTemplate, checkIn: "2024-3-15", checkOut: "2024-3-18", room: room1});
    const booking2 = new Booking({...bookingTemplate, checkIn: "2024-3-18", checkOut: "2024-3-20", room: room2, discount: 50});
    const booking3 = new Booking({...bookingTemplate, checkIn: "2024-3-25", checkOut: "2024-3-29", room: room3, discount: 15});

    // AVAILABLE DATE
    test('should return false if room is not occupied on given date', () => {
        expect(room1.isOccupied("2024-03-20")).toBeFalsy(false);
    });

    test('should return true if room is occupied on given date', () => {
        expect(room1.isOccupied("2024-03-15")).toBeTruthy(true);
    });

    test('should return false if the room is vacated that same day', () => {
        expect(room1.isOccupied("2024-03-18")).toBeFalsy(false);
    });

    test('should return Invalid Date if the date format is invalid', () => {
        expect(() => room1.isOccupied("hola")).toThrow('Invalid Date');
    });

    test('should return Invalid Date if the date is invalid', () => {
        expect(() => room1.isOccupied("2024-03-32")).toThrow('Invalid Date');
    });

    // OCCUPANCY
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

describe('Booking', () => {
    const booking = new Booking();

    test('should return correct fee including discounts on room and booking', () => {
        expect(booking.getFee().toBe(true));
    });

});