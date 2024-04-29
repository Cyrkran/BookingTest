import { Paper, Typography } from "@mui/material"
import './EmptyState.css'

const EmptyState = () => {
    return (
        <div className="emptyStateWrapper">
            <Paper elevation={2} sx={{padding: '10px'}}>
                <Typography variant="h4">Please, pick a location and make your first booking</Typography>
            </Paper>
        </div>
    )
}

export default EmptyState