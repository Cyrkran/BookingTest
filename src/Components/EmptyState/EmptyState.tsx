import { Box, Typography } from "@mui/material"
import EmptyState1 from './../../assets/EmptyState.png'
import './EmptyState.css'

const EmptyState = () => {
    return (
        <Box className="emptyStateWrapper">
            <img src={EmptyState1} width={'30%'} height={'30%'} />
            <Typography variant="h4">Please, pick a location and make your first booking</Typography>
        </Box>
    )
}

export default EmptyState