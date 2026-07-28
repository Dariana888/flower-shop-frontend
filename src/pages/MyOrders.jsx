import { useEffect, useState } from "react";
import api, { downloadFile } from "../api/api";

export default function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");



    useEffect(() => {

        loadOrders();

    }, []);




    const loadOrders = async () => {

        try {

            setLoading(true);

            setError("");

            setMessage("");


            const response = await api.get(
                "/orders/my-orders"
            );


            setOrders(
                response.data
            );


        } catch (error) {


            console.error(
                "MY ORDERS ERROR:",
                error
            );


            setError(

                error.response?.data?.detail ||

                "Cannot load orders"

            );


        } finally {


            setLoading(false);


        }

    };






    const invoice = async (id) => {


        try {


            await downloadFile(
                `/orders/${id}/invoice`
            );


        } catch (error) {


            console.error(
                "INVOICE ERROR:",
                error
            );


            setError(

                error.response?.data?.detail ||

                "Invoice download failed"

            );


        }


    };







    const cancelOrder = async (id) => {


        if (!window.confirm("Cancel this order?"))

            return;




        try {


            await api.put(
                `/orders/${id}/cancel`
            );


            setMessage(
                "✅ Order cancelled successfully."
            );


            loadOrders();



        } catch (error) {


            setError(

                error.response?.data?.detail ||

                "Cancel failed"

            );


        }


    };








    if (loading) {


        return (

            <div style={{padding:"30px"}}>

                <h2>
                    Loading orders...
                </h2>

            </div>

        );


    }







    return (


        <div style={{padding:"30px"}}>


            <h1>
                📦 My Orders
            </h1>





            {
                message &&

                <p
                    style={{

                        color:"green",

                        fontWeight:"bold",

                        marginBottom:"15px"

                    }}
                >

                    {message}

                </p>
            }





            {
                error &&

                <p
                    style={{

                        color:"red",

                        fontWeight:"bold",

                        marginBottom:"15px"

                    }}
                >

                    {error}

                </p>
            }








            {
                orders.length === 0

                ?

                <p>
                    You have no orders yet.
                </p>


                :


                orders.map(order => (


                    <div

                        key={order.id}

                        style={{

                            border:"1px solid #ddd",

                            borderRadius:"12px",

                            padding:"20px",

                            marginBottom:"20px",

                            background:"#fff"

                        }}

                    >





                        <h2>
                            📦 Order #{order.id}
                        </h2>






                        <p>

                            📅 Created:

                            {" "}

                            {

                                order.created_at

                                ?

                                new Date(
                                    order.created_at
                                ).toLocaleString()

                                :

                                "-"

                            }

                        </p>







                        <p>

                            🚚 Delivery:

                            {" "}

                            <b>
                                {order.delivery_type}
                            </b>

                        </p>








                        <p>

                            📍 Address:

                            {" "}

                            {

                                order.address

                                ?

                                order.address

                                :

                                "Pickup"

                            }

                        </p>







                        <p>

                            📞 Phone:

                            {" "}

                            {

                                order.phone

                                ?

                                order.phone

                                :

                                "-"

                            }

                        </p>








                        <p>

                            💰 Total:

                            {" "}

                            <b>

                                {
                                    Number(
                                        order.total
                                    ).toFixed(2)
                                }

                                {" "}MDL

                            </b>


                        </p>







                        <p>

                            💳 Payment:

                            {" "}


                            <b

                                style={{

                                    color:

                                    order.payment_status === "paid"

                                    ?

                                    "green"

                                    :

                                    order.payment_status === "failed"

                                    ?

                                    "red"

                                    :

                                    "orange"

                                }}

                            >

                                {order.payment_status}

                            </b>


                        </p>








                        <p>

                            📦 Status:

                            {" "}


                            <b

                                style={{

                                    color:

                                    order.status === "completed"

                                    ?

                                    "green"

                                    :

                                    order.status === "cancelled"

                                    ?

                                    "red"

                                    :

                                    "orange"

                                }}

                            >

                                {order.status}

                            </b>


                        </p>









                        {
                            order.payment_status === "paid" &&


                            <button

                                onClick={() =>
                                    invoice(order.id)
                                }

                                style={{

                                    padding:"10px",

                                    marginRight:"10px",

                                    cursor:"pointer"

                                }}

                            >

                                📄 Download Invoice

                            </button>

                        }








                        {

                            order.status !== "completed"

                            &&

                            order.status !== "cancelled"

                            &&


                            <button

                                onClick={() =>
                                    cancelOrder(order.id)
                                }


                                style={{

                                    padding:"10px",

                                    cursor:"pointer",

                                    background:"#ffd6d6",

                                    border:"1px solid #cc0000",

                                    borderRadius:"6px"

                                }}

                            >

                                ❌ Cancel Order

                            </button>


                        }







                    </div>


                ))

            }





        </div>


    );


}