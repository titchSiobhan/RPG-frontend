
const API_URL = import.meta.env.VITE_API_URL
import { useState } from "react";
function Settings() {
const[settingsToggle, setSettingsToggle] = useState(false)

  async  function deletePlayer() {
const response = await fetch(`${API_URL}player/delete`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
});
const data = await response.json();
console.log(data);
window.location.reload(); 
}

function toggleSettings() {
    setSettingsToggle(prev => !prev)
}
return (
    <>
    <img src="./public/settings.svg" alt="Settings" className="settings-image"  onClick={toggleSettings}/>

    <div  className={settingsToggle ? 'settings show' : 'settings'}>
        <button onClick={deletePlayer}>Delete Player</button>
    </div>
    </>
)
}
    


export default Settings