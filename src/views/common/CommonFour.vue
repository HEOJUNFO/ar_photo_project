<template>
    <div>
        <div v-if="showOverlay" class="overlay" @touchstart="showOverlay = false"><svg
                :class="{ 'dragging-guide': showOverlay }" xmlns=" http://www.w3.org/2000/svg" width="66" height="74"
                viewBox="0 0 66 74" fill="none">
                <g clip-path="url(#clip0_112_660)">
                    <mask id="mask0_112_660" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="66"
                        height="74">
                        <path d="M66 0H0V74H66V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_112_660)">
                        <path
                            d="M65.2022 45.0147L60.8288 31.3286C59.2564 26.4107 52.7865 25.1831 49.5078 29.1876C48.941 28.8022 48.3256 28.5035 47.6307 28.3011C47.9083 26.8423 48.05 25.3546 48.05 23.8554C48.0519 10.703 37.2765 0 24.0299 0C10.7833 0 0.0078125 10.703 0.0078125 23.8573C0.0078125 34.5256 7.15911 43.8334 17.3522 46.7722C16.7136 48.8593 16.7252 51.087 17.4143 53.2068L18.8935 57.7566C20.8677 63.8558 25.8604 68.4115 32.076 69.876C33.9881 73.2581 38.1422 74.8595 41.8906 73.5356L58.938 67.5134C63.03 66.0681 65.1343 61.7784 64.0705 57.8337C66.1476 53.8928 66.5649 49.2774 65.2022 45.0109V45.0147ZM4.37546 23.8573C4.37546 13.0926 13.1923 4.33594 24.0299 4.33594C34.8675 4.33594 43.6843 13.0926 43.6843 23.8573C43.6843 25.4741 43.4824 27.0755 43.0883 28.6287C42.176 29.0411 41.3956 29.6424 40.7803 30.3728C40.0174 29.8332 39.1827 29.4786 38.313 29.2955C38.9711 27.5881 39.3186 25.7535 39.3186 23.8573C39.3186 15.486 32.4623 8.67573 24.0318 8.67573C15.6013 8.67573 8.74311 15.486 8.74311 23.8573C8.74311 31.5406 14.5065 37.898 21.9625 38.9001L22.4614 40.4591C21.3394 41.0777 20.3436 41.889 19.5108 42.8564C10.7678 40.8002 4.37546 32.9936 4.37546 23.8573ZM17.7715 25.7805L20.427 34.0959C16.205 32.6294 13.1108 28.621 13.1108 23.8592C13.1108 17.8795 18.0083 13.0136 24.0299 13.0136C30.0514 13.0136 34.949 17.8795 34.949 23.8592C34.949 26.164 34.2308 28.3474 32.9166 30.1608L30.261 21.8473C29.1662 18.4191 25.4858 16.5267 22.0343 17.6135C18.5926 18.6985 16.6786 22.3619 17.7715 25.7824V25.7805ZM59.6466 58.3559C60.0212 59.3715 60.1629 60.3466 59.6194 61.4971C59.1904 62.4067 58.4275 63.0946 57.4744 63.4299L40.427 69.4521C38.4955 70.1343 36.3466 69.136 35.6381 67.2244C35.3683 66.4959 34.7277 65.9679 33.959 65.8369C28.8246 64.962 24.6452 61.3583 23.0515 56.4308L21.5723 51.879C20.6891 49.1618 21.7179 46.3309 23.8299 44.7411L26.3593 52.6556C26.7242 53.7965 27.951 54.4285 29.1022 54.0662C30.2513 53.704 30.8881 52.486 30.5231 51.3452L21.9353 24.4701C21.5704 23.3312 22.209 22.1075 23.3563 21.7452C24.5055 21.3829 25.7323 22.0131 26.0972 23.1578L31.2083 39.1545C31.5733 40.2953 32.8001 40.9274 33.9493 40.5651C35.0985 40.2028 35.7352 38.9849 35.3702 37.8441L34.883 36.3217C34.518 35.1808 35.1567 33.9591 36.3039 33.5968C37.4551 33.2345 38.6819 33.8646 39.0449 35.0074C39.5224 36.5009 39.6311 36.7687 39.9883 37.8903C40.3532 39.0311 41.58 39.6632 42.7292 39.3009C43.8803 38.9386 44.5151 37.7207 44.1502 36.5799L43.7115 35.2059C43.3465 34.0651 43.9852 32.8433 45.1324 32.481C46.2835 32.1187 47.5084 32.7508 47.8733 33.8916C48.7488 36.6319 48.0519 34.3792 48.7779 36.6473C49.1429 37.7882 50.3697 38.4203 51.5189 38.058C52.668 37.6957 53.3048 36.4778 52.9398 35.3369L52.4972 33.9533C52.1323 32.8124 52.7709 31.5907 53.9182 31.2284C55.0673 30.8661 56.2942 31.4962 56.661 32.639L61.0326 46.3252C62.1196 49.7265 61.677 53.4303 59.8193 56.4867C59.4777 57.0494 59.4117 57.7373 59.6388 58.354L59.6466 58.3559Z"
                            fill="white" />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_112_660">
                        <rect width="66" height="74" fill="white" />
                    </clipPath>
                </defs>
            </svg> </div>
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
                if (!audio3.value.paused) {
                    audio3.value.pause();
                    audio3.value.currentTime = 0;
                }
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
        const textIndex = ref(0)
        const finishModal = ref(false)
        const eventId = ref(0)
        const rewardImage = ref('')
        const rewardText = ref('')
        const showOverlay = ref(true)

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
            showOverlay
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

.img1,
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
    top: calc(45 * var(--vh));
    width: 30%;
    opacity: 0.8;

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

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
}

.overlay svg {
    position: absolute;
    left: 50%;
    top: calc(45 * var(--vh));
}

@keyframes dragDropGuide {

    0% {
        transform: scale(1);
    }



    100% {
        transform: scale(1.2);
    }
}

.dragging-guide {
    animation: dragDropGuide 1s infinite;
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