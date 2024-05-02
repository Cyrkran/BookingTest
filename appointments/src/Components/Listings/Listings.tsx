import CardLocation from "../Card/CardLocation"
import AllLocations from './../../assets/Locations.json'
import './Listings.css'

interface ListingProps {
    onChangeSelectedLocation: React.Dispatch<React.SetStateAction<BookingLocation | null>>
}

const Listings = (props: ListingProps) => {
    const { onChangeSelectedLocation } = props

    return (
        <div className="all_listings">
            { AllLocations && (
                <>
                    {
                        AllLocations.map((location: BookingLocation) => {
                            return (
                                <CardLocation 
                                    onClick={onChangeSelectedLocation}
                                    id={location.id}
                                    image={location.image}
                                    location={location.location}
                                    price={location.price} 
                                    type={location.type}
                                    key={location.id} />
                            )
                        })
                    }
                </>
            )}
        </div>
    )
}

export default Listings