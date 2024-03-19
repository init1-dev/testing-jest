const { Room, Booking } = require('../index');
const { roomTemplate, bookingTemplate } = require('../templates');

describe('Total Occupancy Percentage', () => {
    const room = new Room({...roomTemplate});
    const room2 = new Room({...roomTemplate});
    const room3 = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, checkIn: "2024-03-15", checkOut: "2024-03-18", room: room, discount: 0});
    const booking2 = new Booking({...bookingTemplate, checkIn: "2024-03-18", checkOut: "2024-03-20", room: room, discount: 15});
    room.bookings = [booking1, booking2];
    room2.bookings = [booking1, booking2];
    room3.bookings = [booking1, booking2];

    test('return correct total occupancy percentage across all rooms in range (100%)', () => {
        expect(Room.totalOccupancyPercentage([room, room2, room3], "2024-03-15", "2024-03-19")).toBe(100);
    });

    test('return correct total occupancy percentage across all rooms in range (50%)', () => {
        expect(Room.totalOccupancyPercentage([room, room2, room3], "2024-03-15", "2024-03-24")).toBe(50);
    });

    test('return correct total occupancy percentage across all rooms before (0)', () => {
        expect(Room.totalOccupancyPercentage([room, room2, room3], "2024-03-5", "2024-03-10")).toBe(0);
    });

    test('return correct total occupancy percentage across all rooms after (0)', () => {
        expect(Room.totalOccupancyPercentage([room, room2, room3], "2024-03-20", "2024-03-25")).toBe(0);
    });

    test('return error if dates in range are invalid', () => {
        expect(() => Room.totalOccupancyPercentage([room, room2, room3], "hola", "2024-03-31")).toThrow("Invalid Date");
    });

    test('return error if startDate is greater than endDate', () => {
        expect(() => Room.totalOccupancyPercentage([room, room2, room3], "2024-03-31", "2024-03-13")).toThrow("startDate cannot be greater than endDate");
    });

    test('return error if dates input format is not string', () => {
        expect(() => Room.totalOccupancyPercentage([room, room2, room3], 2024, 2025)).toThrow("Invalid Input Format");
    });

    test('return error array is empty', () => {
        expect(() => Room.totalOccupancyPercentage([], 2024, 2025)).toThrow("Empty rooms array");
    });

    test('return error if we forgot to pass rooms array', () => {
        expect(() => Room.totalOccupancyPercentage(2024, 2025)).toThrow("Undefined rooms array");
    });
});