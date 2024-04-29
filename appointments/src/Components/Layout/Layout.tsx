import Header from "../Header/Header";
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    return (
        <>
            <div className='main'>
                <Header title="Bookings" />
                <div className="page">
                    { children }
                </div>
            </div>
        </>
    );
}

export default Layout