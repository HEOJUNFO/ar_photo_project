<template>
    <div>
        <video ref="videoRef" width="640" height="480" autoplay></video>
        <canvas ref="canvasRef" width="640" height="480"></canvas>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
    name: 'ImageTracking',
    setup() {
        const videoRef = ref(null);
        const canvasRef = ref(null);

        onMounted(async () => {
            const video = videoRef.value;
            const canvas = canvasRef.value;
            if (!video || !canvas) return;

            const context = canvas.getContext('2d', { willReadFrequently: true });

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment'
                    }
                });
                video.srcObject = stream;

                video.addEventListener('loadedmetadata', () => {
                    video.play().catch(error => console.error('Play error:', error));
                });

                const colors = new tracking.ColorTracker(['yellow']);

                tracking.track(video, colors, { camera: true });

                colors.on('track', event => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    event.data.forEach(rect => {
                        context.strokeStyle = '#a64ceb';
                        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                        context.font = '11px Helvetica';
                        context.fillStyle = "#fff";
                        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                    });
                });
            } catch (err) {
                console.error('Error accessing the camera', err);
            }
        });

        return {
            videoRef,
            canvasRef
        }
    }
};
</script>

<style scoped>
canvas {
    position: absolute;
    top: 0;
    left: 0;
}
</style>

