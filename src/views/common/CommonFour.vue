<template>
    <div @click="next()">
        <loading-container>
        </loading-container>
        <div v-show="index >= 2" class="top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="characterContent.src" alt="Side Image" />
            </div>
        </div>
        <div v-show="index === 0" class="image-container2">
            <div class="reward-container">
                <img src="../../resource/common/unreward_bg.png" />
                <img src="../../resource/storageBox/Sorina_Reward.png" />
                <p class="p">캐릭터 감정표현 스티커 5종 세트</p>
            </div>
        </div>
        <div v-show="index >= 1" class="image-container">
            <img :class="{ 'hidden': hideImage1 }" class="img1" src="../../resource/content/mini.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%' }" class="img2" src="../../resource/content/neon.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" @transitionend="handleTransitionEnd" />
            <img :style="{ width: image3Width + '%' }" class="img3" src="../../resource/content/brown.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" />
        </div>

        <div class="loading-container">
            <div class="webgl-container">
                <canvas class="webgl"></canvas>
            </div>
            <div v-show="index < 2" class="text-container2">
                <img :src="characterContent.src" alt="Description" class="overlap-image" />
                <p class="character-name">{{ selectCharacterName }}</p>
                <hr class="character-line">
                <p class="character-text">{{ characterContent.text }}</p>
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
        const index = ref(0)
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
        const timeoutEnlarge = ref(null)


        const handleMouseDown = (event) => {
            event.preventDefault();

            if (index.value !== 2) {
                index.value = 2
                return;
            }
            hideImage1.value = true;
            image3Width.value = 100;
            image2Width.value = 100;
        }

        const handleMouseUp = () => {
            if (index.value !== 2) {
                index.value = 2
                return;
            }

            hideImage1.value = false;
            image3Width.value = 0;
            image2Width.value = 0;
        }


        const next = () => {
            if (index.value === 0) {
                index.value = 1
                textIndex.value = 4
                return;

            } else if (index.value === 1) {
                index.value = 2
                textIndex.value = 5
                return;
            }
        }
        const nextPage = () => {
            console.log('next')
        }

        const handleTransitionEnd = () => {
            if (image2Width.value === 100) {
                nextPage();
            }
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);
            experience = new Experience(document.querySelector('canvas.webgl'), next);
        })

        onBeforeRouteLeave(() => {
            experience.destroy()
            experience.init()
        });

        return {
            index,
            next,
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

.text-container2 {
    bottom: 0%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: none;
    background-color: #fff;
    width: 100%;
    height: calc(25 * var(--vh));
}

.text-container2 .character-name {
    padding: 7.5px 15px 0 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 34px;
    letter-spacing: -0.6px;
    align-self: flex-start;
}

.text-container2 .character-text {
    padding: 7.5px 15px;
    color: #767676;
    font-family: "NanumSquare", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.45px;
    align-self: flex-start;
    text-align: left;
    max-width: 20ch;
    overflow-wrap: break-word;
    word-break: keep-all;
}

.character-line {
    width: 90%;
    border: 1px solid #D9D9D9;
    margin: 5px 0 5px 0;
    align-self: center
}


.overlap-image {
    position: absolute;
    top: 30%;
    right: -5%;
    width: 150px;
    height: auto;
    z-index: 1;
    transform: translateY(-50%);
}

.image-container2 {
    z-index: 2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: calc(40 * var(--vh));
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    margin-top: calc(25 * var(--vh));
}

.reward-container {
    position: relative;
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
}


.reward-container img:first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.reward-container img:nth-child(2) {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 50%;
}

.reward-container p {
    position: absolute;
    top: 70%;
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    max-width: 11ch;
    overflow-wrap: break-word;
    word-break: keep-all;

}

.image-container {}

.img1,
.img2,
.img3 {
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
    width: 20%;
    transition: width 5s ease-in-out, opacity 1s ease-in-out;
}

.img2 {
    z-index: 3;
    top: calc(45 * var(--vh));
    width: 0%;
    opacity: 0.5;
    transition: width 5s ease-in-out, opacity 5s ease-in-out;
    animation: rotate2 5s linear infinite;
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
    z-index: 4;
    top: calc(45 * var(--vh));
    width: 0%;
    transition: width 4s ease-in-out, opacity 5s ease-in-out;
    animation: rotate1 5s linear infinite;
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