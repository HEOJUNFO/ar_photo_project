<template>
    <div @click.stop="next()">
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="text-container2">
            <p class="character-name">{{ currentCharacter?.name }}</p>
            <hr class="character-line">
            <p class="character-text">{{ characterContent?.text }}</p>
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
            return currentCharacter.value?.intro[imageIndex.value] || {}
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
                router.push('/tutorial')
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


            experience.resources.on('ready', () => {
                if (localStorage.getItem('characterID') === '0') {
                    experience.world.setBell()
                } else if (localStorage.getItem('characterID') === '1') {
                    experience.world.setUno()
                } else if (localStorage.getItem('characterID') === '2') {
                    experience.world.setSorina()
                }
            })


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
    bottom: 0%;
    border-radius: 0px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: calc(25 * var(--vh));
}

.text-container2 .character-name {
    padding: 7.5px 15px 0 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 34px;
    letter-spacing: -0.6px;
    align-self: flex-start;
}

.text-container2 .character-text {
    padding: 7.5px 15px;
    color: #767676;
    font-family: "NanumSquare", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.45px;
    align-self: flex-start;
    text-align: left;
    max-width: 25ch;
    overflow-wrap: break-word;
    word-break: keep-all;
}

.character-line {
    width: 90%;
    border: 1px solid #D9D9D9;
    margin: 5px 0 5px 0;
    align-self: center
}
</style>