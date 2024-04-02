import { useContext } from 'react'
import { DataContext } from './DataContext' // Import DataContext

const TableHeader = () => {
  const { data, filters, handleFilterChange, setFilters, setSearchParams } =
    useContext(DataContext)

  return (
    <thead>
      <tr className='text-center text-xl uppercase'>
        {data.colls.map((col) => (
          <th key={col}>{col}</th>
        ))}
      </tr>
      <tr>
        {data.colls.map((col) => (
          <th key={col}>
            <label className='input input-sm input-bordered w-full flex items-center gap-2'>
              <input
                className='grow'
                type='text'
                name={col} // Use column name as input name
                value={filters[col] || ''} // Pre-fill filter input with existing filter value
                onChange={handleFilterChange}
              />
              <button
                type='button'
                // className='border border-yellow-500 px-2'
                onClick={() => {
                  setFilters({ ...filters, [col]: '' })
                  const updatedParams = new URLSearchParams({
                    ...filters,
                    page: 1,
                  })
                  setSearchParams(updatedParams)
                }}
              >
                x
              </button>
            </label>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
