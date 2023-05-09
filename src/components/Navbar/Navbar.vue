<template>
    <div class="nav__container">
        <div class="nav__content">
            <div class="nav__left">
                <button class="nav__btn" @click="$emit('openSidebar')">
                    <i class="fal fa-bars"></i>
                </button>
            </div>
            <div class="nav__center">
                <a href="" class="nav__logo">Vue</a>
            </div>
            <div class="nav__right">
                <div class="account__bg" v-show="settingsStatus" @click="settingsStatus = false"></div>

                <button class="search"><i class="fal fa-search"></i></button>
                <button class="notification"><i class="fal fa-bell"></i></button>

                <div class="account__wrapper">
                    <button class="account" :class="{active: settingsStatus}" @click="settingsStatus = !settingsStatus">{{ account.split("").shift() }}</button>

                    <div class="account__settings" :class="{active: settingsStatus}" click.stop>
                        <div class="account__settings-content">
                            <div class="account__settings-title">Account & Settings</div>

                            <ul class="account__list">
                                <li class="account__li">
                                    <button class="account__btn"><i class="fal fa-user-circle"></i>Account</button>
                                </li>
                                <li class="account__li">
                                    <button class="account__btn"><i class="fal fa-desktop-alt"></i>Sessions</button>
                                </li>
                                <li class="account__li">
                                    <button class="account__btn"><i class="fal fa-credit-card"></i>My Cards</button>
                                </li>
                                <li class="account__li">
                                    <button class="account__btn"><i class="fal fa-usd-circle"></i>Payment</button>
                                </li>
                                <li class="account__li">
                                    <button class="account__btn"><i class="fal fa-file-chart-line"></i>Payment History</button>
                                </li>
                                <li class="account__li">
                                    <button class="account__btn"><i class="fal fa-history"></i>History</button>
                                </li>
                                <li class="account__li">
                                    <button class="account__btn"><i class="fal fa-user-edit"></i>Subscribtions</button>
                                </li>
                            </ul>

                            <div class="account__settings-leave"><i class="fal fa-sign-out"></i>Leave</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},

    data() {
        return {
            account: "Alisher",
            settingsStatus: false,
        };
    },
};
</script>

<style lang="scss">
.nav__container {
    width: 86vw;
    margin: 0 auto;

    @media screen and (max-width: 720px) {
        width: 90vw;
    }
}

.nav__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    user-select: none;

    @media screen and (max-width: 720px) {
        padding: 10px 0;
    }

    .nav__left {
        width: 40%;

        .nav__btn {
            font-size: 2.7vh;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                color: rgb(129, 15, 15);
            }
        }
    }

    .nav__center {
        .nav__logo {
            font-size: 40px;
            text-align: center;
            display: block;
            position: absolute;
            transform: translate(-50%, -50%);
            text-transform: uppercase;
            color: rgb(129, 15, 15);
            font-weight: 700;

            @media screen and (max-width: 720px) {
                font-size: 28px;
            }
        }
    }

    .nav__right {
        width: 40%;
        display: flex;
        align-items: center;
        column-gap: 1vw;
        justify-content: end;
        z-index: 2;

        @media screen and (max-width: 720px) {
            column-gap: 4vw !important;
        }

        .account__bg {
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1;
        }

        .search,
        .notification,
        .account {
            font-size: 24px;
            background: none;
            border: none;
            color: white;
            height: 50px;
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                color: rgb(129, 15, 15);
            }

            @media screen and (max-width: 720px) {
                font-size: 18px;
            }

            @media screen and (max-width: 540px) {
                height: 35px;
                width: 35px;
            }
        }

        @media screen and (max-width: 540px) {
            .notification {
                display: none;
            }
        }

        .account__wrapper {
            position: relative;
            z-index: 2;

            .account {
                border: 1px solid rgb(63, 63, 63);
                border-radius: 10px;
                line-height: 100%;
                // padding: 20px;
                display: flex;
                align-items: center;
                column-gap: 10px;

                &.active {
                    background: rgba(218, 218, 218, 0.134);
                }

                &:hover {
                    background: rgba(218, 218, 218, 0.134);
                    color: white;
                }
            }

            .account__settings {
                position: absolute;
                border-radius: 12px;
                background: rgba(47, 47, 47, 0.17);
                backdrop-filter: blur(20px);
                top: 140%;
                right: 0;
                max-width: 300px;
                min-width: 250px;
                overflow: hidden;
                visibility: collapse;
                opacity: 0;
                transition: 0.34s all cubic-bezier(0.47, 1.64, 0.51, 0.94);
                transform: scale(0.6) translate(20px, -40px);
                transform-origin: top right;

                &.active {
                    visibility: visible;
                    opacity: 1;
                    transform: scale(1) translate(0);
                }

                .account__settings-content {
                    --account-font-size: 17px;
                    --account-padding: 14px 17px 12px;
                    color: rgb(227, 227, 227);
                    display: flex;
                    flex-direction: column;
                    font-family: var(--font-regular);

                    .account__settings-title {
                        padding: var(--account-padding);
                        font-size: var(--account-font-size);
                        background: rgba(218, 218, 218, 0.134);
                        border-bottom: 5px solid rgba(15, 15, 15, 0.585);
                        line-height: 100%;
                    }

                    .account__list {
                        .account__li {
                            text-align: start;

                            &:last-child {
                                button {
                                    border: none;
                                }
                            }

                            button {
                                text-align: start;
                                display: flex;
                                justify-content: start;
                                align-items: center;
                                width: 100%;
                                height: auto;
                                padding: var(--account-padding);
                                border: none;
                                border-bottom: 0.5px solid rgba(112, 112, 112, 0.4);
                                overflow: hidden;
                                font-size: var(--account-font-size);
                                cursor: pointer;
                                background: none;
                                color: white;
                                column-gap: 13px;
                                font-family: var(--font-light);
                                line-height: 100%;

                                i {
                                    font-size: 17px;
                                    width: 20px;
                                    text-align: center;
                                }

                                &:hover {
                                    background: rgba(255, 255, 255, 0.171);
                                }
                            }
                        }
                    }

                    .account__settings-leave {
                        padding: var(--account-padding);
                        font-size: var(--account-font-size);
                        // background: rgba(218, 218, 218, 0.134);
                        color: rgb(189, 21, 21);
                        cursor: pointer;
                        border-top: 5px solid rgba(43, 43, 43, 0.585);
                        display: flex;
                        align-items: center;
                        column-gap: 13px;
                        font-family: var(--font-regular);
                        line-height: 100%;

                        i {
                            font-size: 18px;
                            width: 20px;
                            text-align: center;
                        }

                        &:hover {
                            background: rgba(255, 255, 255, 0.171);
                        }
                    }
                }
            }
        }
    }
}
</style>
