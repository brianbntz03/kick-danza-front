import { BrowserRouter as Router } from 'react-router-dom'
import Aside from './components/Aside'
import Content from './components/Content'
import Footer from './components/Footer'
import Headers from './components/Headers'

export default function App() {
  return (
    <Router>
      <div className="wrapper">
        <Headers/>
        <Aside/>
        <Content/>
        <Footer/>
      </div>
    </Router>
  )
}
