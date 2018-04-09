<template lang="pug">
    #app
        webview#page1(
            allowpopups
            nodeintegration
            disablewebsecurity
            v-for="(item, inx) in users"
            :key="item.id"
            :partition="item.partition"
            :src="url"
        )
</template>

<script>
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            url: 'https://mms.pinduoduo.com/assets/chat-merchant/dist/index.html',
            users: [
                {
                    id: 9238744,
                    username: 'pdd6673148002',
                    password: 'Huanleguang275',
                    // partition: `persist:${Math.random()}`,
                },
                // {
                //     id: 667314,
                //     username: 'pdd92387441616',
                //     password: 'Huanleguang135',
                // },
            ]
        };
    },
    async mounted() {
        // await window.HLG.login();
        // const { request } = HLG;

        axios.get('http://mms.pinduoduo.com/mall')
            .then((resp) => {
                window.userInfo = resp.data;
            });
    }
};
</script>

<style lang="sass">

</style>
