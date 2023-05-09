<template>
    <div class="video__wrapper" ref="videoWrapper">
        <canvas class="video__blur" id="videoBg" ref="videoBg" :style="{display: backlight ? 'block' : 'none'}"></canvas>

        <video class="video" id="video" ref="video" @loadedmetadata="(e) => ((videoDuration = e.target.duration), $emit('getDuration', videoDuration))">
            <source :src="src" />
        </video>

        <div
            class="video__face"
            @click="(play = !play), playVideo(), showOptions()"
            @dblclick="playerExpand()"
            @mousemove="showOptions()"
            @touchstart="showOptions()"
            :style="{cursor: optionsVisible ? 'auto' : 'none'}"></div>

        <button class="play__button" ref="playBtn" :class="{hide: play}" @click="(play = !play), playVideo()">
            <i class="fas fa-play" v-if="!play"></i>
            <i class="fas fa-pause" v-else></i>
        </button>

        <div class="video__blurred-bg">
            <div class="blur"></div>
        </div>

        <div class="video__name" :class="{visible: optionsVisible}">
            {{ videoName }}
        </div>

        <div class="video__topright" :class="{visible: optionsVisible}">
            <button class="video__heart" @click="liked = !liked"><i ref="like" class="fas fa-heart" :class="{liked: liked}"></i></button>
            <span></span>
            <button class="video__share"><i class="fas fa-share-alt"></i></button>
        </div>

        <div class="video__controls" :class="{visible: optionsVisible}" ref="controls" @mousemove="showOptions()" @mousedown="showOptions()">
            <div class="options">
                <div class="options__top">
                    <div class="video__duration" :style="{maxWidth: videoCurrentTime > 3600 ? '50px' : '32px !important'}">
                        <p class="video__hr" v-show="videoCurrentTime > 3600">{{ Math.floor(videoCurrentTime / 3600) }}</p>
                        <span v-show="videoCurrentTime > 3600">:</span>
                        <p class="video__min">{{ Math.floor(videoCurrentTime / 60) }}</p>
                        <span>:</span>
                        <p class="video__sec">{{ Math.floor(videoCurrentTime % 60) < 10 ? "0" + Math.floor(videoCurrentTime % 60) : Math.floor(videoCurrentTime % 60) }}</p>
                    </div>

                    <input
                        type="range"
                        id="videoTime"
                        class="video__play-time"
                        value="0"
                        min="0"
                        @input="(e) => ((this.$refs.video.currentTime = e.target.value), (this.videoCurrentTime = this.$refs.videoTime.value), showOptions())"
                        ref="videoTime" />

                    <div class="video__duration">
                        <p class="video__hr" v-show="videoDuration > 3600">{{ Math.floor(videoDuration / 3600) }}</p>
                        <span v-show="videoDuration > 3600">:</span>
                        <p class="video__min">{{ Math.floor(videoDuration / 60) }}</p>
                        <span>:</span>
                        <p class="video__sec">{{ Math.floor(videoDuration % 60) < 10 ? "0" + Math.floor(videoDuration % 60) : Math.floor(videoDuration % 60) }}</p>
                    </div>
                </div>

                <div class="options__bottom">
                    <div class="volume__wrapper">
                        <i class="fas fa-volume volume__icon"></i>
                        <input class="volume" type="range" value="100" min="0" max="100" @input="(e) => ((this.$refs.video.volume = e.target.value / 100), showOptions())" />
                    </div>
                    <div class="options__bottom-center">
                        <button
                            class="backwards"
                            ref="backwards"
                            @click="
                                this.$refs.video.currentTime -= 10;
                                this.$refs.videoTime.value = this.$refs.video.currentTime;
                                showOptions();
                            ">
                            <i class="fas fa-forward"></i>
                        </button>
                        <button class="pause" @click="(play = !play), playVideo()">
                            <i class="fas fa-pause" v-if="!play"></i>
                            <i class="fas fa-play" v-else></i>
                        </button>
                        <button
                            class="forwards"
                            ref="forwards"
                            @click="
                                this.$refs.video.currentTime += 10;
                                this.$refs.videoTime.value = this.$refs.video.currentTime;
                                showOptions();
                            ">
                            <i class="fas fa-forward"></i>
                        </button>
                    </div>

                    <div class="options__bottom-right">
                        <button class="screen__size">
                            <i class="fal fa-list"></i>
                        </button>
                        <button class="screen__size" @click="settings = !settings" :class="{active: settings}">
                            <i class="fal fa-cog"></i>
                        </button>
                        <button class="screen__size" @click="playerExpand()">
                            <i class="fal fa-expand-wide"></i>
                        </button>
                    </div>

                    <!------>
                </div>
            </div>
        </div>

        <div class="settings__wrapper" :class="{visible: optionsVisible, active: settings}" @mousemove="showOptions()" @mousedown="showOptions()">
            <ul class="settings">
                <li @click="backlight = !backlight">
                    <p>Backlight</p>
                    <div class="checkbox" :class="{on: backlight}"><span class="checkbox__status"></span></div>
                </li>
                <li>
                    <p>Speed</p>
                    <span>{{ videoSpeed == 1 ? "Normal" : videoSpeed }}</span>
                </li>
                <li>
                    <p>Quality</p>
                    <span>Not Available</span>
                </li>
            </ul>
        </div>

        <div class="video__foreground" :class="{active: settings && optionsVisible}" @click="settings = false"></div>
    </div>
</template>

<script>
export default {
    props: {
        src: String,
        name: String,
        keycontrol: Boolean,
    },
    data() {
        return {
            videoName: this.name,
            play: false,
            interval: null,
            optionsVisible: false,
            optionsTimeout: null,
            videoDuration: 0,
            videoCurrentTime: 0,
            timer: 3000,
            liked: false,
            videoSpeed: 1.0,
            backlight: true,
            settings: false,
        };
    },
    methods: {
        playVideo() {
            if (this.play) {
                this.$refs.video.play();
                this.interval = setInterval(() => {
                    this.$refs.videoTime.value = Math.ceil(this.$refs.video.currentTime);

                    this.$refs.video.currentTime == this.$refs.video.duration && document.fullscreenElement !== null ? document.exitFullscreen() : null;
                    this.$refs.video.currentTime == this.$refs.video.duration
                        ? ((this.play = false), (this.$refs.videoTime.value = 0), (this.$refs.video.currentTime = 0), clearInterval(this.interval))
                        : null;

                    this.videoCurrentTime = this.$refs.videoTime.value;
                    document.fullscreenElement !== null ? (this.$refs.playBtn.style.display = "none") : (this.$refs.playBtn.style.display = "flex");
                }, 500);

                this.$refs.videoTime.max = this.$refs.video.duration;
            } else {
                this.$refs.video.pause();
                clearInterval(this.interval);
            }
        },

        playerExpand() {
            if (document.fullscreenElement === null) {
                this.$refs.videoWrapper.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        },

        showOptions() {
            this.optionsVisible = true;
            clearInterval(this.optionsTimeout);
            this.optionsTimeout = setTimeout(() => {
                !this.settings ? (this.optionsVisible = false) : (this.optionsVisible = true);
            }, this.timer);
        },

        keydown(e) {
            if (this.keycontrol) {
                e.code === "Space" ? (e.preventDefault(), (this.optionsVisible = true)) : null;
                e.key === "ArrowRight" ? this.$refs.forwards.click() : e.key === "ArrowLeft" ? this.$refs.backwards.click() : e.code === "Space" ? this.$refs.playBtn.click() : null;
                this.videoCurrentTime = this.$refs.videoTime.value;
            }
        },

        videoBgLight() {
            var v = document.getElementById("video");
            var canvas = document.getElementById("videoBg");
            var context = canvas.getContext("2d");
            var cw = Math.floor(canvas.clientWidth);
            var ch = Math.floor(canvas.clientHeight);
            canvas.width = cw;
            canvas.height = ch;
            v.addEventListener(
                "play",
                function () {
                    updateBigVideo(this, context, cw, ch);
                },
                false
            );

            function updateBigVideo(v, c, w, h) {
                if (v.paused || v.ended) return false;
                c.drawImage(v, 0, 0, w, h);
                setTimeout(updateBigVideo, 60, v, c, w, h);
            }
        },
    },

    unmounted() {
        clearInterval(this.interval);
        document.removeEventListener("keydown", this.keydown);
    },

    mounted() {
        document.addEventListener("keydown", this.keydown);

        this.videoBgLight();
    },
};
</script>

<style lang="scss">
.video__wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    object-fit: cover;
    --controls-height: 110px;
    --blur-color: rgba(0, 0, 0, 0.289);

    .video__name {
        position: absolute;
        color: white;
        top: 2%;
        left: 2%;
        z-index: 5;
        line-height: 100%;
        padding: 10px 15px;
        font-size: 18px;
        font-family: var(--font-light);
        background: var(--blur-color);
        backdrop-filter: blur(15px);
        border-radius: 8px;
        opacity: 0;
        transition: 0.2s;

        &.visible {
            opacity: 1;
        }
    }

    .video__topright {
        position: absolute;
        top: 2%;
        right: 2%;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(15px);
        background: var(--blur-color);
        overflow: hidden;
        border-radius: 8px;
        height: 38px;
        opacity: 0;
        visibility: hidden;
        transition: 0.2s;

        &.visible {
            opacity: 1;
            visibility: visible;
        }

        span {
            height: 100%;
            width: 1px;
            background: #4e4e4e;
        }

        button {
            background: none;
            display: flex;
            border: none;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: 10px 20px;
            width: 50%;
            cursor: pointer;

            &:hover {
                background: rgba(255, 255, 255, 0.132);
            }

            img {
                object-fit: contain;
                height: 100%;
                width: 100%;
                filter: invert(100%);
            }

            i {
                color: white;
                font-size: 120%;

                &.liked {
                    filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);
                }
            }
        }
    }

    .video__controls {
        position: absolute;
        bottom: 1.5%;
        height: var(--controls-height);
        background: var(--blur-color);
        backdrop-filter: blur(15px);
        z-index: 6;
        width: 98%;
        padding: 1.5% 1.5%;
        display: flex;
        align-items: center;
        border-radius: 10px;
        opacity: 0;
        transition: 0.2s;
        font-family: var(--font-light);

        &.visible {
            opacity: 1;
        }

        .options {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;

            .options__top {
                width: 100%;
                margin-bottom: 17px;
                display: flex;
                column-gap: 10px;

                .video__play-time {
                    width: 100%;
                }

                .video__duration {
                    color: white;
                    display: flex;
                }
            }

            .options__bottom {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .volume__wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;

                    .volume__icon {
                        position: absolute;
                        left: 10%;
                        color: white;
                        pointer-events: none;
                        font-size: 20px;
                    }

                    .volume {
                        --thumb-color: rgba(232, 232, 232, 0.464);
                        -webkit-appearance: none;
                        overflow: hidden;
                        background: rgba(255, 255, 255, 0.185);
                        width: 130px;
                        height: 35px;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: 0.4s;

                        &:hover {
                            --thumb-color: rgba(232, 232, 232, 0.778);
                        }

                        &::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            height: 0px;
                            width: 0px;
                            background: var(--thumb-color);
                            border: none;
                            outline: none;
                            box-shadow: -150px 0 0 150px var(--thumb-color);
                            transition: 0.3s;
                        }
                    }
                }

                button {
                    color: white;
                    background: none;
                    border: none;
                    line-height: 0;
                    margin: 0 20px;
                    cursor: pointer;
                    font-size: 30px;

                    &.active {
                        filter: brightness(50%);
                    }

                    &:hover img {
                        filter: invert(100%) brightness(60%);
                    }

                    img {
                        filter: invert(100%);
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                        pointer-events: none;
                    }
                }

                .options__bottom-center {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    left: 50%;
                    translate: -50% 0;

                    .backwards,
                    .forwards {
                        font-size: 25px;
                    }

                    .backwards {
                        rotate: 180deg;
                    }
                }

                .options__bottom-right button {
                    font-size: 24px;
                    line-height: 0;
                    margin: 0 15px;
                }
            }
        }
    }

    .settings__wrapper {
        position: absolute;
        background: var(--blur-color);
        border-radius: 10px;
        right: 2%;
        z-index: 7;
        backdrop-filter: blur(15px);
        bottom: calc(var(--controls-height) + 2%);
        overflow: hidden;
        width: 250px;
        visibility: hidden;
        opacity: 0;
        transition: 0.25s all cubic-bezier(0.47, 1.64, 0.51, 0.94);
        transform: translateY(50%) scale(0.8);

        &.active.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .settings {
            display: flex;
            flex-direction: column;

            li {
                cursor: pointer;
                padding: 10px 15px;
                font-size: 20px;
                font-family: var(--font-light);
                color: white;
                border-bottom: 1px solid rgba(157, 157, 157, 0.555);
                display: flex;
                justify-content: space-between;
                align-items: center;

                &:hover {
                    background: rgba(134, 134, 134, 0.244);
                }

                &:last-child {
                    border: none;
                }

                span {
                    color: #acacac;
                    font-size: 18px;
                }

                .checkbox {
                    position: relative;
                    width: 40px;
                    height: 20px;
                    background: gray;
                    border-radius: 10px;
                    pointer-events: none;
                    transition: 0.3s;
                    display: flex;
                    align-items: center;

                    &.on {
                        background: #c72121;

                        .checkbox__status {
                            transform: translateX(100%);
                        }
                    }

                    .checkbox__status {
                        background: white;
                        aspect-ratio: 1;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        transform: translateX(0);
                        border-radius: 50%;
                        transition: 0.2s;
                    }
                }
            }
        }
    }

    .video__foreground {
        position: absolute;
        height: 100%;
        z-index: 5;
        top: 0;
        left: 0;
        right: 0;
        background: transparent;
        width: 100%;
        display: none;

        &.active {
            display: block;
        }
    }

    .play__button {
        z-index: 20;
        position: absolute;
        font-size: 40px;
        color: #d8d8d8;
        background: rgba(74, 74, 74, 0.218);
        border: none;
        backdrop-filter: blur(20px);
        border-radius: 50%;
        width: 120px;
        aspect-ratio: 1;
        line-height: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        opacity: 1;
        visibility: visible;

        &.hide {
            opacity: 0;
            visibility: hidden;
            transition: 0.5s;
        }
    }

    .video {
        width: 100%;
        height: 100%;
        z-index: 1;
        object-fit: cover;
        pointer-events: none;
    }

    .video__face {
        height: 100%;
        width: 100%;
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .video__blur {
        filter: brightness(120%) blur(150px);
        z-index: 0;
        width: 110%;
        height: 110%;
        opacity: 0.8;
        object-fit: cover;
        position: absolute;
        background: rgba(255, 255, 255, 0.138);
    }
}

@media screen and (max-width: 1200px) {
    .video__wrapper .play__button {
        font-size: 28px;
        width: 80px;
    }
}

.video__play-time {
    font-size: 1.5rem;
    width: 12.5em;
}

.video__play-time {
    color: #c72121;
    --thumb-height: 20px;
    --track-height: 0.125em;
    --track-color: rgba(176, 176, 176, 0.2);
    --brightness-hover: 120%;
    --brightness-down: 80%;
    --clip-edges: 0.125em;
}

.video__play-time.win10-thumb {
    color: #2b2d42;

    --thumb-height: 1.375em;
    --thumb-width: 0.5em;
    --clip-edges: 0.0125em;
}

/* === range commons === */
.video__play-time {
    position: relative;
    background: #fff0;
    overflow: hidden;
}

.video__play-time:active {
    cursor: pointer;
}

.video__play-time:disabled {
    filter: grayscale(1);
    opacity: 0.3;
    cursor: not-allowed;
}

/* === WebKit specific styles === */
.video__play-time,
.video__play-time::-webkit-slider-runnable-track,
.video__play-time::-webkit-slider-thumb {
    -webkit-appearance: none;
    transition: all ease 100ms;
    height: var(--thumb-height);
}

.video__play-time::-webkit-slider-runnable-track,
.video__play-time::-webkit-slider-thumb {
    position: relative;
}

.video__play-time::-webkit-slider-thumb {
    --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
    --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
    --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
    --clip-further: calc(100% + 1px);
    --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0 100vmax currentColor;

    width: var(--thumb-width, var(--thumb-height));
    background: linear-gradient(currentColor 0 0) scroll no-repeat left center / 50% calc(var(--track-height) + 1px);
    background-color: currentColor;
    box-shadow: var(--box-fill);
    border-radius: var(--thumb-width, var(--thumb-height));

    filter: brightness(100%);
    clip-path: polygon(
        100% -1px,
        var(--clip-edges) -1px,
        0 var(--clip-top),
        -100vmax var(--clip-top),
        -100vmax var(--clip-bottom),
        0 var(--clip-bottom),
        var(--clip-edges) 100%,
        var(--clip-further) var(--clip-further)
    );
}

.video__play-time:hover::-webkit-slider-thumb {
    filter: brightness(var(--brightness-hover));
    cursor: pointer;
}

.video__play-time:active::-webkit-slider-thumb {
    filter: brightness(var(--brightness-down));
    cursor: pointer;
}

.video__play-time::-webkit-slider-runnable-track {
    background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center / 100% calc(var(--track-height) + 1px);
}

.video__play-time:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
}

/* === Firefox specific styles === */
.video__play-time,
.video__play-time::-moz-range-track,
.video__play-time::-moz-range-thumb {
    appearance: none;
    transition: all ease 100ms;
    height: var(--thumb-height);
}

/*========================================================================================*/
/*========================================================================================*/
/*========================================================================================*/

@media screen and (max-width: 1000px) {
    .video__wrapper {
        --controls-height: 10vw;
    }

    .video__wrapper .video__controls {
        padding: 0 2%;
        border-radius: 1.2vw;
    }

    .video__wrapper .play__button {
        font-size: 4vw;
        width: 12vw;
    }

    .video__wrapper .video__name {
        font-size: 2.4vw;
        height: 4.2vw;
        display: flex;
        padding: 0 2vw;
        justify-content: center;
        align-items: center;
        border-radius: 1vw;
        top: 2%;
        left: 1%;
    }

    .video__wrapper .video__topright {
        top: 2%;
        right: 1%;
        height: 4.2vw;
        border-radius: 0.9vw;
    }

    .video__wrapper .video__topright span {
        width: 0.1vw;
    }

    .video__wrapper .video__controls .options .options__top {
        margin-bottom: 1.6vw;
    }

    .video__wrapper .video__topright button {
        padding: 1vw 2.2vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .video__wrapper .video__topright button i {
        font-size: 1.8vw;
        line-height: 0;
    }

    .video__wrapper .video__controls .options .options__bottom .volume__wrapper .volume__icon {
        height: 2.2vw;
    }

    .video__wrapper .video__controls .options .options__bottom .volume__wrapper .volume {
        width: 15vw;
        height: 3.5vw;
        border-radius: 1vw;
    }

    .video__wrapper .video__controls .options .options__bottom .options__bottom-center {
        margin-bottom: 0.2vw;
    }

    .video__wrapper .video__controls .options .options__bottom .options__bottom-center .backwards,
    .video__wrapper .video__controls .options .options__bottom .options__bottom-center .forwards {
        height: 2.3vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .video__wrapper .video__controls .options .options__bottom button {
        height: 3.3vw;
        margin: 0 2vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .video__wrapper .video__controls .options .options__bottom .options__bottom-right button {
        height: 2.5vw !important;
        margin: 0 1.7vw !important;
    }

    .video__wrapper .video__controls .options .options__top .video__duration {
        font-size: 1.8vw;
    }

    .video__wrapper .video__controls .options .options__top .video__play-time {
        margin-top: 0.3vw;
    }

    .video__play-time {
        color: #c72121;
        --thumb-height: 1.5vw !important;
        --track-height: 0.3vw !important;
        --track-color: rgba(176, 176, 176, 0.2);
        --brightness-hover: 120%;
        --brightness-down: 80%;
        --clip-edges: 0.125em;
    }

    .options__bottom-right {
        display: flex;
    }

    .video__wrapper .settings__wrapper {
        width: 18vw;
        border-radius: 1.2vw;
    }

    .video__wrapper .settings__wrapper .settings li {
        cursor: pointer;
        padding: 1vw 1.3vw;
        font-size: 1.6vw;
    }

    .video__wrapper .settings__wrapper .settings li span {
        color: #acacac;
        font-size: 1.5vw;
    }

    .video__wrapper .settings__wrapper .settings li .checkbox {
        position: relative;
        width: 3.5vw;
        height: 1.75vw;
        border-radius: 1vw;
        transition: 0.3s;
    }
}
</style>
