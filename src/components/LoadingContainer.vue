<template>
    <div style="overflow: hidden;">
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
import { createRouterMatcher } from 'vue-router'

export default {
    name: 'LoadingContainer',
    setup() {

        const systemCheck = ref(true)



        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }


        onMounted(() => {

            if (localStorage.getItem('characterID') === null && router.currentRoute.value.path !== '/intro') {
                router.push('/intro')

                const rewardsData = {
                    all: [
                        { id: 1, acquired: true, used: false },
                        { id: 2, acquired: true, used: true },
                        { id: 3, acquired: false, used: false },
                        { id: 4, acquired: true, used: true },
                    ]
                }

                localStorage.setItem('rewardsData', JSON.stringify(rewardsData));

                return
            }

            setVH();

            window.addEventListener('resize', setVH);
            setTimeout(() => {


                localStorage.getItem('consentGiven') === 'true' ? systemCheck.value = false : router.push('/terms')
            }, 1000)

        })
        return { systemCheck }
    }
}
</script>
  
<style >
.loading-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100 * var(--vh));
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