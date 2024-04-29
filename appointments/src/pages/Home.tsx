import { useState } from "react";
import EmptyState from "../Components/EmptyState/EmptyState";
import Layout from "../Components/Layout/Layout";
import Listings from "../Components/Listings/Listings";
import './Home.css';
import Booking from "./Booking";

const Home = () => {
    const [location, setLocation] = useState<BookingLocation | null>(null)
    return (
        <Layout>
            <div className="HomeWrapper">
                <div className="bookingDetails">
                    { 
                        location == null ? <EmptyState /> :
                            <Booking locationId={location.id} />
                    }
                    
                </div>
                <div className="listings">
                    <Listings onChangeSelectedLocation={setLocation} />
                </div>
            </div>
        </Layout>
    )
}

export default Home