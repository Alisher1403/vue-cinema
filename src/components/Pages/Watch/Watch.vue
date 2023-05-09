<template>
    <div class="watch">
        <!-- <transition name="poster" mode="in-out"> -->
        <section class="movie__poster" v-if="!playerVisible">
            <div class="poster__bg"></div>
            <img class="poster__img" src="@/assets/img/most_watched/6.jpg" alt="" />
            <div class="poster__content">
                <div class="poster__left">
                    <img src="@/assets/img/most_watched/6.jpg" alt="" />
                </div>
                <div class="poster__right">
                    <div class="poster__top">
                        <p class="poster__date">{{ date }}</p>
                        <h1 class="poster__title">{{ movieName }}</h1>
                        <div class="poster__category">
                            <span v-for="item in category" :key="category.indexOf(item)"> {{ item }} <i class="fas fa-star-christmas" v-if="category.indexOf(item) != category.length - 1"></i> </span>
                        </div>
                        <p class="poster__description">{{ description }}</p>
                    </div>
                    <div class="poster__center">
                        <button class="like"><i class="fas fa-heart"></i><span>Like</span></button>
                        <button><img src="@/assets/icons/share.png" alt="" /><span>Share</span></button>
                        <div class="poster__rating">{{ rating }} <i class="fal fa-star"></i></div>
                    </div>
                    <div class="poster__bottom">
                        <button class="watch" @click="playerVisible = true">Watch Now</button>
                        <a href="#"><i class="fal fa-ellipsis-h"></i> Read More</a>
                    </div>
                </div>
            </div>
        </section>
        <!-- </transition> -->

        <transition name="player">
            <section class="player__section watch__container" v-if="playerVisible">
                <div class="player__content">
                    <VideoPlayer :src="videoLink" :name="movieName" :keycontrol="!textarea" ref="player" @getDuration="defineDuration" />
                </div>
            </section>
        </transition>

        <div class="break"></div>

        <section class="s1" v-if="playerVisible">
            <div class="s1__container watch__container">
                <div class="s1__slider">
                    <button class="custom-block active" @click="sliderBtnClick" :ref="sliderBtn" data-slide="0">Description</button>
                    <button class="custom-block" @click="sliderBtnClick" :ref="sliderBtn" data-slide="1">Actors and creators</button>
                    <button class="custom-block" @click="sliderBtnClick" :ref="sliderBtn" data-slide="2">Comments</button>
                </div>
                <!----->
                <!-- <transition name="transition-slider"> -->
                <div class="description" v-show="sliderIndex == 0">
                    <div class="description__left">
                        <div class="movie__img">
                            <img src="@/assets/img/most_watched/6.jpg" alt="" />
                        </div>
                    </div>

                    <div class="description__right">
                        <div class="movie__info">
                            <div class="custom-block movie__info-item">{{ movieInfo.date }}</div>
                            <div class="custom-block movie__info-item">{{ movieDuration < 3600 ? (movieDuration / 60).toFixed(2) : (movieDuration / 60).toFixed(0) }} min</div>
                            <div class="custom-block movie__info-item" v-for="cat in category" :key="cat">{{ cat }}</div>
                        </div>
                        <h2 class="movie__name">{{ movieName }}</h2>
                        <p class="movie__description">
                            {{ description }}
                        </p>
                    </div>
                </div>
                <!-- </transition> -->

                <!-- <transition name="transition-slider"> -->
                <div class="actors" v-show="sliderIndex == 1">
                    <div class="actor__list-wrapper">
                        <p class="actor__title">Actors</p>
                        <ul class="actors__list">
                            <li class="custom-block actor" v-for="actor in movieInfo.people.actors" :key="actor">
                                <img :src="actor.img" alt="" />
                                <p class="actor__name">{{ actor.name }}</p>
                            </li>
                        </ul>
                    </div>

                    <div class="actor__list-wrapper">
                        <p class="actor__title">Directors</p>
                        <ul class="actors__list">
                            <li class="custom-block actor" v-for="actor in movieInfo.people.directors" :key="actor">
                                <img :src="actor.img" alt="" />
                                <p class="actor__name">{{ actor.name }}</p>
                            </li>
                        </ul>
                    </div>

                    <div class="actor__list-wrapper">
                        <p class="actor__title">Producers</p>
                        <ul class="actors__list">
                            <li class="custom-block actor" v-for="actor in movieInfo.people.producers" :key="actor">
                                <img :src="actor.img" alt="" />
                                <p class="actor__name">{{ actor.name }}</p>
                            </li>
                        </ul>
                    </div>

                    <div class="actor__list-wrapper">
                        <p class="actor__title">Screenwriters</p>
                        <ul class="actors__list">
                            <li class="custom-block actor" v-for="actor in movieInfo.people.screenwriters" :key="actor">
                                <img :src="actor.img" alt="" />
                                <p class="actor__name">{{ actor.name }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- </transition> -->
                <!----->

                <div class="comments__wrapper" v-show="sliderIndex == 2">
                    <div class="newcomments">
                        <div class="title">Leave a comment:</div>
                        <div class="newcomments__top">
                            <div class="rating__wrapper">
                                <div class="rating__indicator">
                                    <div class="rating__num">{{ newRate }}.0</div>
                                    <span>your rating</span>
                                </div>
                                <div class="rating__stars">
                                    <span v-for="i in 10" :key="i" :ref="ratingStars"><i class="fas fa-star"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="input__wrapper">
                            <textarea rows="4" class="textarea" placeholder="Leave a comment" @focus="textarea = true" @focusout="textarea = false" v-model="textareaString" ref="textarea"></textarea>
                            <button class="submit" :class="{active: textareaString != ''}" @click="submitComment()" :disabled="textareaString == ''" ref="send" v-if="!changingComment">Send</button>
                            <button class="submit" :class="{active: textareaString != ''}" :disabled="textareaString == ''" ref="change" v-show="changingComment">Change</button>
                            <button class="submit cancel" v-if="cancelBtn" @click="cancelChange()">Cancel</button>
                        </div>
                    </div>
                    <div class="comments">
                        <div class="title">Comments</div>
                        <ul class="comments__list">
                            <li class="comment" v-for="comment in movieInfo.comments" :key="comment">
                                <div class="comment__buttons" v-if="comment.id == uAccount.id">
                                    <button class="change" @click="changeComment(comment.id, comment.commentId, comment.comment, comment.rate)">Change</button>
                                    <button class="delete" @click="deleteComment(comment.id, comment.commentId)">Delete</button>
                                </div>
                                <div class="user">
                                    <span>{{ comment.uName[0] }}</span>
                                    <p class="username">{{ comment.uName }}</p>
                                </div>
                                <p class="user__comment">{{ comment.comment }}</p>
                                <div class="comment__bottom">
                                    <p class="date">{{ comment.date }}</p>
                                    <div class="rating"><i class="fas fa-star"></i> {{ comment.rate }}.0</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-------->
            </div>
        </section>

        <div class="break" v-if="playerVisible"></div>

        <!---------------------------------------->

        <section class="s2 watch__container">
            <SwiperSliderMain
                :title="'More Similar'"
                :mainLink="'/'"
                :description="true"
                :rows="1"
                :spaceBetween="9"
                :autoplay="false"
                :navigation="true"
                :loop="false"
                :slidesPerGroup="1"
                :breakpoints="posterSliderOptions"
                :speed="400"
                :width="100 + '%'"
                :height="'auto'">
                <swiper-slide v-for="item in data.filter((e) => e.category.toLowerCase() === 'fantastic' || e.category.toLowerCase() === 'scientific-fantasy')" :key="data.indexOf(item)">
                    <SliderElement :data="item" />
                </swiper-slide>
            </SwiperSliderMain>
        </section>
    </div>
</template>

<script>
import VideoPlayer from "./videoPlayer.vue";
import actors from "@/actors.js";
import SwiperSliderMain from "@/components/Swiper-Slider/SwiperSliderMain.vue";
import {SwiperSlide} from "swiper/vue";
import SliderElement from "@/components/Swiper-Slider/SliderElement.vue";
import data from "@/data";

export default {
    components: {
        VideoPlayer,
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
                    slidesPerView: "4.5",
                },
                1050: {
                    slidesPerView: "5.5",
                },
                1350: {
                    slidesPerView: "6.5",
                },
            },
            videoLink: require("@/assets/videos/1.mp4"),
            movieName: "Interstellar",
            date: "2014, USA",
            category: ["drama", "cosmos", "science", "fantastic"],
            rating: "10.0",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

            playerVisible: false,
            movieDuration: 0,
            uAccount: {id: "11111", uName: "Anonymous"},
            movieInfo: {
                date: "2023, USA",
                comments: [
                    {
                        id: "12345",
                        uName: "Alisher",
                        commentId: 742365237861,
                        date: new Date().toLocaleString("en-US", {hour12: false}),
                        comment: "Wow the movie is amazing! Love your website 👍",
                        rate: 8,
                    },
                    {
                        id: "12345",
                        uName: "Alisher",
                        commentId: 742365237861,
                        date: new Date().toLocaleString("en-US", {hour12: false}),
                        comment: "Wow the movie is amazing! Love your website 👍",
                        rate: 8,
                    },
                    {
                        id: "12345",
                        uName: "Alisher",
                        commentId: 742365237861,
                        date: new Date().toLocaleString("en-US", {hour12: false}),
                        comment: "Wow the movie is amazing! Love your website 👍",
                        rate: 8,
                    },
                ],
                people: {
                    actors: [
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                        ...actors.filter((e) => e.name == "Tim Berners Li"),
                    ],
                    directors: [...actors.filter((e) => e.name == "Vinton Cerf"), ...actors.filter((e) => e.name == "Vinton Cerf"), ...actors.filter((e) => e.name == "Vinton Cerf")],
                    producers: [
                        ...actors.filter((e) => e.name == "William James Sidis"),
                        ...actors.filter((e) => e.name == "William James Sidis"),
                        ...actors.filter((e) => e.name == "William James Sidis"),
                        ...actors.filter((e) => e.name == "William James Sidis"),
                        ...actors.filter((e) => e.name == "William James Sidis"),
                        ...actors.filter((e) => e.name == "William James Sidis"),
                    ],
                    screenwriters: [
                        ...actors.filter((e) => e.name == "Jordano Bruno"),
                        ...actors.filter((e) => e.name == "Jordano Bruno"),
                        ...actors.filter((e) => e.name == "Jordano Bruno"),
                        ...actors.filter((e) => e.name == "Jordano Bruno"),
                        ...actors.filter((e) => e.name == "Jordano Bruno"),
                        ...actors.filter((e) => e.name == "Jordano Bruno"),
                    ],
                },
            },
            sliderBtns: [],
            sliderIndex: 0,
            userRating: [],
            newRate: 0,
            textarea: false,
            textareaString: "",
            userComment: false,
            cancelBtn: false,
            changingComment: false,
        };
    },

    methods: {
        defineDuration(duration) {
            this.movieDuration = Math.floor(duration);
        },

        sliderBtnClick: function (e) {
            this.sliderBtns.forEach((el) => el.classList.remove("active"));
            e.target.classList.add("active");
            this.sliderIndex = e.target.getAttribute("data-slide");
        },

        sliderBtn(el) {
            el && !this.sliderBtns.includes(el) ? this.sliderBtns.push(el) : null;
        },

        ratingStars(el) {
            el && !this.userRating.includes(el) ? this.userRating.push(el) : null;
            for (let i = 0; i < this.userRating.length; i++) {
                this.userRating[i].onmouseleave = () => {
                    this.userRating.forEach((item) => {
                        item.classList.remove("indicate");
                    });
                };

                this.userRating[i].onmouseenter = () => {
                    this.userRating.slice(0, i + 1).forEach((item) => {
                        item.classList.add("indicate");
                    });
                };

                this.userRating[i].onclick = () => {
                    this.userRating.forEach((item) => item.classList.remove("active"));
                    this.userRating.slice(0, i + 1).forEach((item) => {
                        item.classList.add("active");
                        this.newRate = i + 1;
                    });
                };
            }
        },

        submitComment() {
            this.movieInfo.comments.unshift({
                id: this.uAccount.id,
                uName: this.uAccount.uName,
                commentId: Date.now(),
                date: new Date().toLocaleString("en-US", {hour12: false}),
                comment: this.textareaString,
                rate: this.newRate,
            });
            this.newRate = 0;
            this.textareaString = "";
            this.userRating.forEach((item) => item.classList.remove("active"));
        },

        deleteComment(id, commentId) {
            if (id == this.uAccount.id) {
                this.cancelBtn = false;
                this.changingComment = false;
                const findComment = this.movieInfo.comments.findIndex((e) => e.commentId == commentId);
                this.movieInfo.comments.splice(findComment, 1);
                this.textareaString = "";
                this.newRate = 0;
                this.userRating.forEach((e) => e.classList.remove("active"));
            }
        },

        changeComment(id, commentId, comment, rate) {
            if (id == this.uAccount.id) {
                this.cancelBtn = true;
                this.textareaString = comment;
                this.newRate = rate;
                this.userRating.slice(0, rate).forEach((e) => {
                    e.classList.add("active");
                });
                this.$refs.textarea.focus();
                this.changingComment = !this.changingComment;
                const myComment = this.movieInfo.comments.find((e) => e.commentId == commentId);

                this.$refs.change.onclick = () => {
                    myComment.comment = this.textareaString;
                    myComment.rate = this.newRate;
                    this.textareaString = "";
                    this.newRate = 0;
                    this.userRating.forEach((e) => e.classList.remove("active"));
                    this.changingComment = false;
                    this.$refs.textarea.blur();
                    this.cancelBtn = false;
                };
            }
        },

        cancelChange() {
            this.textareaString = "";
            this.newRate = 0;
            this.userRating.forEach((e) => e.classList.remove("active"));
            this.changingComment = false;
            this.$refs.textarea.blur();
            this.cancelBtn = false;
        },
    },

    mounted() {
        window.scrollTo(0, 0);
    },
};
</script>

<style lang="scss">
.poster-enter-from {
    opacity: 0;
}

.poster-enter-active {
    opacity: 1;
    transition: all 0.3s ease-out;
}

.poster-leave-to {
    opacity: 0;
    transform: translateY(-100px);
}

.poster-leave-active {
    transition: all 0.3s ease-out;
}

/*=============================================*/

.player-enter-from {
    opacity: 0;
    transform: translateY(100px);
}

.player-enter-active {
    transition: all 0.5s ease-out;
}

.player-leave-to {
    opacity: 0;
    transform: translateY(-100px);
}

.player-leave-active {
    transition: all 0.4s ease-out;
}

/*=============================================*/

/*=============================================*/

.watch {
    --container-width: 1550px;
    --text-color: white;
    font-family: var(--font-light);
    background: #030303;

    .watch__container {
        max-width: var(--container-width);
        width: 100%;
        margin: 0 auto;
        padding: 0 15px;
    }

    .player__section {
        display: flex;
        justify-content: center;
        padding-bottom: 0;
        width: 100%;
        padding-top: calc(var(--navbar-padding) - 10px);

        .player__content {
            margin: 0 auto;
            width: 100%;
            // aspect-ratio: 10 / 5;
        }
    }

    .movie__poster {
        position: relative;
        height: 100vh;
        display: flex;
        align-items: center;

        @media screen and (max-width: 390px) {
            & {
                padding-top: 110px;
            }
        }

        .poster__bg {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.282);
            backdrop-filter: blur(15px);
            z-index: 1;
        }

        &::after {
            content: "";
            background: linear-gradient(180deg, #000000df 0%, #000000a8 43.62%, rgba(0, 0, 0, 0) 86.33%);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 18vh;
            z-index: 1;
        }

        &::before {
            content: "";
            background: linear-gradient(0deg, var(--main-background) 10%, #00000097 60.62%, rgba(0, 0, 0, 0) 100%);
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 40vh;
            z-index: 1;
        }

        .poster__img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        .poster__content {
            z-index: 2;
            position: relative;
            height: auto;
            display: flex;
            align-items: center;

            .poster__left {
                padding-left: 8vw;

                @media screen and (max-width: 1000px) {
                    & {
                        display: none;
                    }
                }

                img {
                    object-fit: cover;
                    height: 65vh;
                }
            }

            .poster__right {
                --margin-bottom: 20px;
                color: white;
                font-family: var(--font-light);
                max-width: 800px;
                width: 100%;
                padding: 0 20px;
                margin-left: 2vw;
                height: 100%;

                @media screen and (max-width: 1000px) {
                    width: 100%;
                    max-width: 700px;
                }

                .poster__top {
                    .poster__date {
                        font-size: 14px;
                        opacity: 0.8;
                        margin-bottom: var(--margin-bottom);
                    }

                    .poster__title {
                        font-size: 4.8vw;
                        opacity: 0.9;
                        margin-bottom: var(--margin-bottom);

                        @media screen and (max-width: 1000px) {
                            font-size: 58px;
                        }
                    }

                    .poster__category {
                        font-size: 15px;
                        display: flex;
                        flex-wrap: wrap;
                        row-gap: 10px;
                        column-gap: 3vw;
                        margin-bottom: var(--margin-bottom);

                        span {
                            i {
                                margin-left: 2.7vw;
                            }
                        }
                    }

                    .poster__description {
                        font-size: 19px;
                        line-height: 180%;
                        opacity: 0.9;
                        margin-bottom: var(--margin-bottom);

                        @media screen and (max-width: 1000px) {
                            font-size: 16px;
                        }
                    }
                }

                .poster__center {
                    display: flex;
                    align-items: center;
                    font-size: 23px;
                    margin-bottom: var(--margin-bottom);
                    column-gap: 20px;

                    button {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 30px;
                        height: 45px;
                        font-size: 23px;
                        border-radius: 10px;
                        color: white;
                        column-gap: 10px;
                        background: rgba(0, 0, 0, 0.21);
                        border: 1px solid rgba(255, 255, 255, 0.16);
                        cursor: pointer;
                        transition: 0.2s;

                        &:hover {
                            background: rgba(102, 102, 102, 0.179);
                        }

                        i {
                            font-size: 25px;
                        }

                        img {
                            height: 25px;
                            width: auto;
                            filter: invert(100%);
                            object-fit: contain;
                        }

                        span {
                            @media screen and (max-width: 500px) {
                                display: none;
                            }
                        }
                    }

                    .poster__rating {
                        margin-left: 10px;
                    }
                }

                .poster__bottom {
                    display: flex;
                    flex-wrap: wrap;
                    column-gap: 20px;
                    row-gap: 20px;

                    button {
                        max-width: 200px;
                        width: 100%;
                        color: white;
                        background: rgba(255, 0, 0, 0.588);
                        border-radius: 10px;
                        border: none;
                        height: 45px;
                        cursor: pointer;
                        font-size: 23px;
                        transition: 0.3s;

                        &:hover {
                            box-shadow: 0 0 30px 1px rgba(255, 255, 255, 0.478);
                        }
                    }

                    a {
                        color: white;
                        font-size: 23px;
                        margin-left: 30px;
                        line-height: 100%;
                        display: inline-flex;
                        align-items: center;

                        @media screen and (max-width: 430px) {
                            & {
                                margin-left: 0;
                            }
                        }

                        i {
                            margin-right: 10px;
                            font-size: 30px;
                            line-height: 100%;
                        }
                    }
                }
            }

            button {
                height: 40px;

                img {
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }

    .break {
        width: 75vw;
        height: 0.5px;
        margin: 50px auto;
        background: rgb(71, 71, 71);
    }

    .s1 {
        z-index: 20;
        padding-bottom: 80px;

        .s1__container {
            padding: 0 50px;

            @media screen and (max-width: 558px) {
                padding: 0 20px;
            }

            .s1__slider {
                margin: 5vh 0;
                display: flex;
                gap: 10px;

                @media screen and (max-width: 491px) {
                    flex-wrap: wrap;
                }

                button {
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    border-radius: 12px;

                    @media screen and (max-width: 736px) {
                        font-size: 14px;
                    }

                    &:hover {
                        background: rgba(164, 164, 164, 0.373);
                    }

                    &.active {
                        background: rgba(134, 21, 21, 0.837);
                    }
                }
            }

            .description {
                display: flex;
                justify-content: flex-start;
                column-gap: 3vw;
                row-gap: 30px;

                @media screen and (max-width: 736px) {
                    flex-direction: column;
                }

                .description__left {
                    .movie__img {
                        object-fit: cover;
                        width: 18vw;
                        aspect-ratio: 4 / 6;

                        @media screen and (max-width: 1220px) {
                            width: 23vw;
                        }

                        @media screen and (max-width: 1120px) {
                            width: 32vw;
                        }

                        @media screen and (max-width: 736px) {
                            width: 50vw;
                        }

                        img {
                            height: 100%;
                            width: 100%;
                            object-fit: cover;
                        }
                    }
                }

                .description__right {
                    color: rgb(235, 235, 235);
                    width: 50%;
                    font-family: var(--font-light);

                    @media screen and (max-width: 736px) {
                        width: 100%;
                    }

                    .movie__info {
                        display: flex;
                        gap: 10px;
                        flex-wrap: wrap;
                        font-size: 16px;
                        margin: 10px 0 20px;
                    }

                    .movie__name {
                        font-size: 5vh;
                        margin-bottom: 1.5vh;
                    }

                    .movie__description {
                        font-size: 2.3vh;
                    }
                }
            }

            .actors {
                .actor__list-wrapper {
                    .actor__title {
                        font-size: 20px;
                        color: white;
                        margin: 40px 0 10px;
                    }

                    .actors__list {
                        display: flex;
                        gap: 20px;
                        flex-wrap: wrap;

                        .actor {
                            height: 50px;
                            font-size: 20px;
                            padding: 0;
                            padding-right: 15px;
                            overflow: hidden;
                            border-radius: 25px;
                            background: rgba(255, 255, 255, 0.125);
                            border: 3px solid transparent;
                            cursor: pointer;
                            user-select: none;

                            &:hover {
                                background: rgba(255, 255, 255, 0.179);
                            }

                            p {
                                padding: 0 10px;
                            }

                            img {
                                object-fit: cover;
                                height: 100%;
                                border-radius: inherit;
                                aspect-ratio: 1 / 1;
                            }
                        }
                    }
                }
            }

            .comments__wrapper {
                max-width: 1000px;

                .newcomments {
                    margin-bottom: 30px;

                    .title {
                        color: var(--text-color);
                        font-size: 35px;
                        font-family: var(--font-regular);
                        margin-bottom: 20px;
                    }

                    .input__wrapper {
                        width: 100%;

                        .textarea {
                            width: 100%;
                            resize: none;
                            font-family: var(--font-light);
                            padding: 20px;
                            background: transparent;
                            outline: none;
                            color: white;
                            font-size: 20px;
                            border: none;
                            border: 1px solid rgba(255, 255, 255, 0.329);
                            transition: 0.2s;
                            border-radius: 10px;
                            overflow: hidden;

                            &:focus {
                                border: 1px solid rgba(255, 255, 255, 0.909);
                            }

                            &::placeholder {
                                color: rgba(255, 255, 255, 0.41);
                            }
                        }

                        .submit {
                            padding: 10px 50px;
                            font-size: 20px;
                            font-family: var(--font-regular);
                            background: rgba(255, 255, 255, 0.365);
                            color: white;
                            border-radius: 10px;
                            border: none;
                            cursor: pointer;
                            margin: 12px 5px;
                            transition: 0.2s;

                            &:hover {
                                background: rgba(255, 255, 255, 0.521);
                            }

                            &.active {
                                background: rgba(198, 28, 28, 0.837);
                            }
                        }
                    }

                    .newcomments__top {
                        .rating__wrapper {
                            display: flex;
                            column-gap: 30px;
                            row-gap: 20px;
                            color: white;
                            align-items: flex-end;
                            margin-bottom: 20px;

                            @media screen and (max-width: 450px) {
                                flex-wrap: wrap;
                            }

                            .rating__indicator {
                                text-align: start;
                                width: 100px;

                                .rating__num {
                                    line-height: 100%;
                                    font-size: 50px;
                                    font-family: var(--font-regular);
                                }
                            }

                            .rating__stars {
                                display: flex;
                                column-gap: 2px;
                                font-size: 22px;

                                span {
                                    &.indicate {
                                        i {
                                            color: rgb(255, 242, 0);
                                        }
                                    }

                                    &.active {
                                        i {
                                            color: rgb(255, 242, 0);
                                        }
                                    }

                                    i {
                                        transition: 0.2s;
                                        cursor: pointer;
                                        color: rgba(253, 253, 253, 0.356);

                                        &:hover {
                                            transform: scale(1.2);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .comments {
                    transition: 1s;

                    .title {
                        font-size: 35px;
                        color: white;
                        font-family: var(--font-regular);
                        line-height: 100%;
                    }

                    .comment {
                        background: rgba(187, 187, 187, 0.188);
                        color: rgb(181, 181, 181);
                        padding: 17px 20px;
                        width: 100%;
                        border-radius: 15px;
                        margin: 20px 0;
                        position: relative;

                        @media screen and (max-width: 450px) {
                            padding: 15px 20px;
                        }

                        @media screen and (max-width: 1000px) {
                            border-radius: 8px;
                            margin: 10px 0;
                        }

                        .comment__buttons {
                            color: white;
                            display: flex;
                            border-radius: 7px;
                            overflow: hidden;
                            column-gap: 1px;
                            position: absolute;
                            right: 20px;
                            top: 17px;

                            @media screen and (max-width: 450px) {
                                top: 12px;
                                right: 12px;
                            }

                            button {
                                background: rgba(171, 171, 171, 0.197);
                                border: none;
                                font-size: 13px;
                                padding: 5px 10px;
                                cursor: pointer;

                                &:hover {
                                    background: rgba(171, 171, 171, 0.338);
                                }

                                &.change {
                                    color: rgb(21, 178, 21);
                                }

                                &.delete {
                                    color: rgb(209, 34, 34);
                                }
                            }
                        }

                        .user {
                            display: flex;
                            align-items: center;
                            column-gap: 10px;
                            line-height: 100%;
                            margin-bottom: 10px;

                            @media screen and (max-width: 420px) {
                                column-gap: 5px;
                            }

                            span {
                                height: 30px;
                                width: 30px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background: rgba(0, 200, 255, 0.636);
                                border-radius: 50%;
                                color: white;
                                font-family: var(--font-regular);
                                font-size: 16px;

                                @media screen and (max-width: 420px) {
                                    font-size: 15px;
                                    height: 25px;
                                    width: 25px;
                                }
                            }

                            .username {
                                font-size: 18px;

                                @media screen and (max-width: 420px) {
                                    font-size: 17px;
                                    margin-top: 1px;
                                }
                            }
                        }

                        .user__comment {
                            font-size: 18px;
                            margin-bottom: 10px;
                            color: var(--text-color);

                            @media screen and (max-width: 420px) {
                                font-size: 15px;
                            }
                        }

                        .comment__bottom {
                            display: flex;
                            column-gap: 20px;
                            font-size: 15px;
                        }
                    }
                }
            }
        }
    }

    .s2 {
        padding-bottom: 100px;
    }
}
</style>
