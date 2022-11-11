import { useState, useEffect } from 'react';
import bus from '../../utils/bus';

import './Message.css';

export function Message() {

    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    // alterar os dados da flash message
    useEffect(() => {

        bus.addListener('flash', ({message, type}) => {
            setVisibility(true)
            setMessage(message)
            setType(type)

            setTimeout(() => {
                setVisibility(false)
            }, 3000)
        })

    }, [])

    return (
        visibility && (
            <div className={`message ${type}`}>
                {message}
            </div>
        )
    )
}