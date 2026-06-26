
  export type MiniMessage = {
	  messages: string[]
  }
import { useEffect } from 'react'
  

  type MiniMessagesProps = {
  miniMessage: MiniMessage | null;
  setMiniMessage: React.Dispatch<React.SetStateAction<MiniMessage | null>>;
};
function MiniMessages({miniMessage, setMiniMessage}: MiniMessagesProps) {

if (!miniMessage) return null

useEffect(() => {
    if (miniMessage) {
        setTimeout(() => {
            setMiniMessage(null)
        }, 2000)
    }
}, [])
return (
<div className="mini-messages">
    {miniMessage && miniMessage.messages.map((m, i) => <p key={i}>{m}</p>)}
</div>
)

}


export default MiniMessages