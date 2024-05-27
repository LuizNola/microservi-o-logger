interface IMessage {
    appName: string,
    function: string,
    body: any
}

export function validateMessage(message: IMessage){
    console.log(message)
    if(!message.appName || !message.function || !message.body){
        return false
    }

    return true
}