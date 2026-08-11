import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

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
import OrderDetails from "./pages/OrderDetails";

// ADMIN PAGES
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import AdminStock from "./pages/AdminStock";
import AdminBouquets from "./pages/AdminBouquets";

export default function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* PUBLIC */}

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

                {/* CHECKOUT */}

                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />

                {/* USER */}

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-orders"
                    element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders/:id"
                    element={
                        <ProtectedRoute>
                            <OrderDetails />
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminOrders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/orders/:id"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminOrderDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/stock"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminStock />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/bouquets"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminBouquets />
                        </ProtectedRoute>
                    }
                />

                {/* 404 */}

                <Route
                    path="*"
                    element={
                        <div
                            style={{
                                padding: "30px",
                                textAlign: "center"
                            }}
                        >
                            <h1>404</h1>
                            <h2>❌ Page not found</h2>
                        </div>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}