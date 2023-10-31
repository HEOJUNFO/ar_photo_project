<template>
    <div>
        <div class="top-section">
            <div class="text-container1">
                <p id="typed-text"></p>
            </div>
        </div>
        <div class="side-image-container">
            <img :src="characterContent.src" alt="Side Image" />
        </div>
        <div v-if="eventId === '1'" class="image-container">
            <img :class="{ 'hidden': hideImage1 }" class="img1" src="@resource/content/mini2.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%', left: imageLeft + '%', top: imageTop + '%' }" class="img2" id="img2"
                src="@resource/magicCircle/r_01.png" @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%', left: imageLeft + '%', top: imageTop + '%' }" class="img3" id="img3"
                src="@resource/magicCircle/r_02.png" @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%', left: imageLeft + '%', top: imageTop + '%' }" class="img4" id="img4"
                src="@resource/magicCircle/r_03.png" @touchstart="handleMouseDown" @touchend="handleMouseUp"
                @transitionend="handleTransitionEnd" />
        </div>
        <div v-if="eventId === '3'" class="image-container">
            <img :class="{ 'hidden': hideImage1 }" class="img1" src="@resource/content/mini2.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%', left: imageLeft + '%', top: imageTop + '%' }" class="img2" id="img2"
                src="@resource/magicCircle/g_01.png" @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%', left: imageLeft + '%', top: imageTop + '%' }" class="img3" id="img3"
                src="@resource/magicCircle/g_02.png" @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%', left: imageLeft + '%', top: imageTop + '%' }" class="img4" id="img4"
                src="@resource/magicCircle/g_03.png" @touchstart="handleMouseDown" @touchend="handleMouseUp"
                @transitionend="handleTransitionEnd" />
        </div>
        <div v-if="eventId === '5'" class="image-container">
            <img :class="{ 'hidden': hideImage1 }" class="img1" src="@resource/content/mini2.png"
                @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%', left: imageLeft + '%', top: imageTop + '%' }" class="img2" id="img2"
                src="@resource/magicCircle/p_01.png" @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%', left: imageLeft + '%', top: imageTop + '%' }" class="img3" id="img3"
                src="@resource/magicCircle/p_02.png" @touchstart="handleMouseDown" @touchend="handleMouseUp" />
            <img :style="{ width: image2Width + '%', left: imageLeft + '%', top: imageTop + '%' }" class="img4" id="img4"
                src="@resource/magicCircle/p_03.png" @touchstart="handleMouseDown" @touchend="handleMouseUp"
                @transitionend="handleTransitionEnd" />
        </div>
        <div class="loading-container" @touchstart="handleMouseDown" @touchend="handleMouseUp">
            <div class="webgl-container">
                <canvas class="webgl"></canvas>
            </div>
        </div>
        <div class="button-container">
            <button @click="normalReward()"><img src="@resource/reward/reward_active.png" />일반보상</button>
            <button @click="home()"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24"
                    fill="none">
                    <g clip-path="url(#clip0_541_2147)">
                        <path
                            d="M17.2484 23.9912C17.2484 23.9176 17.2484 23.8577 17.2484 23.7982C17.2484 21.5947 17.2359 19.3909 17.2559 17.1874C17.2621 16.5041 16.7792 16.0095 16.1148 16.0247C15.0577 16.049 13.9992 16.0548 12.9424 16.0229C12.2393 16.0016 11.7427 16.4883 11.7516 17.2294C11.7775 19.3973 11.7608 21.5655 11.7608 23.7337C11.7608 23.814 11.7608 23.8942 11.7608 23.9906C11.6989 23.9936 11.6464 23.9985 11.594 23.9985C9.58325 23.9988 7.57221 24.0003 5.56148 23.9982C4.71804 23.9973 4.08791 23.4744 3.94401 22.6604C3.92316 22.5419 3.92167 22.4184 3.92167 22.2972C3.92047 19.6022 3.92137 16.9071 3.91809 14.2121C3.91809 14.1024 3.95623 14.0395 4.03786 13.975C7.49237 11.2563 10.9454 8.5358 14.3966 5.81283C14.4777 5.74899 14.5256 5.74261 14.6108 5.80979C18.0698 8.53914 21.5312 11.2651 24.9893 13.9954C25.0411 14.0364 25.0846 14.1261 25.0846 14.193C25.0894 16.9084 25.0914 19.6234 25.0876 22.3388C25.0861 23.3097 24.4241 23.9939 23.4814 23.9967C21.4457 24.0024 19.4102 23.9985 17.3744 23.9982C17.3399 23.9982 17.3056 23.9945 17.249 23.9912H17.2484Z"
                            fill="#D50F4A" />
                        <path
                            d="M21.7068 5.2941C21.7068 5.20078 21.7068 5.14697 21.7068 5.09317C21.7068 4.15086 21.7065 3.20855 21.7074 2.26624C21.7077 1.73734 22.0023 1.4361 22.5177 1.4358C22.8902 1.43549 23.2626 1.43519 23.635 1.4358C24.1564 1.43671 24.4525 1.74159 24.4525 2.2784C24.4528 3.94507 24.4534 5.61174 24.4504 7.27872C24.4504 7.39484 24.4811 7.46901 24.5753 7.54287C25.8704 8.55783 27.164 9.57461 28.4522 10.5984C29.1556 11.1574 29.1845 12.2246 28.5225 12.7824C28.0116 13.2131 27.3025 13.2216 26.7636 12.7979C25.5328 11.8307 24.3038 10.8607 23.074 9.89226C20.2526 7.67084 17.4303 5.45034 14.6107 3.22649C14.526 3.15961 14.4781 3.16448 14.3964 3.22892C10.3782 6.39629 6.35707 9.55972 2.33947 12.728C1.88572 13.0858 1.40159 13.2396 0.854883 13.0165C0.363297 12.8158 0.0749002 12.4222 0.0120368 11.8909C-0.0472515 11.389 0.104991 10.9522 0.513752 10.6303C4.74169 7.30121 8.96903 3.97091 13.1967 0.640913C13.3263 0.538779 13.4556 0.436037 13.5858 0.334511C14.1578 -0.112022 14.8281 -0.112022 15.3972 0.335423C17.096 1.67046 18.7945 3.0058 20.493 4.34084C20.8857 4.64968 21.2786 4.9579 21.7068 5.2941Z"
                            fill="#D50F4A" />
                    </g>
                    <defs>
                        <clipPath id="clip0_541_2147">
                            <rect width="29" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg></button>
            <button @click="premiumReward()"><img src="@resource/reward/premium_active.png" />프리미엄보상</button>
        </div>
        <div class="bottom-section">
        </div>
        <div v-show="finishModal" class="image-container2">
            <div class="reward-container">
                <img class="image1" src="@resource/common/label.png" />
                <p class="p1">{{ rewardText }}</p>
                <p class="p2">(서비스 내 사진촬영에서 확인 및 사용가능)</p>
                <img class="image2" :src="rewardImage" />
                <button @click="next()">상품획득 성공</button>
                <img class="guide" src="@resource/common/tap.png" alt="Image 1" />
            </div>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../../stores/characterStore.js'
import { ref, computed, watch, onMounted, inject } from 'vue'
import router from '../../router'
import Experience from '../../ar/magic/Experience.js'
import { onBeforeRouteLeave } from 'vue-router'
import { postData } from '../../js/api';

const Bell = new URL('@resource/intro/bell.png', import.meta.url).href;
const Uno = new URL('@resource/intro/uno.png', import.meta.url).href;
const Sorina = new URL('@resource/intro/sorina.png', import.meta.url).href;


export default {
    name: 'Common4',

    setup() {
        const audio = ref(null);
        const audio2 = ref(null);
        const audio3 = ref(null);
        const audio4 = ref(null);

        import('@resource/sounds/generaltap.wav')
            .then(src => {
                audio.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio = () => {
            if (audio.value) {
                if (!audio.value.paused) {
                    audio.value.pause();
                    audio.value.currentTime = 0;
                }
                audio.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        import('@resource/sounds/magic.wav')
            .then(src => {
                audio2.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        let isStopping = false;

        const playAudio2 = () => {
            if (audio2.value) {
                isStopping = false;
                audio2.value.currentTime = 0;
                audio2.value.volume = 1;
                audio2.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        const fadeOutDuration = 500;

        const stopAudio2 = () => {
            if (audio2.value) {
                const startTime = Date.now();
                const startVolume = 1;

                isStopping = true;

                const fadeOut = () => {
                    if (isStopping !== true) {
                        return;
                    }

                    const elapsedTime = Date.now() - startTime;
                    const remainingTime = fadeOutDuration - elapsedTime;

                    if (remainingTime <= 0) {
                        audio2.value.volume = 0;
                        audio2.value.pause();
                        audio2.value.currentTime = 0;
                    } else {
                        audio2.value.volume = startVolume * (remainingTime / fadeOutDuration);
                        requestAnimationFrame(fadeOut);
                    }
                };

                fadeOut();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        import('@resource/sounds/acquired.wav')
            .then(src => {
                audio3.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio3 = () => {
            if (audio3.value) {

                audio3.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        import('@resource/sounds/success.wav')
            .then(src => {
                audio4.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio4 = () => {
            if (audio4.value) {

                audio4.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };


        let experience;
        const characterStore = useCharacterStore()
        const textIndex = ref(0)
        const finishModal = ref(false)
        const eventId = ref(0)
        const rewardImage = ref('')
        const rewardText = ref('')


        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter
            return char?.common4[textIndex.value] || {}
        })

        const hideImage1 = ref(false)
        const animateImage2 = ref(false)
        const image2Width = ref(0)
        const image3Width = ref(0)
        const imageLeft = ref(50)
        const imageTop = ref(45)

        let typingTimeout;

        const typeText = () => {
            const content = '마법진을 3초간 꾹 눌러줘. 숲을 복원하는 회복 에너지를 불어 넣어야 해.'
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


        const handleMouseDown = (event) => {
            event.preventDefault();
            playAudio2()
            document.getElementById('img2').classList.add('image-transition');
            document.getElementById('img3').classList.add('image-transition');
            document.getElementById('img4').classList.add('image-transition');
            hideImage1.value = true;
            image3Width.value = 100;
            image2Width.value = 100;
            imageLeft.value = 0;
            imageTop.value = 20;
        }

        const handleMouseUp = () => {
            stopAudio2()
            document.getElementById('img2').classList.remove('image-transition');
            document.getElementById('img3').classList.remove('image-transition');
            document.getElementById('img4').classList.remove('image-transition');
            image3Width.value = 0;
            image2Width.value = 0;
            imageLeft.value = 50;
            imageTop.value = 45;

            hideImage1.value = false;
        }


        const normalReward = () => {
            playAudio()
            router.push('/storagebox2')
        }
        const premiumReward = () => {
            playAudio()
            router.push('/storagebox')
        }


        const home = () => {
            playAudio()

            router.push('/stage')
        }


        const next = () => {
            playAudio4()
            if (eventId.value === '1') {
                localStorage.setItem('clearId3', 'true')
                localStorage.setItem('normalItem0', 'true')
                postData('content_reword', 'content1')
            } else if (eventId.value === '3') {
                localStorage.setItem('clearId1', 'true')
                localStorage.setItem('normalItem1', 'true')
                postData('content_reword', 'content3')
            } else if (eventId.value === '5') {
                localStorage.setItem('clearId5', 'true')
                localStorage.setItem('normalItem2', 'true')
                postData('content_reword', 'content5')
            }
            setTimeout(() => {
                router.push('/eventout')
            }, 500);
        }

        const handleTransitionEnd = () => {

            stopAudio2()
            playAudio3()
            finishModal.value = true;

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

            experience = new Experience(document.querySelector('canvas.webgl'));

            if (localStorage.getItem('characterID') !== null) {
                characterStore.setCharacterIndex(localStorage.getItem('characterID'))
            }

            setTimeout(() => {
                typeText()
            }, 2000);
            eventId.value = localStorage.getItem('eventId')
            if (eventId.value === '1') {
                rewardImage.value = Bell
                rewardText.value = '벨 웹스티커 1세트'
            } else if (eventId.value === '3') {
                rewardImage.value = Uno
                rewardText.value = '우노 웹스티커 1세트'
            } else if (eventId.value === '5') {
                rewardImage.value = Sorina
                rewardText.value = '소리나 웹스티커 1세트'
            }
        })

        onBeforeRouteLeave(() => {

            experience.destroy()
            experience.init()
        });

        window.onpopstate = function (event) {
            if (eventId.value === '5') {
                eventId.value = null;
                router.push({ path: '/event5' });
            } else if (eventId.value === '3') {
                eventId.value = null;
                router.push({ path: '/event3' });
            } else if (eventId.value === '1') {
                eventId.value = null;
                router.push({ path: '/event1' });
            }
        };

        return {
            characterContent: currentCharacterContent,
            selectCharacterSrc: characterStore.currentCharacter?.src,
            selectCharacterName: characterStore.currentCharacter?.name,
            hideImage1,
            image3Width,
            animateImage2,
            handleMouseDown,
            handleMouseUp,
            image2Width,
            handleTransitionEnd,
            finishModal,
            next,
            eventId,
            rewardImage,
            rewardText,
            normalReward,
            premiumReward,
            home,
            imageLeft,
            imageTop,

        }
    }
}
</script>

<style scoped>
.webgl-container {
    height: calc(87.5 * var(--vh));
    width: 100%;
    position: relative;

}

.webgl {
    position: fixed;
    left: 0;
    outline: none;

}

.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;

}


.img2,
.img3,
.img4 {
    transform-origin: center center;
    height: auto;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
}

.img1 {
    z-index: 1;
    top: calc(42.5 * var(--vh));
    position: absolute;
    left: 50%;
    width: 30%;
    opacity: 0.8;
    transform: translate(-50%, -50%);
    animation: scaleAnimation 0.35s infinite alternate;
}

@keyframes scaleAnimation {
    0% {
        transform: translate(-50%, -50%) scale(1);
    }

    100% {
        transform: translate(-50%, -50%) scale(1.5);
    }
}


.img2 {
    z-index: 3;
    top: calc(45 * var(--vh));
    width: 0%;
    animation: rotate1 3s linear infinite;
}



@keyframes rotate1 {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes rotate2 {
    from {
        transform: rotate(360deg);
    }

    to {
        transform: rotate(0deg);
    }
}

.img3 {
    z-index: 3;
    top: calc(45 * var(--vh));
    width: 0%;
    animation: rotate2 3s linear infinite;
}

.img4 {
    z-index: 3;
    top: calc(45 * var(--vh));
    width: 0%;
    animation: rotate1 3s linear infinite;
}

.image-transition {
    transition: width 3s ease-in-out, left 3s ease-in-out, top 3s ease-in-out;

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
    z-index: 3;
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
    z-index: 3;
}

.side-image-container img {
    background-color: #fff;

    height: 70%;
    width: 70%;
    display: block;
    clip-path: circle(50%);
    object-fit: cover;
    border: 1px solid #D50F4A;
    border-radius: 100px;
}

.hidden {
    opacity: 0;
}

.button-container {
    position: absolute;
    bottom: calc(4 * var(--vh));
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: calc(10 * var(--vh));
    background-color: rgba(0, 0, 0, 0);
    z-index: 4;
}

.button-container button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: var(--Text-White, #FFF);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
    font-family: "NanumSquare", sans-serif;
}

.button-container button img {
    width: auto;
    height: calc(5 * var(--vh));
    background-color: #fff;
    border: 4px solid #D50F4A;
    border-radius: 100px;
    padding: 10px;
}

.button-container button svg {
    width: calc(5 * var(--vh));
    height: calc(5 * var(--vh));
    background-color: #fff;
    border: 4px solid #D50F4A;
    border-radius: 100px;
    padding: 10px;
    position: absolute;
    bottom: calc(2 * var(--vh));
}

.bottom-section {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(12.5 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 3;
    background-color: #D50F4A;
    bottom: 0;
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
    z-index: 2;
    position: relative;
    box-shadow: 0px 3px #922142
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