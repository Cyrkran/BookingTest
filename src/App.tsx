import './App.css';
import { BookingContext } from './Components/Context/BookingContext';
import Home from './pages/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <BookingContext>
        <Home />
      </BookingContext>
    </ThemeProvider>
  )
}

export default App
