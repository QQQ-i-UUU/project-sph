<template>
    <div>
        <h2>通过v-model实现父子组件通信</h2>
        <input type="text" v-model="msg">
        <span>{{msg}}</span>
        <p style="width:100%;height:1px;background-color: #000;margin:5px"></p>
        <!-- input事件，当input框内容发生变化就会调用一次。区别：change事件需要input框失去焦点 -->
        <!-- :value + input 事件  = v-model  -->
        <input type="text" :value="msg" @input="msg = $event.target.value">
        <span>{{msg}}</span>
        <p style="width:100%;height:1px;background-color: #000;margin:5px"></p>
        <!-- 给子组件传 props 数据 -->
        <Son :value="msg" @input="msg=$event"></Son>
        <!-- 简化写法 -->
        <Son v-model="msg"></Son>
    </div>
</template>

<script>
import Son from './son.vue'
    export default {
    name: 'Test',
    data() {
        return {
                msg:'QQQiUUU',
            }
    },
    components: { Son },

    }
</script>

<style lang="scss" scoped>

</style>