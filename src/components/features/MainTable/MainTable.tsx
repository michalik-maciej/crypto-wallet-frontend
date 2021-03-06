import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import { IFormattedCoinData } from '../../views/HomePage/HomePage.helper'

interface IMainTableProps {
  inputData: IFormattedCoinData[]
  searchId: string
}

export default function MainTable({ inputData, searchId }: IMainTableProps) {
  const navigate = useNavigate()
  const columnHeaders = [
    { id: 'rank', caption: '#' },
    { id: 'name', caption: 'Name' },
    { id: 'price', caption: 'Price' },
    { id: 'priceChange', caption: '24h %' },
    { id: 'marketCap', caption: 'Market Cap' }
  ]

  let tableData = inputData
  if (searchId) {
    tableData = inputData.filter((item) => item.coinId === searchId)
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columnHeaders.map(({ id, caption }) => (
            <TableCell
              key={id}
              sx={{
                fontWeight: 600,
                ...(id === 'marketCap' && {
                  display: { xs: 'none', sm: 'table-cell' }
                })
              }}
            >
              {caption}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map(
          ({ coinId, rank, name, price, priceChange, marketCap }) => (
            <TableRow
              key={coinId}
              onClick={() => navigate(`/coins/${coinId}`)}
              hover
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              <TableCell>{rank.data}</TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    src={name.data.image}
                    sx={{ height: '1.5rem', width: '1.5rem' }}
                    alt={`${name.data.name} logo`}
                  />
                  <Box
                    sx={{
                      width: '40%',
                      display: { xs: 'none', md: 'table-cell' }
                    }}
                  >
                    {name.data.name}
                  </Box>
                  <Box sx={{ fontWeight: 600 }}>{name.data.symbol}</Box>
                </Stack>
              </TableCell>
              <TableCell>{price.data}</TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: priceChange.data.positive
                    ? 'success.main'
                    : 'error.main'
                }}
              >
                {priceChange.data.label}
              </TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                {marketCap.data}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}
