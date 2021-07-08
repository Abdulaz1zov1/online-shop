import React, {useContext} from 'react'
import { Switch, Route} from 'react-router-dom'
import Products from './products/Products'
import Cart from './cart/Cart'
import Login from './auth/Login'
import Register from './auth/Register'
import Categories from './categories/Categories'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import NotFound from './utils/notFound/NotFound'
import DetailProduct from './detailProduct/DetailProduct'
import {GlobalState} from '../../globalState'
import CreateProduct from './createProduct/CreateProduct'

export default function Pages() {
    const state=useContext(GlobalState);
    const [isLogged]=state.userApi.isLogged;
    const [isAdmin]=state.userApi.isAdmin
    return (
        <Switch>
            <Route path="/" exact component={Products}/>

            <Route path="/login" exact component={isLogged? NotFound : Login}/>
            <Route path="/register" exact component={isLogged? NotFound :Register}/>

            <Route path="/detail/:id" exact component={DetailProduct}/>
            <Route path="/create_product" exact component={isAdmin? CreateProduct :NotFound}/>
            <Route path="/edit_product/:id" exact component={isAdmin? CreateProduct :NotFound}/>

            <Route path="/category" exact component={isAdmin? Categories :NotFound}/>

            <Route path="/history" exact component={isLogged? OrderHistory : NotFound }/>
            <Route path="/history/:id" exact component={isLogged? OrderDetails : NotFound }/>
            <Route path="/cart" exact component={Cart}/>

            <Route path="*" exact component={NotFound}/>
        </Switch>
    )
}
