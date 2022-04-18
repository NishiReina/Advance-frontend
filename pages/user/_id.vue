<template>
    <div class="mypage">
        <p>{{$route.params.id}}</p>
        <div class="like">
            <UserCard class="cards" v-for="(shop, index) in shops" :key="index" :shop="shops[index]"></UserCard>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            shops: [],
        }
    },
    methods: {
        async getLikeShops(){
            const params = {
                id: this.$route.params.id,
            }
            const resData = await this.$axios.get("http://localhost:8000/mypage/like/", {params});
            this.shops = resData.data.data;
        },


    },
    created() {
        this.getLikeShops();
    }
}
</script>