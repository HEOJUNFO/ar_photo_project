<template>
    <div>
        <div class="loading-container">
            <img src="https://playar.syrup.co.kr/sodarimg/is/marketing/202308/17TZcrb5Q*38b3ed16b02bec43416b4a7dec923cb0.gif"
                alt="Loading..." />
        </div>
        <button @click="next()">신비의 숲 시작하기</button>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue'
import router from '../router'

export default {
    name: 'Landing',
    setup() {

        const next = () => {
            router.push('/intro')
        }



        return { next }
    }
}
</script>
  
<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.loading-container img {
    width: 50%;
    height: 50%;
}
</style>