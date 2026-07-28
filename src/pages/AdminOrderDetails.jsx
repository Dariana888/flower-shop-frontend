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


            setOrder(response.data);





            try {


                const historyResponse = await api.get(

                    `/orders/${id}/history`

                );


                setHistory(

                    historyResponse.data || []

                );


            } catch {


                setHistory([]);

            }





        } catch(error) {


            console.error(

                "ADMIN ORDER DETAILS ERROR:",

                error

            );



            setError(

                error.response?.data?.detail ||

                "Failed to load order"

            );


        } finally {


            setLoading(false);


        }


    };









    const downloadInvoice = async () => {


        try {


            const response = await api.get(

                `/orders/${id}/invoice`,

                {

                    responseType:"blob"

                }

            );



            const file = new Blob(

                [response.data],

                {

                    type:"application/pdf"

                }

            );



            const url = window.URL.createObjectURL(file);



            const link = document.createElement("a");



            link.href = url;



            link.download =

                `FlowerShop_invoice_${id}.pdf`;



            document.body.appendChild(link);



            link.click();



            link.remove();



            window.URL.revokeObjectURL(url);



        } catch(error) {


            console.error(

                "INVOICE ERROR:",

                error

            );



            alert(

                error.response?.data?.detail ||

                "Invoice download failed"

            );


        }


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



                <h2 style={{color:"red"}}>

                    ❌ {error}

                </h2>


            </div>

        );


    }








    return (

        <div style={{padding:"30px"}}>


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

                    background:"#fff"

                }}

            >





                <h2>
                    👤 Customer
                </h2>


                <p>

                    {

                        order.customer ||

                        order.user_email ||

                        "Unknown"

                    }

                </p>





                <h2>
                    🚚 Delivery
                </h2>


                <p>

                    Type:

                    {" "}

                    {order.delivery_type || "Pickup"}

                </p>



                <p>

                    📍 Address:

                    {" "}

                    {order.address || "Pickup"}

                </p>



                <p>

                    📏 Distance:

                    {" "}

                    {Number(order.delivery_distance || 0).toFixed(2)}

                    km

                </p>



                <p>

                    💵 Delivery price:

                    {" "}

                    {Number(order.delivery_price || 0).toFixed(2)}

                    MDL

                </p>





                <h2>
                    💳 Payment
                </h2>


                <p>

                    Method:

                    {" "}

                    <b>

                        {order.payment_method || "N/A"}

                    </b>

                </p>



                <p>

                    Status:

                    {" "}

                    <b>

                        {order.payment_status}

                    </b>

                </p>





                <h2>
                    📦 Status
                </h2>


                <p>

                    <b>

                        {order.status}

                    </b>

                </p>





                <h2>
                    💰 Total
                </h2>


                <h3>

                    {Number(order.total || 0).toFixed(2)}

                    {" MDL"}

                </h3>



                {


                    order.payment_status === "paid"

                    &&


                    <button

                        onClick={downloadInvoice}

                        style={{

                            padding:"12px 20px",

                            background:"#4caf50",

                            color:"white",

                            border:"none",

                            borderRadius:"8px",

                            cursor:"pointer"

                        }}

                    >

                        📄 Download Invoice

                    </button>


                }



            </div>









            <h2 style={{marginTop:"40px"}}>

                🌸 Products

            </h2>









            {


                order.items && order.items.length > 0


                ?


                order.items.map(

                    (item,index)=>(


                        <div

                            key={index}

                            style={{

                                border:"1px solid #ddd",

                                borderRadius:"10px",

                                padding:"15px",

                                marginBottom:"10px",

                                background:"#fff"

                            }}

                        >



                            <h3>

                                🌸

                                {" "}

                                {

                                    item.name ||

                                    `Bouquet #${item.bouquet_id}`

                                }

                            </h3>





                            <p>

                                Quantity:

                                {" "}

                                {item.quantity}

                            </p>





                            <p>

                                Price:

                                {" "}

                                {Number(item.price || 0).toFixed(2)}

                                {" MDL"}

                            </p>





                            <p>

                                Subtotal:

                                {" "}

                                {

                                    (

                                        Number(item.price || 0) *

                                        Number(item.quantity || 0)

                                    )

                                    .toFixed(2)

                                }

                                {" MDL"}

                            </p>



                        </div>


                    )

                )


                :


                <p>

                    No products found.

                </p>


            }









            <h2 style={{marginTop:"40px"}}>

                📜 Status History

            </h2>









            {


                history.length === 0


                ?


                <p>

                    No history available.

                </p>


                :


                history.map(

                    (item,index)=>(


                        <div

                            key={index}

                            style={{

                                borderLeft:

                                "4px solid #999",

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

                                {

                                    item.changed_by ||

                                    "System"

                                }

                            </p>






                            {

                                item.changed_at &&


                                <p>

                                    {

                                        new Date(

                                            item.changed_at

                                        )

                                        .toLocaleString()

                                    }

                                </p>

                            }



                        </div>


                    )

                )


            }






        </div>


    );


}