import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../pages/Home';
import MyFlights from '../pages/MyFlights';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-flights" element={<MyFlights />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
