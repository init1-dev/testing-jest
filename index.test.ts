import Booking from "./class/Booking";
import Room from "./class/Room";
import { bookingTemplate, roomTemplate } from "./class/templates";

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
        expect(() => room.isOccupied("")).toThrow('Invalid Date');
    });
});

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
});

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
});

describe('Available Rooms', () => {
    const room = new Room({...roomTemplate});
    const room2 = new Room({...roomTemplate, name: "Room2"});
    const booking1 = new Booking({...bookingTemplate, checkIn: "2024-03-15", checkOut: "2024-03-18", room: room, discount: 0});
    const booking2 = new Booking({...bookingTemplate, checkIn: "2024-03-18", checkOut: "2024-03-20", room: room, discount: 15});
    const booking3 = new Booking({...bookingTemplate, checkIn: "2024-03-25", checkOut: "2024-03-29", room: room, discount: 50});
    room.bookings = [booking1, booking2];
    room2.bookings = [booking3];

    test('should return array of all rooms available for entire range (2)', () => {
        expect(Room.availableRooms([room, room2], "2024-03-20", "2024-03-24")).toMatchObject([room, room2]);
    });

    test('should return array of all rooms available for entire range (1)', () => {
        expect(Room.availableRooms([room, room2], "2024-03-15", "2024-03-24")).toMatchObject([room2]);
    });

    test('should return array of all rooms available for entire range (0)', () => {
        expect(Room.availableRooms([room, room2], "2024-03-10", "2024-03-30")).toMatchObject([]);
    });

    test('return error array is empty', () => {
        expect(() => Room.availableRooms([], "2024-03-10", "2024-03-30")).toThrow("Empty rooms array");
    });
});

describe('Booking - getFee', () => {
    const room = new Room({...roomTemplate, rate: 500, discount: 10});
    const room2 = new Room({...roomTemplate, rate: 500, discount: 0});
    const room3 = new Room({...roomTemplate, rate: 500, discount: -10});
    const booking1 = new Booking({...bookingTemplate, checkIn: "2024-03-15", checkOut: "2024-03-18", room: room, discount: 10});
    const booking2 = new Booking({...bookingTemplate, checkIn: "2024-03-15", checkOut: "2024-03-18", room: room2, discount: 0});
    const booking3 = new Booking({...bookingTemplate, checkIn: "2024-03-15", checkOut: "2024-03-18", room: room3, discount: -10});
    room.bookings = [booking1];
    room2.bookings = [booking2];
    room3.bookings = [booking3];

    test('should return correct fee including discounts on room and booking', () => {
        expect(booking1.getFee()).toBe(121500);
    });

    test('should return correct fee including discounts on room and booking', () => {
        expect(booking2.getFee()).toBe(150000);
    });

    test('should return correct fee including discounts on room and booking', () => {
        expect(booking3.getFee()).toBe(150000);
    });

});