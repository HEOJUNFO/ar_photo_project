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
        this.aspectio = null;

        this.currentFacingMode = 'environment';

        this.setInstance()
        this.setWebcamBackground()
    }

    bindMethods() {
        window.switchCamera = this.switchCamera.bind(this);
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false
        })
        this.instance.punctualLights = true
        this.instance.toneMapping = THREE.LinearToneMapping
        this.instance.colorSpace = THREE.SRGBColorSpace
        this.instance.toneMappingExposure =  Math.pow(2, 0);

        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    async setWebcamBackground() {
        this.scene.background = null;
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
                videoTexture.wrapT = THREE.RepeatWrapping

                if(this.currentFacingMode === 'user') {
                    videoTexture.matrixAutoUpdate = false;
                    videoTexture.matrix.scale(-1, 1);}
            
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
                width: { ideal: this.sizes.height*2 },
                height: { ideal:this.sizes.width*2 }, 
            },
        });
    }

    async switchCamera() {
        this.currentFacingMode = this.currentFacingMode === 'user' ? 'environment' : 'user';
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
                videoTexture.wrapT = THREE.RepeatWrapping

                if(this.currentFacingMode === 'user') {
                    videoTexture.matrixAutoUpdate = false;
                    videoTexture.matrix.scale(-1, 1);}
            
                this.scene.background = videoTexture;
            

                resolve();
            };
        });
    }

    async resize()
    {

        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

       this.scene.background = null;
     
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
               videoTexture.wrapT = THREE.RepeatWrapping

               if(this.currentFacingMode === 'user') {
                videoTexture.matrixAutoUpdate = false;
                videoTexture.matrix.scale(-1, 1);}
           
               this.scene.background = videoTexture;
           

               resolve();
           };
       });

    }

    dispose() {
        if(this.video && this.video.srcObject) {
            let tracks = this.video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    }


    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}