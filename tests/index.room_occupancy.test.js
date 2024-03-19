const { Room, Booking } = require('../index');
const { roomTemplate, bookingTemplate } = require('../templates');

describe('Room Occupancy Percentage', () => {
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, checkIn: "2024-03-15", checkOut: "2024-03-18", room: room, discount: 0});
    const booking2 = new Booking({...bookingTemplate, checkIn: "2024-03-18", checkOut: "2024-03-20", room: room, discount: 15});
    const booking3 = new Booking({...bookingTemplate, checkIn: "2024-03-25", checkOut: "2024-03-29", room: room, discount: 50});
    room.bookings = [booking1, booking2, booking3];

    test('return correct percentage of occupancy within range of dates', () => {
        expect(room.occupancyPercentage("2024-03-13", "2024-03-31")).toBe(47);
    });

    test('return correct percentage of occupancy within range of dates (100%)', () => {
        expect(room.occupancyPercentage("2024-03-15", "2024-03-19")).toBe(100);
    });

    test('return correct percentage of occupancy within range of dates (after)', () => {
        expect(room.occupancyPercentage("2024-04-05", "2024-04-15")).toBe(0);
    });

    test('return correct percentage of occupancy within range of dates (before)', () => {
        expect(room.occupancyPercentage("2024-02-05", "2024-02-15")).toBe(0);
    });

    test('return error if dates in range are invalid', () => {
        expect(() => room.occupancyPercentage("hola", "2024-03-31")).toThrow("Invalid Date");
    });

    test('return error if startDate is greater than endDate', () => {
        expect(() => room.occupancyPercentage("2024-03-31", "2024-03-13")).toThrow("startDate cannot be greater than endDate");
    });

    test('return error if dates input format is not string', () => {
        expect(() => room.occupancyPercentage(2024, 2025)).toThrow("Invalid Input Format");
    });
});