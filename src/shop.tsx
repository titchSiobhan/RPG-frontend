const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect, useContext } from 'react';
import type { MiniMessage } from './miniMessage';
import { PlayerContext } from './context/playerContext';


interface ShopItem {
	id: number;
	name: string;
	type: string;
	effect: any[];
	price: number;
	level: number;
}
 type MiniMessagesProps = {
  miniMessage: MiniMessage | null;
  setMiniMessage: React.Dispatch<React.SetStateAction<MiniMessage | null>>;
};

function Shop({ setMiniMessage}: MiniMessagesProps) {
	const [items, setItems] = useState<ShopItem[]>([]);
	const [shopToggle, setShopToggle] = useState(false);
	const { player,setPlayer } = useContext(PlayerContext);
	async function getItems() {
		const response = await fetch(`${API_URL}shop/items`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		console.log(data);
		setItems(data.items);
		
	}

	async function buyItem(item: ShopItem) {
		const itemId = item.id;	
		const response = await fetch(`${API_URL}shop/buy/${itemId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		setMiniMessage({messages: [data.message]});
		setPlayer({...player, ...data.player});

	}

	useEffect(() => {
		getItems();
	}, []);

	function toggleShop() {
		setShopToggle((prev) => !prev);
	}
if (!player) return null;

	return (
		<>
			<button onClick={toggleShop} className="shop-button">
				Shop
			</button>

			<div className={shopToggle ? 'shop show' : 'shop'}>
				<div className={shopToggle ? 'shop-close show' : 'shop-close'} onClick={toggleShop}>X</div>
				<div className="shop-area">
					{items.map((item) => (
						player.level >= item.level && (
						<div key={item.id} className="shop-item" >
							<p >{item.name}</p>
							<p>{item.type}</p>
							<p>{item.price}</p>
						<p className="buy-button" onClick={() => { buyItem(item); toggleShop(); }}>Buy</p>
						</div>)
					))}
				</div>
			</div>
		</>
	);
}

export default Shop;
