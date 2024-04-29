type BookingLocation = {
    id: string,
    location: string
    type: string
    price: number
    image: string
}

type BookingRequest = {
    locationId: string,
    startDate: Date,
    endDate: Date,
    price: number,
}

type BookingInfo = {
    id: string,
    locationId: string,
    startDate: Date,
    endDate: Date,
    price: number,
}