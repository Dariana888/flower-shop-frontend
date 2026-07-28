import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";


export default function Checkout() {


    const navigate = useNavigate();


    const [deliveryType, setDeliveryType] = useState("delivery");

    const [address, setAddress] = useState("");

    const [phone, setPhone] = useState("");

    const [deliveryPrice, setDeliveryPrice] = useState(0);

    const [loading, setLoading] = useState(false);





    const calculateDeliveryPrice = (text) => {


        const value = text.toLowerCase();



        const zones = {


            "orhei":150,

            "peresecina":50,

            "chisinau":200,

            "chișinău":200,


            "magdacesti":150,

            "măgdăcești":150,


            "miclesti":70,

            "miclești":70,


            "stetcani":90,

            "ștețcani":90,


            "isnovat":100,

            "isnovăț":100,


            "ivancea":100,


            "ratus":120,

            "rătuș":120,


            "gornae":100,

            "gorăne":100

        };




        for(const place in zones){


            if(value.includes(place)){


                setDeliveryPrice(
                    zones[place]
                );


                return;

            }

        }




        setDeliveryPrice(0);

    };








    const handleCheckout = async (e) => {


        e.preventDefault();




        if(phone.trim()===""){

            alert(
                "Please enter phone number."
            );

            return;

        }





        if(

            deliveryType === "delivery"

            &&

            address.trim()===""

        ){

            alert(
                "Please enter delivery address."
            );

            return;

        }





        try{


            setLoading(true);





            const orderResponse = await api.post(

                "/orders/checkout",

                null,

                {

                    params:{


                        delivery_type:
                            deliveryType,


                        address:

                            deliveryType==="delivery"

                            ?

                            address

                            :

                            "",



                        phone: phone

                    }

                }

            );







            const orderId =

                orderResponse.data.order_id;







            if(!orderId){


                alert(
                    "Order ID missing"
                );

                return;

            }







            const paymentResponse = await api.post(

                `/payments/create-checkout-session/${orderId}`

            );







            const checkoutUrl =

                paymentResponse.data.checkout_url;







            if(!checkoutUrl){


                alert(
                    "Payment URL missing"
                );

                return;

            }






            window.location.href =
                checkoutUrl;



        }



        catch(error){



            console.error(

                "CHECKOUT ERROR:",

                error

            );



            alert(

                error.response?.data?.detail ||

                "Checkout failed"

            );

        }



        finally{


            setLoading(false);

        }


    };









    return (



        <div

            style={{

                maxWidth:"600px",

                margin:"40px auto",

                padding:"25px",

                border:"1px solid #ddd",

                borderRadius:"12px"

            }}

        >




            <h1>
                🌸 Checkout
            </h1>







            <form onSubmit={handleCheckout}>





                <label>
                    Phone number
                </label>




                <input


                    type="text"


                    placeholder="+373 69 123 456"


                    value={phone}


                    onChange={(e)=>

                        setPhone(
                            e.target.value
                        )

                    }


                    required



                    style={{

                        width:"100%",

                        padding:"10px",

                        marginTop:"10px",

                        marginBottom:"20px"

                    }}



                />









                <label>
                    Delivery option
                </label>





                <select


                    value={deliveryType}



                    onChange={(e)=>{


                        const value =
                            e.target.value;



                        setDeliveryType(value);




                        if(value==="pickup"){

                            setDeliveryPrice(0);

                        }


                    }}



                    style={{


                        width:"100%",


                        padding:"10px",


                        marginBottom:"20px"


                    }}



                >




                    <option value="delivery">

                        🚚 Delivery

                    </option>





                    <option value="pickup">

                        🏪 Pickup from shop

                    </option>




                </select>









                {

                    deliveryType==="delivery" &&



                    <div>





                        <label>

                            Delivery address

                        </label>







                        <textarea



                            rows="4"



                            value={address}



                            onChange={(e)=>{


                                setAddress(
                                    e.target.value
                                );



                                calculateDeliveryPrice(
                                    e.target.value
                                );


                            }}






                            placeholder="Example: Orhei, street name, number"





                            style={{



                                width:"100%",



                                padding:"10px",



                                marginTop:"10px"



                            }}






                        />







                        <p>


                            🚚 Delivery price:


                            {" "}



                            <b>


                            {

                                deliveryPrice > 0

                                ?

                                `${deliveryPrice} MDL`

                                :

                                "Enter locality"


                            }



                            </b>


                        </p>





                    </div>



                }









                {

                    deliveryType==="pickup" &&




                    <p>


                        🏪 Pickup from shop:


                        {" "}



                        <b>

                            FREE (0 MDL)

                        </b>


                    </p>


                }









                <button



                    type="submit"



                    disabled={loading}



                    style={{



                        padding:"12px 25px",



                        cursor:"pointer"



                    }}



                >




                    {

                        loading

                        ?

                        "Processing..."

                        :

                        "Continue to Payment"


                    }



                </button>








                <button



                    type="button"



                    onClick={()=>navigate("/cart")}



                    style={{



                        padding:"12px 25px",



                        marginLeft:"10px"



                    }}



                >



                    Back to Cart



                </button>







            </form>






        </div>



    );


}