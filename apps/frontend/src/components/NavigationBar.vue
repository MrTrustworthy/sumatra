<template>
    <v-list>

        <v-list-item id="tab-home">
            <v-list-item-icon>
                <img src="../assets/icon.png" width="32" height="32"/>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title class="title">Sumatra</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>


        <v-list-item id="tab-about" :to="{name: 'about'}">
            <v-list-item-icon>
                <v-icon>help</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

    </v-list>
</template>
<script>
    export default {
        name: "NavigationBar",
        components: {},
    };

</script>
