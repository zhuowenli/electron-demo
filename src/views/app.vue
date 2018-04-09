<template lang="pug">
    #app
        .container
            //- main-header()
            transition(name="fade" mode="out-in")
                router-view()
        //- main-footer
</template>

<script>
// import mainHeader from '../components/main-header';
// import mainFooter from '../components/main-footer';

export default {
    // components: { mainHeader, mainFooter },
    data() {
        return {};
    },
    mounted() {
    },
    methods: {
        // ...mapActions(['fetchUserInfo'])
    }
};
</script>

<style lang="sass">
    @import '../stylesheet/app.sass'
</style>

