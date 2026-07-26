import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Cart() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            const response = await api.get("/cart/");

            setItems(response.data.items);
            setTotal(response.data.total);
        } catch (error) {
            console.error("Cart error:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (cartId) => {
        try {
            await api.delete(`/cart/${cartId}`);

            getCart();
        } catch (error) {
            console.error("Remove error:", error);
            alert("Failed to remove item.");
        }
    };

    const clearCart = async () => {
        if (!window.confirm("Clear your cart?")) return;

        try {
            await api.delete("/cart/clear");

            setItems([]);
            setTotal(0);

            alert("Cart cleared.");
        } catch (error) {
            console.error(error);
            alert("Failed to clear cart.");
        }
    };

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading cart...</h2>
            </div>
        );
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>🛒 My Cart</h1>

            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {items.map((item) => (
                        <div
                            key={item.cart_id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "20px",
                                marginBottom: "20px",
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />

                            <h2>{item.name}</h2>

                            <p>
                                <strong>Price:</strong>{" "}
                                {item.price.toFixed(2)} MDL
                            </p>

                            <p>
                                <strong>Quantity:</strong> {item.quantity}
                            </p>

                            <p>
                                <strong>Subtotal:</strong>{" "}
                                {item.subtotal.toFixed(2)} MDL
                            </p>

                            <button
                                onClick={() => removeItem(item.cart_id)}
                            >
                                ❌ Remove
                            </button>
                        </div>
                    ))}

                    <hr />

                    <h2>Total: {total.toFixed(2)} MDL</h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "20px",
                        }}
                    >
                        <button onClick={clearCart}>
                            🗑️ Clear Cart
                        </button>

                        <button
                            onClick={() => navigate("/checkout")}
                        >
                            ✅ Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}