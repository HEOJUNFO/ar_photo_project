<template>
    <div class="main">
        <div class="top-section">
            <div class="text-container1">
                <p>{{ characterContent.text }}</p>
            </div>
            <div class="side-image-container">
                <img :src="characterContent.src" alt="Side Image" />
            </div>
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div class="image-container">
            <img v-for="n in itemValue" :key="n" src="@resource/common/hail.png" />
        </div>
    </div>
</template>

<script>
import Experience from '../../ar/Common1/Experience.js'
import { onMounted, ref, computed } from 'vue';
import router from '../../router';
import { useCharacterStore } from '../../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'

export default {
    name: 'CommonOne3d',
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
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    margin-top: calc(2.5 * var(--vh));
}


.text-container1 {
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

.text-container1::before {
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

.text-container1 p {
    overflow: hidden;
    padding: 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: center;
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
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: calc(10 * var(--vh));
    position: absolute;
    z-index: 2;
    top: calc(15 * var(--vh));
}

.image-container img {
    width: 20%;
    height: auto;
}
</style>