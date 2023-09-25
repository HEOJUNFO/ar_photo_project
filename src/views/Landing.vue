<template>
    <div>
        <div v-if="imagesLoaded" class="loading-container">
            <div class="image-container">
                <img src="@resource/mission/web-landing-page-1.jpg" alt="Image 1" />
            </div>
            <div class="button-container1">
                <button @click="start()">신비의 숲 시작하기</button>
                <img src="@resource/common/tap.png" alt="Image 1" />
            </div>
            <div class="image-container">
                <img src="@resource/mission/web-landing-page-2.jpg" alt="Image 1" />
            </div>

            <div class="image-container">
                <img src="@resource/landing/landing_02.jpg" alt="Image 2" />
            </div>
            <div class="button-container2">
                <button @click="start()">신비의 숲 시작하기</button>
            </div>
            <div class="image-container">
                <img src="@resource/landing/web-landing-page-3.jpg" alt="Image 3" />
            </div>
        </div>
        <div v-if="!imagesLoaded">
            <div class="loading-container">
                <img src="@resource/common/bg.png" alt="Loading..." />
                <img id="spinner" src="@resource/common/Spinner.png" />
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import router from '../router'

export default {
    name: 'Landing',
    setup() {
        const playAudio2 = inject('playAudio');
        const imagesLoaded = ref(false);

        const scrollToTop = () => {
            window.scrollTo(0, 0);
        }

        const start = () => {
            scrollToTop();
            playAudio2();
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

            localStorage.setItem('eventId', 0)


            setTimeout(() => {
                imagesLoaded.value = true;
            }, 1000);
        });





        return { start, imagesLoaded }
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

}

.loading-container::-webkit-scrollbar {
    display: none !important;
}


.image-container {
    position: relative;
    width: 100%;
    margin: -1%;
    overflow-y: scroll;
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
    box-shadow: 0px 3px #922142
}

.button-container1 img {
    width: auto;
    height: 100%;
    position: absolute;
    top: 40%;
    left: 80%;
    transform: translateX(-50%);
    z-index: 3;
}


.button-container2 {
    position: relative;
    width: 80%;
    background: var(--Main-Pink, #F0D7CA);
    margin-top: calc(1 * var(--vh));
    margin-bottom: calc(5 * var(--vh));


}

.button-container2 button {
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

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

#spinner {
    position: fixed;
    width: calc(20 * var(--vh));
    height: calc(20 * var(--vh));
    animation: spin 2s linear infinite;
    top: calc(35 * var(--vh));
}
</style>