<template>
  <div class="login">
    <h2 class="login__ttl">Login</h2>
    <div class="login__email">
        <label for="email">E-mail</label>
        <input v-model="email" type="email" id="email" name="email">
    </div>
    <div class="login__pass">
        <label for="pass"></label>
        <input v-model="password" type="password" id="pass" name="pass">
    </div>
    <div class="login__btn">
        <button @click="login">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
      return {
          email: null,
          password: null
      }
  },
  methods: {
      login() {
          if(!this.email || !this.password){
              alert('メールアドレスまたはパスワードが入力されていません。')
              return
          }
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                this.$router.push('/user')
                alert('ログインが完了しました')
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        alert('メールアドレスの形式が違います。')
                        break
                    case 'auth/user-disabled':
                        alert('ユーザが無効になっています。')
                        break
                    case 'auth/user-not-found':
                        alert('ユーザが存在しません。')
                        break
                    case 'auth/wrong-password':
                        alert('パスワードが間違っております。')
                        break
                    default:
                        alert('エラーが起きました。しばらくしてから再度お試しください。')
                        console.log(error)
                        break
                }
            })
      },
  },
}
</script>
