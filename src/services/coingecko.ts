import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coingeckoApi = createApi({
  reducerPath: 'coingeckoApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.coingecko.com/api/v3/` }),
  endpoints: (builder) => ({
    getPing: builder.query({
      query: () => `ping`
    }),
    getCoinsMarket: builder.query({
      query: () =>
        `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    }),
    getCurrentPrice: builder.query({
      query: (coinIds) => `simple/price?ids=${coinIds}&vs_currencies=usd`
    }),
    getCoinChart: builder.query({
      query: (coinId) =>
        `coins/${coinId}/market_chart?vs_currency=usd&days=90&interval=daily`
    })
  })
})

export const {
  useGetPingQuery,
  useGetCoinsMarketQuery,
  useGetCurrentPriceQuery,
  useGetCoinChartQuery
} = coingeckoApi
