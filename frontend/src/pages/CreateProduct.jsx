import { useState } from "react"
import { useNavigate } from "react-router"
import { createNewProduct } from "../services/productService"

function CreateProduct() {
    const [ formData, setFormData ] = useState({
       title: "",
       category: "",
        price: 0,
        quantity: 0,
    })

    const navigate = useNavigate()

    function handleChange(event){
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()
        console.log('Form Submitted')
        
        const createdProduct = await createNewProduct(formData)

        navigate('/products')
    }
  return (
    <div>
        <h1>Create Product</h1>
        <br />

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
             <button>Create Product</button>
             </div>
        </form>
    </div>
  )
}

export default CreateProduct