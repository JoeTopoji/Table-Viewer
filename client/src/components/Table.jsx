import { useContext } from 'react'
import { DataContext } from './DataContext'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Pagination from './Pagination'

const DataTable = () => {
  const { data, handleSubmission } = useContext(DataContext)
  return (
    <main className='p-2 lg:px-32'>
      <Pagination /> <br />
      <span className='badge badge-lg my-2'>
        {data.num_of_documents} documents
      </span>
      <form onSubmit={handleSubmission}>
        <button type='submit' className='btn btn-block mb-1'>
          Search
        </button>
        <table className='table table-xs table-zebra-zebra table-fixed'>
          <TableHeader />
          <TableBody />
        </table>
      </form>
    </main>
  )
}

export default DataTable
