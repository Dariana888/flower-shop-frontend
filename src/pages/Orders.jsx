import { useEffect, useState } from "react";
import api from "../api/api";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadOrders();

    }, []);



    const loadOrders = async () => {

        try {

            const response = await api.get(
                "/orders/my-orders"
            );

            setOrders(response.data);


        } catch (error) {

            console.error(
                "Orders error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };



    const downloadInvoice = async (orderId) => {

        try {

            const response = await api.get(
                `/orders/${orderId}/invoice`,
                {
                    responseType: "blob"
                }
            );


            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );


            const link = document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                `invoice_${orderId}.pdf`
            );


            document.body.appendChild(link);

            link.click();


            link.remove();


        } catch(error) {

            console.error(
                "Invoice error:",
                error
            );

        }

    };



    if (loading) {

        return (
            <div style={{padding:"30px"}}>
                <h2>Loading orders...</h2>
            </div>
        );

    }



    return (

        <div
            style={{
                padding:"30px"
            }}
        >

            <h1>
                📦 My Orders
            </h1>



            {
                orders.length === 0 ? (

                    <p>
                        You don't have any orders yet.
                    </p>

                ) : (


                    orders.map((order)=>(


                        <div
                            key={order.id}
                            style={{
                                border:"1px solid #ddd",
                                borderRadius:"12px",
                                padding:"20px",
                                marginBottom:"20px"
                            }}
                        >


                            <h2>
                                Order #{order.id}
                            </h2>


                            <p>
                                <b>Status:</b>{" "}
                                {order.status}
                            </p>



                            <p>
                                <b>Payment:</b>{" "}
                                {order.payment_status}
                            </p>



                            <p>
                                <b>Total:</b>{" "}
                                {Number(order.total).toFixed(2)}
                                {" "}MDL
                            </p>



                            <p>
                                <b>Type:</b>{" "}
                                {
                                    order.delivery_type === "delivery"
                                    ? "🚚 Delivery"
                                    : "🏪 Pickup"
                                }
                            </p>



                            {
                                order.address && (

                                    <p>
                                        <b>Address:</b>{" "}
                                        {order.address}
                                    </p>

                                )
                            }



                            <p>
                                <b>Date:</b>{" "}
                                {
                                    new Date(
                                        order.created_at
                                    ).toLocaleDateString()
                                }
                            </p>




                            <button

                                onClick={() =>
                                    downloadInvoice(order.id)
                                }

                                style={{
                                    padding:"10px 20px",
                                    borderRadius:"8px",
                                    cursor:"pointer"
                                }}

                            >

                                📄 Download Invoice

                            </button>



                        </div>


                    ))

                )

            }


        </div>

    );

}