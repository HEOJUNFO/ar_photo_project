<template>
    <div @click.stop="next()">
        <loading-container>
        </loading-container>
        <div class="loading-container">
            <div class="image-container">
                <img :src="currentImageSrc" alt="Loading..." />
            </div>
            <div class="text-container2">
                <img :src="selectCharacterSrc" alt="Description" class="overlap-image" />
                <p v-show="index === 0">{{ selectCharacterName }}</p>
                <p v-show="index === 0">{{ characterContent.text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../../stores/characterStore.js'
import { ref, computed, watch, onMounted } from 'vue'
import router from '../../router'
import LoadingContainer from '../../components/LoadingContainer.vue'

const IMAGES = [
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png',
    'https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png',
    'https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png'
]

export default {
    name: 'EatingOut',
    components: {
        LoadingContainer
    },
    setup() {
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(3)

        const currentImageSrc = computed(() => IMAGES[0])

        characterStore.setCharacterIndex(localStorage.getItem('characterID'))

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter
            return char.eatingOut[textIndex.value] || {}
        })

        const next = () => {
            router.push('/eatingout3d')
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
            index,
            next,
            currentImageSrc,
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
    height: calc(100 * var(--vh));
    background-color: #fff;
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