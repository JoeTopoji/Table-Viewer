import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom' // For query string manipulation

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    rows: [],
    colls: [],
    num_of_pages: 0,
    page: 1,
  })
  const [filters, setFilters] = useState({}) // State for filter values
  const [rowsPerPage, setRowsPerPage] = useState(20) // State for rows per page
  const [searchParams, setSearchParams] = useSearchParams() // Hook for query string
  const [queryParams, setQueryParams] = useState(searchParams)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          ...filters, // Include all filter parameters
          page: searchParams.get('page') || 1, // Get page from query string or default to 1
          limit: rowsPerPage, // Add limit parameter for rows per page
        })
        const response = await axios.get('/api/data', { params })
        setData({ ...response.data })
        // setData(fakeData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [queryParams, rowsPerPage]) // Re-fetch on filter, query string, or rows per page change

  const handleSubmission = (e) => {
    e.preventDefault()
    setQueryParams({ ...searchParams, page: 1 })
  }

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > data.num_of_pages || isNaN(pageNumber)) {
      return // Handle invalid page numbers gracefully (optional)
    }

    const updatedParams = new URLSearchParams({ ...filters, page: pageNumber })
    setSearchParams(updatedParams)
    setQueryParams(updatedParams)
  }

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value)
    setRowsPerPage(newRowsPerPage)
    // Reset page to 1 and update query string with limit
    const updatedParams = new URLSearchParams({
      ...filters,
      page: 1,
      limit: newRowsPerPage,
    })
    setSearchParams(updatedParams)
  }

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value })
    const updatedParams = new URLSearchParams({ ...filters, page: 1 }) // Reset page to 1 on filter change
    setSearchParams(updatedParams)
  }

  const value = {
    data,
    filters,
    setFilters,
    goToPage,
    handleRowsPerPageChange,
    handleFilterChange,
    handleSubmission,
    setSearchParams,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export { DataContext, DataProvider }
