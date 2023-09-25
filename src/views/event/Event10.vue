<template>
    <div class="loading-container">
        <div class="image-container">
            <img src="@resource/mission/web-landing-page-1.jpg" alt="Image 1" />
        </div>
        <div class="button-container2">
            <button class="button1" v-if="!clear" @click="start()">가을의 쉼 촬영하기</button>
            <button class="button2" v-if="clear" @click="start()">이벤트 참여 완료</button>
        </div>
        <div class="image-container">
            <img src="@resource/mission/web-landing-page-2.jpg" alt="Image 2" />
        </div>

    </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import router from '../../router'

export default {
    name: 'Landing',
    setup() {

        const playAudio2 = inject('playAudio');



        const clear = ref(false);


        const scrollToTop = () => {
            window.scrollTo(0, 0);
        }


        const start = () => {

            playAudio2();
            scrollToTop();

            setTimeout(() => {
                router.push('/loading');
            }, 500);
        }


        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            localStorage.setItem('eventId', 10)

            if (localStorage.getItem('clearId10') === 'true') {
                // clear.value = true;
            }

        });



        return { start, clear }
    }
}
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F0D7CA;
}

.image-container {
    width: 100%;
    position: relative;
}

.image-container img {
    width: 100%;
    height: auto;
}

.button-container2 {
    position: relative;
    width: 80%;
    background: var(--Main-Pink, #F0D7CA);
}

.button1 {
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
    box-shadow: 0px 3px #922142
}

.button2 {
    width: 100%;
    padding: 10px;
    border-radius: 100px;
    background: var(--Main-Green, #06734C);
    border: none;
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
    outline: 1px solid #06734C;
    outline-offset: 2px;
}
</style>