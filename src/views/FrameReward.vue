<template>
    <div @click.stop="next()" class="loading-container">
        <div class="image-container2">
            <div class="reward-container">
                <img src="../resource/common/sticker_reward_bg.png" />
                <img
                    src="https://playar.syrup.co.kr/sodarimg/is/marketing/202308/17TZcrb5Q*38b3ed16b02bec43416b4a7dec923cb0.gif" />
            </div>
        </div>
        <div class="text-container2">
            <img :src="selectCharacterSrc" alt="Description" class="overlap-image" />
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

const IMAGES = [
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png',
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png',
    'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png'
]

export default {
    name: 'FrameReward',
    setup() {
        const imageIndex = ref(0)
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(5)

        const currentImageSrc = computed(() => IMAGES[imageIndex.value])

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
                textIndex.value = 6
            }
            if (index.value === 2) {
                index.value = 3
                textIndex.value = 8
            }
            if (index.value === 3) {
                // router.push('/shopping')
            }
        }
        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
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
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 60%;
}

.text-container2 p {
    padding: 7.5px 15px 7.5px 15px;
    font-size: 0.5rem;
}

.text-container2 {
    bottom: 0%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid black;
    background-color: #fff;
    width: 100%;
    height: calc(20 * var(--vh));
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
    max-width: 25ch;
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