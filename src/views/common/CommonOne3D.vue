<template>
    <div class="main">
        <loading-container @closed="handleClose()">
        </loading-container>
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
    </div>
</template>

<script>
import Experience from '../../ar/common1/Experience.js'
import { onMounted, ref, computed } from 'vue';
import router from '../../router';
import { useCharacterStore } from '../../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'
import LoadingContainer from '../../components/LoadingContainer.vue'

export default {
    name: 'CommonOne3d',
    components: {
        LoadingContainer
    },
    setup() {
        let experience;
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(5)
        const itemValue = ref(0)

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common1[textIndex.value] || {}
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

        const next = () => {
            if (index.value === 0) {
                index.value = 1
                // router.push({ path: '/stickerreward', query: { eventName: "common1" } });
            }
        }

        const nextScene = () => {
            if (itemValue.value < 5) {
                itemValue.value += 1
                return;
            }
            experience.destroy()
            experience.init()
            // router.push({ path: '/framereward', query: { eventName: "common1" } });
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), nextScene);
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
            handleClose,
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
    z-index: 1;
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
    top: calc(15 * var(--vh));
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
</style>