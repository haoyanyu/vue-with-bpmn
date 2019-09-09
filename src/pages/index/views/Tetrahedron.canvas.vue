<template>
  <div class="tetrahedron" ref="three"></div>
</template>

<script>
import THREE from 'three.js';

const X_AXIS = 0;
const Y_AXIS = -1;
const SPEED = 0.01;
const RADIUS = 0.5;
const DEBUG = 0;

export default {
    props: {
        // 旋转速度
        speed: {
            type: Number,
            default: SPEED
        }
    },
    data() {
        return {
            camera: null,
            renderer: null,
            // 四面体半径
            radius: RADIUS,
            // 四面体位置
            xAxis: X_AXIS,
            yAxis: Y_AXIS
        };
    },
    methods: {
        _initWebGL() {
            let scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({
                // 消除边缘锯齿
                antialias: true,
                alpha: true
            });

            if (DEBUG === 1) {
                //每个轴的长度
                let axisHelper = new THREE.AxisHelper(3000);
                scene.add(axisHelper);
            }

            this.renderer.setSize(window.innerWidth * 2, window.innerHeight * 2);
            this.$refs.three.appendChild(this.renderer.domElement);

            if (this.$store.state.isMobileSite) {
                this.yAxis = -0.65;
                this.radius = 0.4;
            }

            let geometry = new THREE.TetrahedronGeometry(this.radius, 0);
            let material = new THREE.MeshBasicMaterial({
                color: 0xFF571A,
                opacity: 0.2,
                transparent: true
            });
            let tetrahedron = new THREE.Mesh(geometry, material);
            tetrahedron.position.y = this.yAxis;
            scene.add(tetrahedron);

            //设置边框，可以旋转
            let edges = new THREE.EdgesHelper(tetrahedron, 0xff571a);
            scene.add(edges);

            this.camera.position.z = 5;
            let render = () => {
                this.rafId = window.requestAnimationFrame(render);
                tetrahedron.rotation.x += SPEED;
                tetrahedron.rotation.y += SPEED;
                tetrahedron.rotation.z += SPEED;
                this.renderer.render(scene, this.camera);
            };
            render();

            window.addEventListener('resize', this.onWindowResize, false);
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    },
    mounted() {
        this._initWebGL();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onWindowResize);
        window.cancelAnimationFrame(this.rafId);
    }
};
</script>

<style lang="less">
.tetrahedron {
    canvas {
        width: 100% !important;
        height: auto !important;
    }
}
</style>




// WEBPACK FOOTER //
// src/components/home-modules/Tetrahedron.canvas.vue