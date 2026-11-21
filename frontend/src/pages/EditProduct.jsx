import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, useParams } from "react-router"
import { updateProduct } from "../services/productService"
import { getProductById } from "../services/productService"

function EditProduct() {
    const [ formData, setFormData ] = useState({
       title: "",
       category: "",
        price: 0,
        quantity: 0,
    })
    const {productId} = useParams()


    
    async function loadProduct(){
        const response = await getProductById(productId)
        setFormData(response)
    }

    
    useEffect(()=>{
        loadProduct()
    },[])


    
    const navigate = useNavigate()

    function handleChange(event){
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()        
        const updatedProduct = await updateProduct(productId,formData)
        navigate('/products')
    }
  return (
    <div>
        <h1>Edit Product</h1>

        <form onSubmit={handleSubmit} className="form">

            <div>
            <label htmlFor="title">Title:</label>
            <input 
            type="text" 
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            />
            </div>


            <div>
            <label htmlFor="category">Category:</label>
            <input 
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
             />
             </div>


             <div>
            <label htmlFor="price">Price:</label>
            <input 
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
             />
            </div>

            <div>
            <label htmlFor="quantity">Quantity:</label>
            <input 
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
             />
            </div>

             <div className="button-container">
             <button>Edit Product</button>
             </div>
        </form>
    </div>
  )
}

export default EditProduct