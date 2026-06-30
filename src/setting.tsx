import { useState } from 'react';

function Settings() {
	const [settingsToggle, setSettingsToggle] = useState(false);

	function deletePlayer() {
		localStorage.removeItem('player');
		window.location.reload();
	}

	function toggleSettings() {
		setSettingsToggle((prev) => !prev);
	}
	return (
		<>
			<img
				src="./settings.svg"
				alt="Settings"
				className="settings-image"
				onClick={toggleSettings}
			/>

			<div className={settingsToggle ? 'settings show' : 'settings'}>
				<button onClick={deletePlayer} className="delete-player">Delete Player</button>
			</div>
		</>
	);
}

export default Settings;
