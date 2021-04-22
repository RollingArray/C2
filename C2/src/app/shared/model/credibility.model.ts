export interface CredibilityModel{
    totalWeightedPerformancesMean ?: number,
    weight ?: number
}

export interface WeightedPerformancesModel{
    weightedPerformances : CredibilityModel[]
}