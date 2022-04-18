<template>
    <div class="default">
        <UserHeader></UserHeader>
        <Nuxt />
    </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
export default{

    // created() {
    //     const auth = getAuth();
    //     onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/firebase.User
    //         const uid = user.uid;
    //         // ...
    //     } else {
    //         // User is signed out
    //         // ...
    //     }
    //     });
    // }
}
</script>
