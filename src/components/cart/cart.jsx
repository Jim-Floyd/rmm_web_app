import { totalPrice} from '../../units/total-price';
import Button from '../button/button';
import './cart.css';

const Cart = ({ cartItems, onCheckout }) => {
	return (
		<div className='cart__container'>
			{/* <p>
				Umumiy narx:{' '}
				{totalPrice(cartItems).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})}
			</p> */}
            {cartItems.map(cartItem=>{
                return(
                    
                    <>
                        <div className='selected-model'><span style={{fontWeight:"bold"}}>{cartItem.full_name} </span>-<span style={{fontWeight:"bold"}}>  {cartItem.quantity}{cartItem.unit_measurement}</span></div>
                    </>
                )
            }
            )
            }

			<Button
				title={`${
					cartItems.length === 0 ? 'Выберите' : "Подтвердить"
				}`}
				disable={cartItems.length === 0 ? true : false}
				type={'checkout'}
				onClick={onCheckout}
			/>
		</div>
	);
};

export default Cart;