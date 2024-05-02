import { Box, Paper, Skeleton, Typography } from "@mui/material"

const CardSkeleton = () => {
    return (
        <>
            <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />
            
        </>
    )
}

const BookingSkeleton = () => {
    return (
        <>
            <Typography variant="h1"> <Skeleton variant="text" /> </Typography>
            <Skeleton variant="rounded" sx={{height: '350px'}} />
            <Box sx={{ display: 'flex', gap: '5px', marginTop: '20px'}}>
                <Box sx={{width: '60%'}}>
                    <Typography variant="h2"><Skeleton variant="text" /></Typography>
                </Box>
                <Paper sx={{width: '40%', padding: '15px', marginTop: '20px', display: 'flex', flexWrap: 'wrap'}}>
                    <Typography variant="h4" sx={{width: '-webkit-fill-available'}}><Skeleton variant="text" /></Typography>
                    <Skeleton variant="rounded" sx={{ width: '48%', height: 50, marginBottom: '5px', marginRight: 'auto'}}/>
                    <Skeleton variant="rounded" sx={{ width: '48%', height: 50, marginBottom: '5px'}}/>
                    <Skeleton variant="rounded" sx={{ width: '100%', height: 60, marginBottom: '5px'}} />
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <Typography variant="h4" sx={{width: '60%'}}><Skeleton variant="text" /></Typography>
                        <Typography variant="h4" sx={{width: '39%'}}><Skeleton variant="text" /></Typography>
                        <Typography variant="h4" sx={{width: '75%'}}><Skeleton variant="text" /></Typography>
                        <Typography variant="h4" sx={{width: '23%'}}><Skeleton variant="text" /></Typography>
                        <Typography variant="h4" sx={{width: '60%'}}><Skeleton variant="text" /></Typography>
                        <Typography variant="h4" sx={{width: '35%'}}><Skeleton variant="text" /></Typography>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export { BookingSkeleton, CardSkeleton }
