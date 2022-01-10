<script>

import axios from 'axios';

export default {
    name: 'Bonne',
    props: {
        msg: String,
        data: String
    },
    mounted() {
        // gestion des cookies : https://www.npmjs.com/package/vue-cli-plugin-cookie
        
        if(!this.$cookie.get('jwt_cookie')) {
            let data_cookie = new FormData();
            data_cookie.set('cookie', 'generate');
            data_cookie.set('appCodeName', navigator.appCodeName);
            data_cookie.set('appVersion', navigator.appVersion);
            data_cookie.set('language', navigator.language);
            data_cookie.set('platform', navigator.platform);
            data_cookie.set('product', navigator.product);
            data_cookie.set('productSub', navigator.productSub);
            data_cookie.set('vendor', navigator.vendor);

            let xhr_cookie = axios({
                url: "http://local.fe.tld/connexion.php",
                method: 'post',
                data: data_cookie
            });

            xhr_cookie.then(response => {
                this.datas = response.data;
                this.$cookie.set('jwt_cookie', response.data.cookie);
                console.log(this.$cookie.get('jwt_cookie'));
            });

            xhr_cookie.catch(function (error) {
                console.log(error);
            });
        } // fin de si pas de cookie
        


        let jwt_token = localStorage.getItem("jwt_token");

        if(!jwt_token) {
            let data_connexion = new FormData();
            data_connexion.set('login', 'killian');
            data_connexion.set('password', 'motdepasse');
            data_connexion.set('cookie', this.$cookie.get('jwt_cookie'));

            let xhr_connexion = axios({
                url: "http://local.fe.tld/connexion.php",
                method: 'post',
                data: data_connexion
            });

            xhr_connexion.then(response => {
                this.datas = response.data;
                console.log(response.data);
                localStorage.setItem("jwt_token", response.data.jwt);
                localStorage.setItem("jwt_exp", response.data.exp);
                localStorage.setItem("jwt_refresh", response.data.jwt_refresh);
                jwt_token = response.data.jwt;
            });

            xhr_connexion.catch(function (error) {
                console.log(error);
            });
        } // fin de si pas de token



        let timenow = Math.round((new Date()).getTime()/1000);
        let jwt_exp = localStorage.getItem("jwt_exp");

        if(timenow > jwt_exp && jwt_exp) {
            let jwt_refresh = localStorage.getItem("jwt_refresh");

            let data_refresh = new FormData();
            data_refresh.set('cookie', this.$cookie.get('jwt_cookie'));
            data_refresh.set('jwt_refresh', jwt_refresh);

            let xhr_connexion = axios({
                url: "http://local.fe.tld/connexion.php",
                method: 'post',
                data: data_refresh
            });

            xhr_connexion.then(response => {
                this.datas = response.data;
                console.log(response.data);
                localStorage.setItem("jwt_token", response.data.jwt);
                localStorage.setItem("jwt_exp", response.data.exp);
                localStorage.setItem("jwt_refresh", response.data.jwt_refresh);
                jwt_token = response.data.jwt;
            });

            xhr_connexion.catch(function (error) {
                console.log(error);
            });
        }



        let xhr1 = axios({
            url: "http://local.fe.tld/api/hello/GET/data",
            method: 'get',
            headers: { 'Authorization': 'Bearer ' + jwt_token
         }
        });
        
        xhr1.then(response => {
            this.datas = response.data;
            console.log(response.data);
            console.log(response.data.data);
        });

        xhr1.catch(function (error) {
            console.log(error);
        });
    }
}
</script>

<template>
    <div class="bonne">{{ msg }}</div>
    <p>{{ data }}</p>
</template>

<style>
div.bonne{
    border: 1px dotted rgb(123, 123, 179);
}
</style>