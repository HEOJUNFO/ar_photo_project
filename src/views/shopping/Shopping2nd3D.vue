<template>
    <div>
        <div class="top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container2">
                <img :src="currentCharacter.src" alt="Side Image" />
            </div>
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="capture-container">
            <button onclick="captureImage()">촬영</button>
        </div>
        <div class="side-image-container">
            <img :src="currentCharacter.src" alt="Side Image" />
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../../stores/characterStore.js'
import Experience from '../../three/Experience/Experience.js'
import { onMounted, computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../../router';

export default {
    name: 'Capture',
    setup() {
        let experience;
        const index = ref(0)
        const textIndex = ref(5)
        const eventName = ref('shopping2')

        const characterStore = useCharacterStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.shopping2[textIndex.value] || {}
        })

        const saveImage = (image) => {
            router.push({ path: '/capturepreview', query: { imgData: image, eventName: eventName.value } });
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), saveImage);
        });

        onBeforeRouteLeave(() => {
            experience.destroy()
            experience.init()
        });

        return {
            index,
            currentCharacter,
            characterContent: currentCharacterContent,
        }
    }
}
</script>

<style scoped>
.webgl-container {
    height: calc(100 * var(--vh));
    width: 100%;
    top: 0vh;
    position: relative;
    overflow: hidden;
}

.webgl {
    position: fixed;
    left: 0;
    outline: none;
}

.side-image-container {
    position: absolute;
    top: calc(60 * var(--vh));
    right: -70%;
    transform: translateX(-50%);
    z-index: 2;
}

.side-image-container img {
    height: 50%;
    width: 50%;
    display: block;
}

.capture-container {
    position: absolute;
    top: calc(80 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.capture-container button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #555;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
}

.top-section {
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
}


.text-container1 {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    background-color: #fff;
    width: 80%;
}

.text-container1 p {
    padding: 7.5px 15px 7.5px 15px;
    font-size: 1rem;
}

.side-image-container2 {
    width: 20%;
    display: flex;
    align-items: center;
}

.side-image-container2 img {
    height: 100%;
    width: 100%;
    display: block;
}
</style>