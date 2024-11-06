
import { z } from 'zod'

//zod 

const JokesSchema = z.object({
  id: z.string(),
  joke: z.string(),
  status: z.number()
})
type Joke = z.infer<typeof JokesSchema>

const ChuckNorrisShema = z.object({
  value: z.string(),

})

type ChuckJoke = z.infer<typeof ChuckNorrisShema>


const getJokes = async (): Promise<Joke | undefined> => {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} `)
    }
    const data = await response.json()
    console.log(data)
    const result = JokesSchema.safeParse(data)
    console.log(result)
    if (!result.success) {
      console.error('Invalid joke data', result.error);
      return undefined;
    }
    return result.data


  } catch (error) {
    console.error(error)
    return undefined
  }
}


const getJokesChuckNorris = async (): Promise<ChuckJoke | undefined> => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random', {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    return data

  } catch (error) {
    console.error(error)
  }
}


const api = {
  getJokes,
  getJokesChuckNorris
}

export default api

