import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DataProvider } from './components/DataContext'
import Table from './components/Table'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <DataProvider>
        <Table />
      </DataProvider>
    ),
  },
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
