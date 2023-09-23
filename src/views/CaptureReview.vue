<template>
    <div class="main">
        <div class="bottom-section">
            <button @click="showModal = true">뒤로</button>
            <button @click="saveImage()">저장</button>
            <button @click="shareImage()">공유</button>
        </div>
        <div class="image-container">
            <img :src="imageDataStore.imageData" />
        </div>

        <div v-if="showModal" class="modal">
            <p>뒤로 돌아갑니다.</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="confirmBack">확인</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { useImageDataStore } from '../stores/imageData.js'
import { onMounted, computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../router';

export default {
    name: 'captureReview',
    setup() {
        const showModal = ref(false);
        const eventName = ref('capture')


        const characterStore = useCharacterStore()
        const imageDataStore = useImageDataStore()
        console.log(imageDataStore.imageData)

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common4[textIndex.value] || {}
        })

        const confirmBack = () => {
            showModal.value = false;
            router.go(-1);
        };

        const closeModal = () => {
            showModal.value = false;
        };


        const back = () => {
            showModal.value = true;
        };

        const saveImage = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = imageDataStore.imageData;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataURL;
                a.download = 'image.png';
                a.click();
            };
        }

        const shareImage = async () => {

            const blob = await (await fetch(imageDataStore.imageData)).blob();
            const filesArray = [
                new File([blob], "image.png", {
                    type: blob.type,
                }),
            ];

            const shareData = {
                files: filesArray,
            };

            if (!navigator.share) {
                alert("공유하기 기능을 지원하지 않는 브라우저입니다.");
                return;
            }
            navigator
                .share(shareData)
                .then(() => {
                    console.log("Thanks for sharing!");
                })
                .catch(console.error);
        }

        const setVH = () => {
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

        });

        onBeforeRouteLeave(() => {

        });

        return {
            back,
            showModal,
            confirmBack,
            closeModal,
            imageDataStore,
            saveImage,
            shareImage
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.image-container {
    height: calc(70 * var(--vh));
    width: calc((4/6) * 70 * var(--vh));
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.image-container img {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
}

.bottom-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(30 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: var(--Main-Pink, #F0D7CA);
    position: absolute;
    bottom: 0;
}


.bottom-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;
}

.bottom-section button svg {
    width: auto;
    height: calc(10* var(--vh));

}


.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    height: calc(10 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    background-color: #fff;
    border-radius: 16px;
    flex-direction: column;
    z-index: 3;
    padding-top: 10%;
    transform: translate(-50%, -50%);
}

.modal p {
    color: #111;
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.modal-buttons {
    margin-top: 10%;
    display: flex;
    justify-content: center;
    width: 100%;
}

.modal button {
    width: 50%;
    padding: 10px;
    border: none;
    cursor: pointer;
}


.modal button:first-child {
    border-radius: 0px 0px 0px 16px;
    background: var(--Background_Grey, #D9D9D9);
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.modal button:last-child {
    border-radius: 0px 0px 16px 0px;
    background: var(--Main-Pink, #F0D7CA);
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}
</style>