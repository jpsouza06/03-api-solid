import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
   const nearbyGymsQuerySchema = z.object({
      q: z.string(),
      page: z.coerce.number().min(1).default(1),
      latitude: z.number().refine(value => {
         return Math.abs(value) <= 90
      }),
      longitude: z.number().refine(value => {
         return Math.abs(value) <= 180
      }),
   })

   const { latitude, longitude} = nearbyGymsQuerySchema.parse(request.query)


   const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
      
   const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: latitude, 
      userLongitude: longitude
   })
   
   return reply.status(200).send({
      gyms,
   })
}