const API_URL = import.meta.env.VITE_API_URL
import type {ModeProps} from './explore';

import {useState, useEffect} from 'react'
import { PlayerContext } from './context/playerContext';
import { useContext } from 'react';


function Events({setMessage, setMode, setMiniMessage  }: ModeProps) {
const [event, setEvent] = useState<Event | null>(null);
const {  setPlayer } = useContext(PlayerContext);
type Event = {
   	eventID: number;
		message: string;
		reward: any[];
		punishment: any[];
}
    async function getEvent() {
        const response = await fetch(`${API_URL}quest/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        setEvent(data.event);
        setMessage(prev => ({
            message: [...(prev?.message ?? []), data.message]

        }))
        setMiniMessage( {messages: [data.event.message]})
      setMessage((prev) => ({
				message: [...(prev?.message ?? []), data.event.message],
			}));
        setPlayer(data.player);

       
        return
    }
    useEffect(() => {
        getEvent();
    }, [])

   useEffect(() => {
    const timer = setTimeout(() => {
        setMode('idle');
    }, 1500);

    return () => clearTimeout(timer);
}, []);

 return (
    <>
    <p className='event'>{event?.message} </p>

    </>
 )
   
}

export default Events