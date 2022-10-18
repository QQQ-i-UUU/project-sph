<template>
    <div>
        <h2>我是子组件</h2>
        <!-- 在子组件的input事件中来触发自定义事件 -->
        <input type="text" :value="value" @input="$emit('input',$event.target.value)">
        <span>{{value}}</span>
    </div>
</template>

<script>
    export default {
    name: 'Son',
    props:['value']
    }
</script>

<style lang="css" scoped>
    div{
        width: 100%;
        height: 50px;
        background-color: #ccc;
    }
</style>