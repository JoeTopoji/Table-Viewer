import { useContext } from 'react'
import { DataContext } from './DataContext'

const TableBody = () => {
  const {
    data: { rows, colls },
  } = useContext(DataContext)

  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row._id || Math.random()} className='h-4'>
          {colls.map((col) => (
            <td
              key={col}
              className='white-space-nowrap overflow-hidden text-ellipsis'
            >
              {row[col]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
