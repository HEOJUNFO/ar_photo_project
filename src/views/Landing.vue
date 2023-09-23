<template>
    <div class="loading-container">
        <div class="image-container">
            <img src="@resource/mission/web-landing-page-1.jpg" alt="Image 1" />
        </div>
        <div class="button-container1">
            <button @click="start()">신비의 숲 시작하기</button>
            <div></div>
        </div>
        <div class="image-container">
            <img src="@resource/mission/web-landing-page-2.jpg" alt="Image 1" />
        </div>

        <div class="image-container">
            <img src="@resource/landing/landing_02.jpg" alt="Image 2" />
        </div>
        <div class="button-container1">
            <button @click="start()">신비의 숲 시작하기</button>
            <div></div>
        </div>
        <div class="image-container">
            <img src="@resource/landing/web-landing-page-3.jpg" alt="Image 3" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import router from '../router'

export default {
    name: 'Landing',
    setup() {

        const scrollToTop = () => {
            window.scrollTo(0, 0);
        }


        const start = () => {
            scrollToTop();
            setTimeout(() => {
                router.push('/intro');
            }, 500);
        }


        const setVH = () => {

            let vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

        });



        return { start }
    }
}
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--Main-Pink, #F0D7CA);
    overflow-y: scroll;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
}

.loading-container::-webkit-scrollbar {
    display: none !important;
}


.image-container {
    position: relative;
    width: 100%;
    margin: -1%;
}

.image-container::-webkit-scrollbar {
    display: none !important;
}

.image-container img {
    width: 100%;
    height: auto;
}


.button-container1 {
    position: relative;
    width: 80%;
    background: var(--Main-Pink, #F0D7CA);
    margin-bottom: calc(1 * var(--vh));


}

.button-container1 button {
    width: 100%;
    padding: 10px;
    border-radius: 100px;
    border: 2px solid var(--Point-Red-Dark, #922142);
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    text-align: center;
    z-index: 1;
    position: relative;
}

.button-container1 div {
    width: 100%;
    border-radius: 100px;
    background: var(--Dark-Red, #922142);
    height: calc(6 * var(--vh));
    position: absolute;
    bottom: calc(-0.25 * var(--vh));
    z-index: 0;
}




.buttonborder {
    border-radius: 100px;
    background: var(--Dark-Red, #922142);
    position: absolute;
    width: 80%;
    height: calc(6 * var(--vh));
    top: calc(56 * var(--vh));
    left: 50%;
    transform: translateX(-50%);

}

.buttonborder2 {
    border-radius: 100px;
    background: var(--Dark-Red, #922142);
    position: absolute;
    width: 80%;
    height: calc(6 * var(--vh));
    bottom: calc(6 * var(--vh));
    left: 50%;
    transform: translateX(-50%);

}
</style>