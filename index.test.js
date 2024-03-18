const { Room, Booking } = require('./index');
const { room1, room2, room3, booking1, booking2, booking3 } = require('./data');

describe('Room', () => {

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