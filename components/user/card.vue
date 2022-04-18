<template>
    <div class="card">
        <div class="card__img">
            <img :src="imgSrc"  alt="">
        </div>
        <p class="card__name">{{shop.name}}</p>
        <span class="card__city">#{{shop.city}}</span>
        <span class="card__genre">#{{shop.genre}}</span>
        <div class="card__btn">
            <NuxtLink :to="`user/shops/${shop.id}`">詳細</NuxtLink>
            <div class="card__hurt">
                <button v-if="!like" @click="nice(shop)">♡</button>
                <button v-else @click="unnice(shop)">♥</button>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
    props: {
        shop: {
            type: Object,
            // default: () => ({}),
        }
    },
    data() {
        return {
            imgSrc: "",
            uid: null,
            like: false,
        }
    },
    methods: {
        getImage(){
            this.imgSrc = this.shop.url;
        },
        async nice(shop){
            this.like = true

            const sendData = {
                shop_id: shop.id,
                uid: this.uid
            }
            const data = await this.$axios.post("http://127.0.0.1:8000/api/nice", sendData);
            console.log(data);
        },
        async unnice(shop){
            this.like = false
            const sendData = {
                shop_id: shop.id,
                uid: this.uid
            }
            console.log(sendData);
            try {
                const resData = await this.$axios.post("http://localhost:8000/api/nice/delete", sendData);
            } catch (error) {
                console.log(error);
            }
        },
        async getNice(shop){
            console.log(this.uid)
            const resData = await this.$axios.get("http://localhost:8000/api/nice/getStatus/" + shop.id, {params: {uid: this.uid}});
            if(resData.data.data){
                this.like=true;
            }else{
                this.like=false;
            }
        },
        getLogin(){
            firebase
            .auth()
            .onAuthStateChanged((user) => {
                if(user){
                    this.uid = user.uid;
                    console.log(this.uid);
                    this.getNice(this.shop);
                }else{
                    this.$router.replace('/login')
                }
            })
        }
    },
    mounted() {
        this.getImage();
        this.getLogin();
        console.log(this.uid);
    },
}
</script>
<style scoped>
.card{
    width: 100%;
}

.card__img{
    width: 100%;
}

img{
    width: 100%;
}
</style>