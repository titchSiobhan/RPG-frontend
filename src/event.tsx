const API_URL = import.meta.env.VITE_API_URL
import type {ModeProps} from './explore';
import {useState, useEffect} from 'react'
function Events({setMessage, setMode}: ModeProps) {
const [event, setEvent] = useState<Event | null>(null);

type Event = {
   	eventID: number;
		
		message: string;
		rewards: any[];
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
        setEvent(data);
        setMessage(prev => ({
            message: [...(prev?.message ?? []), data.message]

        }))
       
        return
    }
    useEffect(() => {
        getEvent();
    }, [])

   useEffect(() => {
    const timer = setTimeout(() => {
        setMode('idle');
    }, 2000);

    return () => clearTimeout(timer);
}, []);

 return (
    <>
    <p>{event?.message} </p>

    </>
 )
   
}

export default Events