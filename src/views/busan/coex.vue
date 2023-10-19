<template>
    <div @click="start()" class="loading-container" :style="bgStyle">

    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import router from '../../router'

export default {
    name: 'Landing',
    setup() {
        const audio = ref(null);

        import('@resource/sounds/generaltap.wav')
            .then(src => {
                audio.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio = () => {
            if (audio.value) {
                if (!audio.value.paused) {
                    audio.value.pause();
                    audio.value.currentTime = 0;
                }
                audio.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        const bgImageUrl = new URL('@resource/common/intro.jpg', import.meta.url).href;

        const bgStyle = computed(() => {
            return {
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: 'cover',
            }
        })

        const start = () => {
            playAudio();
            router.push('/busan2')
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();
            window.addEventListener('resize', setVH);
        });

        return { start, bgStyle }
    }
}
</script>

<style scoped>
.loading-container {
    height: calc(100 * var(--vh));
    width: 100%;
    background-position: center center;
}
</style>