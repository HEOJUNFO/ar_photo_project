<template>
    <div @click="handleIndexTransition()" class="loading-container">
        <div class="top-section">
            <div :class="{ 'hidden-content': index >= 3 }" class="text-container1">
                <p>TEST</p>
            </div>
            <div class="side-image-container">
                <img :src="currentCharacter.src" alt="Side Image" />
            </div>
        </div>
        <div class="button-container">
            <button @click.stop="zoomIn">확대</button>
            <button @click.stop="zoomOut">축소</button>
        </div>
        <div class="image-container">
            <img :src="currentImageSrc" :style="{ transform: `scale(${zoom}) translate(${currentX}px, ${currentY}px)` }"
                alt="Loading..." @touchstart="startDrag" @touchmove="drag" @touchend="endDrag" @touchcancel="endDrag" />
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
        const zoom = ref(1)
        const dragging = ref(false)
        const currentX = ref(0)
        const currentY = ref(0)
        const lastX = ref(0)
        const lastY = ref(0)

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
            const consentGiven = localStorage.getItem('consentGiven');
            if (consentGiven === 'true') {
                router.push('/capture');
            } else {
                router.push('/terms');
            }
            if (transitions[index.value]) {
                transitions[index.value]()
            }
        }

        const zoomIn = () => {
            zoom.value += 0.1;
        }

        const zoomOut = () => {
            if (zoom.value > 0.1) {
                zoom.value -= 0.1;
            }
        }

        const startDrag = (event) => {
            event.preventDefault()
            dragging.value = true
            lastX.value = event.touches[0].clientX
            lastY.value = event.touches[0].clientY
        }

        const drag = (event) => {
            if (!dragging.value) return
            event.preventDefault()
            const deltaX = event.touches[0].clientX - lastX.value
            const deltaY = event.touches[0].clientY - lastY.value
            currentX.value += deltaX
            currentY.value += deltaY
            lastX.value = event.touches[0].clientX
            lastY.value = event.touches[0].clientY
        }

        const endDrag = () => {
            dragging.value = false
        }


        return {
            index,
            handleIndexTransition,
            currentImageSrc,
            currentCharacter,
            characterContent: currentCharacterContent,
            zoomIn,
            zoomOut,
            zoom,
            startDrag,
            drag,
            endDrag,
            currentX,
            currentY
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
    flex: 1;
}

.top-section {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
}


.text-container1 {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 10px;
    background-color: #fff;
    width: 80%;
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
    flex-grow: 1;
    display: flex;
    align-items: center;
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

.button-container {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 10;
}

.button-container button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-container button:first-child {
    order: -1;
}
</style>