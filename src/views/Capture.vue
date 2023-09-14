<template>
    <div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="capture-container">
            <button onclick="captureImage()">촬영</button>
        </div>
        <div class="help-container">
            <button @click="helpButtonClicked()">help</button>
        </div>
        <div class="side-image-container">
            <img :src="currentCharacter.src" alt="Side Image" />
        </div>
        <div class="footer">
            <button @click="shopping">쇼핑</button>
            <button onclick="buttonClicked(2)">외식</button>
            <button @click="culture">문화</button>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import Experience from '../three/Experience/Experience.js'
import { onMounted, computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../router';

export default {
    name: 'Capture',
    setup() {
        let experience;


        const index = ref(0)
        const characterStore = useCharacterStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const helpButtonClicked = () => {
            router.push('/help');
        }

        const saveImage = (image) => {
            router.push({ path: '/capturepreview', query: { imgData: image } });
        }

        const shopping = () => {
            router.push('/shopping');
        }
        const culture = () => {
            router.push('/culture');
        }
        onMounted(() => {
            experience = new Experience(document.querySelector('canvas.webgl'), saveImage);
        });

        onBeforeRouteLeave(() => {
            experience.destroy()
            experience.init()
        });

        return {
            index,
            currentCharacter,
            helpButtonClicked,
            shopping,
            culture
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

html,
body {
    overflow: hidden;
}

.webgl-container {
    height: 90vh;
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

.footer {
    position: relative;
    bottom: 0vh;
    height: 10vh;
    width: 100%;
    background-color: #333;
    color: #fff;
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    align-items: center;
    justify-content: center;
}

.footer button {
    margin: 0;
    background-color: #555;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.footer button:hover {
    background-color: #777;
}

.side-image-container {
    position: absolute;
    top: 60vh;
    right: -70%;
    transform: translateX(-50%);
    z-index: 2;
}

.side-image-container img {
    height: 50%;
    width: 50%;
    display: block;
}


.hidden-content {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    height: 10vh;
    overflow: hidden;
}

.top-section {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10vh;
    justify-content: space-between;
    align-items: center;
}

.capture-container {
    position: absolute;
    top: 80vh;
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

.help-container {
    position: absolute;
    top: 5vh;
    left: 90%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.help-container button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #8252e2;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
}
</style>