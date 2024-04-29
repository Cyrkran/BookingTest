import useFetch from "../../Hooks/useFetch"
import CardLocation from "../Card/CardLocation"
import './Listings.css'

interface ListingProps {
    onChangeSelectedLocation: React.Dispatch<React.SetStateAction<BookingLocation | null>>
}

const Listings = (props: ListingProps) => {
    const { onChangeSelectedLocation } = props
    const { data: locations, error, loading } = useFetch<Array<BookingLocation>>('/locations', {})

    return (
        <div className="listings">
            { loading && <></> }
            { error && <></> }
            { locations && (
                <>
                    {
                        locations.map((location: BookingLocation) => {
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