<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Ubuntu');
    @import "./../assets/css/animate.css";

    html {
        overflow-y: auto;
    }

    body {
        font-family: 'Ubuntu', sans-serif;
    }
</style>
