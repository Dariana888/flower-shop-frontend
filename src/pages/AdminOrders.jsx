import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";


export default function AdminOrders() {


    const navigate = useNavigate();


    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);





    useEffect(() => {

        loadOrders();

    }, []);







    const loadOrders = async () => {


        try {


            const response = await api.get(
                "/admin/orders"
            );


            setOrders(response.data);



        } catch(error) {


            console.error(
                "ADMIN ORDERS ERROR:",
                error
            );


        } finally {


            setLoading(false);


        }

    };









    const updateStatus = async (

        id,

        status

    ) => {


        try {


            await api.put(

                `/admin/orders/${id}/status`,

                null,

                {

                    params: {

                        status

                    }

                }

            );


            loadOrders();



        } catch(error) {


            alert(

                error.response?.data?.detail ||

                "Status update failed"

            );


        }

    };









    const updatePayment = async (

        id,

        payment_status

    ) => {


        try {


            await api.put(

                `/admin/orders/${id}/payment-status`,

                null,

                {

                    params: {

                        payment_status

                    }

                }

            );


            loadOrders();



        } catch(error) {


            alert(

                error.response?.data?.detail ||

                "Payment update failed"

            );


        }


    };









    const deleteOrder = async(id)=>{


        const confirmDelete = window.confirm(

            "Delete order permanently?"

        );



        if(!confirmDelete)

            return;





        try{


            await api.delete(

                `/admin/orders/${id}`

            );



            loadOrders();



        }catch(error){


            console.error(error);


            alert(

                "Delete failed"

            );


        }


    };









    const downloadInvoice = (id)=>{


        window.open(

            `${api.defaults.baseURL}/orders/${id}/invoice`,

            "_blank"

        );


    };









    if(loading){


        return (

            <div style={{padding:"30px"}}>

                <h2>
                    Loading orders...
                </h2>

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
                🛠 Admin Orders
            </h1>





            {
                orders.length === 0 ?


                (

                    <p>
                        No orders found.
                    </p>

                )


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

                            👤 Customer:

                            {" "}

                            {order.user_email}

                        </p>





                        <p>

                            💰 Total:

                            {" "}

                            {order.total.toFixed(2)}

                            {" "}

                            MDL

                        </p>





                        <p>

                            🚚 Delivery:

                            {" "}

                            {order.delivery_type}

                        </p>





                        <p>

                            📍 Address:

                            {" "}

                            {order.address || "Pickup"}

                        </p>





                        <p>

                            📅 Created:

                            {" "}

                            {
                                new Date(
                                    order.created_at
                                )
                                .toLocaleString()
                            }

                        </p>







                        <p>

                            Payment:

                            {" "}


                            <b

                                style={{

                                    color:

                                    order.payment_status === "paid"

                                    ?

                                    "green"

                                    :

                                    "red"

                                }}

                            >

                                {order.payment_status}

                            </b>


                        </p>







                        <p>

                            Status:

                            {" "}


                            <b

                            style={{

                                color:

                                order.status==="completed"

                                ?

                                "green"

                                :

                                order.status==="cancelled"

                                ?

                                "red"

                                :

                                "orange"

                            }}

                            >

                                {order.status}

                            </b>


                        </p>










                        <select


                            value={order.status}


                            onChange={(e)=>

                                updateStatus(

                                    order.id,

                                    e.target.value

                                )

                            }


                            style={{

                                padding:"10px",

                                marginRight:"10px"

                            }}


                        >


                            <option value="pending">
                                Pending
                            </option>


                            <option value="processing">
                                Processing
                            </option>


                            <option value="shipped">
                                Shipped
                            </option>


                            <option value="completed">
                                Completed
                            </option>


                            <option value="cancelled">
                                Cancelled
                            </option>


                        </select>









                        <select


                            value={order.payment_status}


                            onChange={(e)=>

                                updatePayment(

                                    order.id,

                                    e.target.value

                                )

                            }


                            style={{

                                padding:"10px",

                                marginRight:"10px"

                            }}


                        >


                            <option value="unpaid">
                                Unpaid
                            </option>


                            <option value="paid">
                                Paid
                            </option>


                            <option value="failed">
                                Failed
                            </option>


                        </select>









                        <br />

                        <br />









                        <button

                            onClick={()=>


                                navigate(

                                    `/admin/orders/${order.id}`

                                )


                            }

                            style={{

                                marginRight:"10px"

                            }}

                        >

                            👁 Details

                        </button>







                        {


                        order.payment_status === "paid"

                        &&

                        (

                            <button

                                onClick={()=>


                                    downloadInvoice(

                                        order.id

                                    )


                                }

                                style={{

                                    marginRight:"10px"

                                }}

                            >

                                📄 Invoice

                            </button>


                        )


                        }










                        <button


                            onClick={()=>


                                deleteOrder(

                                    order.id

                                )


                            }


                            style={{

                                background:"crimson",

                                color:"white",

                                border:"none",

                                padding:"10px 15px",

                                borderRadius:"8px"

                            }}


                        >

                            🗑 Delete

                        </button>





                    </div>



                ))

            }





        </div>

    );


}