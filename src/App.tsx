
import { useState, useEffect } from 'react'
//services
import api from './services/chistes'
import postRates from './services/rating'
// components 
import NavBar from './components/navbar'
import './App.css'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'



const { getJokes, getJokesChuckNorris } = api

const App: React.FC = () => {
  const [joke, setJoke] = useState<string>('')

  const getJoke = async (): Promise<void> => {
    const random = Math.random()
    const jokeData = random < 0.5 ? await getJokes() : await getJokesChuckNorris()
    if (jokeData === undefined) {
      console.error('Failed to fetch joke data')
    }
    else if ('joke' in jokeData) {
      setJoke(jokeData.joke)
    }
    else {
      setJoke(jokeData.value)
    }
  }
  useEffect(() => {
    getJoke()
  }, [])

  const handleScore = async (score: number): Promise<void> => {
    const data = {
      joke,
      score,
      date: new Date().toISOString()
    }
    await postRates(joke, score)
  }


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}>

      <NavBar></NavBar>

      <Box sx={{
        width: 'auto',
        backgroundColor: '#5e35b1',
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        gap: 10,
        borderRadius: 20,
      }}>
        <Typography variant='h5' color="#FFFFFF" textAlign={'center'}>Prepara't per riure?</Typography>
        <Box>
          <Typography color="#FFFFFF">  {joke} </Typography>
        </Box>

        <Box bgcolor={"#ffffff"} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 'auto', borderRadius: 4, padding: 4 }}>
          <Button onClick={() => handleScore(3)}> <SentimentSatisfiedAltIcon fontSize='large' /></Button>
          <Button onClick={() => handleScore(2)}> <SentimentNeutralIcon fontSize='large' /></Button>
          <Button onClick={() => handleScore(1)}> <SentimentDissatisfiedIcon fontSize='large' /></Button>

        </Box>

        <Button
          variant='contained'
          sx={{ backgroundColor: '#e6ee9c', padding: 1, margin: 'auto', borderRadius: 3 }}
          onClick={getJoke}> Siguiente chiste</Button>

      </Box>



    </Box>
  );
}

export default App
