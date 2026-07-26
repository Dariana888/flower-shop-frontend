import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";


export default function AdminOrderDetails() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [order, setOrder] = useState(null);

    const [history, setHistory] = useState([]);

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

                `/admin/orders/${id}`

            );



            setOrder(

                response.data

            );





            try {


                const historyResponse = await api.get(

                    `/orders/${id}/history`

                );


                setHistory(

                    historyResponse.data || []

                );


            } catch(error) {


                console.log(

                    "History not available"

                );


                setHistory([]);

            }




        } catch(error) {


            console.error(

                "ADMIN ORDER DETAILS ERROR:",

                error

            );



            setError(

                error.response?.data?.detail ||

                "Order not found"

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









    if(loading){


        return (

            <div style={{padding:"30px"}}>

                <h2>
                    Loading order...
                </h2>

            </div>

        );

    }









    if(error){


        return (

            <div style={{padding:"30px"}}>


                <button

                    onClick={() =>
                        navigate("/admin/orders")
                    }

                >

                    ⬅ Back to Orders

                </button>



                <h2>

                    ❌ {error}

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




            <button

                onClick={() =>
                    navigate("/admin/orders")
                }

            >

                ⬅ Back

            </button>






            <h1>

                📦 Order #{order.id}

            </h1>









            <div

                style={{

                    border:"1px solid #ddd",

                    borderRadius:"12px",

                    padding:"20px",

                    marginBottom:"30px"

                }}

            >



                <h2>

                    👤 Customer

                </h2>


                <p>

                    {order.customer}

                </p>






                <h2>

                    💰 Payment

                </h2>


                <p>

                    Status:

                    {" "}

                    <b>

                        {order.payment_status}

                    </b>

                </p>







                <h2>

                    🚚 Delivery

                </h2>


                <p>

                    Type:

                    {" "}

                    {order.delivery_type}

                </p>



                <p>

                    Address:

                    {" "}

                    {order.address || "Pickup"}

                </p>








                <h2>

                    💵 Total

                </h2>


                <h3>

                    {Number(order.total).toFixed(2)}

                    {" "}

                    MDL

                </h3>








                {

                    order.payment_status === "paid"

                    &&


                    <button

                        onClick={downloadInvoice}

                    >

                        📄 Download Invoice

                    </button>


                }





            </div>













            <h2>

                🌸 Products

            </h2>










            {

                order.items && order.items.length > 0 ?


                order.items.map(

                    (item,index)=>(


                        <div

                            key={index}

                            style={{

                                border:"1px solid #ddd",

                                borderRadius:"10px",

                                padding:"15px",

                                marginBottom:"10px"

                            }}

                        >



                            <p>

                                🌺 Bouquet ID:

                                {" "}

                                {item.bouquet_id}

                            </p>



                            <p>

                                Quantity:

                                {" "}

                                {item.quantity}

                            </p>




                            <p>

                                Price:

                                {" "}

                                {Number(item.price).toFixed(2)}

                                {" "}

                                MDL

                            </p>



                        </div>


                    )

                )


                :


                (

                    <p>

                        No products found.

                    </p>

                )


            }












            <h2

                style={{

                    marginTop:"40px"

                }}

            >

                📜 Status History

            </h2>









            {

                history.length === 0 ?


                (

                    <p>

                        No history available.

                    </p>

                )


                :


                history.map(

                    (item,index)=>(


                        <div

                            key={index}

                            style={{

                                borderLeft:"4px solid #999",

                                padding:"10px",

                                marginBottom:"10px"

                            }}

                        >



                            <p>


                                {

                                    item.old_status ||

                                    "created"

                                }


                                {" ➜ "}



                                <b>

                                    {item.new_status}

                                </b>


                            </p>





                            <p>

                                Changed by:

                                {" "}

                                {item.changed_by}

                            </p>





                            <p>

                                {

                                    item.changed_at &&

                                    new Date(

                                        item.changed_at

                                    ).toLocaleString()

                                }

                            </p>




                        </div>


                    )

                )

            }





        </div>


    );


}