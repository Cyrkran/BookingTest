import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface CardLocationProps {
    onClick: React.Dispatch<React.SetStateAction<BookingLocation | null>>
}

const CardLocation = (props: CardLocationProps & BookingLocation) => {
    const { id, location, price, type, image, onClick } = props
    const navigate = useNavigate()
    const goToBooking = (locationId: string) => {
        navigate(`/booking/${locationId}`)
    }

    return (
        <>
            <Card 
                variant='outlined' 
                square 
                sx={{ display: 'flex' }}
                onClick={() => onClick({
                    id: id, 
                    location: location, 
                    price: price,
                    image: image
                    } as BookingLocation)}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={image}
                    alt={`Image of ${location}`} 
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {type} in {location}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            U$ {price}
                        </Typography>
                    </CardContent>
                </Box>

            </Card>
        </>
    )
}

export default CardLocation