import { useEffect, useState } from "react";
import api from "../api/api";


export default function MyOrders(){

    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        loadOrders();

    },[]);



    const loadOrders = async()=>{

        try{

            const res = await api.get(
                "/orders/my"
            );

            setOrders(res.data);


        }catch(error){

            console.log(
                "Orders error:",
                error
            );

        }finally{

            setLoading(false);

        }

    };



    if(loading){

        return (
            <h2 style={{padding:"30px"}}>
                Loading...
            </h2>
        );

    }



    return (

        <div style={{padding:"30px"}}>

            <h1>
                📦 My Orders
            </h1>


            {
                orders.map(order=>(

                    <div
                    key={order.id}
                    style={{
                        border:"1px solid #ddd",
                        padding:"20px",
                        marginBottom:"15px",
                        borderRadius:"12px"
                    }}
                    >

                        <h2>
                            Order #{order.id}
                        </h2>


                        <p>
                            Status: {order.status}
                        </p>


                        <p>
                            Payment: {order.payment_status}
                        </p>


                        <p>
                            Total: {order.total} MDL
                        </p>


                    </div>

                ))
            }


        </div>

    );

}