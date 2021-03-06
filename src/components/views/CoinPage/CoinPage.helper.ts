/* eslint-disable camelcase */
import {
  IChartQueryResponse,
  IMarketQueryResponse
} from '../../../services/coingecko.types'
import { timestampToDate, formatToUSD } from '../../../utils/utils'
import { IFormProps } from './CoinPage.form'
import { IMarketProps } from './CoinPage.market'

// import { IChartProps } from './CoinPage.chart'

export interface IMarketDataFormatterProps {
  id: string
  marketProps: IMarketProps
  formProps: IFormProps
}

export function marketDataFormatter({
  id,
  name,
  image,
  market_cap_rank,
  current_price,
  price_change_percentage_24h,
  symbol
}: IMarketQueryResponse): IMarketDataFormatterProps {
  return {
    id,
    marketProps: {
      name,
      symbol: symbol.toUpperCase(),
      logo: image,
      rank: `#${market_cap_rank}`,
      price: formatToUSD(current_price),
      priceChange: {
        label: `${price_change_percentage_24h.toFixed(2)}%`,
        positive: price_change_percentage_24h >= 0
      }
    },
    formProps: {
      originalId: id,
      price: current_price,
      name,
      symbol: symbol.toUpperCase(),
      logo: image
    }
  }
}

export function chartDataFormatter(rawChartData: IChartQueryResponse): any {
  const headers = ['time', 'open', 'high', 'low', 'close']
  const chartData = rawChartData.map((datapoint) =>
    Object.fromEntries(
      headers.map((header, i) => {
        if (header === 'time') {
          return [headers[i], timestampToDate(datapoint[i])]
        }
        return [headers[i], datapoint[i]]
      })
    )
  )

  return chartData
}
