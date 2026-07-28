import { useEffect, useState } from "react";
import api from "../api/api";


export default function Products() {


    const [bouquets, setBouquets] = useState([]);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");

    const [addedItems, setAddedItems] = useState([]);





    useEffect(() => {

        loadProducts();

    }, []);






    const loadProducts = async () => {

        try {

            const response = await api.get(
                "/bouquets/"
            );


            setBouquets(
                response.data
            );


        } catch(error) {


            console.error(
                "PRODUCT LOAD ERROR:",
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









    const addToCart = async (id) => {


        try {


            await api.post(

                "/cart/add",

                null,

                {

                    params:{

                        bouquet_id:id,

                        quantity:1

                    }

                }

            );




            setAddedItems(prev => [

                ...prev,

                id

            ]);





            setMessage(
                "🌸 Product added to cart!"
            );





            setTimeout(()=>{


                setAddedItems(prev =>

                    prev.filter(
                        item => item !== id
                    )

                );


                setMessage("");


            },2000);




        } catch(error) {



            console.error(
                error
            );


            setMessage(

                error.response?.data?.detail ||

                "Failed to add product"

            );


        }


    };









    if(loading){


        return (

            <div style={{padding:"30px"}}>

                <h2>
                    Loading flowers...
                </h2>

            </div>

        );

    }









    return (

        <div style={{padding:"30px"}}>



            <h1>
                🌺 Our Bouquets
            </h1>






            {

                message &&


                <div

                    style={{

                        background:"#e8ffe8",

                        color:"green",

                        padding:"12px",

                        borderRadius:"8px",

                        marginBottom:"20px",

                        fontWeight:"bold"

                    }}

                >

                    {message}

                </div>


            }









            <div

                style={{


                    display:"grid",


                    gridTemplateColumns:

                    "repeat(auto-fit,minmax(260px,1fr))",


                    gap:"20px"


                }}

            >






            {


                bouquets.map((bouquet)=>(



                    <div

                        key={bouquet.id}


                        style={{


                            border:"1px solid #ddd",


                            borderRadius:"12px",


                            padding:"20px",


                            background:"#fff"


                        }}


                    >






                    {

                        bouquet.image &&


                        <img


                            src={

                                getImageUrl(

                                    bouquet.image

                                )

                            }


                            alt={bouquet.name}


                            style={{


                                width:"100%",


                                height:"220px",


                                objectFit:"cover",


                                borderRadius:"8px"


                            }}


                        />


                    }









                    <h2>

                        {bouquet.name}

                    </h2>







                    <p>

                        {bouquet.description}

                    </p>








                    <p>

                        Price:

                        {" "}


                        <b>

                            {

                                Number(

                                    bouquet.price

                                ).toFixed(2)

                            }

                            {" MDL"}

                        </b>


                    </p>








                    <p>

                        Stock:

                        {" "}

                        {bouquet.stock}


                    </p>









                    <button



                        disabled={

                            bouquet.stock <= 0 ||

                            addedItems.includes(
                                bouquet.id
                            )

                        }



                        onClick={() =>

                            addToCart(

                                bouquet.id

                            )

                        }



                        style={{


                            width:"100%",


                            padding:"12px",


                            background:


                            addedItems.includes(
                                bouquet.id
                            )


                            ?

                            "green"


                            :


                            bouquet.stock <= 0


                            ?

                            "#aaa"


                            :


                            "#ff69b4",





                            color:"white",


                            border:"none",


                            borderRadius:"8px",


                            cursor:


                            addedItems.includes(
                                bouquet.id
                            )


                            ?

                            "default"


                            :


                            "pointer",


                            fontSize:"16px"


                        }}



                    >





                    {


                        addedItems.includes(
                            bouquet.id
                        )


                        ?


                        "✅ Added"


                        :


                        bouquet.stock <= 0


                        ?


                        "❌ Out of Stock"


                        :


                        "🛒 Add to Cart"


                    }




                    </button>







                    </div>



                ))


            }





            </div>



        </div>


    );


}