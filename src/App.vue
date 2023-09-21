<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style >
@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

@media screen and (orientation: landscape) {
    body::after {
        content: '가로 모드는 지원하지 않습니다.';
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.85);
        /* 반투명한 검은색 배경 */
        color: white;
        /* 텍스트 색상 */
        font-size: 20px;
        z-index: 9999;
        /* 다른 요소 위에 오버레이가 표시되도록 z-index 설정 */
    }
}

* {
    margin: 0;
    padding: 0;
}



.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}</style>