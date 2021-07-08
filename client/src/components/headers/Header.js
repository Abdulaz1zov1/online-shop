import React, { useContext, useState} from 'react'
import {GlobalState} from '../../globalState';
import Menu from './icon/bars-solid (1).svg'
import Close from './icon/times-solid.svg'
import Cart from './icon/shopping-cart-solid.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function Header() {
    const state=useContext(GlobalState)
    const [isLogged]=state.userApi.isLogged;
    const [isAdmin]=state.userApi.isAdmin;
    const [cart]=state.userApi.cart;
    const [menu, setMenu] = useState(false)

    const logoutUser = async() => {
       await axios.get('/user/logout')

       localStorage.removeItem('firstLogin');
       window.location.href="/";
    }

    const adminRouter = ()=>{
        return(
            <>
            <li><Link to="/create_product">Create Products</Link></li>
            <li><Link to="/category">Categoires</Link></li>
            </>
        )
    }

    const loggedRouter = ()=>{
        return(
            <>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    const styleMenu ={
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30"/>
            </div>

            <div className="logo">
                <h1>
                <Link to='/'>{isAdmin ? 'Admin':'Devat Shop'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to='/'>{isAdmin ? 'Products':'Shop'}</Link></li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() :  <li><Link to='/login'>Login & Register</Link></li>
                }
               
                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu"/>
                </li>
            </ul>

          {
                isAdmin ? '' 
                :  <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to='/cart'>
                    <img src={Cart} alt="" width="30"/>
                    </Link>
                   </div>
          }
        </header>
    )
}
