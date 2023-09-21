<template>
    <div @click.stop="next()" class="loading-container" :style="bgStyle">
        <div class="image-container2">
            <div class="reward-container">
                <img src="@resource/common/sticker_reward_bg.png" />
                <img :src="currentImageSrc" />
                <p class="p">{{ currentImageText }}</p>
            </div>
        </div>
        <div class="text-container2">
            <img :src="characterContent?.src" alt="Description" class="overlap-image" />
            <p class="character-name">{{ selectCharacterName }}</p>
            <hr class="character-line">
            <p class="character-text">{{ characterContent?.text }}</p>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import router from '../router'
import { useCharacterStore } from '../stores/characterStore.js'


const filter2 = new URL('@resource/filter/02_filter.png', import.meta.url).href;
const filter3 = new URL('@resource/filter/03_filter.png', import.meta.url).href;
const filter4 = new URL('@resource/filter/04_filter.png', import.meta.url).href;
const filter5 = new URL('@resource/filter/05_filter.png', import.meta.url).href;
export default {
    name: 'FrameReward',
    setup() {
        const imageIndex = ref(0)
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(5)
        const commonIndex = ref(0)
        const bgImageUrl = new URL('@resource/common/bg.png', import.meta.url).href;

        const bgStyle = computed(() => {
            return {
                backgroundImage: `url(${bgImageUrl})`,
            }
        })

        const currentImageSrc = ref('')
        const currentImageText = ref('')

        characterStore.setCharacterIndex(localStorage.getItem('characterID'))

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter

            if (router.currentRoute.value.query.eventName === 'common1') {

                return char.common1[textIndex.value] || {}
            }
            else if (router.currentRoute.value.query.eventName === 'common2') {

                return char.common2[textIndex.value] || {}
            }
            else if (router.currentRoute.value.query.eventName === 'common3') {

                return char.common3[textIndex.value] || {}
            }
            else if (router.currentRoute.value.query.eventName === 'common4') {

                return char.common4[textIndex.value] || {}
            }
        })


        const getReward = () => {
            index.value = 2
            textIndex.value = 7
            switch (imageIndex.value) {
                case 0:
                    localStorage.setItem('characterSticker1', true)
                    break;
                case 1:
                    localStorage.setItem('characterSticker2', true)
                    break;
                case 2:
                    localStorage.setItem('characterSticker3', true)
                    break;
            }
        }
        const next = () => {
            if (index.value === 0) {
                index.value = 1
                textIndex.value += 1
                return;
            }
            if (index.value === 1) {
                index.value = 2
                textIndex.value += 1
                return;
            }
            if (index.value === 2) {
                if (router.currentRoute.value.query.eventName === 'common4') {
                    router.push('/commonfour3d')
                }
            }

        }
        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            if (router.currentRoute.value.query.eventName === 'common1') {
                currentImageText.value = '여름의 숲 프레임 모델링'
                currentImageSrc.value = filter3
            }
            else if (router.currentRoute.value.query.eventName === 'common2') {
                currentImageText.value = '봄의 숲 프레임 모델링'
                currentImageSrc.value = filter2
            }
            else if (router.currentRoute.value.query.eventName === 'common3') {
                currentImageText.value = '겨울의 숲 프레임 모델링'
                currentImageSrc.value = filter4
            }
            else if (router.currentRoute.value.query.eventName === 'common4') {
                currentImageText.value = '신비의 숲 프레임 모델링'
                currentImageSrc.value = filter5
                localStorage.setItem('item11', 'used')
                textIndex.value = 6

            }

            setVH();

            window.addEventListener('resize', setVH);
        })

        return {
            currentImageSrc,
            getReward,
            characterContent: currentCharacterContent,
            selectCharacterSrc: characterStore.currentCharacter.src,
            selectCharacterName: characterStore.currentCharacter.name,
            next,
            currentImageSrc,
            currentImageText,
            index,
            bgStyle
        }
    }
}
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(100 * var(--vh));
    background-color: #fff;
}

.image-container2 {
    width: 80%;
    height: calc(35 * var(--vh));
    display: flex;
    justify-content: space-evenly;
    align-items: center;
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
    top: -10%;
    left: 0;
    width: 100%;
    height: auto;
}

.reward-container img:nth-child(2) {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    width: 55%;
    height: 55%;
}

.reward-container p {
    position: absolute;
    top: 15%;
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
    top: 50%;
    right: -50px;
    width: 150px;
    height: auto;
    z-index: 1;
    transform: translateY(-50%);
}
</style>