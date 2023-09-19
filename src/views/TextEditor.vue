<template>
    <div @click.stop="bgClick()" class="capture-preview">
        <div class="top-section">
            <div class="side-image-container">
                <button @click="back()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none">
                        <mask id="mask0_81_1024" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                            height="24">
                            <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_81_1024)">
                            <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                                fill="#111111" />
                        </g>
                    </svg></button>
            </div>
            <div class="text-container1">
                <p>방명록 에디터</p>
            </div>
            <div class="side-image-container2">
                <button @click="save()" :style="{ color: isComplete ? '#D50F4A' : '#9f9f9f' }">
                    완료
                </button>
            </div>
        </div>
        <div class="content-section">
            <div class="content-item1">
                <label>예쁜글 쏨씨 남기기</label>
            </div>
            <div class="content-item">
                <label>작성자<span class="redstar">*</span></label>
                <input type="text" class="single-line-input" placeholder="이름을 입력해주세요" v-model="authorInput">
            </div>
            <hr class="character-line">
            <div class="content-item">
                <label>내용<span class="redstar">*</span></label>
                <textarea class="multi-line-input" placeholder="내용을 입력해주세요" v-model="contentInput"></textarea>
            </div>
            <div class="content-item">
                <label>추천태그<span class="redstar">*</span></label>
                <div class="tag-container">
                    <div class="tag" @click="toggleTagSelection(0)">
                        <span
                            :style="{ backgroundColor: selectTags[0] ? '#D50F4A' : 'white', color: selectTags[0] ? 'white' : 'black' }">인생
                            한 컷<img src="../resource/gestBook/camera-with-flash.png" alt="Image 1"></span>
                    </div>
                    <div class="tag" @click="toggleTagSelection(1)">
                        <span
                            :style="{ backgroundColor: selectTags[1] ? '#D50F4A' : 'white', color: selectTags[1] ? 'white' : 'black' }">좋아요<img
                                src="../resource/gestBook/sparkling-heart.png" alt="Image 1"></span>
                    </div>
                    <div class="tag" @click="toggleTagSelection(2)">
                        <span
                            :style="{ backgroundColor: selectTags[2] ? '#D50F4A' : 'white', color: selectTags[2] ? 'white' : 'black' }">멋져멋져<img
                                src="../resource/gestBook/smiling-face-with-sunglasses.png" alt="Image 1"></span>
                    </div>
                    <div class="tag" @click="toggleTagSelection(3)">
                        <span
                            :style="{ backgroundColor: selectTags[3] ? '#D50F4A' : 'white', color: selectTags[3] ? 'white' : 'black' }">예뻐예뻐<img
                                src="../resource/gestBook/blossom.png" alt="Image 1"></span>
                    </div>
                    <div class="tag" @click="toggleTagSelection(4)">
                        <span
                            :style="{ backgroundColor: selectTags[4] ? '#D50F4A' : 'white', color: selectTags[4] ? 'white' : 'black' }">재밌다<img
                                src="../resource/gestBook/rolling-on-the-floor-laughing.png" alt="Image 1"></span>
                    </div>
                    <div class="tag" @click="toggleTagSelection(5)">
                        <span
                            :style="{ backgroundColor: selectTags[5] ? '#D50F4A' : 'white', color: selectTags[5] ? 'white' : 'black' }">신선하다<img
                                src="../resource/gestBook/iphonesparkles.png" alt="Image 1"></span>
                    </div>
                </div>
            </div>
            <div :class="{ 'hidden-content': attachedImages.length === 0 }" class="attached-images">
                <div class="image-container" v-for="(image, index) in attachedImages" :key="index">
                    <img :src="image">
                    <button @click="removeImage(index)" class="remove-btn">x</button>
                </div>
            </div>
            <hr class="character-line2">
            <div class="picture-item">
                <button @click="triggerFileInput"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 20 20" fill="none">
                        <mask id="mask0_74_367" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20"
                            height="20">
                            <rect width="20" height="20" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_74_367)">
                            <path
                                d="M4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H15.8333C16.2917 2.5 16.684 2.66319 17.0104 2.98958C17.3368 3.31597 17.5 3.70833 17.5 4.16667V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667ZM4.16667 15.8333H15.8333V4.16667H4.16667V15.8333ZM5.83333 14.1667H14.1667C14.3333 14.1667 14.4583 14.0903 14.5417 13.9375C14.625 13.7847 14.6111 13.6389 14.5 13.5L12.2083 10.4375C12.125 10.3264 12.0139 10.2708 11.875 10.2708C11.7361 10.2708 11.625 10.3264 11.5417 10.4375L9.375 13.3333L7.83333 11.2708C7.75 11.1597 7.63889 11.1042 7.5 11.1042C7.36111 11.1042 7.25 11.1597 7.16667 11.2708L5.5 13.5C5.38889 13.6389 5.375 13.7847 5.45833 13.9375C5.54167 14.0903 5.66667 14.1667 5.83333 14.1667ZM7.08333 8.33333C7.43056 8.33333 7.72569 8.21181 7.96875 7.96875C8.21181 7.72569 8.33333 7.43056 8.33333 7.08333C8.33333 6.73611 8.21181 6.44097 7.96875 6.19792C7.72569 5.95486 7.43056 5.83333 7.08333 5.83333C6.73611 5.83333 6.44097 5.95486 6.19792 6.19792C5.95486 6.44097 5.83333 6.73611 5.83333 7.08333C5.83333 7.43056 5.95486 7.72569 6.19792 7.96875C6.44097 8.21181 6.73611 8.33333 7.08333 8.33333Z"
                                fill="#1C1B1F" />
                        </g>
                    </svg>사진첨부</button>
                <input ref="fileInput" type="file" @change="onImageUpload" multiple style="display: none;">
            </div>
            <!-- <div class="terms-container">
                <h2></h2>
            </div> -->
        </div>
        <div v-if="showModal" class="modal">
            <p>뒤로 돌아갑니다.</p>
            <div class="modal-buttons">
                <button @click="showModal = false">취소</button>
                <button @click="confirmBack">확인</button>
            </div>
        </div>
        <div v-if="saveFailModal" class="modal2">
            <p>작성된 내용이 없습니다.</p>
            <div class="modal-buttons2">
                <button @click="saveFailModal = false">닫기</button>
            </div>
        </div>
        <div v-if="saveSuccessModal" class="modal2">
            <p>업로드 완료되었습니다.</p>
            <div class="modal-buttons2">
                <button @click="next()">확인</button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import router from '../router';
import { useImageDataStore } from '../stores/imageData.js'
import { useRewardsStore } from '../stores/reward';

export default {
    name: 'TextEditor',
    setup() {
        const imageDataStore = useImageDataStore()
        const rewardsStore = useRewardsStore()

        const showModal = ref(false);
        const saveFailModal = ref(false);
        const saveSuccessModal = ref(false);

        const selectTags = ref([])
        const attachedImages = ref([])
        const fileInput = ref(null)
        const authorInput = ref('')
        const contentInput = ref('')
        const eventName = ref('')

        const isComplete = computed(() => {
            return authorInput.value && contentInput.value && selectTags.value.some(tag => tag);
        });

        const save = () => {
            if (isComplete.value === '') {
                saveFailModal.value = true;

            } else {
                saveSuccessModal.value = true;
            }
        }

        const next = () => {
            eventName.value = imageDataStore.getEventName();
            if (eventName.value === 'shopping2') {
                imageDataStore.setEventName('shopping2Clear');
                localStorage.setItem('item2', 'true')
            } else if (eventName.value === 'culture2') {
                imageDataStore.setEventName('culture2Clear');
                localStorage.setItem('item4', 'true')
            } else if (eventName.value === 'eatingOut2') {
                imageDataStore.setEventName('eatingOut2Clear');
                localStorage.setItem('item3', 'true')
            }

            rewardsStore.setRewardsData();
            router.push('./outro');
        }


        const triggerFileInput = () => {
            fileInput.value.click();
        }

        const onImageUpload = (event) => {
            if (attachedImages.value.length >= 5) {
                alert("최대 5개의 이미지만 첨부 가능합니다.");
                return;
            }

            let uploadedFiles = event.target.files;
            for (let i = 0; i < uploadedFiles.length; i++) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    attachedImages.value.push(e.target.result);
                }
                reader.readAsDataURL(uploadedFiles[i]);
            }
        }

        const removeImage = (index) => {
            attachedImages.value.splice(index, 1);
        }

        const toggleTagSelection = (index) => {
            selectTags.value[index] = !selectTags.value[index]
        }

        const confirmBack = () => {
            showModal.value = false;
            router.go(-1);
        };

        const closeModal = () => {
            showModal.value = false;
            saveFailModal.value = false;

        };

        const bgClick = () => {
            // If there is any functionality you want when background is clicked, add here
        };

        const back = () => {
            showModal.value = true;
        };

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        onMounted(() => {
            setVH();
            window.addEventListener('resize', setVH);

        });

        return {
            back,
            bgClick,
            showModal,
            confirmBack,
            closeModal,
            toggleTagSelection,
            selectTags,
            onImageUpload,
            attachedImages,
            removeImage,
            triggerFileInput,
            fileInput,
            isComplete,
            authorInput,
            contentInput,
            save,
            next,
            saveFailModal,
            saveSuccessModal
        };
    }
}
</script>

<style scoped>
.top-section {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 1;
    background: var(--Main-Pink, #F0D7CA);
}


.side-image-container {
    display: flex;
    align-items: center;
    position: absolute;
    left: 5vw;
}

.side-image-container button {
    height: 100%;
    width: 100%;
    display: block;
    border: none;
    background: none;
    outline: none;
}

.text-container1 {
    justify-content: center;
    align-items: center;

}

.text-container1 p {
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.5px;
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
    border: 1px solid #D9D9D9;
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
    width: 101%;
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

.modal2 {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    height: calc(10 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #D9D9D9;
    background-color: #fff;
    border-radius: 16px;
    flex-direction: column;
    z-index: 3;
    padding-top: 10%;
    transform: translate(-50%, -50%);
}

.modal2 p {
    color: #111;
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.modal-buttons2 {
    margin-top: 10%;
    display: flex;
    justify-content: center;
    width: 101%;
}

.modal2 button {
    width: 100%;
    padding: 10px;
    border: none;
    cursor: pointer;
}


.modal2 button:first-child {
    border-radius: 0px 0px 16px 16px;
    background: var(--Background_Grey, #F0D7CA);
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.content-section {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.character-line {
    margin-bottom: calc(2.5 * var(--vh));
    width: 90%;
    border: 1px solid #D9D9D9;
    margin: 5px 0 5px 0;
    align-self: center
}

.character-line2 {
    margin-bottom: calc(2.5 * var(--vh));
    width: 90%;
    border: 1px solid #D9D9D9;
    margin: 5px 0 5px 0;
    align-self: center
}


.content-item1 {
    display: flex;
    flex-direction: column;
    margin-top: calc(2.5 * var(--vh));
    margin-left: 5%
}

.content-item1 label {
    margin-bottom: 20px;
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.content-item {
    display: flex;
    flex-direction: column;
    margin-bottom: calc(1 * var(--vh));
    margin-left: 5%
}

.content-item label {
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: -0.3px;
    margin-bottom: 15px;

}

.tag-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-left: -1%;
    margin-bottom: calc(3 * var(--vh));
}

.tag-container span {
    width: 75%;
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 100px;
    margin-bottom: calc(1 * var(--vh));
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: -0.3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}



.tag img {
    position: relative;
    margin-left: 5%;
    height: 20px;
    width: 20px;
}


.single-line-input {
    width: 80%;
    border: none;
    border-radius: 4px;
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.multi-line-input {
    width: 90%;
    height: auto;
    min-height: calc(1.5em * 8);
    border: none;
    border-radius: 4px;
    resize: vertical;
    overflow-y: auto;
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.tag {

    cursor: pointer;
    transition: color 0.3s;
}

.picture-item {
    display: flex;
    flex-direction: column;
    margin-top: calc(2 * var(--vh));
    margin-bottom: calc(2 * var(--vh));
    margin-left: 5%
}

.picture-item button {
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: -0.3px;
    margin-bottom: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.hidden-content {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    height: calc(15 * var(--vh));
    overflow: hidden;
}

.attached-images {
    overflow: visible;
    overflow-x: auto;
    white-space: nowrap;
    margin-left: 5%;
}


.image-container {
    position: relative;
    display: inline-block;
    margin-right: 5px;
}

.image-container img {
    width: calc(15 * var(--vh));
    height: calc(15 * var(--vh));

}

.remove-btn {
    position: absolute;
    top: 0px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: bold;
}

.redstar {
    color: #D50F4A;
    margin-left: 1%;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.35px;
}

.side-image-container2 {
    display: flex;
    align-items: center;
    position: absolute;
    right: 5vw;
}

.side-image-container2 button {
    height: 100%;
    width: 100%;
    display: block;
    border: none;
    background: none;
    outline: none;
    color: #9f9f9f;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.terms-container {
    max-height: 300px;
    overflow-y: auto;
    width: 100%;
}
</style>