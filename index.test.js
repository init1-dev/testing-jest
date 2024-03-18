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

    test('should return Invalid Date if the date is a number', () => {
        expect(() => room.isOccupied("")).toThrow('Invalid Date');
    });
});

describe('Room Occupancy Percentage', () => {
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, checkIn: "2024-03-15", checkOut: "2024-03-18", room: room, discount: 0});
    const booking2 = new Booking({...bookingTemplate, checkIn: "2024-03-18", checkOut: "2024-03-20", room: room, discount: 15});
    const booking3 = new Booking({...bookingTemplate, checkIn: "2024-03-25", checkOut: "2024-03-29", room: room, discount: 50});

    test('return correct percentage of occupancy within range of dates', () => {
        room.bookings = [booking1, booking2, booking3];
        expect(room.occupancyPercentage("2024-03-13", "2024-03-31")).toBe(47);
    });

    test('return correct percentage of occupancy within range of dates (100%)', () => {
        room.bookings = [booking1, booking2, booking3];
        expect(room.occupancyPercentage("2024-03-15", "2024-03-19")).toBe(100);
    });

    test('return correct percentage of occupancy within range of dates (after)', () => {
        room.bookings = [booking1, booking2, booking3];
        expect(room.occupancyPercentage("2024-04-05", "2024-04-15")).toBe(0);
    });

    test('return correct percentage of occupancy within range of dates (before)', () => {
        room.bookings = [booking1, booking2, booking3];
        expect(room.occupancyPercentage("2024-02-05", "2024-02-15")).toBe(0);
    });

    test('return error if dates in range are invalid', () => {
        room.bookings = [booking1, booking2, booking3];
        expect(() => room.occupancyPercentage("hola", "2024-03-31")).toThrow("Invalid Date");
    });

    test('return error if startDate is greater than endDate', () => {
        room.bookings = [booking1, booking2, booking3];
        expect(() => room.occupancyPercentage("2024-03-31", "2024-03-13")).toThrow("startDate cannot be greater than endDate");
    });

    test('return error if dates input format is not string', () => {
        room.bookings = [booking1, booking2, booking3];
        expect(() => room.occupancyPercentage(2024, 2025)).toThrow("Invalid Input Format");
    });
});

// describe('Total Occupancy Percentage', () => {

//     test('return correct total occupancy percentage across all rooms', () => {
//         expect(Room.availableRooms()).toBe(true);
//     });
// });

// describe('Available Rooms', () => {

//     test('should return array of all rooms not occupied for entire duration', () => {
//         expect(Room.availableRooms()).toBe(true);
//     });
// });

// describe('Booking', () => {
//     const booking = new Booking();

//     test('should return correct fee including discounts on room and booking', () => {
//         expect(booking.getFee().toBe(true));
//     });

// });