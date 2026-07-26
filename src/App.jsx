import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";



import Navbar from "./components/Navbar";



// PUBLIC PAGES

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";



// USER PAGES

import Orders from "./pages/Orders";
import MyOrders from "./pages/MyOrders";



// ADMIN PAGES

import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import AdminStock from "./pages/AdminStock";





export default function App(){


    return (


        <BrowserRouter>


            <Navbar />


            <Routes>



                {/* =====================
                    PUBLIC
                ====================== */}



                <Route

                    path="/"

                    element={<Home />}

                />



                <Route

                    path="/products"

                    element={<Products />}

                />



                <Route

                    path="/cart"

                    element={<Cart />}

                />



                <Route

                    path="/login"

                    element={<Login />}

                />



                <Route

                    path="/register"

                    element={<Register />}

                />





                {/* =====================
                    CHECKOUT
                ====================== */}



                <Route

                    path="/checkout"

                    element={<Checkout />}

                />








                {/* =====================
                    USER
                ====================== */}



                <Route

                    path="/orders"

                    element={<Orders />}

                />



                <Route

                    path="/my-orders"

                    element={<MyOrders />}

                />









                {/* =====================
                    ADMIN
                ====================== */}




                <Route

                    path="/admin/dashboard"

                    element={<AdminDashboard />}

                />





                <Route

                    path="/admin/orders"

                    element={<AdminOrders />}

                />





                <Route

                    path="/admin/orders/:id"

                    element={<AdminOrderDetails />}

                />





                <Route

                    path="/admin/stock"

                    element={<AdminStock />}

                />









                {/* =====================
                    404
                ====================== */}



                <Route

                    path="*"

                    element={


                        <div

                            style={{

                                padding:"30px"

                            }}

                        >

                            <h2>

                                ❌ Page not found

                            </h2>


                        </div>


                    }

                />



            </Routes>



        </BrowserRouter>


    );

}