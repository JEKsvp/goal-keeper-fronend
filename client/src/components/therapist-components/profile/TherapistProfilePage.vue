<template>
    <div>
        <v-card tile>
            <v-card-title>
                <p>{{user.firstName}} {{user.lastName}} ({{user.username}})</p>
            </v-card-title>
            <v-card-subtitle class="subtitle-1 font-weight-bold">Обо мне:</v-card-subtitle>
            <v-card-text>
                <p>{{user.aboutMe}}</p>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "TherapistProfilePage",
        props: {
            user: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>