export function explainIncomeLevel(level: string): string {
  switch (level) {
    case 'Low income':
      return 'This is a low-income country — on average, less than $1,135 per person per year. Such countries usually face high poverty and limited access to education and healthcare.'
    case 'Lower middle income':
      return 'The income in this country ranges from $1,136 to $4,465 per person per year. This indicates a developing economy with limited access to finance and infrastructure.'
    case 'Upper middle income':
      return 'The average income in this country is from $4,466 to $13,845 per person per year. This means the country is actively developing but has not yet reached the level of developed states.'
    case 'High income':
      return 'This country is classified as high-income — the average annual income per capita exceeds $13,846. This indicates a stable economy, high standard of living, and developed infrastructure.'
    default:
      return 'Income information is not classified.'
  }
}

export function explainLendingType(type: string): string {
  switch (type) {
    case 'IBRD':
      return 'The country receives loans from the International Bank for Reconstruction and Development (IBRD). This means its economy is stable enough to take standard loans on market or near-market terms.'
    case 'IDA':
      return 'The country receives concessional loans from the International Development Association (IDA). Such loans are granted to the poorest countries on very favorable terms with low interest rates.'
    case 'Blend':
      return 'The country can receive funding from both IBRD and IDA. This means it is in a transitional stage: poor, but showing signs of stability.'
    case 'Not classified':
      return 'The lending type is not specified or the country does not participate in World Bank lending programs.'
    default:
      return 'No data on lending type.'
  }
}

export function explainGini(gini: number | undefined): string {
  if (gini === undefined || gini === null) {
    return 'No data on income inequality.'
  }

  if (gini < 20) {
    return `${gini}% — very low income inequality. Most people earn roughly the same.`
  } else if (gini < 35) {
    return `${gini}% — low income inequality. Income distribution is fairly even.`
  } else if (gini < 45) {
    return `${gini}% — moderate income inequality. Some disparity in income exists.`
  } else if (gini < 55) {
    return `${gini}% — high income inequality. Wealth is concentrated in the hands of fewer people.`
  } else {
    return `${gini}% — very high income inequality. Most wealth is held by a very small part of the population.`
  }
}

export function explainPopulationDensity(density: number | undefined): string {
  if (density === undefined || density === null || isNaN(density)) {
    return 'No data on population density.'
  }

  const fixedDensity = parseFloat(density.toFixed(1))

  if (fixedDensity <= 50) {
    return `${fixedDensity} people per km² — very low population density. The country has vast territories with few in habitants.`
  } else if (fixedDensity <= 150) {
    return `${fixedDensity} people per km² — low population density. The country has a lot of space compared to its population.`
  } else if (fixedDensity <= 400) {
    return `${fixedDensity} people per km² — medium population density. The country is more evenly populated.`
  } else if (fixedDensity <= 1000) {
    return `${fixedDensity} people per km² — high population density. The country is compact and heavily populated.`
  } else {
    return `${fixedDensity} people per km² — very high population density. The country is extremely crowded.`
  }
}
