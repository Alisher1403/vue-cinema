import {createRouter, createWebHashHistory} from "vue-router";
import MainPage from "./components/Pages/MainPage/MainPage.vue";
import Watch from "./components/Pages/Watch/Watch.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: "/", component: MainPage, alias: "/"},
        {path: "/watch", component: Watch},
    ],
});
