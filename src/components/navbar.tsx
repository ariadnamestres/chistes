import { useState,useEffect } from 'react'
import getWeather from '../services/weather'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import WbSunnyIcon from '@mui/icons-material/WbSunny'


const NavBar = () => {
  const [temperature, setTemperature] = useState<string>('')
 
  const fetchWeather = async () : Promise<void> => {
    try {
      const weatherData = await getWeather()
      setTemperature(weatherData.main.temp.toString())
    } catch (error) {
      console.error('Failed to fetch weather data', error)
    }
  };

  useEffect(() => {
    fetchWeather()
  }, [])
 
  return (
    <Box>
      <AppBar>
          
          <Typography component="div" sx={{ flexGrow: 1 }}>
           Temps a Barcelona   {temperature} °C
           <IconButton
            size="large"
            color="inherit">
            <WbSunnyIcon />
            </IconButton>
          </Typography>
      
      </AppBar>
    </Box>
  );
}

export default NavBar
