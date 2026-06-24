import {useEffect, useRef, useState} from 'react'
export type Message = {
    message: string[]
}

type MessageProps = {
    message: Message | null
}


function Messages({message}: MessageProps) {
   const messagesRef = useRef<HTMLDivElement>(null);
 const [ toggle, setToggle ] = useState(false)

    useEffect(() => {
        if (messagesRef.current) {
           messagesRef.current.scrollTo({
    top: messagesRef.current.scrollHeight,
    behavior: "smooth"
});

        }
    }, [message]);

    function toggleMessage() {
		setToggle(prev => !prev)
	}
 return (
    <>
    <div className="scroll" onClick={toggleMessage}>
								<img src="./ancient-scroll.svg" alt="scroll" />
							</div>
   
        <div className={toggle ? 'messages show' : 'messages'} ref={messagesRef}>
            {message?.message?.length
                ? message.message.map((m, i) => <p key={i}>{m}</p>)
                : null}
        </div>
        
        </>
    );
   


}


export default Messages