<template lang="pug">
    .home
        router-link(to="login")
            button login
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {};
    },
    mounted() {
        console.log(111);
    },
};
</script>

