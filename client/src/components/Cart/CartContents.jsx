import { HiOutlineTrash } from 'react-icons/hi'
const CartContents = () => {
    const  cartProducts =[
    {
      id: 1,
      name: 'Product 1',
      size : 'M',
      color: 'red',
      price: 100,
      qty: 1,
      img: 'https://picsum.photos/200?random=1'
    },
    {
      id: 2,
      name: 'Product 1',
      size : 'L',
      color: 'blue',
      price: 100,
      qty: 1,
      img: 'https://picsum.photos/200?random=2'
    },
    {
      id: 3,
      name: 'Product 3',
      size : 'M',
      color: 'pink',
      price: 100,
      qty: 1,
      img: 'https://picsum.photos/200?random=3'
    },
    ]
  return (
    <div>
    {
        cartProducts.map((product) => (
            <div key={product.id} className='flex items-center justify-between mb-4 pb-1 border-b border-gray-200'>
                <div className='flex items-center space-x-4'>
                    <img src={product.img} alt={product.name} className='w-16 h-16 object-cover rounded-lg' />
                    <div>
                    <h3 className='font-semibold text-sm'>{product.name}</h3>
                    <div className='flex items-center space-x-2'>
                        <span className='text-sm text-gray-500'>{product.size}</span>
                        <span className='text-sm text-gray-500'>{product.color}</span>
                    </div>
                    </div>
                </div>
                <div>
                    <span className='text-sm font-semibold'>${product.price.toLocaleString()}</span>
                    <div className='flex items-center space-x-2'>
                    <button className='text-gray-500'>-</button>
                    <span>{product.qty}</span>
                    <button className='text-gray-500'>+</button>
                    </div>
                </div>
                <button className='text-gray-500 text-red-600 px-2 py-1 rounded-lg'>
                    <HiOutlineTrash className='h-6 w-6' />
                </button>
            </div>
        ))
    }
      
    </div>
  )
}

export default CartContents
