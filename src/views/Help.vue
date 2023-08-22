<template>
    <div @click="handleIndexTransition()" class="loading-container">
        <div :class="{ 'hidden-content': index >= 3 }" class="text-container1">
            <p>TEST</p>
        </div>
        <div class="image-container">
            <img :src="currentImageSrc" alt="Loading..." />
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { ref, computed, watch } from 'vue'
import router from '../router'

const IMAGES = [
    'https://playar.syrup.co.kr/sodarimg/is/marketing/202308/17TZcrb5Q*38b3ed16b02bec43416b4a7dec923cb0.gif',
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png',
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png',
    'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png'
]

export default {
    name: 'Help',
    setup() {
        const characterStore = useCharacterStore()
        const index = ref(0)
        const imageIndex = ref(0)
        const characterIndex = ref(0)

        const currentImageSrc = computed(() => IMAGES[imageIndex.value])

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.contents[imageIndex.value] || {}
        })

        const transitions = {
            0: () => index.value = 1,
            1: () => index.value = 2,
            2: () => {
                index.value = 3
                characterIndex.value = 1
            },
            3: () => {
                index.value = 4
                characterIndex.value = 2
                characterStore.setCharacterIndex(imageIndex.value - 1)
            },
            4: () => {
                router.push('/intro3d')
            }
        }

        const handleIndexTransition = () => {
            if (transitions[index.value]) {
                transitions[index.value]()
            }
        }

        watch(index, (value) => {
            console.log(value)
        })

        return {
            index,
            handleIndexTransition,
            currentImageSrc,
            currentCharacter,
            characterContent: currentCharacterContent,
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

.hidden-content {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    height: 10vh;
    overflow: hidden;
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