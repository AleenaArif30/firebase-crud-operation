import { auth, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification,  signInWithPopup, GoogleAuthProvider, provider,db, collection, addDoc,doc, setDoc,getDocs,updateDoc ,serverTimestamp  ,arrayUnion, arrayRemove  } from "./firebase.js"




let signup =  () => {
    let email = document.getElementById('email').value
    let password = document.getElementById("password").value
    let name = document.getElementById("name").value
    let phoneno = document.getElementById("phone-no").value
    let userData = {name,phoneno,email,password}
    console.log(userData)
    createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed up 
            const user = userCredential.user;
            
            alert("account created successfully")

            //add doc

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     userData,
//     userId:user.uid

//   });
  
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

//setdoc

try {
    await setDoc(doc(db, "users", user.uid), {
        ...userData,
        uID:user.uid
      });
      
  
    
    
    console.log("Document written with ID: ", user.uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }



            /*setTimeout(() => {
                window.location.href = "./dashboard.html"
            }, 3000)
            alert("login success")*/

            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    // ...
                    console.log("email verification sent")
                        .catch((error) => {
                            console.log(error.message)
                        })
                });
        })

        .catch((error) => {

            const errorcode = error.code
            if (errorcode === "auth/weak-password" || errorcode === "auth/missing-password") {
                alert("password should be 6 charater long")
            }
            else if (errorcode == "auth/email-already-in-use") {
                alert("user alreay exist")
            }

            else if (errorcode == "auth/invalid-email") {
                alert("please enter valid email")
            }
            else {
                console.log(error.message)
            }



        });
}
let sign_up = document.getElementById('sign-up')
sign_up.addEventListener("click", signup)



onAuthStateChanged(auth, (user) => {
    if (user) {
    
        // console.log(user)
        // window.location.href = "./dashboard.html"
        // ...
    } else {
        // User is signed out
        // ...
        console.log("no user available")
    }
});


/*let signout = () => {
    if (auth.currentUser) {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout")
        }).catch((error) => {
            // An error happened.
            console.log(error.message)
        });

    }
}
let sign_out = document.getElementById("sign-out")
sign_out.addEventListener('click', signout)*/


let goodlesignup = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log(user)
        }).catch((error) => {
            // Handle Errors here.

            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(error.message)
            console.log(email, credential)
        });

}

let google_signup = document.getElementById("google-signup")
google_signup.addEventListener("click", goodlesignup)

//Read data firestore

let getUserData = async()=>{
    const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => `,doc.data());
});

}
getUserData()

//update from firebase,servertimestamp,arrayunion,arrayremove
let updatepro = async()=>{
let name = document.getElementById('name').value;
let phoneno = document.getElementById("phone-no").value
console.log(auth.currentUser.uid)
let id = auth.currentUser.uid;
try{
    const washingtonRef = doc(db, "users", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {name,phoneno,timestamp: serverTimestamp(),class:"10",subjects:["english","urdu","math"],subjects:arrayUnion("science","physics"),subjects:arrayRemove("urdu"),subjects:arrayUnion("physics") });
    console.log("updated")
    
}catch(error){
console.log(error.message)
}
}
let update = document.getElementById("update")
update.addEventListener("click",updatepro)


