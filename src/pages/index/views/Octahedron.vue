<template>
  <div class="octahedron" ref="three"></div>
</template>

<script>
import THREE from 'three.js';

const DEBUG = 0;
// 颜色数组, 可以使用多种颜色的随机值
const colors = [0x5e9dd1];
const OCTAHEDRONS = [
    {
        x: 400,
        y: 200,
        r: 30
    },
    {
        x: -320,
        y: 180,
        r: 15
    },
    {
        x: -400,
        y: -220,
        r: 10
    },
    {
        x: 180,
        y: 160,
        r: 18
    },
    {
        x: -430,
        y: 10,
        r: 26
    },
    {
        x: 480,
        y: 60,
        r: 16
    },
    {
        x: 360,
        y: -180,
        r: 14
    }
];

const OCTAHEDRONS_M = [
    {
        x: 60,
        y: 260,
        r: 10
    },
    {
        x: -180,
        y: -40,
        r: 18
    },
    {
        x: -110,
        y: 300,
        r: 15
    },
    {
        x: 130,
        y: 130,
        r: 26
    }
];

// 八面体
function Octahedron(props) {
    this.size = props.r || (Math.random() * 20);

    let color = colors[Math.floor(Math.random() * colors.length)];

    this.geometry = new THREE.OctahedronGeometry(this.size, 0);
    this.material = new THREE.MeshLambertMaterial({
        color: color,
        shading: THREE.SmoothShading
    });
    this.shape = new THREE.Mesh(this.geometry, this.material);
    this.shape.position.set(Math.floor((Math.random() * 150) + 300), 0, 0);
    this.circle_rotation = Math.random() * Math.PI * 2;
    this.shape.castShadow = true;
    this.shape.receiveShadow = true;
    this.circle = Math.floor((Math.random() * 100) + 400);
    // y:420 z:550
    this.shape.position.y = props.y;
    this.shape.position.z = props.x;
    this.animate = function() {
        this.shape.rotation.x += this.size * 0.0005;
        this.shape.rotation.z += this.size * 0.001;
        this.circle_rotation += 0.002;
    };
}

export default {
    props: {
        octahedrons: {
            type: Array,
            default() {
                return this.$store.state.isMobileSite ? OCTAHEDRONS_M : OCTAHEDRONS;
            }
        }
    },
    data() {
        return {
            container: null,
            camera: null,
            scene: null,
            renderer: null,
            obj: []
        };
    },
    methods: {
        init() {
            this.container = this.$refs.three;

            this.camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                10000
            );
            this.camera.position.set(-600, 0, 0);

            this.scene = new THREE.Scene();
            if (DEBUG === 1) {
                //每个轴的长度
                let axisHelper = new THREE.AxisHelper(3000);
                this.scene.add(axisHelper);
            }

            // Ground
            let groundMaterial = new THREE.MeshPhongMaterial({
                color: 0x000000,
                opacity: 0
            });
            let plane = new THREE.Mesh(
                new THREE.PlaneGeometry(5000, 5000),
                groundMaterial
            );
            plane.rotation.y = -Math.PI / 2;
            plane.position.x = 500;
            plane.receiveShadow = true;

            this.scene.add(plane);

            // 加一个点光源
            let pointLight;
            pointLight = new THREE.PointLight(0x87dcff);
            pointLight.position.set(200, 0, 0);
            pointLight.intensity = 1.2;
            pointLight.distance = 1000;
            this.scene.add(pointLight);

            let group = new THREE.Group();
            this.scene.add(group);

            this.octahedrons.forEach((item) => {
                let o = new Octahedron(item);
                this.obj.push(o);
            });

            for (let i = 0; i < this.obj.length; i += 1) {
                group.add(this.obj[i].shape);
            }

            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            this.renderer.shadowMapEnabled = true;
            this.renderer.shadowMapSoft = true;
            this.renderer.setClearColor(0x000000, 1);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            this.container.appendChild(this.renderer.domElement);
            // controls = new THREE.OrbitControls(camera, document, this.renderer.domElement);
            window.addEventListener('resize', this.onWindowResize, false);
        },
        animate() {
            this.rafId = window.requestAnimationFrame(this.animate);
            this.render();
        },
        render() {
            this.camera.lookAt(this.scene.position);
            this.renderer.render(this.scene, this.camera);
            for (var i = 0; i < this.obj.length; i += 1) {
                this.obj[i].animate();
            }
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    },
    mounted() {
        this.init();
        this.animate();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onWindowResize);
        window.cancelAnimationFrame(this.rafId);
    }
};
</script>

<style lang="less" scoped>
    .octahedron {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 100%;
    }
</style>




// WEBPACK FOOTER //
// src/components/home-modules/Octahedron.vue