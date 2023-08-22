<template>
    <div>
        <div class="loading-container">
            <div class="image-container">
                <img src="https://playar.syrup.co.kr/sodarimg/is/marketing/202308/17TZcrb5Q*38b3ed16b02bec43416b4a7dec923cb0.gif"
                    alt="Loading..." />
            </div>
            <div class="bottom-section">
                <div class="text-container1">
                    <p>푸짐한 상품과 콘텐츠를</p>
                    <p>제공해드리기 위해</p>
                    <p>동의가 필요해요.</p>
                    <button>[필수] 쿠키 관련 동의 약관</button>
                    <button>[필수] 권한 관련 동의 약관</button>
                    <div class="button-container">
                        <button @click="showModal = true">닫기</button>
                        <button @click="start()">동의 및 시작</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2>서비스 이용 불가</h2>
                <p>필수 권한을 허용해야</p>
                <p>서비스 정상 이용이 가능합니다.</p>
                <p>기기권한 요청 시 허용해주세요.</p>
                <button @click="closeModal()">다시시도</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import router from '../router'

export default {
    name: 'Terms',
    setup() {
        const showModal = ref(false);

        const start = () => {
            localStorage.setItem('consentGiven', 'true');
            router.push('/capture')
        }

        const closeModal = () => {
            showModal.value = false;
        }


        return {
            start,
            showModal,
            closeModal
        }
    }
}
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    background-color: #fff;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    width: 100%;
}

.bottom-section {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}


.text-container1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 10px;
    background-color: #fff;
    width: 100%;
}

.text-container1 p {
    padding: 7.5px 15px 7.5px 15px;
    font-size: 1rem;
}

.image-container {
    display: flex;
    align-items: center;
    margin-bottom: 7vh;
}

.image-container img {
    width: 100%;
    height: 100%;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}
</style>