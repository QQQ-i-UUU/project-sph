<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <TodayRecommend></TodayRecommend>
        <GoodsRank></GoodsRank>
        <GuessYouLike></GuessYouLike>
        <GoodsFloor v-for="floor in floorList" :key="floor.id" :floorList="floor"></GoodsFloor>
        <GoodsBrands></GoodsBrands>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue';
import TodayRecommend from '@/pages/Home/Recommend/Recommend.vue';
import GoodsRank from '@/pages/Home/GoodsRank/GoodsRank.vue';
import GuessYouLike from '@/pages/Home/GuessYouLike/GuessYouLike.vue';
import GoodsFloor from '@/pages/Home/GoodsFloor/GoodsFloor.vue';
import GoodsBrands from '@/pages/Home/GoodsBrands/GoodsBrands.vue';
import { mapState } from 'vuex';
    export default {
    name: "HomeComponent",
    components: {
        ListContainer,
        TodayRecommend,
        GoodsRank,
        GuessYouLike,
        GoodsFloor,
        GoodsBrands
    },
    mounted() {
        //获取floor数据
        this.$store.dispatch('Home/getFloorList');
    },
    computed: {
        ...mapState('Home', ['floorList'])
    }
}
</script>

<style lang="scss" scoped>

</style>