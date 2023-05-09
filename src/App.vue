<template>
    <nav class="navigation" :class="{scrolled: navScroll}" @scroll="navScroll = true" :style="{padding: navScroll ? '0' : '20px 0', transition: '0.2s'}">
        <Navbar @openSidebar="sidebarStatus = true" />
    </nav>
    <Sidebar :status="sidebarStatus" @closeSidebar="sidebarStatus = false" click.stop />
    <router-view v-slot="{Component}">
        <transition name="route" mode="out-in">
            <component :is="Component"></component>
        </transition>
    </router-view>
    <footer>
        <Footer />
    </footer>
</template>

<script>
import Sidebar from "./components/Navbar/Sidebar.vue";
import "./assets/css/all.min.css";
import Navbar from "./components/Navbar/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",
    components: {
        Navbar,
        Sidebar,
        Footer,
    },

    data() {
        return {
            currentPath: window.location.hash,
            sidebarStatus: !Boolean,
            navScroll: false,
        };
    },

    mounted() {
        window.addEventListener("scroll", () => {
            window.scrollY > 0 ? (this.navScroll = true) : (this.navScroll = false);
        });

        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
            document.body.style.display = "none";
        };
    },

    methods: {},
};
</script>

<style>
@font-face {
    font-family: "SF-Pro-Regular";
    src: url(./assets/fonts/SFPRODISPLAYREGULAR.OTF);
}

@font-face {
    font-family: "SF-Pro-Light";
    src: url(./assets/fonts/FontsFree-Net-SFProDisplay-Light.ttf);
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--main-background);
    overflow: hidden;
}

::-webkit-media-controls {
    display: none !important;
}

:root {
    --font-regular: "SF-Pro-Regular";
    --font-light: "SF-Pro-Light";
    --main-background: #070707;
    --navbar-padding: 120px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: #070707;
}

::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
    background-color: #702424;
}

html {
    background: var(--main-background);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}

.container {
    max-width: 1550px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
}

.navigation {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 95;
}

@media screen and (max-width: 720px) {
    .navigation{
        padding: 1.5vw 0 !important;
    }

    .navigation.scrolled{
        padding: 0 !important;
    }
}

.navigation::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -5;
}

.navigation.scrolled::after {
    backdrop-filter: blur(20px);
    background: rgba(0, 0, 0, 0.234);
}

.route-enter-from {
    opacity: 0;
    transform: translateY(100px);
    pointer-events: all;
}

.route-enter-active {
    transition: all 0.4s ease-out;
    pointer-events: all;
}

.route-leave-to {
    opacity: 0;
    transform: translateY(-100px);
    pointer-events: none;
}

.route-leave-active {
    transition: all 0.4s ease-out;
    pointer-events: none;
}

.custom-block {
    color: white;
    background: rgba(255, 255, 255, 0.125);
    backdrop-filter: blur(10px);
    padding: 10px 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 100%;
    border-radius: 10px;
}

footer {
    background: #3737375a;
}
</style>
