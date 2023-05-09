<template>
    <section class="s1">
        <div class="s1__bg">
            <div class="blob">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800" opacity="0.58">
                    <defs>
                        <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feGaussianBlur stdDeviation="45" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                        </filter>
                    </defs>
                    <g filter="url(#bbblurry-filter)">
                        <ellipse rx="137" ry="150" cx="315.62125179302257" cy="276.4261052693695" fill="hsla(174, 73%, 54%, 1.00)"></ellipse>
                        <ellipse rx="137" ry="150" cx="554.7213356555762" cy="406.82343863467145" fill="hsla(330, 66%, 57%, 1.00)"></ellipse>
                        <ellipse rx="137" ry="150" cx="222.26721464162847" cy="566.9791017245959" fill="hsla(204, 60%, 68%, 1.00)"></ellipse>
                    </g>
                </svg>
            </div>

            <div class="blob">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800">
                    <defs>
                        <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feGaussianBlur stdDeviation="41" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                        </filter>
                    </defs>
                    <g filter="url(#bbblurry-filter)">
                        <ellipse rx="150" ry="150" cx="413.11874565404116" cy="441.67554669604874" fill="hsla(0, 94%, 48%, 1.00)"></ellipse>
                        <ellipse rx="150" ry="150" cx="214.05204884793739" cy="454.33774091311153" fill="hsla(38, 89%, 40%, 1.00)"></ellipse>
                    </g>
                </svg>
            </div>
        </div>
        <SwiperSliderMain
            class="channel__slider"
            :title="'Online TV'"
            :subtitle="'More Than 120+ Channels'"
            :mainLink="'/'"
            :description="true"
            :autoplay="true"
            :delay="5000"
            :slidesPerView="'7'"
            :centered="false"
            :rows="1"
            :elements="tvChannels"
            :spaceBetween="5"
            :navigation="true"
            :loop="false"
            :slidesPerGroup="5"
            :breakpoints="{
                0: {
                    slidesPerView: '2.2',
                    slidesPerGroup: 2,
                },
                600: {
                    slidesPerView: '3',
                    slidesPerGroup: 2,
                },
                900: {
                    slidesPerView: '4',
                    slidesPerGroup: 3,
                },
                1100: {
                    slidesPerView: '5',
                    slidesPerGroup: 4,
                },
                1300: {
                    slidesPerView: '6',
                    slidesPerGroup: 5,
                },
            }"
            :speed="400"
            :width="100 + '%'"
            :height="'auto'">
            <swiper-slide v-for="item in tvChannels" :key="tvChannels.indexOf(item)">
                <div class="slider__item channel">
                    <router-link class="swiper-link" :to="item.link"></router-link>
                    <div class="slider__img channel">
                        <img :src="item.img" alt="" />
                    </div>
                </div>
            </swiper-slide>
        </SwiperSliderMain>

        <SwiperSliderMain
            class="channel__slider"
            :title="'Most Watched'"
            :subtitle="'Most Watched Movies Of All The Time'"
            :mainLink="'/'"
            :description="true"
            :slidesPerView="'6'"
            :rows="1"
            :spaceBetween="12"
            :autoplay="true"
            :delay="4500"
            :navigation="true"
            :loop="false"
            :slidesPerGroup="1"
            :breakpoints="posterSliderOptions"
            :speed="300"
            :width="100 + '%'"
            :height="'auto'">
            <swiper-slide v-for="item in data.filter((e) => e.rating >= 7.5).sort((a, b) => b.rating - a.rating)" :key="data.indexOf(item)">
                <SliderElement :data="item" />
            </swiper-slide>
        </SwiperSliderMain>

        <hr class="break" />

        <SwiperSliderMain
            class="channel__slider"
            :title="'Movies'"
            :subtitle="'Watch Your Favourite Movies'"
            :mainLink="'/'"
            :description="true"
            :slidesPerView="'6'"
            :rows="1"
            :spaceBetween="12"
            :autoplay="true"
            :delay="4000"
            :navigation="true"
            :loop="false"
            :slidesPerGroup="1"
            :breakpoints="posterSliderOptions"
            :speed="300"
            :width="100 + '%'"
            :height="'auto'">
            <swiper-slide v-for="item in data.filter((e) => e.type.toLowerCase() === 'movie')" :key="data.indexOf(item)">
                <SliderElement :data="item" />
            </swiper-slide>
        </SwiperSliderMain>

        <hr class="break" />

        <SwiperSliderMain
            class="channel__slider"
            :title="'Series'"
            :subtitle="'Watch Your Favourite Series All Day'"
            :mainLink="'/'"
            :description="true"
            :slidesPerView="'6'"
            :rows="1"
            :spaceBetween="12"
            :autoplay="true"
            :delay="4500"
            :navigation="true"
            :loop="false"
            :slidesPerGroup="1"
            :breakpoints="posterSliderOptions"
            :speed="300"
            :width="100 + '%'"
            :height="'auto'">
            <swiper-slide v-for="item in data.filter((e) => e.type.toLowerCase() === 'series')" :key="data.indexOf(item)">
                <SliderElement :data="item" />
            </swiper-slide>
        </SwiperSliderMain>

        <hr class="break" />
    </section>
</template>

<script>
import SwiperSliderMain from "@/components/Swiper-Slider/SwiperSliderMain.vue";
import {SwiperSlide} from "swiper/vue";
import SliderElement from "@/components/Swiper-Slider/SliderElement.vue";
import data from "@/data";

export default {
    components: {
        SwiperSliderMain,
        SwiperSlide,
        SliderElement,
    },

    data() {
        return {
            data: data,
            posterSliderOptions: {
                0: {
                    slidesPerView: "2.2",
                },
                450: {
                    slidesPerView: "3",
                },
                650: {
                    slidesPerView: "4",
                },
                1100: {
                    slidesPerView: "6",
                },
            },
            tvChannels: [
                {img: require("@/assets/img/channels/1.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/2.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/3.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/4.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/5.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/6.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/7.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/8.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/9.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/10.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/11.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/12.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/13.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/14.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/14.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/16.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/18.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/19.png"), link: "/", category: "News"},
                {img: require("@/assets/img/channels/20.png"), link: "/", category: "News"},
            ],
        };
    },
};
</script>

<style lang="scss">
.channel__slider {
    padding: 0 30px;
    margin: 60px 0 8vw;

    @media screen and (max-width: 720px) {
        margin: 60px 0;
        padding: 0 15px;
    }

    @media screen and (max-width: 450px) {
        margin: 60px 0;
        padding: 0 10px;
    }
}

.s1 {
    position: relative;

    .break {
        width: 97%;
        height: 1px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.274);
        border: none;

        @media screen and (max-width: 720px) {
            display: none;
        }
    }

    .s1__bg {
        .blob {
            position: absolute;
            height: 900px;
            display: flex;
            top: 0;
            left: 0;
            justify-content: center;
            align-items: center;

            &:nth-child(2) {
                height: 130vh;
                top: 65vh;
                right: 0;
                left: auto;
                opacity: 0.5;
            }

            svg {
                height: 100%;
                width: 100%;
            }
        }
    }
}
</style>
