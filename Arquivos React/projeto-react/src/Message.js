import styles from "./Message.module.css"
import { useState } from "react"
import { useEffect } from "react"
function Message({ type, msg }) {
    const [visible, Setvisible] = useState(false)

    useEffect(() => {
        if (!msg) { // se a mensagem não existe Setvisible recebe false e no caso contrário é true
            Setvisible(false)
            return
        }
        Setvisible(true)

        const timer = setTimeout(() => { // fazer a mensagem sumir após 3 segundos
            Setvisible(false)
        }, 3000)

        return () => clearTimeout(timer)



    }, [msg])
    return (
    <>
       {visible && (
           <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
           )}
    </>

   
    
    
    )
}



export default Message