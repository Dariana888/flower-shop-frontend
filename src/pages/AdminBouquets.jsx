import { useEffect, useState } from "react";
import api from "../api/api";


export default function AdminBouquets() {


    const [bouquets, setBouquets] = useState([]);

    const [files, setFiles] = useState({});

    const [editData, setEditData] = useState({});


    const [newBouquet, setNewBouquet] = useState({

        name:"",
        description:"",
        price:"",
        stock:"",
        category:""

    });


    const [newImage,setNewImage] = useState(null);


    const [message,setMessage] = useState("");

    const [error,setError] = useState("");





    useEffect(()=>{

        loadBouquets();

    },[]);






    const loadBouquets = async()=>{

        try{


            const response = await api.get(
                "/bouquets/"
            );


            setBouquets(
                response.data
            );


        }catch(error){

            console.error(error);

            setError(
                "Cannot load bouquets"
            );

        }

    };







    // ======================
    // CREATE
    // ======================


    const createBouquet = async(e)=>{


        e.preventDefault();


        try{


            const response = await api.post(

                "/bouquets/create",

                {

                    name:newBouquet.name,

                    description:newBouquet.description,

                    price:Number(newBouquet.price),

                    stock:Number(newBouquet.stock),

                    category:newBouquet.category

                }

            );



            const id=response.data.id;



            if(newImage){


                const formData=new FormData();


                formData.append(
                    "file",
                    newImage
                );


                await api.post(

                    `/bouquets/${id}/upload-image`,

                    formData,

                    {
                        headers:{
                            "Content-Type":
                            "multipart/form-data"
                        }
                    }

                );


            }





            setMessage(
                "✅ Bouquet created"
            );


            setNewBouquet({

                name:"",
                description:"",
                price:"",
                stock:"",
                category:""

            });


            setNewImage(null);


            loadBouquets();



        }catch(error){


            console.error(
                "CREATE ERROR",
                error.response?.data
            );


            setError(
                error.response?.data?.detail ||
                "Create failed"
            );


        }


    };










    // ======================
    // UPDATE
    // ======================


    const updateBouquet = async(id)=>{


        try{


            const bouquet =
            bouquets.find(
                b=>b.id===id
            );



            await api.put(

                `/bouquets/${id}`,

                {


                    name:
                    editData[id]?.name ??
                    bouquet.name,


                    description:
                    editData[id]?.description ??
                    bouquet.description,


                    price:Number(
                        editData[id]?.price ??
                        bouquet.price
                    ),


                    stock:Number(
                        editData[id]?.stock ??
                        bouquet.stock
                    ),


                    category:
                    editData[id]?.category ??
                    bouquet.category


                }

            );



            setMessage(
                "✅ Bouquet updated"
            );


            loadBouquets();



        }catch(error){


            console.error(
                "UPDATE ERROR",
                error.response?.data
            );


            setError(
                error.response?.data?.detail ||
                "Update failed"
            );


        }


    };









    // ======================
    // DELETE
    // ======================


    const deleteBouquet = async(id)=>{


        if(
            !window.confirm(
                "Delete this bouquet?"
            )
        ){

            return;

        }




        try{


            await api.delete(

                `/bouquets/${id}`

            );



            setMessage(
                "🗑 Bouquet deleted"
            );


            loadBouquets();



        }catch(error){


            console.error(
                "DELETE ERROR",
                error.response?.data
            );


            setError(
                error.response?.data?.detail ||
                "Delete failed"
            );


        }


    };











    // ======================
    // IMAGE
    // ======================


    const uploadImage = async(id)=>{


        try{


            const file=files[id];


            if(!file){

                setError(
                    "Select image first"
                );

                return;

            }




            const formData=new FormData();


            formData.append(
                "file",
                file
            );



            await api.post(

                `/bouquets/${id}/upload-image`,

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );



            setMessage(
                "✅ Image changed"
            );


            loadBouquets();



        }catch(error){


            console.error(
                error.response?.data
            );


            setError(
                "Upload failed"
            );

        }


    };










    const changeField=(id,field,value)=>{


        setEditData({

            ...editData,

            [id]:{

                ...editData[id],

                [field]:value

            }

        });


    };








return (

<div style={{padding:"30px"}}>


<h1>
🌺 Admin Bouquets
</h1>



{
message &&
<p style={{color:"green"}}>
{message}
</p>
}



{
error &&
<p style={{color:"red"}}>
{error}
</p>
}




<h2>
➕ Add Bouquet
</h2>



<form onSubmit={createBouquet}>


<input
placeholder="Name"
value={newBouquet.name}
onChange={(e)=>
setNewBouquet({
...newBouquet,
name:e.target.value
})
}
/>


<br/><br/>


<textarea
placeholder="Description"
value={newBouquet.description}
onChange={(e)=>
setNewBouquet({
...newBouquet,
description:e.target.value
})
}
/>


<br/><br/>


<input
type="number"
placeholder="Price"
value={newBouquet.price}
onChange={(e)=>
setNewBouquet({
...newBouquet,
price:e.target.value
})
}
/>


<br/><br/>


<input
type="number"
placeholder="Stock"
value={newBouquet.stock}
onChange={(e)=>
setNewBouquet({
...newBouquet,
stock:e.target.value
})
}
/>


<br/><br/>


<input
placeholder="Category"
value={newBouquet.category}
onChange={(e)=>
setNewBouquet({
...newBouquet,
category:e.target.value
})
}
/>


<br/><br/>


<input
type="file"
accept="image/*"
onChange={(e)=>
setNewImage(
e.target.files[0]
)
}
/>


<br/><br/>


<button>
➕ Create Bouquet
</button>


</form>

<hr/>





{
bouquets.map(bouquet=>(


<div
key={bouquet.id}
style={{
border:"1px solid #ddd",
padding:"20px",
borderRadius:"12px",
marginBottom:"20px"
}}
>


<h2>
🌸 {bouquet.name}
</h2>



{
bouquet.image &&
<img
src={
`http://127.0.0.1:8000/${bouquet.image}`
}
width="220"
alt={bouquet.name}
/>
}



<br/><br/>



<input
value={
editData[bouquet.id]?.name ??
bouquet.name
}
onChange={(e)=>
changeField(
bouquet.id,
"name",
e.target.value
)
}
/>


<br/><br/>


<textarea
value={
editData[bouquet.id]?.description ??
bouquet.description
}
onChange={(e)=>
changeField(
bouquet.id,
"description",
e.target.value
)
}
/>


<br/><br/>


<input
type="number"
value={
editData[bouquet.id]?.price ??
bouquet.price
}
onChange={(e)=>
changeField(
bouquet.id,
"price",
e.target.value
)
}
/>


<br/><br/>


<input
type="number"
value={
editData[bouquet.id]?.stock ??
bouquet.stock
}
onChange={(e)=>
changeField(
bouquet.id,
"stock",
e.target.value
)
}
/>


<br/><br/>


<button
onClick={()=>
updateBouquet(bouquet.id)
}
>
💾 Save
</button>



<button
onClick={()=>
deleteBouquet(bouquet.id)
}
style={{
marginLeft:"10px",
background:"#ffcccc"
}}
>
🗑 Delete
</button>



<br/><br/>


<input
type="file"
accept="image/*"
onChange={(e)=>
setFiles({

...files,

[bouquet.id]:
e.target.files[0]

})
}
/>



<button
onClick={()=>
uploadImage(bouquet.id)
}
style={{
marginLeft:"10px"
}}
>
📷 Change Image
</button>



</div>


))

}



</div>

);


}