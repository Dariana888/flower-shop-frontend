import { useEffect, useState } from "react";
import api from "../api/api";

export default function Products() {
    const [bouquets, setBouquets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBouquets();
    }, []);

    const fetchBouquets = async () => {
        try {
            const response = await api.get("/bouquets/");
            setBouquets(response.data);
        } catch (error) {
            console.error("Error loading bouquets:", error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (bouquetId) => {
        try {
            await api.post("/cart/add", null, {
                params: {
                    bouquet_id: bouquetId,
                    quantity: 1,
                },
            });

            alert("🌸 Product added to cart!");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Failed to add product to cart."
            );
        }
    };

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading flowers...</h2>
            </div>
        );
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>🌺 Our Bouquets</h1>

            {bouquets.length === 0 ? (
                <p>No bouquets available.</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "20px",
                        marginTop: "20px",
                    }}
                >
                    {bouquets.map((bouquet) => (
                        <div
                            key={bouquet.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "20px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                        >
                            {bouquet.image_url && (
                                <img
                                    src={bouquet.image_url}
                                    alt={bouquet.name}
                                    style={{
                                        width: "100%",
                                        height: "220px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginBottom: "15px",
                                    }}
                                />
                            )}

                            <h2>{bouquet.name}</h2>

                            <p>{bouquet.description}</p>

                            <p>
                                <strong>Price:</strong>{" "}
                                {Number(bouquet.price).toFixed(2)} MDL
                            </p>

                            <button
                                onClick={() => addToCart(bouquet.id)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "#ff69b4",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                }}
                            >
                                🛒 Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}