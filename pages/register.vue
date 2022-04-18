<template>
  <div class="register">
    <h2>Registration</h2>
    <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{ errors }" rules="required">
            <div class="register__name">
                <label for="name">Name</label>
                <input v-model="name" type="name" id="name" name="name">
            </div>
            <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        <validation-provider v-slot="{ errors }" rules="required|email">
            <div class="register__email">
                <label for="email">E-mail</label>
                <input v-model="email" type="email" id="email" name="email">
            </div>
            <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        <validation-provider v-slot="{ errors }" rules="required|min:8">
            <div class="register__pass">
                <label for="password">password</label>
                <input v-model="password" type="password" id="password" name="password">
            </div>
            <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        <div class="register__btn">
            <button @click="register" :disabled="ObserverProps.invalid || !ObserverProps.validated">確認</button>
        </div>
    </validation-observer>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
      return {
        //   uid: null,
          name: null,
          email: null,
          password: null
      }
  },
  methods: {
    async register() {
        if(!this.name || !this.email || !this.password){
            alert('メールアドレスまたはパスワードが入力されていません。')
            return
        }

        // console.log(this.name);
        // console.log(this.email);
        // console.log(this.password);
        // console.log(firebase.auth().currentUser);
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
            data.user.sendEmailVerification().then(() => {
                const sendData = {
                    // id: data.user.uid,
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    uid: data.user.uid,
                };
                console.log(sendData);
                const backData = this.$axios.post("http://127.0.0.1:8000/api/", sendData);
                this.$router.replace('/login')
            })
        })
        .catch((error) => {
            switch (error.code) {
            case 'auth/invalid-email':
                alert('メールアドレスの形式が違います。')
                break
            case 'auth?email-already-in-use':
                alert('このメールはすでに使われています。')
                break
            case 'auth/weak-password':
                alert('パスワードは6文字以上で入力して下さい。')
                break
            default:
                alert('エラーが起きました。しばらくしてから再度お試しください。')
                console.log(error)
                break
            }
        })
    },
    async registerBackend(){
        this.getData();
        const sendData = {
            name: this.name,
            email: this.email,
            password: this.password,
            uid: this.uid
        };
        const backData = this.$axios.post("http://127.0.0.1:8000/api/", sendData);
    },
    async getData(){
        firebase.auth().onAuthStateChanged(async (user) => {
            this.uid = user.uid;
      });
    }
  },
}
</script>
