<template>
    <div @click.stop="next()" class="loading-container">
        <div class="image-container">
            <button @click.stop="navigateToPreviousImage()">◀</button>
            <img :src="currentImageSrc" alt="Loading..." />
            <button @click.stop="navigateToNextImage()">▶</button>
        </div>

        <div class="button-container">
            <button @click.stop="getReward()">획득하기</button>
        </div>
        <div class="text-container2">
            <img :src="selectCharacterSrc" alt="Description" class="overlap-image" />
            <p>{{ selectCharacterName }}</p>
            <p>{{ characterContent.text }}</p>
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
    name: 'StickerReward',
    setup() {
        const imageIndex = ref(0)
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(5)

        const currentImageSrc = computed(() => IMAGES[imageIndex.value])

        characterStore.setCharacterIndex(localStorage.getItem('characterID'))

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter

            if (router.currentRoute.value.query.eventName === 'shopping') {
                return char.shopping[textIndex.value] || {}
            }
            else if (router.currentRoute.value.query.eventName === 'culture') {
                return char.culture[textIndex.value] || {}
            }
            else if (router.currentRoute.value.query.eventName === 'eatingOut') {
                return char.eatingOut[textIndex.value] || {}
            }
        })


        const navigateToNextImage = () => {
            imageIndex.value = (imageIndex.value + 1) % IMAGES.length;
        }

        const navigateToPreviousImage = () => {
            imageIndex.value = (imageIndex.value - 1 + IMAGES.length) % IMAGES.length;
        }

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
            navigateToNextImage,
            navigateToPreviousImage,
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

.button-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}

.button-container button {
    background-color: #fff;
    color: black;
    border: 1px solid black;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button-container button:hover {
    background-color: #eee;
}

.image-container {
    display: flex;
    align-items: center;
    margin-top: 7vh;
    margin-bottom: 7vh;
}

.image-container img {
    width: 100%;
    height: 100%;
}

.image-container button {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
}

.image-container button:hover {
    background: rgba(0, 0, 0, 0.7);
}

.text-container2 p {
    padding: 7.5px 15px 7.5px 15px;
    font-size: 0.5rem;
}

.text-container2 {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 10px;
    background-color: #fff;
    width: 100%;
    height: calc(20 * var(--vh));
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