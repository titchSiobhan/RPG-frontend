import { useContext, useState} from "react";
import { PlayerContext } from "./context/playerContext";
const API_URL = import.meta.env.VITE_API_URL


function Inventory() {
   const [toggle, setToggle] = useState(false);
const { player, setPlayer} = useContext(PlayerContext);
if (!player) return
const inventory = player.inventory 

type Item = {
    id: number;
    name: string;
    type: string;
    effect: any[];
    price: number;
    level: number;
};

async function equipItem(item: Item) {
    
    const itemId = item.id;
    const response = await fetch(`${API_URL}player/equipItem/${itemId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await response.json();

    console.log(data.player);
    setPlayer({...player, ...data.player});
  
}
function toggleInventory() {
    setToggle(prev => !prev);
}


return (
    <>
        
            <button onClick={toggleInventory}>Inventory</button>
            <div className={toggle ? 'inventory show' : 'inventory'}>
                <div className={toggle ? 'inventory-close show' : 'inventory-close'} onClick={toggleInventory}>X</div>
                <div className="inventory-area">
                    {inventory.length === 0 ? <p>You don't have any items yet</p> : null}
            {inventory.map((item, id) => (
                <div key={id} onClick={() => {equipItem(item), toggleInventory()}} >
                    <p>{item.name}</p>
                </div>
            ))}
            </div>
       </div>
    </>
)
}

export default Inventory