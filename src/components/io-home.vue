<template>
    <div>
        <section class="hero is-info is-fullheight">
            <div class="hero-head">

            </div>

            <div class="hero-body">
                <div class="container">
                    <div class="column is-4 is-offset-4 home-content animated fadeIn">
                        <h2 class="title">
                            Investigación Operativa
                        </h2>
                        <hr>
                        <h3 class="subtitle">
                            Teoría de decisiones
                        </h3>
                        <a class="button is-info" @click.prevent="start">Comenzar</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'home',
        methods: {
            start(){
                this.$router.push({path: `/simulation`});
            }
        }
    }
</script>

<style src="./../assets/css/home.css" scoped>

</style>
