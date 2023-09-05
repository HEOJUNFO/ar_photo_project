<template>
    <div>
        <div v-show="index === 1" class="top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="currentCharacter.src" alt="Side Image" />
            </div>
        </div>
        <div @click="next()" class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div v-show="index === 0" class="text-container2">
            <img :src="currentCharacter.src" alt="Description" class="overlap-image" />
            <p>{{ currentCharacter.name }}</p>
            <p>{{ characterContent.text }}</p>
        </div>
    </div>
</template>

<script>
import Experience from '../three/Shopping/Experience.js'
import { onMounted, ref, computed } from 'vue';
import router from '../router';
import { useCharacterStore } from '../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'

export default {
    name: 'Shopping',
    setup() {
        let experience;
        const characterStore = useCharacterStore()
        const index = ref(0)

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.shopping[index.value] || {}
        })

        const next = () => {
            if (index.value === 0) {
                index.value = 1
                experience.modelVisible()
            } else if (index.value === 1) {
                index.value = 2
                router.push('/shoppingreward')
            }
        }


        onMounted(() => {
            experience = new Experience(document.querySelector('canvas.webgl'), next);
        });

        onBeforeRouteLeave(() => {
            experience.init()
        });

        return {
            index,
            currentCharacter,
            characterContent: currentCharacterContent,
            next,
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
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
}

.webgl {
    position: fixed;
    left: 0;
    outline: none;
}

.text-container2 {
    z-index: 2;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 10px;
    background-color: #fff;
    bottom: 10vh;
}

.hidden-content2 {
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

.top-section {
    position: absolute;
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
</style>