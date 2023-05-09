<template>
    <div class="swiper__content" :class="{gV: btnStatus}" @mouseenter="iconStatus = true" @mouseleave="iconStatus = false">
        <h1 class="swiper-title">
            <router-link :to="mainLink" class="router-link">{{ title }} <i class="fas fa-chevron-right" :class="{visible: iconStatus}"></i></router-link>
        </h1>
        <p class="swiper__subtitle">{{ subtitle }}</p>

        <div class="swiper-wrapper-main" :style="{height: height + ' !important', maxWidth: width}" @mouseenter="btnStatus = true" @mouseleave="btnStatus = false">
            <swiper
                :slidesPerView="slidesPerView"
                :spaceBetween="spaceBetween"
                :loop="loop"
                :speed="speed"
                :free-mode="true"
                :centered-slides="centered"
                :initial-slide="start"
                :slides-per-group="slidesPerGroup"
                :breakpoints="breakpoints"
                :navigation="
                    navigation
                        ? {
                              prevEl: '.slidePrev-btn',
                              nextEl: '.slideNext-btn',
                          }
                        : 'false'
                "
                :grid="{rows: rows}"
                :autoplay="
                    autoplay
                        ? {
                              delay: delay,
                              disableOnInteraction: false,
                          }
                        : false
                "
                :modules="modules"
                class="mySwiper">
                <slot> </slot>

                <button class="slidePrev-btn" :class="{visible: btnStatus}"><span></span><i class="far fa-chevron-left"></i></button>
                <button class="slideNext-btn" :class="{visible: btnStatus}"><span></span><i class="far fa-chevron-right"></i></button>
            </swiper>
        </div>
    </div>
</template>

<script>
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Autoplay, Grid} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

export default {
    props: {
        title: String,
        subtitle: String,
        height: String,
        width: String,
        slidesPerView: String,
        spaceBetween: Number,
        loop: Boolean,
        delay: Number,
        speed: Number,
        navigation: Boolean,
        rows: Number,
        slidesPerGroup: Number,
        link: String,
        description: Boolean,
        mainLink: String,
        autoplay: Boolean,
        centered: Boolean,
        start: Number,
        breakpoints: Object,
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            btnStatus: false,
            iconStatus: false,
        };
    },
    setup() {
        return {
            modules: [Grid, Navigation, Autoplay],
        };
    },
};
</script>

<style lang="scss">
.swiper-wrapper-main {
    height: 300px;
    position: relative;
}

.slideNext-btn,
.slidePrev-btn {
    z-index: 10;
    position: absolute;
    top: 50%;
    font-size: 40px;
    background: none;
    border: none;
    color: white;
    height: 100%;
    width: 100px;
    opacity: 0;
    cursor: pointer;
    transition: 0.2s;

    &.visible {
        opacity: 1;
    }
}

.slidePrev-btn {
    left: 0;
    translate: 0 -50%;

    &::after {
        content: "";
        height: 100%;
        width: 100%;
        opacity: 0.4;
        pointer-events: none;
        background: linear-gradient(
            90deg,
            rgba(7, 7, 7, 0.9024859943977591) 0%,
            rgba(7, 7, 7, 0.8464635854341737) 15%,
            rgba(7, 7, 7, 0.7848389355742297) 30%,
            rgba(7, 7, 7, 0.7036064425770308) 45%,
            rgba(7, 7, 7, 0.5215336134453781) 60%,
            rgba(7, 7, 7, 0.4290966386554622) 77%,
            rgba(7, 7, 7, 0) 94%
        );
        position: absolute;
        top: 0;
        right: 0;
        z-index: -1;
        transition: 0.3s;
    }
}

.slideNext-btn {
    right: 0;
    translate: 0 -50%;

    &::after {
        content: "";
        height: 100%;
        width: 120px;
        opacity: 0.4;
        pointer-events: none;
        background: linear-gradient(
            90deg,
            rgba(7, 7, 7, 0.9024859943977591) 0%,
            rgba(7, 7, 7, 0.8464635854341737) 15%,
            rgba(7, 7, 7, 0.7848389355742297) 30%,
            rgba(7, 7, 7, 0.7036064425770308) 45%,
            rgba(7, 7, 7, 0.5215336134453781) 60%,
            rgba(7, 7, 7, 0.4290966386554622) 77%,
            rgba(7, 7, 7, 0) 94%
        );
        position: absolute;
        rotate: 180deg;
        top: 0;
        right: 0;
        z-index: -1;
        transition: 0.3s;
    }
}

@media screen and (max-width: 700px) {
    .slideNext-btn,
    .slidePrev-btn {
        display: none;
        visibility: collapse;
    }
}

.swiper {
    width: 100%;
    height: 100%;
    user-select: none;
    // height: calc((100% - 30px) / 3) !important;
}

.swiper__content {
    position: relative;
    overflow: hidden;

    &.navigationFalse {
        &::after {
            display: none;
        }

        &::before {
            display: none;
        }
    }

    &.gV {
        &::after {
            opacity: 0.6;
        }

        &::before {
            opacity: 0.6;
        }
    }

    .swiper-title {
        margin: 15px 0 5px;
        opacity: 0.9;
        display: inline-block;
        transition: 0.2s;

        @media screen and (max-width: 720px) {
            margin: 15px 0 10px;
        }

        &:hover {
            opacity: 1;
            text-shadow: 0px 2px 15px rgba(255, 255, 255, 0.607);
        }

        .router-link {
            color: white;
            font-family: var(--font-regular);
            font-size: 40px;
            display: inline-flex;
            align-items: center;
            line-height: 100%;

            @media screen and (max-width: 720px) {
                font-size: 30px;
            }

            i {
                font-size: 25px;
                line-height: 100%;
                opacity: 0;
                transition: 0.2s;
                margin-left: 20px;

                &.visible {
                    opacity: 1;
                }
            }
        }
    }

    .swiper__subtitle {
        color: rgb(170, 52, 52);
        margin: 6px 0 25px 2px;

        @media screen and (max-width: 720px) {
            font-size: 15px;
            margin: 0 0 15px;
        }
    }
}

.swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    position: relative;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper-link {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
