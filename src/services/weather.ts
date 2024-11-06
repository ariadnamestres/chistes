import axios from 'axios'
import { z } from 'zod'

// Zod
const WeatherShema = z.object({
  main: z.object({ 
    temp: z.number() 
  }),
})
type Weather = z.infer<typeof WeatherShema>

const getWeather = async (): Promise<Weather> => {
  try {
    const appid = '3bf9d0d4a5b242f8c2882af80e206d8c'
    // const appid: string | undefined  = process.env.REACT_APP_API_KEY 
    console.log(appid)
    const lat = 41.3818
    const lon = 2.1685
     const units = 'metric'
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}`
    console.log(weatherUrl)
    const response = await axios.get(weatherUrl)
    const data = response.data
    const result = WeatherShema.safeParse(data)
    console.log(result)

    if (!result.success) {
      throw new Error('Invalid weather data')
    }
    result.data.main.temp = Math.round(result.data.main.temp)

    return result.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default getWeather