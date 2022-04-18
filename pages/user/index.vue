<template>
    <div class="index">
        <div>
            <NuxtLink :to="`user/${this.uid}`">mypage</NuxtLink>
        </div>
        <UserCard class="cards" v-for="(shop, index) in shops" :key="index" :shop="shops[index]"></UserCard>
    </div>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
    data(){
        return {
            shops: [],
            uid: null,
        }
    },
    methods: {
        async getContent(){
            const resData = await this.$axios.get("http://127.0.0.1:8000/api/shop");
            this.shops = resData.data.data;
            console.log(this.shops);
            console.log(typeof this.shops[1]);
        },
        getLoginUser(){
            firebase
            .auth()
            .onAuthStateChanged((user) => {
                if(user){
                    this.uid = user.uid;
                    console.log(this.uid);
                }else{
                    thid.$router.replace('/login');
                }
            })
        }
    },
    created() {
        this.getContent();
        this.getLoginUser();
    }
}
</script>
<style scoped>
.index{
  width: 100%;
  /* display: flex; */
}

.cards{
    width: 40%;
}
</style>