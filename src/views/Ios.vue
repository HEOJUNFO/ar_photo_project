<template>
    <div>
        <img id="transferDesc" src="@resource/common/kakaoTransfer2.png">
    </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import router from '../router'


export default {
    name: 'ios',
    setup() {

        const getBrowserName = () => {
            var userAgent = navigator.userAgent.toLowerCase();
            let browserName = "";

            if (userAgent.match(/chrome|chromium|crios/i)) {
                browserName = "chrome";
            } else if (userAgent.match(/firefox|fxios/i)) {
                browserName = "firefox";
            } else if (userAgent.match(/safari/i)) {
                browserName = "safari";
            } else if (userAgent.match(/opr\//i)) {
                browserName = "opera";
            } else if (userAgent.match(/edg/i)) {
                browserName = "edge";
            } else if (userAgent.match(/samsung/i)) {
                browserName = "samsung";
            } else {
                browserName = "other";
            }

            if (userAgent.match(/kakao/i)) {
                browserName = "kakao";
            }

            if (userAgent.match(/whale/i)) {
                browserName = "whale";
            }


            return browserName;
        }



        onMounted(() => {

            let browserName = getBrowserName();
            if (browserName !== 'kakao') {
                let hash = router.currentRoute.value.query.hash
                router.push(`/${hash}`);
            }

        })

        return {
        }

    },
}

</script>

<style scoped>
#transferDesc {
    width: 100%;
    height: auto;
}
</style>