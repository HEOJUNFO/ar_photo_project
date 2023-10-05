<template>
    <div class="main">
        <div class="top-section">
            <div class="text-container1">
                <p id="typed-text"></p>
            </div>
        </div>
        <div class="side-image-container">
            <img :src="characterContent.src" alt="Side Image" />
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="image-container">
            <img v-for="n in 5" :key="n" src="@resource/common/hail.png"
                :style="{ filter: n <= itemValue ? 'grayscale(0%)' : '' }" />
        </div>
        <div v-show="finishModal" class="image-container2">
            <div class="reward-container">
                <img class="image1" src="@resource/common/label.png" />
                <p class="p1">겨울의 숲 웹프레임 1종</p>
                <p class="p2">(서비스 내 사진촬영에서 확인 및 사용가능)</p>
                <img class="image2" src="@resource/icon/frame_03.png" />
                <button @click="nextPage()">상품획득 성공</button>
                <img class="guide" src="@resource/common/tap.png" alt="Image 1" />
            </div>
        </div>
        <div v-if="startModal" class="overlay">
            <div id="dialog-box">
                <p>우박모으기 시작</p>
                <button @click="startGame()"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="47"
                        viewBox="0 0 44 47" fill="none">
                        <circle cx="22" cy="25" r="22" fill="#922142" />
                        <circle cx="22" cy="22" r="21" fill="#D50F4A" stroke="#922142" stroke-width="2" />
                        <path
                            d="M32.75 20.701C33.75 21.2783 33.75 22.7217 32.75 23.299L17.75 31.9593C16.75 32.5366 15.5 31.815 15.5 30.6603L15.5 13.3397C15.5 12.185 16.75 11.4634 17.75 12.0407L32.75 20.701Z"
                            fill="white" stroke="#D50F4A" />
                    </svg></button>
            </div>
        </div>
    </div>
</template>

<script>
import Experience from '../../ar/Common1/Experience.js'
import { onMounted, ref, computed } from 'vue';
import router from '../../router';
import { useCharacterStore } from '../../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'
import { postData } from '../../js/api';

export default {
    name: 'CommonOne3d',

    setup() {
        const audio2 = ref(null);

        import('@resource/sounds/acquired.wav')
            .then(src => {
                audio2.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio2 = () => {
            if (audio2.value) {
                if (!audio2.value.paused) {

                    audio2.value.currentTime = 0;
                    audio2.value.play();
                }
                audio2.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        const audio3 = ref(null);

        import('@resource/sounds/success.wav')
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
        const audio4 = ref(null);
        import('@resource/sounds/generaltap.wav')
            .then(src => {
                audio4.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio4 = () => {
            if (audio4.value) {
                if (!audio4.value.paused) {
                    audio4.value.pause();
                    audio4.value.currentTime = 0;
                }
                audio4.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };
        let experience;
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(5)
        const itemValue = ref(0)
        const finishModal = ref(false)
        const eventId = ref('9')
        const startModal = ref(false)

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common1[textIndex.value] || {}
        })

        let typingTimeout;

        const typeText = () => {
            const content = '숲을 망가뜨리는 우박을 받아내자.우리를 손가락으로 움직여서 우박 5개를 받아줘.';
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



        const next = () => {
            if (index.value === 0) {
                index.value = 1
                // router.push({ path: '/stickerreward', query: { eventName: "common1" } });
            }
        }

        const nextScene = () => {
            playAudio2()
            if (itemValue.value < 4) {
                itemValue.value += 1
                return;
            }

            itemValue.value += 1
            experience.destroy()
            experience.init()
            finishModal.value = true
        }

        const startGame = () => {
            playAudio4()
            startModal.value = false
            experience.world.setHail()
        }

        const nextPage = () => {
            playAudio3()
            if (eventId.value === '9') {
                postData('content_reword', 'content9')
                localStorage.setItem('clearId9', 'true')
                localStorage.setItem('normalItem6', 'true')
            }
            setTimeout(() => {
                router.push('/eventout')
            }, 500);

        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            document.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, { passive: false });

            experience = new Experience(document.querySelector('canvas.webgl'), nextScene);

            experience.resources.on('ready', () => {
                startModal.value = true
            })

            setTimeout(() => {
                typeText()
            }, 1000);
        });

        onBeforeRouteLeave(() => {
            experience.destroy()
            experience.init()
        });

        return {
            index,
            characterContent: currentCharacterContent,
            next,
            itemValue,
            startModal,
            startGame,
            finishModal,
            nextPage
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;

}

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
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 2;
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
    max-width: 26ch;
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
    z-index: 2;
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

.image-container {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: calc(10 * var(--vh));
    position: absolute;
    z-index: 2;
    top: calc(20 * var(--vh));
}

.image-container img {
    width: auto;
    height: calc(5 * var(--vh));
    background-color: #57A3E5;
    border: 2px solid #fff;
    border-radius: 100px;
    padding: 10px;
    filter: grayscale(100%);
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

#dialog-box {
    position: absolute;
    border-radius: 16px;
    border: 2px dashed #D50F4A;
    background: #FFF;
    padding: 10px;
    width: 80%;
    height: calc(20 * var(--vh));
    top: calc(50 * var(--vh));
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#dialog-box p {
    font-family: "NanumSquare", sans-serif;
    color: #000;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.5px;
    max-width: 18ch;
    overflow-wrap: break-word;
    word-break: keep-all;
    margin-bottom: 5%;

}

#dialog-box button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    animation: beat2 .35s infinite alternate;
}

@keyframes beat2 {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.2);
    }
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.guide {
    width: auto;
    height: 15%;
    position: absolute;
    top: 85%;
    left: 70%;
    transform: translateX(-50%);
    z-index: 3;
    animation: beat .35s infinite alternate;
    pointer-events: none;
}

@keyframes beat {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.5);
    }
}
</style>