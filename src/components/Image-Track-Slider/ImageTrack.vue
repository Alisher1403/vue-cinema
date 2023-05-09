<template>
    <div
        class="image-track-container"
        @touchstart="trackTouchDown"
        @touchend="trackTouchUp"
        @touchmove="trackTouchMove"
        @mousedown="trackMouseDown"
        @mouseup="trackMouseUp"
        @mouseleave="trackMouseUp"
        @mousemove="trackMouseMove">
        <div class="image-track" data-mouse-down-at="0" data-prev-percentage="0" ref="track" :style="{top: top + '%', left: left + '%'}">
            <div
                class="image__wrapper"
                :class="{visible: imagesVisible, visibleAfter: imagesVisibleAfter}"
                v-for="el in elements"
                :key="el.id"
                :style="{
                    marginTop: `${elements.indexOf(el) % 3 == 3 - 1 ? '6%' : elements.indexOf(el) % 2 == 2 - 1 ? '8%' : '3%'}`,
                    transitionDelay: !imagesVisibleAfter ? elements.indexOf(el) * 0.2 + 's' : 0.5 + 's',
                }">
                <img class="image" :src="el.src" draggable="false" />
                <span class="image__title">{{ el.title }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        elements: Array,
        parallaxIntensity: Number,
        dragIntensity: Number,
        width: Number,
        top: Number,
        left: Number,
    },
    data() {
        return {
            imagesVisible: false,
            imagesVisibleAfter: false,
        };
    },
    methods: {
        trackMouseDown: function (e) {
            this.$refs.track.dataset.mouseDownAt = e.clientX;
            if (
                this.$refs.track.dataset.percentage == NaN ||
                this.$refs.track.dataset.percentage == undefined ||
                this.$refs.track.dataset.prevPercentage == NaN ||
                this.$refs.track.dataset.prevPercentage == undefined
            ) {
                this.$refs.track.dataset.percentage = "0";
                this.$refs.track.dataset.prevPercentage = "0";
            }
        },
        trackMouseUp: function () {
            this.$refs.track.dataset.mouseDownAt = "0";
            this.$refs.track.dataset.prevPercentage = this.$refs.track.dataset.percentage;
        },
        trackMouseMove: function (e) {
            if (this.$refs.track.dataset.mouseDownAt === "0") return;

            const mouseDelta = parseFloat(this.$refs.track.dataset.mouseDownAt) - e.clientX;
            const maxDelta = window.innerWidth / this.dragIntensity;

            const percentage = (mouseDelta / maxDelta) * -100;

            const nextPercentageUnconstrained = parseFloat(this.$refs.track.dataset.prevPercentage) + percentage;
            const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -this.width);

            for (const images of document.querySelectorAll(".image")) {
                images.animate(
                    {
                        objectPosition: `${(nextPercentage / 100) * this.parallaxIntensity + 70}% -50%`,
                    },
                    {duration: 2000, fill: "forwards"}
                );
            }

            this.$refs.track.dataset.percentage = nextPercentage;

            this.$refs.track.animate(
                {
                    transform: `translate(${nextPercentage}%, -50%)`,
                },
                {duration: 2000, fill: "forwards"}
            );
        },

        trackTouchDown: function (e) {
            this.$refs.track.dataset.mouseDownAt = e.touches[0].clientX;
            if (
                this.$refs.track.dataset.percentage == NaN ||
                this.$refs.track.dataset.percentage == undefined ||
                this.$refs.track.dataset.prevPercentage == NaN ||
                this.$refs.track.dataset.prevPercentage == undefined
            ) {
                this.$refs.track.dataset.percentage = "0";
                this.$refs.track.dataset.prevPercentage = "0";
            }
        },

        trackTouchUp: function () {
            this.$refs.track.dataset.mouseDownAt = "0";
            this.$refs.track.dataset.prevPercentage = this.$refs.track.dataset.percentage;
        },

        trackTouchMove: function (e) {
            if (this.$refs.track.dataset.mouseDownAt === "0") return;

            const mouseDelta = parseFloat(this.$refs.track.dataset.mouseDownAt) - e.touches[0].clientX;
            const maxDelta = window.innerWidth / this.dragIntensity;

            const percentage = (mouseDelta / maxDelta) * -100;

            const nextPercentageUnconstrained = parseFloat(this.$refs.track.dataset.prevPercentage) + percentage;
            const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -this.width);

            for (const images of document.querySelectorAll(".image")) {
                images.animate(
                    {
                        objectPosition: `${(nextPercentage / 100) * this.parallaxIntensity + 70}% -50%`,
                    },
                    {duration: 2000, fill: "forwards"}
                );
            }

            this.$refs.track.dataset.percentage = nextPercentage;

            this.$refs.track.animate(
                {
                    transform: `translate(${nextPercentage}%, -50%)`,
                },
                {duration: 2000, fill: "forwards"}
            );
        },
    },

    mounted() {
        setTimeout(() => {
            this.imagesVisible = true;
            setTimeout(() => {
                this.imagesVisibleAfter = true;
            }, 1000);
        }, 500);
    },
};
</script>

<style lang="scss">
.image-track-container {
    height: 100vh;
    width: 100%;
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;

    .image-track {
        display: flex;
        gap: 2vmin;
        position: absolute;
        transform: translate(0, -50%);
        height: 80vmin;
        user-select: none;

        @media screen and (max-width: 540px) {
            & {
                height: 100vh;
                display: flex;
                align-items: center;
            }
        }

        .image__wrapper {
            width: 10vw;
            height: 0vmin;
            position: relative;
            // border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            transform-origin: top;

            &.visible {
                transition: 0.8s cubic-bezier(0.66, 0.085, 0.28, 0.995);
                height: 65vmin;

                @media screen and (max-width: 1100px) {
                    & {
                        width: 14vw;
                    }
                }

                @media screen and (max-width: 600px) {
                    & {
                        width: 17vw;
                    }
                }

                @media screen and (max-width: 540px) {
                    & {
                        height: 70vh;
                        width: 22vw;
                        margin-top: 0 !important;
                    }
                }
            }

            &.visibleAfter {
                transition: 0.3s;
                transform-origin: center;
                transition-delay: 0;
            }

            .image {
                height: 65vmin;
                width: 100%;
                object-fit: cover;
                object-position: 70% 50%;
                position: relative;
                filter: grayscale(5%) sepia(6%);
                transition: 0.4s;

                @media screen and (max-width: 540px) {
                    & {
                        height: 70vh;
                    }
                }
            }

            .image__title {
                position: absolute;
                font-size: 22px;
                color: white;
                width: 80%;
                text-align: center;
                line-height: 140%;
                top: 50%;
                left: 50%;
                translate: -50% -50%;

                @media screen and (max-width: 720px) {
                    & {
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>
