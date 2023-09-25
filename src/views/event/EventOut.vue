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
import { ref, onMounted, inject } from 'vue'
import router from '../../router'

export default {
    name: 'Landing',
    setup() {
        const eventId = ref('')

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
                audio.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        const playAudio2 = inject('playAudio');

        const scrollToTop = () => {
            window.scrollTo(0, 0);
        }


        const start = () => {

            scrollToTop();
            setTimeout(() => {
                if (eventId.value === '1') {
                    router.push('/event1');
                } else if (eventId.value === '2') {
                    router.push('/event2');
                } else if (eventId.value === '3') {
                    router.push('/event3');
                } else if (eventId.value === '4') {
                    router.push('/event4');
                } else if (eventId.value === '5') {
                    router.push('/event5');
                } else if (eventId.value === '6') {
                    router.push('/event6');
                } else if (eventId.value === '7') {
                    router.push('/event7');
                } else if (eventId.value === '8') {
                    router.push('/event8');
                } else if (eventId.value === '9') {
                    router.push('/event9');
                }
                else if (eventId.value === '10') {
                    router.push('/event10');
                }

            }, 500);
            playAudio();
            playAudio2();
        }


        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            eventId.value = localStorage.getItem('eventId')

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