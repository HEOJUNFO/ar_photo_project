<template>
    <div>
        <div class="image-container">
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
        <div class="loading-container" @touchstart="handleMouseDown" @touchend="handleMouseUp">
            <div class="webgl-container">
                <canvas class="webgl"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import router from '../../router'
import Experience from '../../ar/magic/Experience.js'
import { onBeforeRouteLeave } from 'vue-router'


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

                audio4.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };


        let experience;

        const hideImage1 = ref(false)
        const animateImage2 = ref(false)
        const image2Width = ref(0)
        const image3Width = ref(0)
        const imageLeft = ref(50)
        const imageTop = ref(50)

        const handleMouseDown = (event) => {
            event.preventDefault();
            playAudio2()

            const addImageTransition = (id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.classList.add('image-transition');
                }
            };

            addImageTransition('img2');
            addImageTransition('img3');
            addImageTransition('img4');

            hideImage1.value = true;
            image3Width.value = 100;
            image2Width.value = 100;
            imageLeft.value = 0;
            imageTop.value = 22.5;
        }

        const handleMouseUp = () => {
            stopAudio2()

            const removeImageTransition = (id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.classList.remove('image-transition');
                }
            };

            removeImageTransition('img2');
            removeImageTransition('img3');
            removeImageTransition('img4');

            image3Width.value = 0;
            image2Width.value = 0;
            imageLeft.value = 50;
            imageTop.value = 50;

            hideImage1.value = false;
        }


        const next = () => {
            playAudio4()
            setTimeout(() => {
                router.push('/busan2')
            }, 500);
        }

        const handleTransitionEnd = () => {
            stopAudio2()
            next()
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

        })

        onBeforeRouteLeave(() => {

            experience.destroy()
            experience.init()
        });


        return {
            hideImage1,
            image3Width,
            animateImage2,
            handleMouseDown,
            handleMouseUp,
            image2Width,
            handleTransitionEnd,
            next,
            imageLeft,
            imageTop,

        }
    }
}
</script>

<style scoped>
.webgl-container {
    height: calc(100 * var(--vh));
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
    height: auto;
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
}

.img1 {
    z-index: 1;
    top: calc(50 * var(--vh));
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


.hidden {
    opacity: 0;
}
</style>