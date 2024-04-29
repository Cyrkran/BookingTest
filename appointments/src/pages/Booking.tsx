import { Book, Delete, Edit, Person } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import useDelete from "../Hooks/useDelete"
import useFetch from "../Hooks/useFetch"
import usePost from "../Hooks/usePost"
import usePut from "../Hooks/usePut"
import './Booking.css'

interface BookingProps {
    locationId: string
}

const Booking = (props: BookingProps) => {
    const { locationId } = props
    const { data: location, loading: isloadingLocation, error: onLocationError } = useFetch<BookingLocation>(`/locations/${locationId}`, {})
    const { data: myBookings, loading: isLoadingBookings, error: onErrorBookings, refetch: refetchBookings } = useFetch<Array<BookingInfo>>(`/bookings/location/${locationId}`, {})
    const { success: onBookingSuccess, loading: isLoadingBooking, error: onBookingError, postData: book } = usePost<Array<BookingInfo>>(`/bookings`);
    const { success: onDeleteBooking, loading: isLoadingDeleteBooking, error: onDeleteBookingError, deleteData: deleteBooking } = useDelete<Array<BookingInfo>>('/bookings')
    const { success: onUpdateBooking, loading: isLoadingUpdateBooking, error: onUpdateBookingError, updateData: editBooking } = usePut('/bookings')

    const [listings, setListings] = useState<BookingInfo[] | null>(myBookings)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [edit, setEdit] = useState<string | null>(null)

    const onSubmitFormData = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (startDate && endDate && locationId && location) {
            edit !== null ? await editBooking<BookingRequest & { id: string }>({ id: edit, startDate: startDate, endDate: endDate, locationId: locationId, price: location.price }, [edit])
                : await book<BookingRequest>({ startDate: startDate, endDate: endDate, locationId: locationId, price: location.price })

        }

        setEdit(null)
        setStartDate(null)
        setEndDate(null)
        await refetchBookings()
    }

    const onClickDeleteBooking = async (bookingId: string) => {
        await deleteBooking(bookingId)
        await refetchBookings()
    }

    const onClickEditBooking = async (booking: BookingInfo) => {
        console.log({booking})
        setStartDate(new Date(booking.startDate))
        setEndDate(new Date(booking.endDate))
        setEdit(booking.id)
    }

    useEffect(() => {
        setListings(myBookings)
    }, [myBookings])

    return (
        <Box className='bookingsWrapper'>
            <Typography variant="h3">{location?.type} in {location?.location}</Typography>
            <form onSubmit={onSubmitFormData}>
                <Paper className="form">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Start date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            minDate={new Date()}
                            format="dd/MM/yyyy"
                            className="fullWidth"
                        />
                        <DatePicker
                            label="End date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            minDate={startDate || new Date()}
                            format="dd/MM/yyyy"
                            className="fullWidth"
                        />
                    </LocalizationProvider>
                    <LoadingButton
                        color="secondary"
                        fullWidth
                        loading={isLoadingBooking}
                        startIcon={<Book />}
                        loadingPosition="start"
                        variant="outlined"
                        type="submit"
                    >
                        Book now
                    </LoadingButton>
                </Paper>
            </form>
            <Typography variant="h5">All listings</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper', maxWidth: '968px' }}>
                <>
                    {
                        listings !== null ?
                            <>
                                {
                                    listings.map((bookings: BookingInfo) => {
                                        return (<React.Fragment key={bookings.id}>
                                            <ListItem
                                                secondaryAction={
                                                    <Box>
                                                        <IconButton edge="end" aria-label="Edit" sx={{ marginRight: '10px' }} color="info" onClick={() => { onClickEditBooking(bookings) }}>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton edge="end" aria-label="delete" color="error" onClick={() => { onClickDeleteBooking(bookings.id) }}>
                                                            <Delete />
                                                        </IconButton>
                                                    </Box>
                                                }>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <Person />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Name" secondary={`from ${format(bookings.startDate, 'dd/MM')} to ${format(bookings.endDate, 'dd/MM')}`} />
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>)
                                    })
                                }
                            </> : <> </>
                    }
                </>
            </List>
        </Box>
    )
}

export default Booking

/**
 * <form onSubmit={onSubmitFormData}>
                            <Paper className="form">
                                <Typography variant="h4" sx={{ width: '100%', marginBottom: '10px' }}>R$ {location.price} day</Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start date"
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                        minDate={new Date()}
                                        format="dd/MM/yyyy"
                                    />
                                    <DatePicker
                                        label="End date"
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        minDate={startDate || new Date()}
                                        format="dd/MM/yyyy"
                                    />
                                </LocalizationProvider>
                                <LoadingButton
                                    color="secondary"
                                    fullWidth
                                    loading={isLoadingBooking}
                                    startIcon={<Book />}
                                    loadingPosition="start"
                                    variant="outlined"
                                    type="submit"
                                >
                                    Book now
                                </LoadingButton>
                            </Paper>
                        </form>
 */