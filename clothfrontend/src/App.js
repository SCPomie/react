import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './layout.js/Home';
import NavBar from './layout.js/Nav';
import Category from './layout.js/Category';
import IndividualCat from './layout.js/IndividualCat';
import Order from './layout.js/Order';
import Customer from './layout.js/Customer';
import OrderByStatus from './layout.js/OrdersByStatus';
import Individualcust from './layout.js/IndividualCust';
import DetailedOrder from './layout.js/Detailed_Order';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/category" element={<Category/>}/>
          <Route path="/category/:id" element={<IndividualCat/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/order/:status" element={<OrderByStatus/>}/>
          <Route path="/customer" element={<Customer/>}/>
          <Route path="/customer/:id" element={<Individualcust/>}/>
          <Route path="/order/detail/:id" element={<DetailedOrder />} />

          
      </Routes>
    </div>

  );
}

export default App;
