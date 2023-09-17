<template>
    <div class="loading-container">
        <!-- Image 1 and Button 1 -->
        <div class="image-container">
            <img src="../resource/landing/web-landing-page.jpg" alt="Image 1" />
            <button @click="start()">신비의 숲 시작하기</button>

        </div>

        <!-- Image 2 and Button 2 -->
        <div class="image-container2">
            <img src="../resource/landing/web-landing-page-2.jpg" alt="Image 2" />
            <button @click="start()">신비의 숲 시작하기</button>
        </div>

        <!-- Image 3 -->
        <div class="image-container">
            <img src="../resource/landing/web-landing-page-3.jpg" alt="Image 3" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import router from '../router'

export default {
    name: 'Landing',
    setup() {


        const next1 = () => {
            router.push('/next1')
        }

        const next2 = () => {
            router.push('/next2')
        }

        const start = () => {
            router.push('/intro')
        }

        return { next1, next2, start }
    }
}
</script>

<style scoped>
.loading-container {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.image-container {
    position: relative;
    object-fit: block;
    margin: -1%;
}

.image-container2 {
    position: relative;
    object-fit: block;
    margin: -1%;
}


.image-container img {
    width: 100%;
    height: auto;
    object-fit: cover;

}

.image-container button {
    position: absolute;
    width: 80%;
    padding: 10px;
    bottom: 7.5%;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    border-radius: 16px;
    background-color: #fff;
}

.image-container2 button {
    position: absolute;
    width: 80%;
    padding: 10px;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    border-radius: 16px;
    background-color: #fff;
}
</style>