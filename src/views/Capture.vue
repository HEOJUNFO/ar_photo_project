<template>
    <div>
        <div class="top-section">
            <div :class="{ 'hidden-content': index >= 0 }" class="text-container1">
                <p>TEST</p>
            </div>
            <div class="side-image-container">
                <img :src="currentCharacter.src" alt="Side Image" />
            </div>
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="footer">
            <button onclick="buttonClicked(1)">1 번</button>
            <button onclick="captureImage()">촬영</button>
            <button onclick="buttonClicked(3)">3 번</button>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import Experience from '../Experience/Experience.js'
import { onMounted, computed, ref } from 'vue';

export default {
    name: 'Capture',
    setup() {
        let experience;
        const index = ref(0)
        const characterStore = useCharacterStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        onMounted(() => {
            experience = new Experience(document.querySelector('canvas.webgl'));
        });

        return {
            index,
            currentCharacter,
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
    top: -10vh;
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
    bottom: 10vh;
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
    padding: 10px;
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
    width: 20%;
    display: flex;
    align-items: center;
}

.side-image-container img {
    height: 100%;
    width: 100%;
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
</style>