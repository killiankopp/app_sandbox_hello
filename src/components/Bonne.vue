<script>

import axios from 'axios';

export default {
    name: 'Bonne',
    props: {
        msg: String,
        data: String
    },
    mounted() {
        console.log('yeeees');
        let data = new FormData();
        data.set('login', 'killian');
        data.set('password', 'quantum2');

        let xhr = axios({
            url: "https://local.fe.tld/connexion.php",
            method: 'post',
            data
        });
        
        xhr.then(response => {
            this.datas = response.data;
            document.cookie = `jwt=${response.data.jwt}`;
            console.log(document.cookie);
        });

        xhr.catch(function (error) {
            console.log(error);
        });

        /*
        axios.get("https://local.fe.tld/api/", {
                headers: {
                'Authorization': 'Bearer' + 'le token',
                "Content-Type": "application/json",
                }
            })
            .then(response => {
                this.datas = response.data
                console.log(response.data);
            })
        .catch(function (error) {
                console.log(error);
            });
*/
        }
    }
</script>

<template>
    <div class="bonne">{{ msg }}</div>
    <p>{{ data }}</p>
</template>

<style>
div.bonne{
    border: 1px solid red;
}
</style>