<template>
    <div class="navbar">상단바</div>
    <div class="webgl-container">
        <canvas class="webgl"></canvas>
    </div>
    <div class="footer">
        <button onclick="buttonClicked(1)">1 번</button>
        <button onclick="captureImage()">촬영</button>
        <button onclick="buttonClicked(3)">3 번</button>
    </div>
</template>

<script>
import Experience from '../Experience/Experience.js'
import { onMounted } from 'vue';

export default {
    name: 'Capture',
    setup() {
        let experience;

        onMounted(() => {
            experience = new Experience(document.querySelector('canvas.webgl'));
        });
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
    height: 80vh;
    width: 100%;
    position: relative;
    overflow: hidden;
}

.webgl {
    position: fixed;
    top: 10vh;
    left: 0;
    outline: none;
}

.navbar,
.footer {
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
</style>