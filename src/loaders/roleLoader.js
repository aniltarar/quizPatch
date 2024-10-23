import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { redirect } from "react-router-dom"
import { auth, db } from "~/firebase/firebaseConfig"

export const roleLoader = async (requiredRole) => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                resolve(redirect("/login"))
            } else {
                const userRef = doc(db,"users",user.uid)
                const userDoc = await getDoc(userRef)
                
                if (userDoc.exists()) {
                    const userData = userDoc.data()
                    if(requiredRole.includes(userData.userRole)){
                        resolve(null)
                    }else{
                        resolve(redirect("/login"))
                    }
                } else {
                    resolve(redirect("/login"))
                }
               
            }
        })
    })
}