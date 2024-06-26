<template>
    <div id="loadingScreen" class="loading-screen">
        <progress class="loadingbar" value="0" max="100"></progress>
        <p>로딩 중...</p>
    </div>
    <canvas id="camerafeed"></canvas>
    <div id="recorder" class="recorder-container">
        <svg viewBox="0 0 38 38" class="progress-container">
            <circle class="progress-track" r="16" cx="19" cy="19"></circle>
            <circle id="progressBar" class="progress-bar" r="16" cx="19" cy="19"></circle>
            <circle class="loading-circle" r="16" cx="19" cy="19"></circle>
        </svg>

        <button id="recorder-button" class="style-reset">
            Record
        </button>
    </div>
    <div id="flashElement" class="flash-element"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { MediaRecorder } from './mediarecorder/mediarecorder.js'
import './style.css';

export default {
    name: 'plane',
    setup() {
        const setVH = () => {
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        onMounted(() => {
            setVH();
            setTimeout(() => {
                document.getElementById('loadingScreen').style.display = 'none';
            }, 3000);
            var progressBar = document.querySelector('.loadingbar');
            var progressValue = 0;
            var intervalDuration = 35; // milliseconds
            var incrementValue = (intervalDuration / 3500) * 100; // this will increment the value so it fills up in 3 seconds

            var interval = setInterval(function () {
                progressValue += incrementValue;
                progressBar.value = progressValue;

                if (progressValue >= 100) {
                    clearInterval(interval);
                }
            }, intervalDuration);

            const cameraFeed = ref(null);

            const onxrloaded = () => {
                console.log(MediaRecorder);
                MediaRecorder.initRecordButton();
                // MediaRecorder.initMediaPreview();
                MediaRecorder.configure({
                    watermarkMaxWidth: 100,
                    watermarkMaxHeight: 10,
                })
                MediaRecorder.setCaptureMode('photo')



                XR8.addCameraPipelineModules([  // Add camera pipeline modules.
                    XR8.GlTextureRenderer.pipelineModule(),      // Draws the camera feed.
                    XR8.Threejs.pipelineModule(),
                    XR8.CanvasScreenshot.pipelineModule(),
                    XR8.XrController.pipelineModule(),           // Enables SLAM tracking.
                    XRExtras.AlmostThere.pipelineModule(),       // Detects unsupported browsers and gives hints.
                    XRExtras.FullWindowCanvas.pipelineModule(),  // Modifies the canvas to fill the window.
                    XRExtras.Loading.pipelineModule(),           // Manages the loading screen on startup.
                    XRExtras.RuntimeError.pipelineModule(),      // Shows an error image on runtime error.
                    // placegroundScenePipelineModule(),
                ])

                // Open the camera and start running the camera run loop.
                XR8.run({ canvas: document.getElementById('camerafeed') })
            }

            // Show loading screen before the full XR library has been loaded.
            const load = () => {
                XRExtras.Loading.showLoading({
                    onxrloaded: () => {
                        onxrloaded();

                    }
                })
            }
            window.onload = () => { window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load) }

            const placegroundScenePipelineModule = () => {

                const modelFile = new URL('@resource/plane/bear.gltf', import.meta.url).href                          // 3D model to spawn at tap
                const startScale = new THREE.Vector3(0.01, 0.01, 0.01)  // Initial scale value for our model
                const endScale = new THREE.Vector3(0.2, 0.2, 0.2)             // Ending scale value for our model
                const animationMillis = 750                             // Animate over 0.75 seconds

                const raycaster = new THREE.Raycaster()
                const tapPosition = new THREE.Vector2()
                const loader = new THREE.GLTFLoader()  // This comes from GLTFLoader.js.

                let surface  // Transparent surface for raycasting for object placement.

                // Populates some object into an XR scene and sets the initial camera position. The scene and
                // camera come from xr3js, and are only available in the camera loop lifecycle onStart() or later.
                const initXrScene = ({ scene, camera, renderer }) => {
                    renderer.shadowMap.enabled = true
                    renderer.shadowMap.type = THREE.PCFSoftShadowMap

                    const light = new THREE.DirectionalLight(0xffffff, 1, 100)
                    light.position.set(1, 4.3, 2.5)  // default

                    scene.add(light)  // Add soft white light to the scene.
                    scene.add(new THREE.AmbientLight(0x404040, 2.5))  // Add soft white light to the scene.

                    light.shadow.mapSize.width = 1024  // default
                    light.shadow.mapSize.height = 1024  // default
                    light.shadow.camera.near = 0.5  // default
                    light.shadow.camera.far = 500  // default
                    light.castShadow = true

                    surface = new THREE.Mesh(
                        new THREE.PlaneGeometry(100, 100, 1, 1),
                        new THREE.ShadowMaterial({
                            opacity: 0.5,
                        })
                    )

                    surface.rotateX(-Math.PI / 2)
                    surface.position.set(0, 0, 0)
                    surface.receiveShadow = true
                    scene.add(surface)

                    // Set the initial camera position relative to the scene we just laid out. This must be at a
                    // height greater than y=0.
                    // camera.near = 0.01
                    camera.position.set(0, 3, 0)
                }

                const animateIn = (model, pointX, pointZ, yDegrees) => {
                    const scale = { ...startScale }

                    model.scene.rotation.set(0.0, yDegrees, 0.0)
                    model.scene.position.set(pointX, 0.0, pointZ)
                    model.scene.scale.set(scale.x, scale.y, scale.z)
                    model.scene.traverse((o) => {
                        if (o.isMesh) {
                            o.castShadow = true
                        }
                    })
                    // model.scene.children[0].children[0].children[0].castShadow = true
                    XR8.Threejs.xrScene().scene.add(model.scene)

                    new TWEEN.Tween(scale)
                        .to(endScale, animationMillis)
                        .easing(TWEEN.Easing.Elastic.Out)  // Use an easing function to make the animation smooth.
                        .onUpdate(() => {
                            model.scene.scale.set(scale.x, scale.y, scale.z)
                        })
                        .start()  // Start the tween immediately.
                }

                // Load the glb model at the requested point on the surface.
                const placeObject = (pointX, pointZ) => {
                    loader.load(
                        modelFile,  // resource URL.
                        (gltf) => { // Success callback
                            animateIn(gltf, pointX, pointZ, Math.random() * 360)
                        },
                        undefined,   // Progress callback (not used here)
                        (error) => { // Error callback
                            alert('모델 로딩 실패: ' + error.message);
                        }
                    )
                }

                const placeObjectTouchHandler = (e) => {
                    // Call XrController.recenter() when the canvas is tapped with two fingers. This resets the
                    // AR camera to the position specified by XrController.updateCameraProjectionMatrix() above.
                    if (e.touches.length === 2) {
                        XR8.XrController.recenter()

                    }

                    if (e.touches.length > 2) {
                        return
                    }

                    // If the canvas is tapped with one finger and hits the "surface", spawn an object.
                    const { camera } = XR8.Threejs.xrScene()

                    // calculate tap position in normalized device coordinates (-1 to +1) for both components.
                    tapPosition.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
                    tapPosition.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1

                    // Update the picking ray with the camera and tap position.
                    raycaster.setFromCamera(tapPosition, camera)

                    // Raycast against the "surface" object.
                    const intersects = raycaster.intersectObject(surface)

                    if (intersects.length === 1 && intersects[0].object === surface) {
                        placeObject(intersects[0].point.x, intersects[0].point.z)
                    }
                }

                return {
                    // Pipeline modules need a name. It can be whatever you want but must be unique within your app.
                    name: 'placeground',

                    // onStart is called once when the camera feed begins. In this case, we need to wait for the
                    // XR8.Threejs scene to be ready before we can access it to add content. It was created in
                    // XR8.Threejs.pipelineModule()'s onStart method.
                    onStart: ({ canvas }) => {
                        const { scene, camera, renderer } = XR8.Threejs.xrScene()  // Get the 3js sceen from xr3js.

                        // Add objects to the scene and set starting camera position.
                        initXrScene({ scene, camera, renderer })

                        canvas.addEventListener('touchstart', placeObjectTouchHandler, true)  // Add touch listener.

                        // prevent scroll/pinch gestures on canvas
                        canvas.addEventListener('touchmove', (event) => {
                            event.preventDefault()
                        })

                        // Enable TWEEN animations.
                        const animate = (time) => {
                            requestAnimationFrame(animate)
                            TWEEN.update(time)
                        }

                        animate()

                        // Sync the xr controller's 6DoF position and camera paremeters with our scene.
                        XR8.XrController.updateCameraProjectionMatrix({
                            origin: camera.position,
                            facing: camera.quaternion,
                        })
                    },
                }
            }

        })
    }
}
</script>

<style scoped>
body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: -1px 0px 0px 0px !important;
    padding: 0;
}

.loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    z-index: 1000;
    font-size: 2em;
}

.loadingbar {
    position: absolute;
    top: calc(60 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: calc(10 * var(--vh));
    z-index: 10;
}
</style>