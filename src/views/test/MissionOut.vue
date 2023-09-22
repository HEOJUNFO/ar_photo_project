<template>
    <div class="loading-container">

        <div class="image-container">
            <img src="@resource/mission/web-landing-page-1.jpg" alt="Image 1" />
            <button @click="start()">다시하기
            </button>
        </div>
        <div class="image-container2">
            <img src="@resource/mission/web-landing-page-2.jpg" alt="Image 2" />
        </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import router from '../../router'

export default {
    name: 'Landing',
    setup() {
        const eventName = ref('')


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
                if (eventName.value === 'culture') {
                    router.push('/culture3d');

                }

            }, 500);
        }


        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            eventName.value = router.currentRoute.value.query.eventName;

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
    background-color: #F0D7CA;
}

.image-container {
    position: relative;
    margin-bottom: 10%;
}

.image-container img {
    width: 100%;
    height: auto;
}

.image-container2 {
    position: relative;
}

.image-container2 img {
    width: 100%;
    height: auto;
}

.image-container button {
    position: absolute;
    width: 80%;
    padding: 10px;
    bottom: calc(-5 * var(--vh));
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
    z-index: 2;
}
</style>