import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Checkout() {

    const navigate = useNavigate();

    const [deliveryType, setDeliveryType] = useState("delivery");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);



    const handleCheckout = async (e) => {

        e.preventDefault();


        if (
            deliveryType === "delivery" &&
            address.trim() === ""
        ) {

            alert(
                "Please enter delivery address."
            );

            return;
        }



        try {

            setLoading(true);



            // ==========================
            // CREATE ORDER
            // ==========================

            const orderResponse = await api.post(
                "/orders/checkout",
                null,
                {
                    params: {

                        delivery_type:
                            deliveryType,


                        address:
                            deliveryType === "delivery"
                                ? address
                                : "",

                    },
                }
            );



            console.log(
                "ORDER RESPONSE:",
                orderResponse.data
            );



            const orderId =
                orderResponse.data.id ||
                orderResponse.data.order_id ||
                orderResponse.data.order?.id;



            if (!orderId) {

                alert(
                    "Order ID was not returned."
                );

                return;
            }





            // ==========================
            // CREATE STRIPE SESSION
            // ==========================

            const paymentResponse =
                await api.post(
                    `/payments/create-checkout-session/${orderId}`
                );



            console.log(
                "PAYMENT RESPONSE:",
                paymentResponse.data
            );



            const checkoutUrl =
                paymentResponse.data.checkout_url;



            if (!checkoutUrl) {

                alert(
                    "Stripe checkout URL missing."
                );

                return;
            }




            // ==========================
            // REDIRECT STRIPE
            // ==========================

            window.location.href =
                checkoutUrl;



        } catch (error) {


            console.error(
                "CHECKOUT ERROR:",
                error
            );



            alert(

                error.response?.data?.detail ||

                "Checkout failed."

            );


        } finally {

            setLoading(false);

        }

    };




    return (

        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid #ddd",
            }}
        >


            <h1>
                🌸 Checkout
            </h1>




            <form onSubmit={handleCheckout}>


                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <label>
                        Delivery option
                    </label>


                    <br />


                    <select

                        value={deliveryType}

                        onChange={(e)=>
                            setDeliveryType(
                                e.target.value
                            )
                        }


                        style={{
                            width:"100%",
                            padding:"10px"
                        }}

                    >

                        <option value="delivery">
                            🚚 Delivery
                        </option>


                        <option value="pickup">
                            🏪 Pickup from shop
                        </option>


                    </select>

                </div>






                {
                    deliveryType === "delivery" && (

                        <div
                            style={{
                                marginBottom:"20px"
                            }}
                        >

                            <label>
                                Delivery address
                            </label>


                            <br />


                            <textarea

                                rows="5"

                                value={address}

                                onChange={(e)=>
                                    setAddress(
                                        e.target.value
                                    )
                                }


                                placeholder="Enter your address"

                                style={{
                                    width:"100%",
                                    padding:"10px"
                                }}

                            />


                        </div>

                    )
                }






                {
                    deliveryType === "pickup" && (

                        <div>

                            <p>
                                🏪 You will pick up your
                                order from our flower shop.
                            </p>


                        </div>

                    )
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

                    onClick={() =>
                        navigate("/cart")
                    }


                    style={{
                        padding:"12px 25px",
                        marginLeft:"10px",
                        cursor:"pointer"
                    }}

                >

                    Back to Cart

                </button>



            </form>


        </div>

    );

}