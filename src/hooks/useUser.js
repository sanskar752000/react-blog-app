import { getAuth, onAuthStateChanged } from "firebase/auth"
import React from "react"
const useUser = () => {

    const [user, setUser] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true)


    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user)
            setIsLoading(false)
        })
        return unsubscribe;
    }, []) 
    return { user, isLoading }
}

export default useUser;