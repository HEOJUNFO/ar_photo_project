<template>
    <div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div :class="{ 'hidden-content': !(index === 0 || index >= 2) }" class="text-container2">
            <img :src="currentCharacter.src" alt="Description" class="overlap-image" />
            <p v-show="index === 0">{{ currentCharacter.name }}</p>
            <p v-show="index === 0">{{ characterContent.text }}</p>
        </div>
    </div>
</template>

<script>
import Experience from '../three/Intro/Experience.js'
import { onMounted, ref, computed } from 'vue';
import router from '../router';
import { useCharacterStore } from '../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'

export default {
    name: 'Intro3D',
    setup() {
        let experience;
        const characterStore = useCharacterStore()
        const index = ref(0)
        const imageIndex = ref(3)

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.intro[imageIndex.value] || {}
        })

        onMounted(() => {
            experience = new Experience(document.querySelector('canvas.webgl'), exit);
        });

        onBeforeRouteLeave(() => {
            experience.init()
        });

        const exit = () => {
            router.push('/help');
        }

        return {
            index,
            currentCharacter,
            characterContent: currentCharacterContent,
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

.hidden-content {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    height: 10vh;
    overflow: hidden;
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