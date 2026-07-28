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


            const response = await api.get(
                "/cart/"
            );


            setItems(
                response.data.items || []
            );


            setTotal(
                response.data.total || 0
            );



        } catch(error) {


            console.error(
                "Cart error:",
                error
            );


        } finally {


            setLoading(false);


        }


    };









    const getImageUrl = (image) => {


        if(!image)
            return null;



        if(image.startsWith("http"))
            return image;



        return `${api.defaults.baseURL}/${image}`;


    };









    const removeItem = async (cartId) => {



        const confirmDelete = window.confirm(

            "🗑 Remove this product from cart?"

        );



        if(!confirmDelete)
            return;





        try {



            await api.delete(

                `/cart/${cartId}`

            );



            getCart();





        } catch(error) {



            console.error(

                "REMOVE ERROR:",

                error

            );



        }



    };









    const clearCart = async () => {



        const confirmClear = window.confirm(

            "🗑 Clear the entire cart?"

        );



        if(!confirmClear)
            return;





        try {



            await api.delete(

                "/cart/clear"

            );



            setItems([]);

            setTotal(0);





        } catch(error) {



            console.error(

                "CLEAR CART ERROR:",

                error

            );



        }


    };









    if(loading){


        return (

            <div style={{padding:"30px"}}>

                <h2>
                    Loading cart...
                </h2>

            </div>

        );

    }









    return (


        <div style={{padding:"30px"}}>



            <h1>
                🛒 My Cart
            </h1>








            {


                items.length === 0


                ?


                (

                    <p>
                        Your cart is empty.
                    </p>

                )


                :


                <>





                {


                    items.map((item)=>(



                        <div


                            key={item.cart_id}



                            style={{


                                border:"1px solid #ddd",


                                borderRadius:"10px",


                                padding:"20px",


                                marginBottom:"20px",


                                background:"#fff"


                            }}



                        >






                        {


                            item.image &&



                            <img


                                src={

                                    getImageUrl(

                                        item.image

                                    )

                                }


                                alt={item.name}



                                style={{


                                    width:"150px",


                                    height:"150px",


                                    objectFit:"cover",


                                    borderRadius:"10px"


                                }}



                                onError={(e)=>{


                                    e.target.style.display="none";


                                }}



                            />



                        }










                        <h2>

                            {item.name}

                        </h2>








                        <p>

                            <b>
                                Price:
                            </b>


                            {" "}


                            {Number(
                                item.price
                            ).toFixed(2)}

                            {" MDL"}

                        </p>








                        <p>

                            <b>
                                Quantity:
                            </b>


                            {" "}

                            {item.quantity}


                        </p>








                        <p>

                            <b>
                                Subtotal:
                            </b>


                            {" "}


                            {Number(
                                item.subtotal
                            ).toFixed(2)}

                            {" MDL"}

                        </p>









                        <button



                            onClick={()=>


                                removeItem(

                                    item.cart_id

                                )

                            }



                            style={{


                                background:"crimson",


                                color:"white",


                                border:"none",


                                padding:"10px 15px",


                                borderRadius:"8px",


                                cursor:"pointer"


                            }}



                        >


                            🗑 Remove


                        </button>








                        </div>



                    ))



                }









                <hr />








                <h2>


                    Total:

                    {" "}


                    {Number(
                        total
                    ).toFixed(2)}


                    {" MDL"}


                </h2>









                <div

                    style={{

                        display:"flex",

                        gap:"10px",

                        marginTop:"20px"

                    }}


                >







                    <button

                        onClick={clearCart}

                    >

                        🗑️ Clear Cart

                    </button>








                    <button


                        onClick={()=>


                            navigate(

                                "/checkout"

                            )


                        }


                    >

                        ✅ Checkout


                    </button>






                </div>





                </>


            }






        </div>


    );


}