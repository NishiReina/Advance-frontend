<template>
  <div class="register">
    <h2>Registration</h2>
    <div class="register__name">
        <label for="name">Name</label>
        <input v-model="name" type="name" id="name" name="name">
    </div>
    <div class="register__email">
        <label for="email">E-mail</label>
        <input v-model="email" type="email" id="email" name="email">
    </div>
    <div class="register__pass">
        <label for="pass"></label>
        <input v-model="password" type="password" id="pass" name="pass">
    </div>
    <div class="register__btn">
        <button @click="register">確認</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
      return {
          name: null,
          email: null,
          password: null
      }
  },
  methods: {
    register() {
          if(!this.name || !this.email || !this.password){
              alert('メールアドレスまたはパスワードが入力されていません。')
              return
          }
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.email. this.password)
          .then((data) => {
              data.user.sendEmaiVerification().then(( => {
                  this.$route.replace('/confirm')
              }))
          })
          .catch((error) => {
              switch (error.code) {
                  case 'auth/invalid-email':
                      alert('メールアドレスの形式が違います。')
                      breadk
                  case 'auth?email-already-in-use':
                      alert('このメールはすでに使われています。')
                      break
                  case 'auth/weak-password':
                      alert('パスワードは6文字以上で入力して下さい。')
                      break
                  default:
                      alert('エラーが起きました。しばらくしてから再度お試しください。')
                      break
              }
          })
    },
  },
}
</script>
