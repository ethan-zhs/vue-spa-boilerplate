
<template>
    <div id="wrapper" :class="$style.wrapper">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'app',
    mounted() {
        if (!localStorage.getItem('userId')) {
            this.$router.push('/login');
        }
    }
};
</script>

<style lang="stylus" module>
    .wrapper {
        width: 100%;
        height: 100%;
    }
</style>