<template>
    <div>
        <loading-container>
        </loading-container>
        <div class="top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="characterContent.src" alt="Side Image" />
            </div>
        </div>
        <div class="image-container">
            <img :class="{ 'hidden': hideImage1 }" class="img1" src="@resource/content/mini2.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%' }" class="img2" src="@resource/magicCircle/p_01.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" @transitionend="handleTransitionEnd" />
            <img :style="{ width: image3Width + '%' }" class="img3" src="@resource/magicCircle/p_02.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image3Width + '%' }" class="img4" src="@resource/magicCircle/p_03.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" />
        </div>
        <div class="loading-container">
            <div class="webgl-container">
                <canvas class="webgl"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../../stores/characterStore.js'
import { ref, computed, watch, onMounted } from 'vue'
import router from '../../router'
import LoadingContainer from '../../components/LoadingContainer.vue'
import Experience from '../../three/Common4/Experience.js'
import { onBeforeRouteLeave } from 'vue-router'

export default {
    name: 'Common4',
    components: {
        LoadingContainer
    },
    setup() {
        let experience;
        const characterStore = useCharacterStore()
        const textIndex = ref(3)

        characterStore.setCharacterIndex(localStorage.getItem('characterID'))

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter
            return char?.common4[textIndex.value] || {}
        })

        const hideImage1 = ref(false)
        const animateImage2 = ref(false)
        const image2Width = ref(0)
        const image3Width = ref(0)


        const handleMouseDown = (event) => {
            event.preventDefault();


            hideImage1.value = true;
            image3Width.value = 100;
            image2Width.value = 100;
        }

        const handleMouseUp = () => {

            image3Width.value = 0;
            image2Width.value = 0;
        }


        const nextPage = () => {
            router.push({ path: '/framereward', query: { eventName: "common4" } });
        }

        const handleTransitionEnd = () => {
            if (image2Width.value === 100) {
                nextPage();
            } else {
                hideImage1.value = false;
            }
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);
            experience = new Experience(document.querySelector('canvas.webgl'));
        })

        onBeforeRouteLeave(() => {
            experience.destroy()
            experience.init()
        });

        return {
            characterContent: currentCharacterContent,
            selectCharacterSrc: characterStore.currentCharacter?.src,
            selectCharacterName: characterStore.currentCharacter?.name,
            hideImage1,
            image3Width,
            animateImage2,
            handleMouseDown,
            handleMouseUp,
            image2Width,
            handleTransitionEnd
        }
    }
}
</script>

<style scoped>
.webgl-container {
    height: calc(100 * var(--vh));
    width: 100%;
    position: relative;
    overflow: hidden;
}

.webgl {
    position: fixed;
    left: 0;
    outline: none;
}

.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    background-color: #fff;
}




.img1,
.img2,
.img3,
.img4 {
    transform-origin: center center;
    height: auto;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
}

.img1 {
    z-index: 2;
    top: calc(45 * var(--vh));
    width: 30%;
    opacity: 0.8;

}

.img2 {
    z-index: 3;
    top: calc(45 * var(--vh));
    width: 0%;
    transition: width 3s ease-in-out;
    animation: rotate1 3s linear infinite;
}



@keyframes rotate1 {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes rotate2 {
    from {
        transform: translate(-50%, -50%) rotate(360deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(0deg);
    }
}

.img3 {
    z-index: 3;
    top: calc(45 * var(--vh));
    width: 0%;
    transition: width 3s ease-in-out;
    animation: rotate2 3s linear infinite;
}

.img4 {
    z-index: 3;
    top: calc(45 * var(--vh));
    width: 0%;
    transition: width 3s ease-in-out;
    animation: rotate1 3s linear infinite;
}


.top-section {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    margin-top: calc(2.5 * var(--vh));
}


.text-container1 {
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 75%;
    position: relative;
    border-radius: 16px;
    margin-left: 5%;
}

.text-container1::before {
    content: "";
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #fff;
    position: absolute;
    right: -10px;
    top: 30%;
    transform: translateY(-50%);
}

.text-container1 p {
    overflow: hidden;
    padding: 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    overflow-wrap: break-word;
    word-break: keep-all;
}

.side-image-container {
    width: 20%;
    display: flex;
    align-items: center;
}

.side-image-container img {
    height: 100%;
    width: 100%;
    display: block;
}

.hidden {
    opacity: 0;
}
</style>