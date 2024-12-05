import{auth,signOut,onAuthStateChanged,doc,deleteDoc ,db}from "./firebase.js"


let signout = () => {
    if (auth.currentUser) {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout")
            setTimeout(()=>{
                window.location.href = "./index.html"
            },3000)

            history.pushState(null,null,window.location.href)
        }).catch((error) => {
            // An error happened.
            console.log(error.message)
        });

    }
}
let sign_out = document.getElementById("sign-out")
sign_out.addEventListener('click', signout)


onAuthStateChanged(auth, (user) => {
    if (!user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user)
        window.location.href = "./index.html"
        // ...
    } else {
        // User is signed out
        // ...
        console.log(" user available",user.email)
    }
});

//delete account from firestore
 

let deletedata = async()=>{
let id = auth.currentUser.uid
console.log(id)
/*await deleteDoc(doc(db, "users", auth.currentUser.uid));
console.log("account deleted")*/

}
let del = document.getElementById("delete")
del.addEventListener("click",deletedata)

