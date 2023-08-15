<template>
	<div class="u-char-box">
		<div class="u-char-flex flex-start-center">
			<input v-model="valueModel" type="number" autofocus :maxlength="maxlength" class="u-input" @input="changeInput"/>
			<div v-for="(item, index) in loopCharArr" :key="index">
				<div :class="[breathe && charArrLength == index ? 'u-breathe' : '', 'u-char-item flex-center-center',
				charArrLength === index && mode == 'box' ? 'u-box-active' : '',
				mode === 'box' ? 'u-box' : '']" :style="{
					fontWeight: bold ? 'bold' : 'normal',
					color: inactiveColor,
					borderColor: charArrLength === index && mode == 'box' ? activeColor : inactiveColor
				}">
					<div class="u-placeholder-line" :style="{
							display: charArrLength === index ? 'block' : 'none'
						}"
						v-if="mode !== 'middleLine'"
					></div>
					<div v-if="mode === 'middleLine' && charArrLength <= index" :class="[breathe && charArrLength == index ? 'u-breathe' : '', charArrLength === index ? 'u-middle-line-active' : '']"
					 class="u-middle-line" :style="{height: bold ? '4px' : '2px', background: charArrLength === index ? activeColor : inactiveColor}"></div>
					<div v-if="mode === 'bottomLine'" :class="[breathe && charArrLength == index ? 'u-breathe' : '', charArrLength === index ? 'u-buttom-line-active' : '']"
					 class="u-bottom-line" :style="{height: bold ? '4px' : '2px', background: charArrLength === index ? activeColor : inactiveColor}"></div>
					<template v-if="!dotFill"> {{ charArr[index] ? charArr[index] : ''}}</template>
					<template v-else>
						<text class="u-dot">{{ charArr[index] ? '●' : ''}}</text>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/**
	 * messageInput 验证码输入框
	 * @description 该组件一般用于验证用户短信验证码的场景，也可以结合uView的键盘组件使用
	 * @tutorial https://www.uviewui.com/components/messageInput.html
	 * @property {String Number} maxlength 输入字符个数（默认4）
	 * @property {Boolean} dot-fill 是否用圆点填充（默认false）
	 * @property {String} mode 模式选择，见上方"基本使用"说明（默认box）
	 * @property {String Number} value 预置值
	 * @property {Boolean} breathe 是否开启呼吸效果，见上方说明（默认true）
	 * @property {Boolean} focus 是否自动获取焦点（默认false）
	 * @property {Boolean} bold 字体和输入横线是否加粗（默认true）
	 * @property {String Number} font-size 字体大小，单位px（默认60）
	 * @property {String} active-color 当前激活输入框的样式（默认#2979ff）
	 * @property {String} inactive-color 非激活输入框的样式，文字颜色同此值（默认#606266）
	 * @property {String | Number} width 输入框宽度，单位px，高等于宽（默认80）
	 * @property {Boolean} disabled-keyboard 禁止点击输入框唤起系统键盘（默认false）
	 * @event {Function} change 输入内容发生改变时触发，具体见官网说明
	 * @event {Function} finish 输入字符个数达maxlength值时触发，见官网说明
	 * @example <u-message-input mode="bottomLine"></u-message-input>
	 */
	export default {
		props: {
			// 最大输入长度
			maxlength: {
				type: [Number, String],
				default: 4
			},
			// 是否用圆点填充
			dotFill: {
				type: Boolean,
				default: false
			},
			// 显示模式，box-盒子模式，bottomLine-横线在底部模式，middleLine-横线在中部模式
			mode: {
				type: String,
				default: "box"
			},
			// 预置值
			value: {
				type: [String, Number],
				default: ''
			},
			// 当前激活输入item，是否带有呼吸效果
			breathe: {
				type: Boolean,
				default: true
			},
			// 是否自动获取焦点
			focus: {
				type: Boolean,
				default: true
			},
			// 字体是否加粗
			bold: {
				type: Boolean,
				default: true
			},
			// 字体大小
			fontSize: {
				type: [String, Number],
				default: 60
			},
			// 激活样式
			activeColor: {
				type: String,
				default: '#161823'
			},
			// 未激活的样式
			inactiveColor: {
				type: String,
				default: '#161823'
			},
			// 输入框的大小，单位px，宽等于高
			width: {
				type: [Number, String],
				default: '80'
			},
		},
		watch: {
			value: {
				immediate: true,
				handler(val) {
					// 转为字符串
					val = String(val);
					// 超出部分截掉
					this.valueModel = val.substring(0, this.maxlength);
				}
			},
		},
		data() {
			return {
				valueModel: ""
			}
		},

		computed: {
			// 用于显示字符
			charArr() {
				return this.valueModel.split('');
			},
			charArrLength() {
				return this.charArr.length;
			},
			// 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
			loopCharArr() {
				return new Array(this.maxlength);
			}
		},

		methods: {
			changeInput(e) {
				if (String(this.valueModel).length < this.maxlength) {
					this.$emit('change', this.valueModel);
				}

				if (String(this.valueModel).length == this.maxlength) {
					this.$emit('finish', this.valueModel);
				}
				
				if (String(this.valueModel).length > this.maxlength) {
					this.valueModel = String(this.valueModel).substring(0, this.maxlength);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
@import '@/assets/css/index.less';
	
	@keyframes breathe-in {
		0% {
			opacity: 0.3;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.3;
		}
	}
	.u-char-box {
		text-align: center;
	}
	.u-char-flex {
		flex-wrap: wrap;
		position: relative;
	}
	.u-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 0;
		background: none;
	}
	.u-char-item {
		position: relative;
		width: 80px;
		height: 80px;
		margin: 10px 10px;
		font-size: 60px;
		font-weight: bold;
		color: #161823;
		line-height: 90px;
	}
	.u-middle-line {
		border: none;
	}
	.u-box {
		border: 2px solid #cccccc;
		border-radius: 6px;
	}
	.u-box-active {
		overflow: hidden;
		animation-timing-function: ease-in-out;
		animation-duration: 1500ms;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		border: 2px solid #2979ff;
	}
	.u-middle-line-active {
		background: #2979ff;
	}
	.u-breathe {
		animation: breathe-in 2s infinite both;
	}
	.u-placeholder-line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2px;
		height: 40px;
		background: #161823;
		animation: twinkling 1.5s infinite both;
	}
	.u-animation-breathe {
		animation-name: breathe-in;
	}
	.u-dot {
		font-size: 34px;
		line-height: 34px;
	}
	.u-middle-line {
		height: 4px;
		background: #000000;
		width: 80%;
		position: absolute;
		border-radius: 2px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.u-buttom-line-active {
		background: #2979ff;
	}
	.u-bottom-line {
		height: 4px;
		background: #000000;
		width: 80%;
		position: absolute;
		border-radius: 2px;
		bottom: 0;
		left: 50%;
		transform: translate(-50%);
	}

@media screen and (max-width: 1023px) {
	.u-char-box{
		.u-char-flex{
			.u-char-item{
				width: 50px;
				height: 50px;
				font-size: 30px;
			}

			.u-placeholder-line{
				height: 30px;
			}
		}
	}
}
</style>