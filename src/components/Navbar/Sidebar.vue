<template>
    <div class="sidebar__container" :class="{active: status}">
        <div class="sidebar__bg" @click="$emit('closeSidebar')" v-show="status"></div>

        <button class="sidebar__btn" @click="$emit('closeSidebar')">
            <i class="fal fa-times"></i>
        </button>

        <div class="sidebar__content">
            <ul class="sidebar__list">
                <li><router-link to="/" class="sidebar__list-link" @click="$emit('closeSidebar')">Home</router-link></li>
                <li><router-link to="/watch" class="sidebar__list-link" @click="$emit('closeSidebar')">Tv Shows</router-link></li>
                <li><router-link to="/watch" class="sidebar__list-link" @click="$emit('closeSidebar')">Movies</router-link></li>
                <li><router-link to="/watch" class="sidebar__list-link" @click="$emit('closeSidebar')">Latest</router-link></li>
                <li><router-link to="/watch" class="sidebar__list-link" @click="$emit('closeSidebar')">My List</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        status: Boolean,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.sidebar__container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: auto;
    color: white;
    backdrop-filter: blur(30px);
    transform: translateX(-30%);
    transition: 0.35s;
    line-height: 0;
    padding: 45px 150px 0 42px;
    opacity: 0;
    visibility: collapse;
    z-index: 101;
    background: rgba(0, 0, 0, 0.622);
    user-select: none;

    @media screen and (max-width: 720px) {
        padding: 12vh 100px 0 50px;
    }

    &.active {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
    }

    .sidebar__bg {
        height: 100%;
        width: 120vw;
        z-index: -1;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #16212c1a;
    }

    .sidebar__btn {
        font-size: 32px;
        background: none;
        border: none;
        z-index: 3;
        color: white;
        cursor: pointer;
        position: absolute;
        top: 45px;
        left: 145px;
        padding: 0 5px;
        transition: 0.2s;

        &:hover {
            color: rgb(129, 15, 15);
        }

        @media screen and (max-width: 720px) {
            top: 25px;
            right: 25px;
            left: auto;
            padding: 0;
        }
    }

    .sidebar__content {
        display: flex;
        align-items: center;
        height: 100%;
        z-index: 102;

        .sidebar__list {
            margin-bottom: 70px;

            .sidebar__list-link {
                font-size: 25px;
                color: white;
                text-transform: uppercase;
                display: flex;
                width: 100%;
                padding: 35px 0;
                transition: 0.2s;
                cursor: pointer;

                &:hover {
                    color: gray;
                }
            }
        }
    }
}
</style>
