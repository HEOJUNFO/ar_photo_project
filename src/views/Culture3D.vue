<template>
    <div @click.stop="maxPercentage === 99.9 ? next() : null">
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
        <div class="webgl-container">
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
                class="image-stone" style="top:75vh; left: 17vw;">
            <img v-show="visibleStone3" @click="stone3()" src="../resource/culture/game_stone03.png" alt="Above Image"
                class="image-stone" style="top:76vh; left: 9vw;">
        </div>
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
        const textIndex = ref(4)
        const percentage = ref(0)
        const maxPercentage = ref(27)
        const visibleStone1 = ref(true)
        const visibleStone2 = ref(true)
        const visibleStone3 = ref(true)

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.culture[textIndex.value] || {}
        })

        const stone1 = () => {
            visibleStone1.value = false
            if (visibleStone2.value === false && visibleStone3.value === false) {
                maxPercentage.value = 99.9;
                experience.world.ship.deltaT = 1
                next()
            } else if (visibleStone2.value === false && visibleStone3.value === true) {
                maxPercentage.value = 71;
                experience.world.ship.deltaT = 0.6
            } else {
                maxPercentage.value = 47;
                experience.world.ship.deltaT = 0.32
            }
        }

        const stone2 = () => {
            visibleStone2.value = false
            if (visibleStone1.value === false && visibleStone3.value === false) {
                maxPercentage.value = 99.9;
                experience.world.ship.deltaT = 1
                next()
            } else if (visibleStone1.value === false && visibleStone3.value === true) {
                maxPercentage.value = 71;
                experience.world.ship.deltaT = 0.6
            } else {
                maxPercentage.value = 27;
            }

        }

        const stone3 = () => {
            visibleStone3.value = false
            if (visibleStone1.value === false && visibleStone2.value === false) {
                maxPercentage.value = 99.9;
                experience.world.ship.deltaT = 1
                next()
            } else if (visibleStone1.value === false && visibleStone2.value === true) {
                maxPercentage.value = 47;
                experience.world.ship.deltaT = 0.32
            } else {
                maxPercentage.value = 27;
            }
        }

        const next = () => {
            if (index.value === 0) {
                index.value = 1
                textIndex.value = 5

            } else if (index.value === 1) {
                index.value = 2
            }
            else if (index.value === 2) {
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
            experience2.init()
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
            visibleStone3,
            maxPercentage
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


.top-section {
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
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