<template>
    <div class="previewr-layout">
        <div class="resume-info-layout">
            <!-- 顶部背景 -->
            <div class="top-back">
                <!-- <ResumeBackAnim/> -->
            </div>
            <!-- 信息 -->
            <div class="resume-info-content flex-center-center">

                <div class="avatar">
                    <VanImage style="width: 80px; height: 80px; fit: cover;" :src="detail.avatar" />
                </div>

                <div class="title">{{detail.title || '名称'}}</div>

                <div class="sub-title">{{detail.subTitle || '子标题'}}</div>

                <div class="flex">
                    <div class="card-left flex-center-center">
                        <div class="resume-title">{{detail.resumeTitle || '个人简历'}}</div>
                    </div>
                    <div>
                        <div class="card-right-1">
                            <div class="flex-center-center">
                                <VanImage style="width: 158px; height: 105px; fit: cover;" :src="detail.userImage"/>
                            </div>
                        </div>

                        <div class="card-right-2 flex-center-center">
                            <div class="flex-center-start">
                                <img :src="Location" style="width: 18px; height: 18px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);">
                                <div class="text-location">{{detail.userAddress||'地点'}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-bottom flex-center-around">
                    <div class="flex-center-center" style="flex-direction: column;">
                        <img :src="Email" style="width: 25px; height: 25px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);">
                        <div class="card-bottom-text">{{detail.userEmail || '邮箱'}}</div>
                    </div>

                    <div class="flex-center-center" style="flex-direction: column;">
                        <img :src="Wechat" style=" width: 25px; height: 25px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);">
                        <div class="card-bottom-text">二维码</div>
                    </div>

                    <div class="flex-center-center" style="flex-direction: column;">
                        <img :src="Phone" style="width: 25px; height: 25px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);">
                        <div class="card-bottom-text">{{detail.userMobile || '联系电话'}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="padding: 30px 10px 0px;">
            <MDPreview :content="detail.resumeContent"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent} from 'vue';
import { Image as VanImage } from 'vant';
import Email from '/@/assets/svg/email.svg'
import Phone from '/@/assets/svg/phone.svg'
import Wechat from '/@/assets/svg/wechat.svg'
import Location from '/@/assets/svg/location.svg'

// const ResumeBackAnim = defineAsyncComponent(() => import('/@/components/anim/ResumeAnim/ResumeBackAnim.vue'));
const MDPreview = defineAsyncComponent(() => import('/@/components/MDPreview.vue'));

// 定义父组件传过来的值
const props = defineProps({
    // 详情
    detail: {
        type: Object,
        default: () => '',
    },
});
</script>

<style scoped lang="scss">
.previewr-layout{
    width: 100%;
    height: 100%;

    .resume-info-layout{
        width: 100%;
        position: relative;

        .top-back{
            position: absolute;
            top: 100px;
            left: 0;
            right: 0;
            height: 100px;
        }

        .resume-info-content{
            flex-direction: column;
            position: relative;
            top: 0;
            left: 0;
            right: 0;
        }
            
        .avatar{
            width: 80px;
		    height: 80px;
            margin-top: 100px;
            border-radius: 50%;
            position: relative;
		    overflow: hidden;
        }

        .title{
            margin-top: 15px;
            font-size: 24px;
            font-weight: bold;
            color: var(--app-item-title);
        }

        .sub-title{
            margin: 8px 0 100px;
            font-size: 14px;
            color: var(--app-item-sub);
        }

        .card-left{
            border-radius: 30px 0 0 0;
            width: 158px;
            height: 220px;
            background-color: var(--app-resume-bg-color);
            margin-right: 6px;

            .resume-title{
                font-size: 22px;
                color: var(--app-item-title);
                writing-mode:vertical-lr;
                letter-spacing: 15px;
            }
        }

        .card-right-1{
            border-radius: 0 30px 0 0;
            width: 158px;
            height: 105px;
            background-color: var(--app-resume-bg-color);
            margin-left: 6px;
            margin-bottom: 10px;
            position: relative;
            overflow: hidden;

            &:hover{
                .bottom-edit{
                    display: block;
                }
            }
        }

        .card-right-2{
            width: 158px;
            height: 105px;
            background-color: var(--app-resume-bg-color);
            margin-left: 6px;
            
            .text-location{
                font-size: 16px;
                color: var(--app-item-title);
                margin-left: 5px;
                letter-spacing: 2px;
            }
        }

        .card-bottom{
            margin-top: 10px;
            border-radius: 0  0 30px 30px;
            width: 328px;
            height: 100px;
            background-color: var(--app-resume-bg-color);

            .card-bottom-text{
                margin-top: 5px;
                font-size: 12px;
                color: var(--app-item-sub);
            }
        }
    }
}

.wechat-qr-code{
    position: relative;
    overflow: hidden;

    .bottom-edit{
        text-align: center;
        color: var(--el-color-primary-light-9);
        background: rgba(180, 180, 180, 0.7);
        padding: 8px;
        display: none;
        cursor: pointer;
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
    }

    &:hover{
        .bottom-edit{
            display: block;
        }
    }
}
</style>