<template>
    <div>
        <transition name="fade">
            <div v-if="systemCheck" class="loading-container">
                <img src="https://playar.syrup.co.kr/sodarimg/is/marketing/202308/17TZcrb5Q*38b3ed16b02bec43416b4a7dec923cb0.gif"
                    alt="Loading..." />
            </div>
        </transition>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue'
import router from '../router'

export default {
    name: 'LoadingContainer',
    setup() {

        const systemCheck = ref(true)

        onMounted(() => {
            setTimeout(() => {
                localStorage.getItem('consentGiven') === 'true' ? systemCheck.value = false : router.push('/terms')
            }, 1000)

        })
        return { systemCheck }
    }
}
</script>
  
<style scoped>
.loading-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    z-index: 5;

}

.loading-container img {
    width: 100%;
    height: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>