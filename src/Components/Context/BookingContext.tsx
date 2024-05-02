import { ReactNode, createContext, useContext, useState } from 'react';
import Locations from './../../assets/Locations.json'

type BookingInfoType = {
    bookings: Array<BookingInfo>,
    getBookingById: (bookingId: string) => BookingInfo,
    setBooking: (booking: BookingRequest) => string
    deleteBooking: (bookingId: string) => string
    updateBooking: (booking: BookingInfo) => string
    getBookingByLocationId: (locationId: string) => Array<BookingInfo>
}

export const Context = createContext({} as BookingInfoType);

export const BookingContext = ({ children }: { children: ReactNode }) => {
    const [Bookings, setBookings] = useState<Array<BookingInfo>>([])
    const generateRandomId = (length = 10) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const getBookingById = (bookingId: string) => {
        const booking = Bookings.find(a => a.id === bookingId) || {} as BookingInfo;

        return booking
    }

    const setBooking = (booking: BookingRequest) => {
        //Check for overlaping bookings
        for (let item of Bookings) {
            if (((item.startDate <= booking.startDate && item.endDate >= booking.startDate) ||
                (item.startDate <= booking.endDate && item.endDate >= booking.endDate)) && (item.locationId == booking.locationId)) {
                throw "Booking already exists for this date"
            }
        }

        // Create new booking
        const tempBooking = [...Bookings]
        tempBooking.push(Object.assign({ id: generateRandomId() }, booking))
        setBookings(tempBooking)
        return "Booking created successfully"
    }

    const deleteBooking = (bookingId: string) => {
        let index = Bookings.findIndex(a => a.id === bookingId);
        const tempBooking = [...Bookings]

        if (index !== -1) {
            tempBooking.splice(index, 1);
            setBookings(tempBooking)

            return "Booking removed successfully"
        } else {
            throw "Booking not found"
        }
    }

    const updateBooking = (booking: BookingInfo) => {
        const tempBooking = [...Bookings]
        let index = tempBooking.findIndex(a => a.id === booking.id);

        if (index !== -1) {

            tempBooking[index] = {
                id: booking.id,
                locationId: booking.locationId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                price: booking.price,
                name: booking.name
            };

            setBookings(tempBooking)
            return "Booking updated successfully"

        } else {
            throw "Booking not found."
        }
    }

    const getBookingByLocationId = (locationId: string) => {
        const bookingsForLocation = Bookings.filter(a => a.locationId === locationId);
        
        return bookingsForLocation
    }

    return (
        <Context.Provider value={{ bookings: Bookings, updateBooking, deleteBooking, setBooking, getBookingById, getBookingByLocationId }}>
            {children}
        </Context.Provider>
    )
}

export const useBookingContext = () => useContext(Context);
