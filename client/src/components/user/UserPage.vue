<template>
    <v-container>
        <v-row>
            <v-btn @click="logout">Выйти</v-btn>
            <div>Пользователь {{user}}</div>
        </v-row>
    </v-container>
</template>

<script>

    import UserService from '../../service/UserService'

    export default {
        name: 'user-page',
        data() {
            return {
                user: {}
            }
        },
        async created() {
            let username = this.$route.params.username;
            this.user = await UserService.getUser(username);
        },

        methods:{
            logout(){
                this.$session.clear();
                this.$router.push('/');
            }
        }
    }
</script>