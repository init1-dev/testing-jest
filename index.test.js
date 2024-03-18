const { Room, Booking } = require('./index');

describe('Room', () => {
    const room = new Room();

    test('should return false if room is not occupied on given date', () => {
        expect(room.isOccupied()).toBe(false);
    });

    test('should return true if room is occupied on given date', () => {
        expect(room.isOccupied()).toBe(true);
    });

    
    test('should return correct percentage of occupancy within range of dates', () => {
        expect(room.occupancyPercentage()).toBe(true);
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