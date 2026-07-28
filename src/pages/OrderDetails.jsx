import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function OrderDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    useEffect(() => {

        loadOrder();

    }, [id]);



    const loadOrder = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                `/orders/${id}`
            );

            setOrder(response.data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to load order."
            );

        } finally {

            setLoading(false);

        }

    };



    const downloadInvoice = () => {

        window.open(
            `${api.defaults.baseURL}/orders/${id}/invoice`,
            "_blank"
        );

    };



    if (loading) {

        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading order...</h2>
            </div>
        );

    }



    if (error) {

        return (
            <div style={{ padding: "30px" }}>

                <button
                    onClick={() => navigate("/my-orders")}
                >
                    ⬅ Back
                </button>

                <h2>{error}</h2>

            </div>
        );

    }



    return (

        <div style={{ padding: "30px" }}>

            <button
                onClick={() => navigate("/my-orders")}
            >
                ⬅ Back
            </button>

            <h1>
                📦 Order #{order.id}
            </h1>

            <p>
                📅 Created:{" "}
                {new Date(order.created_at).toLocaleString()}
            </p>

            <p>
                🚚 Delivery: {order.delivery_type}
            </p>

            <p>
                📍 Address: {order.address || "Pickup"}
            </p>

            <p>
                💰 Total: {Number(order.total).toFixed(2)} MDL
            </p>

            <p>
                💳 Payment:{" "}
                <b
                    style={{
                        color:
                            order.payment_status === "paid"
                                ? "green"
                                : "red",
                    }}
                >
                    {order.payment_status}
                </b>
            </p>

            <p>
                📦 Status:{" "}
                <b
                    style={{
                        color:
                            order.status === "completed"
                                ? "green"
                                : order.status === "cancelled"
                                ? "red"
                                : "orange",
                    }}
                >
                    {order.status}
                </b>
            </p>

            <hr />

            <h2>🌸 Products</h2>

            {order.items.length === 0 ? (

                <p>No products.</p>

            ) : (

                order.items.map((item, index) => (

                    <div
                        key={index}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "15px",
                            marginBottom: "15px",
                        }}
                    >

                        <p>
                            🌺 Bouquet ID: {item.bouquet_id}
                        </p>

                        <p>
                            Quantity: {item.quantity}
                        </p>

                        <p>
                            Price: {Number(item.price).toFixed(2)} MDL
                        </p>

                    </div>

                ))

            )}

            {order.payment_status === "paid" && (

                <button
                    onClick={downloadInvoice}
                    style={{
                        marginTop: "20px",
                        padding: "10px 15px",
                    }}
                >
                    📄 Download Invoice
                </button>

            )}

        </div>

    );

}