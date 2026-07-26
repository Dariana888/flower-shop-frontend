import { useEffect, useState } from "react";
import api from "../api/api";


export default function AdminStock(){

    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        loadStock();

    },[]);




    const loadStock = async()=>{

        try{

            const response = await api.get(
                "/admin/stock"
            );

            setProducts(
                response.data
            );


        }catch(error){

            console.error(
                "Stock error:",
                error
            );

        }finally{

            setLoading(false);

        }

    };




    if(loading){

        return <h2>Loading stock...</h2>;

    }




    return (

        <div style={{
            padding:"30px"
        }}>


        <h1>
            📦 Admin Stock
        </h1>


        {
        products.map(product=>(

            <div
            key={product.id}
            style={{
                border:"1px solid #ddd",
                padding:"20px",
                marginBottom:"15px",
                borderRadius:"12px"
            }}
            >


            <h2>
                🌸 {product.name}
            </h2>


            <p>
                Stock:
                {" "}
                {product.stock}
            </p>


            <p>
                Price:
                {" "}
                {product.price}
                {" "}MDL
            </p>



            </div>

        ))
        }



        </div>

    );

}