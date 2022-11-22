import {Routes,Route} from 'react-router-dom'
import AppContainer from '../AppContainer';
import DashBoard from '../views/dashboard/DashBoard'
import ColdRooms from '../views/coldroom/ColdRooms'
import ColdRoomLists from "../views/coldroom/ColdRoomList";

import Employees from '../views/employee/Employees'

import NotFound from '../Notfound';
const Router = () =>{
  return <Routes>
  <Route path='/' element={<AppContainer />}>
    <Route path='products' element={<Products />}>  
    <Route path='list' element={<ProductList />} />  
    <Route path=':prId/detail' element={<ProductsDetail />} />    
    </Route>
    <Route path='orders' element={<Orders />}>  
    <Route path='list' element={<OrderList />} />
    <Route path='items' element={<OrderDetail />} />      
    </Route>
    <Route path='dash-board' element={<DashBoard />}>        
    </Route>
    {/* <Route path='cold-rooms' element={<ColdRooms />}>
    <Route path='list' element={<ColdRoomLists />} />
    <Route path=':crId/products' element={<ColdRoomProducts />} />
    <Route path=':crId/product/:proId/prduct-detail/:amount' element={<ProductDetail />} />
     </Route> */}
     <Route path='farmers' element={<Farmers />}>
     <Route path='list' element={<FarmersList />} />
    <Route path=':faId/product-history/:tp' element={<ProductHistory />} />
    <Route path=':faId/rent-fee/:tr' element={<RentFee />} />
    <Route path=':faId/balance/:tb' element={<BalanceHistory />} />
     </Route>
     <Route path='wholesalers' element={<WholeSalers />}>
     <Route path='list' element={<WholeSalerList />} />
     <Route path=':whId/order-history' element={<OrderHistory />} />
      </Route>
     <Route path='employees' element={<Employees />}>
     </Route>
     <Route path='/revenue' element={<Revenue />}>
     </Route>
     <Route path='sales' element={<Saleses />}>
     </Route>
     <Route path='/account' element={<Account />}>
     </Route>
     </Route>
     <Route path='/login' element={<LoginPage />} />
     <Route path='/forgot-password' element={<ForgotPassword />} />
     
     <Route path="*" element={<NotFound />}/>
  </Routes>
  
}
export default Router