<template>
    <div>
        <!-- <div v-show="index === 1" class="top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="currentCharacter.src" alt="Side Image" />
            </div>
        </div> -->
        <div @click="next()" class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div @click="next()" class="webgl-container">
            <canvas class="webgl2"></canvas>
        </div>
        <div class="image-container">
            <img src="../resource/culture/game_bg_water.png" alt="Below Image" class="image-below" :style="clipStyle">
            <img src="../resource/culture/game_bg_land.png" alt="Above Image" class="image-above">
            <img v-show="visibleStone1" @click="stone1()" src="../resource/culture/game_stone01.png" alt="Above Image"
                class="image-stone" style="top:30vh; left: 20vw;">
            <img v-show="visibleStone2" @click="stone2()" src="../resource/culture/game_stone02.png" alt="Above Image"
                class="image-stone" style="top:50vh; left: 60vw;">
            <img v-show="visibleStone3" @click="stone3()" src="../resource/culture/game_stone04.png" alt="Above Image"
                class="image-stone" style="top:75vh; left: 16vw;">
            <img v-show="visibleStone3" @click="stone3()" src="../resource/culture/game_stone03.png" alt="Above Image"
                class="image-stone" style="top:76vh; left: 9vw;">
        </div>
        <!-- <div v-show="index === 0" class="text-container2">
            <img :src="currentCharacter.src" alt="Description" class="overlap-image" />
            <p>{{ currentCharacter.name }}</p>
            <p>{{ characterContent.text }}</p>
        </div> -->
    </div>
</template>

<script>
import Experience from '../three/Culture/Experience.js'
import Experience2 from '../three/Experience/Experience.js';
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import router from '../router';
import { useCharacterStore } from '../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'

export default {
    name: 'Culture',
    setup() {
        let experience;
        let experience2;
        const characterStore = useCharacterStore()
        const index = ref(0)
        const percentage = ref(0)
        const maxPercentage = ref(27)
        const visibleStone1 = ref(true)
        const visibleStone2 = ref(true)
        const visibleStone3 = ref(true)

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.culture[index.value] || {}
        })

        const stone1 = () => {
            visibleStone1.value = false
            if (visibleStone2.value === false && visibleStone3.value === false) {
                maxPercentage.value = 99.9;
            } else if (visibleStone2.value === false && visibleStone3.value === true) {
                maxPercentage.value = 71;
            } else {
                maxPercentage.value = 47;
            }
        }

        const stone2 = () => {
            visibleStone2.value = false
            if (visibleStone1.value === false && visibleStone3.value === false) {
                maxPercentage.value = 99.9;
            } else if (visibleStone1.value === false && visibleStone3.value === true) {
                maxPercentage.value = 71;
            } else {
                maxPercentage.value = 27;
            }
            console.log(maxPercentage.value)

        }

        const stone3 = () => {
            visibleStone3.value = false
            if (visibleStone1.value === false && visibleStone2.value === false) {
                maxPercentage.value = 99.9;
            } else if (visibleStone1.value === false && visibleStone2.value === true) {
                maxPercentage.value = 47;
            } else {
                maxPercentage.value = 27;
            }
        }

        const next = () => {
            if (index.value === 0) {
                index.value = 1

            } else if (index.value === 1) {
                index.value = 2
                router.push('/shoppingreward')
            }
        }

        const updatePercentage = () => {
            if (percentage.value <= maxPercentage.value) {
                percentage.value = (percentage.value + 0.1) % 100;
            }

        };

        const clipStyle = computed(() => {
            return `clip-path: inset(0 0 ${100 - percentage.value}% 0);`;
        });


        onMounted(() => {
            experience = new Experience(document.querySelector('canvas.webgl2'), next);
            experience2 = new Experience2(document.querySelector('canvas.webgl'), next);
            const interval = setInterval(updatePercentage, 2);  // 100ms마다 percentage 값을 1씩 증가

            onBeforeUnmount(() => {
                clearInterval(interval);
            });
        });

        onBeforeRouteLeave(() => {
            experience.init()
        });

        return {
            index,
            currentCharacter,
            characterContent: currentCharacterContent,
            next,
            clipStyle,
            stone1,
            stone2,
            stone3,
            visibleStone1,
            visibleStone2,
            visibleStone3
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
    position: absolute;
    overflow: hidden;
}

.webgl {
    position: fixed;
    left: 0;
    outline: none;
}

.webgl2 {
    z-index: 4;
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

.image-container {
    position: absolute;
    bottom: 10vh;
    width: 100%;
    height: 100%;
}

.image-above,
.image-below {
    position: absolute;
    top: 10vh;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
}

.image-above {
    z-index: 2;
    top: 10vh;
    width: 100%;
    height: 100%;

}

.image-stone {
    position: absolute;
    z-index: 4;
    width: auto;
    height: 10%;
}
</style>