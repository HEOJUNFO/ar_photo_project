<template>
    <div @click.stop="percentage > 99.8 ? next() : null">

        <div class="top-section">
            <div class="text-container1">
                <p id="typed-text"></p>
            </div>
        </div>
        <div class="side-image-container">
            <img :src="characterContent.src" alt="Side Image" />
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
        <div v-show="finishModal" class="image-container2">
            <div class="reward-container">
                <img class="image1" src="@resource/common/label.png" />
                <p class="p1">여름의 숲 웹프레임 1종</p>
                <p class="p2">(서비스 내 사진촬영에서 확인 및 사용가능)</p>
                <img class="image2" src="@resource/icon/frame_01.png" />
                <button @click="nextPage()">상품획득 성공</button>
            </div>
        </div>
    </div>
</template>



<script>
import Experience from '../../three/Culture/Experience.js'
import { onMounted, ref, computed, onBeforeUnmount, watch } from 'vue';
import router from '../../router';
import { useCharacterStore } from '../../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'




export default {
    name: 'Culture',

    setup() {
        const audio = ref(null);
        const audio2 = ref(null);
        const audio3 = ref(null);

        import('@resource/sounds/acquired.wav')
            .then(src => {
                audio.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio = () => {
            if (audio.value) {
                audio.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        import('@resource/sounds/success.wav')
            .then(src => {
                audio2.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio2 = () => {
            if (audio2.value) {
                audio2.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        import('@resource/sounds/water.wav')
            .then(src => {
                audio3.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio3 = () => {
            if (audio3.value) {
                if (!audio3.value.paused) {
                    audio3.value.pause();
                    audio3.value.currentTime = 0;
                }
                audio3.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };
        let experience;
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(5)
        const finishModal = ref(false)
        const eventId = ref('7')

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



        const stone1 = () => {
            visibleStone1.value = false
            if (visibleStone2.value === false && visibleStone3.value === false) {
                maxPercentage.value = 99.8;
                experience.world.ship.deltaT = 1
                isChanging.value = true
                isChanging2.value = true
                isChanging3.value = true
                playAudio3()
                next()
            } else if (visibleStone2.value === false && visibleStone3.value === true) {
                maxPercentage.value = 71;
                experience.world.ship.deltaT = 0.6
                isChanging.value = true
                isChanging2.value = true
                playAudio3()

            } else {
                maxPercentage.value = 47;
                experience.world.ship.deltaT = 0.32
                isChanging.value = true
                playAudio3()

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
                playAudio3()
                next()
            } else if (visibleStone1.value === false && visibleStone3.value === true) {
                maxPercentage.value = 71;
                experience.world.ship.deltaT = 0.6
                isChanging.value = true
                isChanging2.value = true
                playAudio3()

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
                playAudio3()
                next()
            } else if (visibleStone1.value === false && visibleStone2.value === true) {
                maxPercentage.value = 47;
                experience.world.ship.deltaT = 0.32
                isChanging.value = true
                playAudio3()
            } else {
                maxPercentage.value = 27;
            }
        }


        const next = () => {
            playAudio()
            setTimeout(() => {
                finishModal.value = true;
            }, 1500);

        }
        const nextPage = () => {
            playAudio2()
            if (eventId.value === '7') {
                localStorage.setItem('clearId7', 'true')
                localStorage.setItem('normalItem4', 'true')
            }
            router.push('/eventout')
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

            eventId.value = localStorage.getItem('eventId')

            setTimeout(() => {
                typeText()
            }, 1000);

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
            finishModal,
            nextPage,
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
    height: calc(100 * var(--vh));

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



.top-section {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 10;
    margin-top: calc(5 * var(--vh));
}


.text-container1 {
    overflow: visible;
    display: flex;
    align-items: center;
    background-color: #fff;
    width: 90%;
    position: relative;
    border: 2px dashed #D50F4A;
    border-radius: 16px;
}

.text-container1 p {
    overflow: hidden;
    padding: 20px 10px 20px 10px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    max-width: 30ch;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: left;
}

.side-image-container {
    width: 20%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 2.5%;
    top: calc(2.5 * var(--vh));
    z-index: 11;
}

.side-image-container img {
    background-color: #fff;
    overflow: hidden;
    height: 70%;
    width: 70%;
    display: block;
    clip-path: circle(50%);
    object-fit: cover;
    border: 1px solid #D50F4A;
    border-radius: 100px;
}

.image-container2 {
    position: absolute;
    width: 90%;
    height: auto;
    z-index: 10;
    background-color: #fff;
    border-radius: 16px;
    left: 50%;
    top: calc(50 * var(--vh));
    transform: translate(-50%, -50%);
    padding-bottom: calc(3 * var(--vh));
}


.reward-container {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: calc(-3 * var(--vh));

}


.image1 {
    position: relative;
    width: 100%;
    height: auto;
}

.image2 {
    position: relative;
    width: 60%;
    height: auto;
}

.p1 {
    position: relative;
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    max-width: 20ch;
    overflow-wrap: break-word;
    word-break: keep-all;

}

.p2 {
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: -0.3px;
}

.reward-container button {
    width: 80%;
    padding: 10px;
    border-radius: 100px;
    border: 2px solid var(--Point-Red-Dark, #922142);
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    text-align: center;
    z-index: 1;
    position: relative;
    box-shadow: 0px 3px #922142;
    margin-top: calc(2 * var(--vh));
}
</style>