import  { z } from 'zod'

const ReportAcuditSchema = z.object({
  joke: z.string(),
  score: z.number(),
  date: z.string().optional(),
})
type ReportAcudit = z.infer<typeof ReportAcuditSchema>  

let ReportAcudits: ReportAcudit[] = []

const postRates = async (joke: string, score: number ): Promise<{ status: string; ReportAcudits?: ReportAcudit[]; error?: any }>  =>{
try {
  //Lógica para cambiar el objeto si el cliente cambia de opinión en el datin
  const Acuditjapuntuat = ReportAcudits.find(ReportAcudit => ReportAcudit.joke === joke )
  if (Acuditjapuntuat) {
      Acuditjapuntuat.score= score
      console.log ('Puntuació actualitzada',Acuditjapuntuat)
      } else {
        const ReportAcudit = {
          joke,
          score,
          date: new Date().toISOString()
        }
        ReportAcudits.push(ReportAcudit)
        console.log('Report Afegit', ReportAcudit)
      }
  console.log( 'Tots els chistes puntuats', ReportAcudits)
  return { status: 'succes', ReportAcudits }
} catch (error) {
  console.error(error)
  return {status: 'error', error}

}
}
   




export default postRates 