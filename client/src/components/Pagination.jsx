import { useContext } from 'react'
import { DataContext } from './DataContext'

const Pagination = () => {
  const { data, goToPage, rowsPerPage, handleRowsPerPageChange } =
    useContext(DataContext)
  return (
    <>
      <div className='join w-32'>
        <button
          className={`join-item btn btn-sm ${
            data.page === 1 && 'btn-disabled'
          }`}
          onClick={() => goToPage(data.page - 1)}
        >
          «
        </button>
        <button className='join-item btn btn-sm '>
          {data.page} / {data.num_of_pages}
        </button>
        <button
          className={`join-item btn btn-sm ${
            data.page === data.num_of_pages && 'btn-disabled'
          }`}
          onClick={() => {
            console.log(data.page + 1)
            goToPage(data.page + 1)
          }}
        >
          »
        </button>
      </div>
      <form
        className='inline mx-2'
        onSubmit={(e) => {
          e.preventDefault()
          const newPage = parseInt(e.target.pageInput.value)
          goToPage(newPage)
        }}
      >
        <label className='mx-2 text-sm'>select page:</label>
        <input
          type='text'
          name='pageInput'
          className='input input-bordered w-12 h-8 px-1 mx-auto'
          defaultValue={data.page}
        />
      </form>
      <select
        value={rowsPerPage}
        onChange={handleRowsPerPageChange}
        className='input input-bordered h-8'
      >
        <option value='10'>10 documents per Page</option>
        <option value='15'>15 documents per Page</option>
        <option value='20' selected>
          20 documents per Page
        </option>
        <option value='25'>25 documents per Page</option>
        <option value='30'>30 documents per Page</option>
        <option value='40'>40 documents per Page</option>
        <option value='50'>50 documents per Page</option>
        <option value='100'>100 documents per Page</option>
      </select>
    </>
  )
}

export default Pagination
