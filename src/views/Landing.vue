<template>
    <div class="loading-container">

        <div class="image-container">
            <img src="../resource/landing/web-landing-page.jpg" alt="Image 1" />
            <button @click="start()">신비의 숲 시작하기</button>

        </div>


        <div class="image-container2">
            <img src="../resource/landing/web-landing-page-2.jpg" alt="Image 2" />
            <button @click="start()">신비의 숲 시작하기</button>
        </div>


        <div class="image-container">
            <img src="../resource/landing/web-landing-page-3.jpg" alt="Image 3" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import router from '../router'

export default {
    name: 'Landing',
    setup() {


        const next1 = () => {
            router.push('/next1')
        }

        const next2 = () => {
            router.push('/next2')
        }

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



        return { next1, next2, start }
    }
}
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.image-container {
    position: relative;
    margin: -1%;
}

.image-container img {
    width: 100%;
    height: auto;
}

.image-container2 {
    position: relative;
    margin: -1%;
    width: 100%;
    height: 100%;
}

.image-container2 img {
    width: 100%;
    height: auto;
}


.image-container img {
    width: 100%;
    height: auto;

}

.image-container button {
    position: absolute;
    width: 80%;
    padding: 10px;
    bottom: calc(5 * var(--vh));
    left: 50%;
    transform: translateX(-50%);
    border: none;
    border-radius: 100px;
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.image-container2 button {
    position: absolute;
    width: 80%;
    padding: 10px;
    bottom: calc(5 * var(--vh));
    left: 50%;
    transform: translateX(-50%);
    border: none;
    border-radius: 100px;
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}
</style>