<template>
    <div>
        <div class="top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="currentCharacter.src" alt="Side Image" />
            </div>
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
    </div>
</template>

<script>
import Experience from '../../three/Common3/Experience.js'
import { onMounted, ref, computed } from 'vue';
import router from '../../router';
import { useCharacterStore } from '../../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'

export default {
    name: 'CommonThree3d',
    setup() {
        let experience;
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(4)
        const itemValue = ref(0)

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common3[textIndex.value] || {}
        })

        const next = () => {
            if (index.value === 0) {
                index.value = 1
                router.push({ path: '/framereward', query: { eventName: "common3" } });
            }
        }


        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), next);



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
.webgl-container {
    height: calc(100 * var(--vh));
    width: 100%;
    position: relative;
    overflow: hidden;
}

.webgl {
    position: fixed;
    left: 0;
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
    padding: 10px;
    background-color: #fff;
    width: 80%;
}

.text-container1 p {
    padding: 7.5px 15px 7.5px 15px;
    font-size: 1rem;
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