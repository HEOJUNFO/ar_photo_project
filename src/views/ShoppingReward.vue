<template>
    <div class="loading-container">
        <div class="image-container">
            <button @click.stop="navigateToPreviousImage()">◀</button>
            <img :src="currentImageSrc" alt="Loading..." />
            <button @click.stop="navigateToNextImage()">▶</button>
        </div>

        <div class="button-container">
            <button @click.stop="getReward()">획득하기</button>
        </div>

    </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import router from '../router'

const IMAGES = [
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png',
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png',
    'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png'
]

export default {
    name: 'Intro',
    setup() {
        const imageIndex = ref(0)

        const currentImageSrc = computed(() => IMAGES[imageIndex.value])


        const navigateToNextImage = () => {
            imageIndex.value = (imageIndex.value + 1) % IMAGES.length;
        }

        const navigateToPreviousImage = () => {
            imageIndex.value = (imageIndex.value - 1 + IMAGES.length) % IMAGES.length;
        }

        const getReward = () => {
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


        return {
            currentImageSrc,
            navigateToNextImage,
            navigateToPreviousImage,
            getReward
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
    height: 100vh;
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
</style>