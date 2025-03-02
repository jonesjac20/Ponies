import './App.css'
import { Table  } from 'react-bootstrap';

function App() {

  useEffect(() => {
    
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Racing the Ponies!</h1>
      </header>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Age</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Secretariat</td>
              <td>5</td>
              <td>1200</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Seabiscuit</td>
              <td>7</td>
              <td>1100</td>
            </tr>
            </tbody>
        </Table>
      </div>
    </div>
  )
}

export default App
