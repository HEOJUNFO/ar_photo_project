<template>
    <div @click.stop="percentage > 99.8 ? next() : null">
        <loading-container ref="loading" @closed="handleClose()">
        </loading-container>
        <div class=" top-section2">
            <div class="text-container2">
                <p id="typed-text"></p>
            </div>
            <div class="side-image-container3">
                <img :src="characterContent?.src" alt="Side Image" />
            </div>
        </div>
        <div class="webgl-container">
            <canvas class="webgl2"></canvas>
        </div>
        <div class="image-container">
            <img src="@resource/culture/game_bg_water.png" class="image-below" :style="clipStyle">
            <img src="@resource/culture/game_bg_land.png" class="image-above">
            <img v-show="visibleStone1" @click="stone1()" src="@resource/culture/game_stone01.png" alt="Above Image"
                class="image-stone1" style="left: 20vw;">
            <img v-show="visibleStone2" @click="stone2()" src="@resource/culture/game_stone02.png" alt="Above Image"
                class="image-stone2" style=" left: 60vw;">
            <img v-show="visibleStone3" @click="stone3()" src="@resource/culture/game_stone04.png" alt="Above Image"
                class="image-stone3" style="left: 17vw;">
            <img v-show="visibleStone3" @click="stone3()" src="@resource/culture/game_stone03.png" alt="Above Image"
                class="image-stone4" style=" left: 9vw;">
        </div>
        <div class="bg-container">

            <img src="@resource/culture/water_road_01.png" :class="{ 'fade-out': isChanging }" />
            <img v-if="isChanging" src="@resource/culture/water_road_02.png" class="fade-in"
                :class="{ 'fade-out2': isChanging2 }" />
            <img v-if="isChanging2" src="@resource/culture/water_road_03.png" class="fade-in2"
                :class="{ 'fade-out3': isChanging3 }" />
            <img v-if="isChanging3" src="@resource/culture/water_road_04.png" class="fade-in3" />


        </div>
    </div>
</template>

<script>
import Experience from '../../three/Culture/Experience.js'
import { onMounted, ref, computed, onBeforeUnmount, watch } from 'vue';
import router from '../../router';
import { useCharacterStore } from '../../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'
import LoadingContainer from '../../components/LoadingContainer.vue'

export default {
    name: 'Culture',
    components: {
        LoadingContainer
    },
    setup() {
        let experience;
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(5)
        const percentage = ref(0)
        const maxPercentage = ref(27)
        const visibleStone1 = ref(true)
        const visibleStone2 = ref(true)
        const visibleStone3 = ref(true)

        const isChanging = ref(false)
        const isChanging2 = ref(false)
        const isChanging3 = ref(false)

        const loading = ref()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.culture[textIndex.value] || {}
        })

        let typingTimeout;

        const typeText = () => {
            const content = currentCharacterContent.value.text;
            const textContainer = document.getElementById("typed-text");
            let index = 0;

            clearTimeout(typingTimeout);

            textContainer.textContent = "";

            function typing() {
                if (index < content.length) {
                    textContainer.textContent += content.charAt(index);
                    index++;
                    typingTimeout = setTimeout(typing, 50);
                }
            }
            typing();
        };

        const handleClose = () => {
            setTimeout(() => {
                typeText()
            }, 1000);
        }

        const stone1 = () => {
            visibleStone1.value = false
            if (visibleStone2.value === false && visibleStone3.value === false) {
                maxPercentage.value = 99.8;
                experience.world.ship.deltaT = 1
                isChanging.value = true
                isChanging2.value = true
                isChanging3.value = true
                next()
            } else if (visibleStone2.value === false && visibleStone3.value === true) {
                maxPercentage.value = 71;
                experience.world.ship.deltaT = 0.6
                isChanging.value = true
                isChanging2.value = true

            } else {
                maxPercentage.value = 47;
                experience.world.ship.deltaT = 0.32
                isChanging.value = true

            }
        }

        const stone2 = () => {
            visibleStone2.value = false
            if (visibleStone1.value === false && visibleStone3.value === false) {
                maxPercentage.value = 99.8;
                experience.world.ship.deltaT = 1
                isChanging.value = true
                isChanging2.value = true
                isChanging3.value = true
                next()
            } else if (visibleStone1.value === false && visibleStone3.value === true) {
                maxPercentage.value = 71;
                experience.world.ship.deltaT = 0.6
                isChanging.value = true
                isChanging2.value = true

            } else {
                maxPercentage.value = 27;
            }

        }

        const stone3 = () => {
            visibleStone3.value = false
            if (visibleStone1.value === false && visibleStone2.value === false) {
                maxPercentage.value = 99.8;
                experience.world.ship.deltaT = 1
                isChanging.value = true
                isChanging2.value = true
                isChanging3.value = true

                next()
            } else if (visibleStone1.value === false && visibleStone2.value === true) {
                maxPercentage.value = 47;
                experience.world.ship.deltaT = 0.32
                isChanging.value = true

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
                router.push({ path: '/stickerreward', query: { eventName: "culture" } });

            }
        }

        const updatePercentage = () => {
            if (percentage.value <= maxPercentage.value) {
                percentage.value = (percentage.value + 0.2) % 100;
            }

        };

        const updateStone = () => {
            if (visibleStone1.value) {
                const stoneElem = document.querySelector('.image-stone1');
                stoneElem?.classList.toggle('scaling');
            } else if (visibleStone2.value) {
                const stoneElem = document.querySelector('.image-stone2');
                stoneElem?.classList.toggle('scaling');
            } else if (visibleStone3.value) {
                const stoneElem = document.querySelector('.image-stone3');
                const stoneElem2 = document.querySelector('.image-stone4');
                stoneElem?.classList.toggle('scaling');
                stoneElem2?.classList.toggle('scaling');
            }
        }




        const clipStyle = computed(() => {
            return `clip-path: inset(0 0 ${100 - percentage.value}% 0);`;
        });
        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }



        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl2'), next);

            console.log(loading.value.systemCheck)



            const interval = setInterval(updatePercentage, 1);

            setTimeout(() => {
                const interval2 = setInterval(updateStone, 5000)
            }, 5000)

            onBeforeUnmount(() => {
                clearInterval(interval);
            });
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
            clipStyle,
            stone1,
            stone2,
            stone3,
            visibleStone1,
            visibleStone2,
            visibleStone3,
            percentage,
            isChanging,
            isChanging2,
            isChanging3,
            loading,
            handleClose

        }
    }
}
</script>

<style scoped>
.webgl-container {
    height: calc(100 * var(--vh));
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


.image-container {
    position: absolute;
    width: 100%;
    height: calc(100 * var(--vh));
}

.bg-container {
    position: absolute;
    width: 100%;
    height: calc(100 * var(--vh));
}


.image-below {
    position: absolute;
    top: 0vh;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
}

.image-above {
    z-index: 2;
    top: 0vh;
    width: 100%;
    height: 100%;

}

.image-stone1 {
    position: absolute;
    z-index: 4;
    width: auto;
    height: 10%;
    top: calc(20 * var(--vh));
}

.image-stone2 {
    position: absolute;
    z-index: 4;
    width: auto;
    height: 10%;
    top: calc(43 * var(--vh));
}

.image-stone3 {
    position: absolute;
    z-index: 4;
    width: auto;
    height: 10%;
    top: calc(65 * var(--vh));
}

.image-stone4 {
    position: absolute;
    z-index: 4;
    width: auto;
    height: 10%;
    top: calc(65 * var(--vh));
}

@keyframes scaleAnimation {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.scaling {
    animation: scaleAnimation 0.5s;
}

.top-section2 {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    margin-top: calc(5 * var(--vh));
}


.text-container2 {
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 75%;
    position: relative;
    border-radius: 16px;
    margin-left: 5%;
}

.text-container2::before {
    content: "";
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #fff;
    position: absolute;
    right: -10px;
    top: 30%;
    transform: translateY(-50%);
}

.text-container2 p {
    overflow: hidden;
    padding: 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: center;
}



.side-image-container3 {
    margin-top: calc(-5 * var(--vh));
    margin-right: -5%;
    position: relative;
    overflow: hidden;
    width: 20%;
    display: flex;
    align-items: center;
}

.side-image-container3 img {
    background-color: #FFECD6;
    overflow: hidden;
    height: 70%;
    width: 70%;
    display: block;
    clip-path: circle(50%);
    object-fit: cover;
}

.bg-container {
    position: absolute;
    width: 100%;
    height: calc(100 * var(--vh));
    z-index: -1;
}

.bg-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    transition: opacity 1s;
}

.bg-container img.fade-out {
    opacity: 0;
}

.bg-container img.fade-in {
    opacity: 1;
    transition: opacity 1s;
    z-index: -1;
}

.bg-container img.fade-out2 {
    opacity: 0;
}

.bg-container img.fade-in2 {
    opacity: 1;
    transition: opacity 1s;
    z-index: -2;
}

.bg-container img.fade-out3 {
    opacity: 0;
}

.bg-container img.fade-in3 {
    opacity: 1;
    transition: opacity 1s;
    z-index: -3;
}
</style>