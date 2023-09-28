import * as THREE from 'three'
import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.currentFacingMode = 'environment'

        this.setInstance()
        this.setWebcamBackground()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.punctualLights = true
        this.instance.toneMapping = THREE.LinearToneMapping
        this.instance.colorSpace = THREE.SRGBColorSpace
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    async setWebcamBackground() {
        this.video = document.createElement('video');
        this.video.setAttribute('playsinline', 'true');
        this.video.setAttribute('autoplay', 'true');
        this.video.setAttribute('muted', 'false');

        const stream = await this.getCameraStream(this.currentFacingMode);
        this.video.srcObject = stream;
        return new Promise((resolve) => {
            this.video.onloadedmetadata = () => {
                this.video.play();

              

                const videoTexture = new THREE.VideoTexture(this.video);
                videoTexture.minFilter = THREE.NearestFilter
                videoTexture.magFilter = THREE.NearestFilter
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.colorSpace = THREE.SRGBColorSpace;
                videoTexture.wrapS = THREE.RepeatWrapping
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
            
                this.scene.background = videoTexture;
            

                resolve();
            };
        });
    }

    async getCameraStream(facingMode) {
        if(this.video && this.video.srcObject) {
            let tracks = this.video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }

        return await navigator.mediaDevices.getUserMedia({
            video: { 
                facingMode: facingMode,
                width: { ideal: this.sizes.height },
                height: { ideal: this.sizes.width }, 
            },
        });
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}