import { PrimsaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"

export function makeFetchUserCheckInsHisoryUseCase() {
   const checkInsRepository = new PrimsaCheckInsRepository()
   const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

   return useCase
}