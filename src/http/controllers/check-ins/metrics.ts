import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case"
import { FastifyRequest, FastifyReply } from "fastify"

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
   const fetchUserCheckInHistoryUseCase = makeGetUserMetricsUseCase()
      
   const { checkInsCount } = await fetchUserCheckInHistoryUseCase.execute({
      userId: request.user.sub,
   })
   
   return reply.status(200).send({
      checkInsCount,
   })
}