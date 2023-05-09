<template>
    <div class="slider__item poster">
        <router-link class="swiper-link" :to="data.link"></router-link>
        <div class="slider__img poster">
            <img :src="data.img" alt="" />
            <div class="slider__control">
                <div class="category">{{ data.category }}</div>
                <div class="slider__control-bottom">
                    <div class="rating">{{ data.rating }}<i class="fal fa-star"></i></div>
                    <div class="date">{{ data.descr.date }}</div>
                </div>
            </div>
        </div>
        <div class="slider__info poster">
            <h4 class="slider__title">{{ data.title }}</h4>
            <p class="slider__descr" :style="{color: data.status.toLowerCase() === 'free' ? 'green' : 'auto'}">{{ data.status }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
    },
};
</script>

<style lang="scss">
.slider__item {
    overflow: hidden;

    &.poster {
        width: 100%;
        aspect-ratio: 3 / 5;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        position: relative;

        @media screen and (max-width: 800px) {
            &:hover{
                .slider__control{
                    display: none;
                }
            }
        }

        &:hover {
            .slider__img::after {
                opacity: 1;
            }

            .slider__img {
                img {
                    transform: scale(1.05);
                }

                .slider__control {
                    &::after {
                        opacity: 0.8;
                    }

                    .category {
                        opacity: 1;
                    }

                    .slider__control-bottom {
                        opacity: 1;
                    }
                }
            }
        }

        .slider__img {
            height: 100%;
            position: relative;
            overflow: hidden;

            &::after {
                content: "";
                height: 100%;
                width: 100%;
                background: rgba(0, 0, 0, 0.14);
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
                transition: 0.1s;
            }

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                transition: 0.2s;
            }

            .slider__control {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;

                &::after {
                    content: "";
                    background: linear-gradient(
                        0deg,
                        rgba(7, 7, 7, 0.9024859943977591) 0%,
                        rgba(7, 7, 7, 0.8464635854341737) 15%,
                        rgba(7, 7, 7, 0.649) 30%,
                        rgba(7, 7, 7, 0.544) 45%,
                        rgba(7, 7, 7, 0.449) 60%,
                        rgba(7, 7, 7, 0.267) 77%,
                        rgba(7, 7, 7, 0) 94%
                    );
                    position: absolute;
                    opacity: 0.3;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 30%;
                    width: 100%;
                    transition: 0.2s;
                }

                .category {
                    position: absolute;
                    top: 2%;
                    right: 2%;
                    background: rgba(58, 58, 58, 0.171);
                    backdrop-filter: blur(20px);
                    color: white;
                    border-radius: 15px;
                    opacity: 0;
                    font-family: var(--font-regular);
                    font-size: 0.7vw;
                    letter-spacing: 0.2px;
                    padding: 5px 10px;
                    text-transform: lowercase;
                }

                .slider__control-bottom {
                    position: absolute;
                    bottom: 3%;
                    left: 5%;
                    right: 0;
                    font-size: 1.3vw;
                    font-family: var(--font-regular);
                    color: rgb(235, 235, 235);
                    text-align: start;
                    z-index: 1;
                    transition: 0.2s;
                    opacity: 0;

                    .rating {
                        display: flex;
                        align-items: center;
                        font-size: 1vw;
                        margin-bottom: 0.2vw;

                        i {
                            font-size: 0.9vw;
                            margin-left: 0.4vw;
                        }
                    }
                }
            }
        }
    }

    &.channel {
        aspect-ratio: 8 / 6;
        width: 100%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        border-radius: 0px;
        overflow: hidden;

        &:hover {
            background: rgba(255, 255, 255, 0.281);
        }
    }

    .slider__img {
        height: 100%;
        width: 100%;

        img {
            object-fit: contain;
            height: 100%;
            width: 100%;
        }

        &.channel {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                height: 60%;
                width: 80%;
            }
        }
    }

    .slider__info {
        text-align: start;
        color: rgb(230, 230, 230);
        z-index: 5;

        .slider__title {
            font-size: 1.3vw;
            overflow: hidden;
            font-family: var(--font-regular);
            margin: 2.2% 0 0.1vw;
            width: 100%;
            white-space: nowrap;
            font-weight: normal;
            display: inline-block;
            text-transform: uppercase;

            @media screen and (max-width: 1200px) {
                &{
                    font-size: 16px;
                    margin: 8px 0 0;
                }
            }

            @media screen and (max-width: 580px) {
                &{
                    font-size: 16px;
                    margin: 8px 0 0;
                }
            }
        }

        .slider__descr {
            font-size: 0.8vw;
            color: rgba(185, 9, 9, 0.918);
            font-family: var(--font-regular);
            text-transform: capitalize;

            @media screen and (max-width: 1200px) {
                &{
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
