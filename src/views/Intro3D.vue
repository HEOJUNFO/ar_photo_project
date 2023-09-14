<template>
    <div @click.stop="next()">
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="text-container2">
            <p v-show="index >= 0">{{ currentCharacter.name }}</p>
            <p v-show="index >= 0">{{ characterContent.text }}</p>
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
        const imageIndex = ref(1)

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.intro[imageIndex.value] || {}
        })

        const next = () => {
            if (index.value === 0) {
                index.value = 1
                imageIndex.value = 2

            } else if (index.value === 1) {
                index.value = 2
                imageIndex.value = 3
            } else if (index.value === 2) {
                index.value = 3
                imageIndex.value = 4
            } else if (index.value === 3) {
                index.value = 4
                imageIndex.value = 5
            } else if (index.value === 4) {
                router.push('/capture')
            }
        }
        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), exit);
        });

        onBeforeRouteLeave(() => {
            experience.destroy()
            experience.init()
        });

        const exit = () => {
            router.push('/help');
        }

        return {
            index,
            currentCharacter,
            characterContent: currentCharacterContent,
            next
        }
    }
}
</script>

<style scoped>
.webgl-container {
    height: calc(80 * var(--vh));
    width: 100%;
    position: relative;
    overflow: hidden;
}

.webgl {
    position: fixed;
    top: 0vh;
    left: 0;
    outline: none;
}

.text-container2 {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    background-color: #fff;
    bottom: 0vh;
    width: 100%;
    height: calc(20 * var(--vh));
}
</style>