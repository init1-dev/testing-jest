const roomTemplate = { 
    name: "Room1", 
    rate: 500, 
    discount: 10, 
    bookings: [] 
}

const bookingTemplate = {
    name: "John Doe", 
    email: "john@doe.com",
    checkIn: "",
    checkOut: "",
    discount: 0,
    room: null
}

export { roomTemplate, bookingTemplate }