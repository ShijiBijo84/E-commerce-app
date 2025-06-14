import { BrowserRouter, Route, Routes } from "react-router-dom"
import ItemList from "./components/user/ItemList"
import AdminDashBoard from "./components/admin/AdminDashBoard"
import ActionPage from "./components/user/ActionPage"
import LayOut from "./components/ui/LayOut"
import CartView from "./components/user/CartView"

import RecipeApp from "recipes-remote/RecipesApp"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<LayOut />} >
          <Route index element={<ItemList />} />
          <Route path='/home' element={<ItemList />} />
          <Route path='/home/cart' element={<CartView />} />
          <Route path='/recipes/*' element={

            <RecipeApp />

          } />
          <Route path='/:action' element={<ActionPage />} />
          <Route path='/:admin/items' element={<AdminDashBoard />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
