import { render, screen } from '@testing-library/react';
import { Context, BookingContext } from './BookingContext';

describe('BookingContext tests', () => {
    test('Verifies if the BookingContext give correct values', () => {
        render(
            <BookingContext>
                <Context.Consumer>
                    {(value) => {
                        expect(value.bookings).toEqual([]);
                        expect(typeof value.getBookingById).toBe('function');
                        expect(typeof value.setBooking).toBe('function');
                        expect(typeof value.deleteBooking).toBe('function');
                        expect(typeof value.updateBooking).toBe('function');
                        expect(typeof value.getBookingByLocationId).toBe('function');
                        return null;
                    }}
                </Context.Consumer>
            </BookingContext>
        );
    });

    test('add a new booking and verifies is it appears in the booking list', () => {
        const { result } = render(
            <BookingContext>
                <Context.Consumer>
                    {(value) => {
                        // add a new booking
                        const newBooking = {
                            locationId: 'loc123',
                            startDate: new Date(),
                            endDate: new Date(),
                            price: 100,
                            name: 'Test Booking'
                        };
                        const response = value.setBooking(newBooking);

                        // verifies if the new booking was added successfully
                        expect(response).toBe('Booking created successfully');
                        expect(value.bookings).toContainEqual(expect.objectContaining(newBooking));

                        return null;
                    }}
                </Context.Consumer>
            </BookingContext>
        );
    });

    test('removes a booking and verifies if it was removed from the booking list', () => {
        const { result } = render(
            <BookingContext>
                <Context.Consumer>
                    {(value) => {
                        // Add a new booking
                        const newBooking = {
                            locationId: 'loc123',
                            startDate: new Date(),
                            endDate: new Date(),
                            price: 100,
                            name: 'Test Booking'
                        };
                        const responseAdd = value.setBooking(newBooking);

                        // verifies if the booking was added successfully
                        expect(responseAdd).toBe('Booking created successfully');
                        expect(value.bookings).toContainEqual(expect.objectContaining(newBooking));

                        // Remove booking
                        const responseDelete = value.deleteBooking(newBooking.id);

                        // verifies if the booking was removed successfully
                        expect(responseDelete).toBe('Booking removed successfully');
                        expect(value.bookings).not.toContainEqual(expect.objectContaining(newBooking));

                        return null;
                    }}
                </Context.Consumer>
            </BookingContext>
        );
    });

});