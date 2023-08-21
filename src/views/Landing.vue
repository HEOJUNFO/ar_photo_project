<template>
    <div v-if="isLoading" class="loading-container">
        <img src="https://playar.syrup.co.kr/sodarimg/is/marketing/202308/17TZcrb5Q*38b3ed16b02bec43416b4a7dec923cb0.gif"
            alt="Loading..." />
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue'
import router from '../router'

export default {
    name: 'Landing',
    setup() {
        const isLoading = ref(true)

        onMounted(() => {
            setTimeout(() => {
                isLoading.value = false
                router.push('/Intro')
            }, 3000)
        })

        return { isLoading }
    }
}
</script>
  
<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.loading-container img {
    width: 50%;
    height: 50%;
}
</style>