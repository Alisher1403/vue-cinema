<template>
    <div class="header__container">
        <div class="header__bg">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>

        <div class="header__bg-main">
            <svg class="blob" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800">
                <defs>
                    <filter x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feGaussianBlur stdDeviation="86" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                    </filter>
                </defs>
                <g filter="url(#bbblurry-filter)">
                    <ellipse rx="138.5" ry="150" cx="335.6241455078125" cy="397.3312595199892" fill="hsla(39, 83%, 41%, 1.00)"></ellipse>
                    <ellipse rx="138.5" ry="150" cx="515.754393268777" cy="299.04891841526137" fill="hsla(0, 86%, 48%, 1.00)"></ellipse>
                </g>
            </svg>
        </div>

        <div class="header__content">
            <ImageTrack :elements="images" :parallaxIntensity="parallax" :dragIntensity="1.8" :width="width" :top="50" :left="10" />
        </div>
    </div>
</template>

<script>
import ImageTrack from "@/components/Image-Track-Slider/ImageTrack.vue";

export default {
    data() {
        return {
            images: [
                {src: require("@/assets/img/header/1.jpg"), title: "Action & Adventure"},
                {src: require("@/assets/img/header/2.jpg"), title: "Anime"},
                {src: require("@/assets/img/header/3.jpg"), title: "Thriller"},
                {src: require("@/assets/img/header/4.jpg"), title: "Sci-Fi & Fantasy"},
                {src: require("@/assets/img/header/5.jpg"), title: "Dramas"},
                {src: require("@/assets/img/header/6.jpg"), title: "Horror"},
                {src: require("@/assets/img/header/7.jpg"), title: "Documental"},
                {src: require("@/assets/img/header/8.jpg"), title: "History"},
                {src: require("@/assets/img/header/9.jpg"), title: "Cartoons"},
            ],

            width: 30,
            parallax: 120,
        };
    },

    methods: {
        adjustSize() {
            window.innerWidth <= 800 ? ((this.width = 70), (this.parallax = 0)) : window.innerWidth <= 1200 ? (this.width = 50) : (this.width = 30);
        },
    },

    unmounted() {
        window.removeEventListener("load", this.adjustSize());
        window.removeEventListener("resize", this.adjustSize());
    },

    mounted() {
        window.addEventListener("load", this.adjustSize());
        window.addEventListener("resize", this.adjustSize());
    },

    components: {
        ImageTrack,
    },
};
</script>

<style lang="scss">
.header__container {
    position: relative;
    height: 100vh;
    width: 100%;

    .header__bg {
        display: flex;
        justify-content: space-around;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;

        .line {
            background: rgba(106, 99, 99, 0.264);
            height: 100%;
            width: 0.03vw;
        }
    }

    .header__bg-main {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;

        .blob {
            position: absolute;
            opacity: 0.4;
            top: 0;
            right: 10%;
            height: 130%;
        }
    }
}
</style>
