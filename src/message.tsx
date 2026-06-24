
export type Message = {
    message: string[]
}

type MessageProps = {
    message: Message | null
}


function Messages({message}: MessageProps) {
   console.log(message, 'messages')
return (
    <>
    {message?.message?.length ? message.message.map((m, i) => (<p key={i}>{m}</p>)) : null}
    </>
)
}


export default Messages