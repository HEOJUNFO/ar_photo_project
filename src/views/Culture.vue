<template>
    <div>
        <loading-container>
        </loading-container>
        <div class="loading-container">
            <div class="text-container1">
                <p>숲에 동행할 요정을 골라주세요</p>
            </div>
            <div class="image-container">
                <button @click.stop="navigateToPreviousImage()">◀</button>
                <img :src="currentImageSrc" alt="Loading..." />
                <button @click.stop="navigateToNextImage()">▶</button>
            </div>
            <div class="text-container2">
                <p v-show="index === 0">{{ selectCharacterName }}</p>
                <p v-show="index === 0">{{ characterContent.text }}</p>
                <div class="button-container">
                    <button v-show="index === 0" @click.stop="next()">
                        선택하기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { ref, computed, watch, onMounted } from 'vue'
import router from '../router'
import LoadingContainer from '../components/LoadingContainer.vue'

const IMAGES = [
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png',
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png',
    'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png'
]



export default {
    name: 'Culture',
    components: {
        LoadingContainer
    },
    setup() {
        const characterStore = useCharacterStore()
        const index = ref(0)
        const imageIndex = ref(0)

        const currentImageSrc = computed(() => IMAGES[imageIndex.value])

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter
            return char.intro[index.value] || {}
        })


        const next = () => {
            router.push('/intro3d')
        }

        const navigateToNextImage = () => {
            imageIndex.value = (imageIndex.value + 1) % IMAGES.length;
            characterStore.setCharacterIndex(imageIndex.value)
        }

        const navigateToPreviousImage = () => {
            imageIndex.value = (imageIndex.value - 1 + IMAGES.length) % IMAGES.length;
            characterStore.setCharacterIndex(imageIndex.value)
        }



        return {
            index,
            next,
            currentImageSrc,
            navigateToNextImage,
            navigateToPreviousImage,
            characterContent: currentCharacterContent,
            selectCharacterSrc: characterStore.currentCharacter.src,
            selectCharacterName: characterStore.currentCharacter.name,
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

.text-container1 {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 10px;
    background-color: #fff;
}

.text-container1 p {
    padding: 7.5px 15px 7.5px 15px;
    font-size: 1.5rem;
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