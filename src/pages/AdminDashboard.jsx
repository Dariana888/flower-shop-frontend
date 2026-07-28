import { useEffect, useState } from "react";
import api from "../api/api";


export default function AdminDashboard() {


    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);







    useEffect(() => {

        loadDashboard();

    }, []);







    const loadDashboard = async () => {

        try {


            const response = await api.get(
                "/admin/dashboard"
            );


            setData(response.data);



        } catch(error) {


            console.error(
                "Dashboard error:",
                error
            );



        } finally {


            setLoading(false);


        }

    };







    if(loading){

        return (

            <div style={{padding:"30px"}}>

                <h2>
                    Loading dashboard...
                </h2>

            </div>

        );

    }







    if(!data){

        return (

            <div style={{padding:"30px"}}>

                <h2>
                    No dashboard data
                </h2>

            </div>

        );

    }







    const summary = data.summary || {};







    return (

        <div

            style={{

                padding:"30px"

            }}

        >


            <h1>

                📊 Admin Dashboard

            </h1>









            <div

                style={{

                    display:"grid",

                    gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",

                    gap:"20px"

                }}

            >



                <Card
                    title="📦 Total Orders"
                    value={summary.total_orders || 0}
                />



                <Card
                    title="💰 Revenue"
                    value={`${Number(summary.revenue || 0).toFixed(2)} MDL`}
                />



                <Card
                    title="💳 Paid"
                    value={summary.paid_orders || 0}
                />



                <Card
                    title="⏳ Pending"
                    value={summary.pending || 0}
                />



                <Card
                    title="🔄 Processing"
                    value={summary.processing || 0}
                />



                <Card
                    title="🚚 Shipped"
                    value={summary.shipped || 0}
                />



                <Card
                    title="✅ Completed"
                    value={summary.completed || 0}
                />



                <Card
                    title="❌ Cancelled"
                    value={summary.cancelled || 0}
                />



            </div>









            <h2 style={{marginTop:"40px"}}>

                🌸 Top Products

            </h2>






            {

                !data.top_products ||

                data.top_products.length === 0 ?


                (

                    <p>
                        No sales data yet.
                    </p>

                )


                :


                data.top_products.map(

                    (product,index)=>(


                        <div

                            key={index}

                            style={{

                                border:"1px solid #ddd",

                                padding:"10px",

                                marginBottom:"10px",

                                borderRadius:"8px",

                                background:"#fff"

                            }}

                        >

                            🌸 {product.name}

                            {" - Sold: "}

                            {product.sold}


                        </div>


                    )

                )

            }









            <h2 style={{marginTop:"40px"}}>

                ⚠️ Low Stock

            </h2>







            {

                !data.low_stock ||

                data.low_stock.length === 0 ?


                (

                    <p>
                        Stock is OK.
                    </p>

                )


                :


                data.low_stock.map(

                    (item)=>(


                        <div

                            key={item.id}

                            style={{

                                border:"1px solid #ddd",

                                padding:"10px",

                                marginBottom:"10px",

                                borderRadius:"8px",

                                background:"#fff"

                            }}

                        >

                            🌸 {item.name}

                            {" - Stock: "}

                            {item.stock}


                        </div>


                    )

                )

            }







        </div>

    );

}









function Card({title,value}) {


    return (

        <div

            style={{

                border:"1px solid #ddd",

                borderRadius:"12px",

                padding:"20px",

                textAlign:"center",

                background:"#fff"

            }}

        >

            <h3>

                {title}

            </h3>


            <h2>

                {value}

            </h2>


        </div>

    );

}