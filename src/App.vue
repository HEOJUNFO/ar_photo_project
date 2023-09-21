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
}
</style>