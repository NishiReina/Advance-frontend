<template>
<div class="shop">
    <div class="shop__detail">
        <p>{{$route.params.id}}</p>
        <h1 class="shop__name">{{shop.name}}</h1>
        <img :src="imgSrc" alt="">
        <p class="shop__area">#{{shop.city}}</p>
        <p class="shop__genre">#{{shop.genre}}</p>
        <p class="shop__overview">{{shop.overview}}</p>   
    </div>
    <div class="reservation">
        <p>予約</p>
        <validation-observer ref="obs" v-slot="ObserverProps">
            <validation-provider v-slot="{ errors }" rules="required">
                <input v-model="date" type="date">
                <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <validation-provider v-slot="{ errors }" rules="required">
                <input v-model="time" type="time" id="time" min="09:00" max="23:30" step="1800">
                <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <validation-provider v-slot="{ errors }" rules="required">
                <input v-model="num" type="number" id="number" min="1" max="40">
                <div class="error">{{ errors[0] }}</div>
            </validation-provider>
            <button @click="reserve()" :disabled="ObserverProps.invalid || !ObserverProps.validated">予約</button>
        </validation-observer>
    </div>
</div>
</template>
<script>
import firebase from '~/plugins/firebase'
export default{
    data(){
        return {
            shop: [],
            imgSrc: "",
            uid: null,
            date: null,
            time: null,
            num: null
        }
    },
    methods: {
        async getData(){
            const resData = await this.$axios.get("http://127.0.0.1:8000/api/shop/" + this.$route.params.id);
            this.shop = resData.data.data;
            console.log(this.shop);
            this.getImage()
        },
        getImage(){
            this.imgSrc = this.shop.url;
        },
        async reserve(){

            const sendData = {
                shop_id: this.$route.params.id,
                uid: this.uid,
                date: this.date,
                time: this.time,
                num: this.num
            };
            const resData = await this.$axios.post("http://127.0.0.1:8000/api/reserve", sendData);
            console.log(resData);
        },
        getLogin(){
            firebase
            .auth()
            .onAuthStateChanged((user) => {
                if(user){
                    this.uid = user.uid;
                    console.log(this.uid);
                }else{
                    this.$router.replace('/login')
                }
            })
        }
    },
    created() {
        this.getData();
        this.getLogin();
    }
}
</script>
