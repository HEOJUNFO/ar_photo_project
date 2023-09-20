<template>
    <div class="main">
        <div class="top-section2">
            <div class="text-container2">
                <p>{{ characterContent?.text }}</p>
            </div>
            <div class="side-image-container3">
                <img :src="characterContent?.src" alt="Side Image" />
            </div>
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="image-slider-container">
            <div class="image-slider">
                <img @click="selectImage(img)" v-for="img in images" :src="img.src"
                    :class="{ gray: !img.active, 'clicked-image': selectedImage === img }">
            </div>
        </div>
        <div class="capture-container">
            <button onclick="captureImage()"><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                    viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="28" fill="#D50F4A" />
                    <circle cx="35" cy="35" r="33.5" stroke="white" stroke-opacity="0.8" stroke-width="3" />
                    <circle cx="35" cy="35" r="10.5" stroke="white" stroke-width="3" />
                </svg></button>
        </div>
        <div class="switch-container">
            <button onclick="switchCamera()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 24C9.44 24 7.135 23.27 5.085 21.81C3.035 20.35 1.58 18.44 0.72 16.08C0.62 15.78 0.65 15.5 0.81 15.24C0.97 14.98 1.21 14.8 1.53 14.7C1.85 14.6 2.155 14.635 2.445 14.805C2.735 14.975 2.94 15.21 3.06 15.51C3.78 17.33 4.95 18.8 6.57 19.92C8.19 21.04 10 21.6 12 21.6C13.72 21.6 15.32 21.175 16.8 20.325C18.28 19.475 19.44 18.3 20.28 16.8H18C17.66 16.8 17.375 16.685 17.145 16.455C16.915 16.225 16.8 15.94 16.8 15.6C16.8 15.26 16.915 14.975 17.145 14.745C17.375 14.515 17.66 14.4 18 14.4H22.8C23.14 14.4 23.425 14.515 23.655 14.745C23.885 14.975 24 15.26 24 15.6V20.4C24 20.74 23.885 21.025 23.655 21.255C23.425 21.485 23.14 21.6 22.8 21.6C22.46 21.6 22.175 21.485 21.945 21.255C21.715 21.025 21.6 20.74 21.6 20.4V19.2C20.46 20.72 19.05 21.9 17.37 22.74C15.69 23.58 13.9 24 12 24ZM12 2.4C10.28 2.4 8.68 2.825 7.2 3.675C5.72 4.525 4.56 5.7 3.72 7.2H6C6.34 7.2 6.625 7.315 6.855 7.545C7.085 7.775 7.2 8.06 7.2 8.4C7.2 8.74 7.085 9.025 6.855 9.255C6.625 9.485 6.34 9.6 6 9.6H1.2C0.86 9.6 0.575 9.485 0.345 9.255C0.115 9.025 0 8.74 0 8.4V3.6C0 3.26 0.115 2.975 0.345 2.745C0.575 2.515 0.86 2.4 1.2 2.4C1.54 2.4 1.825 2.515 2.055 2.745C2.285 2.975 2.4 3.26 2.4 3.6V4.8C3.54 3.28 4.95 2.1 6.63 1.26C8.31 0.42 10.1 0 12 0C14.56 0 16.865 0.73 18.915 2.19C20.965 3.65 22.42 5.56 23.28 7.92C23.38 8.22 23.35 8.5 23.19 8.76C23.03 9.02 22.79 9.2 22.47 9.3C22.15 9.4 21.845 9.365 21.555 9.195C21.265 9.025 21.06 8.79 20.94 8.49C20.22 6.67 19.05 5.2 17.43 4.08C15.81 2.96 14 2.4 12 2.4ZM12 15.6C11 15.6 10.15 15.25 9.45 14.55C8.75 13.85 8.4 13 8.4 12C8.4 11 8.75 10.15 9.45 9.45C10.15 8.75 11 8.4 12 8.4C13 8.4 13.85 8.75 14.55 9.45C15.25 10.15 15.6 11 15.6 12C15.6 13 15.25 13.85 14.55 14.55C13.85 15.25 13 15.6 12 15.6Z"
                        fill="white" />
                </svg></button>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../../stores/characterStore.js'
import { useImageDataStore } from '../../stores/imageData.js'
import Experience from '../../three/Experience/Experience.js'
import { onMounted, computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../../router';

export default {
    name: 'Common4',
    setup() {
        let experience;
        const index = ref(0)
        const textIndex = ref(9)
        const eventName = ref('common4')
        const selectedImage = ref(null)

        const characterStore = useCharacterStore()
        const imageDataStore = useImageDataStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common4[textIndex.value] || {}
        })

        const images = ref(
            [
                {
                    id: 1,
                    src: '../resource/filter/01_filter.png',
                    active: true
                }, {
                    id: 2,
                    src: '../resource/filter/02_filter.png',
                    active: false
                }, {
                    id: 3,
                    src: '../resource/filter/03_filter.png',
                    active: false
                }, {
                    id: 4,
                    src: '../resource/filter/04_filter.png',
                    active: false
                }, {
                    id: 5,
                    src: '../resource/filter/05_filter.png',
                    active: false
                }
            ]
        );

        const selectImage = (img) => {
            if (selectedImage.value === img) {
                return
            }

            if (img.active) {
                selectedImage.value = img
            }
            if (img.id === 1) {
                experience.dispose()

            } else if (img.id === 5) {

                experience.camera.setControls()
                experience.world.setCommonFour()

            }
        }

        const saveImage = (image) => {
            imageDataStore.setImageData(image)
            imageDataStore.setEventName(eventName.value)
            router.push({ path: '/capturepreview' });
        }

        const setVH = () => {
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), saveImage);

            if (localStorage.getItem('item8')) {
                images.value[1].active = true
            }
            else if (localStorage.getItem('item9')) {
                images.value[2].active = true
            }
            else if (localStorage.getItem('item10')) {
                images.value[3].active = true
            }
            else if (localStorage.getItem('item11')) {
                images.value[4].active = true
            }
        });

        onBeforeRouteLeave(() => {
            experience.destroy()
            experience.init()
        });

        return {
            index,
            currentCharacter,
            characterContent: currentCharacterContent,
            images,
            selectImage,
            selectedImage,

        }
    }
}
</script>

<style scoped>
.webgl-container {
    height: calc(100 * var(--vh));
    width: 100%;
    top: 0vh;
    position: absolute;
    overflow: hidden;
}

.webgl {
    position: fixed;
    left: 0;
    outline: none;
    overflow: hidden;
}

.capture-container {
    overflow: hidden;
    position: absolute;
    top: calc(90 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.switch-container {
    overflow: hidden;
    position: absolute;
    top: calc(90 * var(--vh));
    left: 75%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.switch-container button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
}

.capture-container button {
    overflow: hidden;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
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

.image-slider-container {
    position: absolute;
    top: calc(75 * var(--vh));
    left: 50%;
    transform: translateX(-50%);
    overflow-x: hidden;
    white-space: nowrap;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0);
    overflow: visible;
}

.image-slider {
    display: inline-flex;
    transition: transform 0.3s;

}

.image-slider img {
    margin: 0 7px;
    height: 56px;
    width: auto;
    transition: height 0.3s, transform 0.3s;
}

.gray {
    filter: grayscale(100%);
}

.clicked-image {
    height: 70px !important;
    transform: translateY(-14px);
}
</style>