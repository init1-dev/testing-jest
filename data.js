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

export default { room1, room2, room3, booking1, booking2, booking3 };