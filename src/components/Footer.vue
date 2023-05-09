<template>
    <div class="container">
        <div class="footer__content">
            <!-- =============== -->
            <div class="footer__content-top">
                <div class="footer__list-wrapper">
                    <p class="title">About us</p>
                    <ul class="list">
                        <li><a href="" class="link">Contact</a></li>
                        <li><a href="" class="link">Support</a></li>
                        <li><a href="" class="link">Subscriptions</a></li>
                        <li><a href="" class="link">Partners</a></li>
                    </ul>
                </div>

                <div class="footer__list-wrapper">
                    <p class="title">Catalog</p>
                    <ul class="list">
                        <li><a href="" class="link">Television</a></li>
                        <li><a href="" class="link">Movies</a></li>
                        <li><a href="" class="link">Series</a></li>
                        <li><a href="" class="link">Cartoons</a></li>
                        <li><a href="" class="link">Anime</a></li>
                        <li><a href="" class="link">Stream</a></li>
                        <li><a href="" class="link">Informative</a></li>
                    </ul>
                </div>

                <div class="apps">
                    <p class="title">Apps</p>
                    <ul class="apps__list">
                        <li><i class="fab fa-google-play"></i><span>Google Play</span></li>
                        <li><i class="fab fa-app-store"></i><span>App Store</span></li>
                        <li><i class="fab fa-windows"></i><span>Mic. Store</span></li>
                        <li><i class="fal fa-tv"></i><span>TV Spot</span></li>
                    </ul>
                </div>

                <div class="networks">
                    <p class="title">Social Networks</p>
                    <ul class="networks__list">
                        <li class="custom-block"><i class="fab fa-telegram"></i></li>
                        <li class="custom-block"><i class="fab fa-instagram"></i></li>
                        <li class="custom-block"><i class="fab fa-facebook"></i></li>
                        <li class="custom-block"><i class="fab fa-youtube"></i></li>
                    </ul>
                </div>
            </div>

            <div class="break"></div>
            <!-- =============== -->

            <div class="footer__bottom">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, ipsa!</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer__content {
    font-family: var(--font-light);

    .footer__content-top {
        display: grid;
        grid-template-columns: repeat(2, auto) 30% 200px;
        // column-gap: 20px;
        row-gap: 80px;
        justify-content: space-around;
        padding: 50px 0 80px;

        @media screen and (max-width: 1240px) {
            & {
                padding: 50px 40px 80px;
                justify-content: start;
                display: flex;
                column-gap: 7%;
                flex-wrap: wrap;
            }
        }

        @media screen and (max-width: 580px) {
            & {
                padding: 50px 15px 80px;
                column-gap: 15%;
            }
        }

        @media screen and (max-width: 458px) {
            & {
                row-gap: 40px;
            }
        }

        .title {
            font-family: var(--font-regular);
            color: rgb(169, 31, 31);
            font-size: 28px;
            margin-bottom: 15px;
        }

        .footer__list-wrapper {
            font-size: 18px;

            .list {
                display: grid;
                grid-template-rows: repeat(4, auto);
                gap: 10px 100px;
                grid-auto-columns: auto;
                grid-auto-flow: column;
                font-size: 18px;

                @media screen and (max-width: 980px) {
                    & {
                        margin-right: 100px;
                    }
                }

                @media screen and (max-width: 730px) {
                    & {
                        margin-right: 50px;
                        gap: 10px 50px;
                    }
                }

                @media screen and (max-width: 580px) {
                    & {
                        margin-right: 0;
                        gap: 10px 50px;
                    }
                }

                @media screen and (max-width: 458px) {
                    & {
                        gap: 10px 50px;
                        font-size: 20px;
                        gap: 10px 80px;
                    }
                }

                .link {
                    color: white;
                    opacity: 0.7;
                    transition: 0.2s;
                    text-transform: capitalize;

                    &:hover {
                        opacity: 1;
                        text-shadow: 0 0 15px white;
                    }
                }
            }
        }

        .apps {
            .apps__list {
                display: grid;
                grid-template-rows: repeat(2, auto);
                grid-auto-flow: column;
                grid-template-columns: repeat(2, 200px);
                gap: 7px;
                font-family: var(--font-regular);

                @media screen and (max-width: 458px) {
                    & {
                        grid-template-columns: 200px;
                        grid-auto-flow: row;
                    }
                }

                li {
                    width: 100%;
                    height: 50px;
                    // border: 1px solid white;
                    background: rgba(255, 255, 255, 0.171);
                    overflow: hidden;
                    border-radius: 7px;
                    color: rgba(255, 255, 255, 0.832);
                    font-size: 35px;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    line-height: 0;
                    cursor: pointer;
                    column-gap: 10px;
                    padding: 20px;
                    transition: all 0.2s;

                    &:hover {
                        background: rgba(255, 255, 255, 0.266);
                    }

                    img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }

                    span {
                        font-size: 22px;
                    }
                }
            }
        }

        .networks {
            .networks__list {
                display: grid;
                grid-template-rows: repeat(2, auto);
                grid-auto-flow: column;
                gap: 7px;

                @media screen and (max-width: 1240px) {
                    & {
                        grid-template-rows: auto;
                    }
                }

                @media screen and (max-width: 980px) {
                    & {
                        grid-template-rows: repeat(2, auto);
                    }
                }

                @media screen and (max-width: 730px) {
                    & {
                        grid-template-rows: auto;
                    }
                }

                li {
                    background: rgba(255, 255, 255, 0.171);
                    transition: 0.2s;
                    border-radius: 7px;
                    font-size: 28px;
                    height: 50px;
                    cursor: pointer;

                    &:hover {
                        background: rgba(255, 255, 255, 0.267);
                    }
                }
            }
        }
    }

    .break {
        width: 100%;
        height: 0.5px;
        background: rgba(255, 255, 255, 0.448);
    }

    .footer__bottom {
        padding: 20px 0;
        color: rgba(255, 255, 255, 0.74);
        font-size: 16px;
    }
}
</style>
