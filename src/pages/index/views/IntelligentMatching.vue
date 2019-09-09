<template>
    <div class="intelligent-matching" ref="container">
        <section id="page2_bg">
            <!-- 三角形 -->
            <svg class="triangle" ref="svg" preserveAspectRatio="xMidYMid meet" :viewBox="`0,0,${svgWidth},${svgHeight}`" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <g id="people" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-628.000000, -941.000000)">
                            <g transform="translate(630.000000, 941.000000)">
                                <text id="人" font-family="PingFangSC-Regular, PingFang SC" font-size="12" font-weight="normal" line-spacing="12" fill="#FF571A">
                                    <tspan x="24" y="13">人</tspan>
                                </text>
                                <g id="Group-13" transform="translate(0.000000, 1.000000)" stroke="#FF571A" stroke-width="2">
                                    <polygon id="Combined-Shape" fill-rule="nonzero" points="0 12 10 38 20 12"></polygon>
                                    <polygon id="Triangle-11" points="10 8 5 0 15 0"></polygon>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="site" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-397.000000, -1316.000000)">
                            <g transform="translate(399.000000, 1316.000000)">
                                <text id="场" font-family="PingFangSC-Regular, PingFang SC" font-size="12" font-weight="normal" line-spacing="12" fill="#FF571A">
                                    <tspan x="35" y="13">场</tspan>
                                </text>
                                <path d="M20,2 L20,27 L1,36 L1,37 L40.0016862,37 L39.4250963,36 C27.7799946,30.7197362 21.3049625,27.7197362 20,27" id="Path-30" stroke="#FFCCB9" stroke-width="2"></path>
                                <polygon id="Combined-Shape-Copy-18" stroke="#FF571A" stroke-width="2" points="20 2 -1.52766688e-13 37 40 37"></polygon>
                            </g>
                        </g>
                    </g>
                    <g id="goods" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-836.000000, -1316.000000)">
                            <g transform="translate(838.000000, 1317.000000)">
                                <text id="货-copy" font-family="PingFangSC-Regular, PingFang SC" font-size="12" font-weight="normal" line-spacing="12" fill="#FF571A">
                                    <tspan x="33" y="13">货</tspan>
                                </text>
                                <path d="M8.55,20 L17.1,34.7175094 L0,34.7175094 L8.55,20 Z M29.45,20 L38,34.7175094 L20.9,34.7175094 L29.45,20 Z M19,1 L27.55,15.7175094 L10.45,15.7175094 L19,1 Z" id="Combined-Shape" stroke="#FF571A" stroke-width="2"></path>
                                <path d="M19.3875,8 L21.775,12.1097139 L17,12.1097139 L19.3875,8 Z M8.3875,27 L10.775,31.1097139 L6,31.1097139 L8.3875,27 Z M29.3875,27 L31.775,31.1097139 L27,31.1097139 L29.3875,27 Z" id="Combined-Shape" fill="#FFCCB9"></path>
                            </g>
                        </g>
                    </g>
                </defs>
                <!-- 画圈  641 439-->
                <circle class="dotted-circle" :cx="center.x" :cy="center.y" :r="triangleCenterSideLen * 0.71"></circle>
                <circle class="dotted-circle" :cx="center.x" :cy="center.y" :r="triangleCenterSideLen * 2"></circle>
                <circle class="dotted-circle" :cx="center.x" :cy="center.y" :r="triangleCenterSideLen * 3.22"></circle>

                <g id="rotate" ref="rotate">
                    <g class="step1"
                        :style="{
                            opacity: showDynamicEffect ? 1 : 0,
                            transitionDelay: '0s'
                        }">
                        <path class="triangle-border"
                            :d="`M${triangleDot.up.x} ${triangleDot.up.y} L ${triangleDot.right.x} ${triangleDot.right.y} L ${triangleDot.left.x} ${triangleDot.left.y} Z`"/>
                        <polyline  id="triangle_line"
                            :points="`${triangleDot.up.x},${triangleDot.up.y} ${triangleDot.left.x},${triangleDot.left.y} ${triangleDot.right.x},${triangleDot.right.y} ${triangleDot.up.x},${triangleDot.up.y}`"
                            class="g-rect-fill"/>
                    </g>
                    <g id="cicle_up" class="step3"
                        :style="{
                            opacity: showDynamicEffect ? 1 : 0,
                            transitionDelay: showDynamicEffect ? '1s' : '0s'
                        }">
                        <circle :cx="triangleDot.up.x" :cy="triangleDot.up.y" r="54" fill="white" stroke="#ffffff"></circle>
                        <circle :cx="triangleDot.up.x" :cy="triangleDot.up.y" r="48" fill="white" stroke="#ff571a"></circle>
                        <use :x="triangleDot.up.x - 13" :y="triangleDot.up.y - 22" xlink:href="#people"/>
                    </g>

                    <g id="cicle_left" class="step3"
                        :style="{
                            opacity: showDynamicEffect ? 1 : 0,
                            transitionDelay: showDynamicEffect ? '1s' : '0s'
                        }">
                        <circle :cx="triangleDot.left.x" :cy="triangleDot.left.y" r="54" fill="white" stroke="#ffffff"></circle>
                        <circle :cx="triangleDot.left.x" :cy="triangleDot.left.y" r="48" fill="white" stroke="#ff571a"></circle>
                        <use :x="triangleDot.left.x - 19.5" :y="triangleDot.left.y - 20.72" xlink:href="#goods" />
                    </g>

                    <g id="cicle_right" class="step3"
                        :style="{
                            opacity: showDynamicEffect ? 1 : 0,
                            transitionDelay: showDynamicEffect ? '1s' : '0s'
                        }">
                        <circle :cx="triangleDot.right.x" :cy="triangleDot.right.y" r="54" fill="white" stroke="#ffffff"></circle>
                        <circle :cx="triangleDot.right.x" :cy="triangleDot.right.y" r="48" fill="white" stroke="#ff571a"></circle>
                        <use :x="triangleDot.right.x - 21.5" :y="triangleDot.right.y - 22.5" xlink:href="#site" />
                    </g>
                </g>
            </svg>
            <Tetrahedron class="step2" :style="{
                opacity: showDynamicEffect ? 1 : 0,
                transitionDelay: showDynamicEffect ? '0.5s' : '0s'
            }"/>
        </section>
    </div>
</template>

<script>
import Tetrahedron from './Tetrahedron.canvas.vue';

const SVG_WIDTH = 1280;
const SVG_HEIGHT = 772;
// 三角形边长
const TRIANGLE_SIDE_LEN = 396;
// 三角中心到边的距离
const TRI_CEN_SIDE_LEN = (TRIANGLE_SIDE_LEN / 2) * Math.tan(30 * (Math.PI / 180));
// 三角形中心 0 - 100
const TRIANGLE_CENTER = {
    x: '50',
    y: '63.07'
};
// cos30`
const COS30 = Math.cos(30 * (Math.PI / 180));
// 求平方
const p2 = num => num * num;

export default {
    props: {
        showDynamicEffect: {
            type: Boolean,
            default: false
        },
        triangleCenter: {
            type: Object,
            default() {
                return TRIANGLE_CENTER;
            }
        }
    },
    data() {
        return {
            svgWidth: SVG_WIDTH,
            svgHeight: SVG_HEIGHT,
            triangleCenterSideLen: TRI_CEN_SIDE_LEN
        };
    },
    components: {
        Tetrahedron
    },
    computed: {
        center() {
            // 在 svg 绘制完成之前不能直接取 dom
            const x = (this.triangleCenter.x * (this.svgWidth)) / 100;
            const y = (this.triangleCenter.y * (this.svgHeight)) / 100;
            return {x, y};
        },
        triangleDot() {
            // 三角形下边的 Y 坐标
            const downY = this.center.y + Math.sqrt(p2((TRIANGLE_SIDE_LEN / 2) / COS30) - p2(TRIANGLE_SIDE_LEN / 2));
            const right = {
                x: this.center.x + (TRIANGLE_SIDE_LEN / 2),
                y: downY
            };
            const left = {
                x: this.center.x - (TRIANGLE_SIDE_LEN / 2),
                y: downY
            };
            const up = {
                x: this.center.x,
                y: downY - (TRIANGLE_SIDE_LEN * COS30)
            };
            return {
                up,
                left,
                right
            };
        }
    },
    methods: {
        /**
         * 根据高度调整svg适应
         */
        _adjustToFreezeHeight (rootSvg) {
            const windowHeight = window.innerHeight;

            const viewBoxVal = rootSvg.getAttribute('viewBox');
            const viewBoxWidth = viewBoxVal.split(',')[2];
            const viewBoxHeight = viewBoxVal.split(',')[3];
            rootSvg.removeAttribute('width');
            rootSvg.removeAttribute('height');

            const setHeight = windowHeight;
            const setWidth = (setHeight * viewBoxWidth) / viewBoxHeight;
            rootSvg.setAttribute('width', setWidth);
            rootSvg.setAttribute('height', setHeight);
        },
        _initAnimation() {
            let line = document.getElementById('triangle_line');
            line.style.strokeDashoffset = 0;

            const animateRoute = (e, len) => {
                len -= 6;//每次偏移的位置
                if (len <= -1370) {
                    //大于1000后重置初始偏移，重复运动
                    len = 0;
                }
                //设置元素偏移
                line.style.strokeDashoffset = len;
                //10毫秒执行一次
                this.rafId = requestAnimationFrame(() => {
                    animateRoute(e, len);
                });

            };
            animateRoute(line, 1350);
        },
        _resetSvg() {
            this.$nextTick(() => {
                const svgRoot = document.querySelector('.triangle');
                this._adjustToFreezeHeight(svgRoot);
            });
        }
    },
    mounted () {
        this._resetSvg();
        this._initAnimation();
        window.addEventListener('resize', this._resetSvg, false);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this._resetSvg);
        window.cancelAnimationFrame(this.rafId);
    }
};
</script>


<style lang="less" scoped>
    .intelligent-matching {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: -100;
        .page1_bg {
			position: relative;
		}

		div.triangle-container {
            position: absolute;
            left: 0;
            right: 0;
			width: 600px;
			height: 600px;
			margin: auto;
            font-size: 10px;
            transition: transform 0.8s ease-out;
        }

        .triangle {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
		    fill: transparent;
		    stroke: #dcdcdc;
		    stroke-width: 1;
        }

        .dotted-circle {
            fill: none;
            stroke-width: 1;
            stroke: rgba(220, 220, 220, 0.6);
            stroke-linejoin: round;
            stroke-linecap: round;
            stroke-dasharray: 3 6;
        }

		.g-rect-fill{
		    fill: none;
		    stroke-width:1;
		    stroke:#ff571a;
		    stroke-linejoin: round;
		    stroke-linecap: round;
		    stroke-dasharray: 100, 1370;
		    stroke-dashoffset: -100;
		    // stroke-dasharray: 100 550;
		    // stroke-dashoffset: 100;
		    // animation: lineMove 3s cubic-bezier(0.24, 0.99, 1, 1) infinite;
		}
		.g-rect-fill2 {
			fill: none;
		    stroke-width:1;
		    stroke:#ff571a;
		    stroke-linejoin: round;
		    stroke-linecap: round;
		    /*stroke-dasharray: 0, 1370;
		    stroke-dashoffset: 1350;*/
		    stroke-dasharray: 100 550;
		    stroke-dashoffset: 100;
		    animation: lineMove 3s cubic-bezier(0.24, 0.99, 1, 1) 3s infinite;
		}

		.g-rect-fill3 {
			fill: none;
		    stroke-width:1;
		    stroke:#ff571a;
		    stroke-linejoin: round;
		    stroke-linecap: round;
		    /*stroke-dasharray: 0, 1370;
		    stroke-dashoffset: 1350;*/
		    stroke-dasharray: 100 550;
		    stroke-dashoffset: 100;
		    animation: lineMove 3s cubic-bezier(0.24, 0.99, 1, 1) 6s infinite;
		}


		@keyframes lineMove {
		    /*0%{
		        stroke-dasharray: 0, 1350;
		    }
		    100%{
		        stroke-dasharray: 1350, 1350;
		    }*/
		    to {
		    	stroke-dashoffset: -1370;
		    }
		}
    }

    #page2_bg {
        width: 100%;
        height: 100%;
    }

    .icon {
        position: absolute;
        left: -1000px;
    }

    g#rotate {
        transform-origin: 50% 63.07%;
        transition: transform 1s ease-out;
    }

    g[class^=step], .step2 {
        opacity: 0;
        transition-property: all;
        transition-duration: .5s;
        transition-timing-function: ease-out;
    }
</style>





// WEBPACK FOOTER //
// src/components/home-modules/IntelligentMatching.vue