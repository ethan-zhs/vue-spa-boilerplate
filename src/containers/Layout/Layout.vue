
<template>
    <div id="wrapper" :class="$style.layout">
        <Nav type="main" />        
        <div :class="$style.container">
            <Header />
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Footer from '../../components/Footer/index.vue';
import Header from '../../components/Header/index.vue';
import Nav from '../../components/Nav/index.vue';

export default {
    name: 'app',
    components: {
        Header,
        Footer,
        Nav
    },
    mounted() {
    }
};
</script>

<style lang="stylus" module>
    .layout {
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        width: 100%;
        min-height: 100%;
        background: #001529;

        .container {
            min-height: 100%;
            width: calc(100% - 240px);
            background: #f0f2f5;
        }
    }    
</style>