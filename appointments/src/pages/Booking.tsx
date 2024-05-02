import { Book, Delete, Edit, Person } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import { useBookingContext } from "../Components/Context/BookingContext"
import AllLocations from './../assets/Locations.json'
import './Booking.css'

interface BookingProps {
    locationId: string
}

const Booking = (props: BookingProps) => {
    const { locationId } = props
    const { getBookingByLocationId, setBooking, deleteBooking, updateBooking } = useBookingContext()

    const myBookings = getBookingByLocationId(locationId)
    const location = AllLocations.find((loc) => loc.id == locationId)

    const [listings, setListings] = useState<BookingInfo[] | null>(myBookings)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [edit, setEdit] = useState<string | null>(null)
    const [name, setName] = useState<string>('')

    const onSubmitFormData = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (startDate && endDate && locationId && location && name) {
            edit !== null ? updateBooking({ name: name, id: edit, startDate: startDate, endDate: endDate, locationId: locationId, price: location.price })
                : setBooking({ name: name, startDate: startDate, endDate: endDate, locationId: locationId, price: location.price })

        }

        setEdit(null)
        setStartDate(null)
        setEndDate(null)
        setName('')
        setListings(getBookingByLocationId(locationId))
    }

    const onClickDeleteBooking = async (bookingId: string) => {
        deleteBooking(bookingId)
        setListings(getBookingByLocationId(locationId))
    }

    const onClickEditBooking = async (booking: BookingInfo) => {
        console.log({ booking })
        setStartDate(new Date(booking.startDate))
        setEndDate(new Date(booking.endDate))
        setEdit(booking.id)
        setName(booking.name)
    }

    useEffect(() => {
        setListings(myBookings)
    }, [myBookings])

    return (
        <Box className='bookingsWrapper'>
            <Typography variant="h4">{location?.type} in {location?.location}</Typography>
            <form onSubmit={onSubmitFormData}>
                <Paper className="form">
                    <TextField fullWidth label="Name" value={name} onChange={(ev) => {setName(ev.target.value)}} />
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
                                                <ListItemText primary={bookings.name} secondary={`from ${format(bookings.startDate, 'dd/MM')} to ${format(bookings.endDate, 'dd/MM')}`} />
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