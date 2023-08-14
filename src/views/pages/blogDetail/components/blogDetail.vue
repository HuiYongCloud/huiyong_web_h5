<template>
  <div class="blog-page">
    
    <!-- 博客详情 -->
    <div class="blog-detail-page">
      <h1 class="blog-title">{{blogDetail.title}}</h1>
      <div class="like-blog-box" v-if="blogDetail.isFavorite != null">
        <favate-btn :text="!blogDetail || blogDetail.isFavorite == false ? '收藏文章':'取消收藏'" @click="favorite"/>
      </div>

      <div v-if="blogDetail && !blogDetail.blogCode && blogDetail.content">
        <div v-if="blogDetail.tagName" class="blog-info-box show-in-mobile">
          <svg-icon icon-class="blog-tag" style="margin-right:8px"/>
					<div class="item-status-num">{{blogDetail.tagName}}</div>     
        </div>
        <div class="blog-info-box">
          <div class="blog-info-flex">
            <svg-icon icon-class="blog-calendar" style="margin-right:8px"/>
					  <div class="item-status-num">{{blogDetail.createTime}}</div>  
          </div>

					<div class="item-status-dot"/>
					<div class="item-status-num">阅读 {{blogDetail.readNum || 0}}</div>    

          <div class="item-status-dot"/>
					<div class="item-status-num">收藏 {{blogDetail.likeNum || 0}}</div>    

          <div class="item-status-dot"/>
          <div class="item-status-num">{{wordNum}}字</div>    
          <div class="item-status-dot"/>
					<div class="item-status-num">大概{{readTime}}</div>    
        </div>
        <div ref="blogContent" class="blog-content markdown-body" v-html="mdRender"></div>
      </div>

      <!-- 101：私密，不能通过权限码观看 -->
      <div v-else-if="blogDetail && blogDetail.blogCode == 101">
        <empty tip="当前为博主私密文章"/>
      </div>
      
      <!-- 102：私密，可通过权限码观看 -->
      <div v-else-if="blogDetail && blogDetail.blogCode == 102" class="blog-pricode-box">
        <div class="blog-pricode-tip">当前为博主私密文章，若查看需输入正确的权限码！</div>
        <u-message-input mode="bottomLine" :font-size="40" :width="50" @finish="priCodeRes"/>
      </div>
    </div>

    <!-- 博客目录 -->
    <div class="blog-toc" :class="{'blog-toc-show': showToc}">
      <div class="blog-toc-title">
        <svg-icon icon-class="blog-toc" style="margin-left:8px"/>
        <div style="margin-left:10px">目录</div>
      </div>
      <div class="toc" id="toc"></div>
    </div>

    <el-image-viewer
      v-if="imagePreview" 
      :on-close="closePreview" 
      :url-list="[showImage]" />
  </div>
</template>

<script>
import Api from "@/utils/api.js";
import BlogUserInfo from './BlogUserInfo.vue';
import Empty from '/@/components/Empty.vue'
import FavateBtn from '/@/components/FavateBtn.vue'
import UMessageInput from '/@/components/UMessageInput.vue'
import tocbot from "tocbot";
// import ElImageViewer from "element-ui/packages/image/src/image-viewer";

export default {

  props: ["blogDetail", "blogId", "mdRender"],

  components:{
    BlogUserInfo,
    Empty,
    UMessageInput,
    FavateBtn,
    ElImageViewer
  },
  
  data(){
    return {
      // 字数
      wordNum: '',
      // 阅读时间
      readTime:'',

      // 私密权限码
      priCode: null,
      // 显示目录
      showToc: false,

      imagePreview: false,
      showImage:'',
    }
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initMarkdown();        
      }, 200);
    })
  },

  methods:{
    // 收藏、取消收藏
    favorite(){
      let url = (this.blogDetail && this.blogDetail.isFavorite == false) ? Api.BLOG_LIKE_ADD : Api.BLOG_LIKE_CANCEL
      this.$axios.post(url, { blogId: this.blogId, priCode : this.priCode})
      .then(_ =>{ 
        this.blogDetail.isFavorite = !this.blogDetail.isFavorite
        this.$message.success(this.blogDetail.isFavorite == false? "已取消收藏" : "收藏成功");
      })
      .catch(res =>{
        this.$message.warning(res.message);
      })
    },

    // 权限码查看详情
    priCodeRes(priCode){
      this.priCode = priCode
      this.getBlogDetail()
    },

    getBlogDetail(){
      // 重置状态
      this.mdRender = ""
      this.blogDetail = ''
      this.showToc = false;

      this.$axios.post(Api.BLOG_DETAIL, { blogId: this.blogId, priCode : this.priCode})
      .then(res =>{      
        this.blogDetail = res
        if(res.content){
          this.mdRender = md.render(res.content)
          this.initMarkdown();
        }
      })
      .catch(res =>{
        this.$message.warning(res.message);
      })
    },

    initMarkdown(){
      if(this.mdRender){
        // 滑动到顶部
        document.documentElement.scrollTop = 0   

        // 统计文章字数
        this.wordNum = this.deleteHTMLTag(this.mdRender).length
        // 计算阅读时间
        this.readTime = Math.round(this.wordNum / 400) + "分钟"

        this.initTocbot()
        this.initImageClick()
      }
    },

    /** 关闭图片预览 */
    closePreview(){
      this.imagePreview = false
    },

    // 添加图片预览功能
    initImageClick(){
      // 延时两秒，保证图片节点加载进来
      setTimeout(() => {
          let imgList = this.$refs.blogContent.getElementsByTagName("img");
          for (var i = 0; i < imgList.length; i++) {
            console.log(imgList[i].src)
            imgList[i].addEventListener("click", (e) => {
              this.showImage = e.target.currentSrc
              this.imagePreview = true
            });
          };
      }, 100);
    },

    deleteHTMLTag(content) {
      return content
        .replace(/<\/?[^>]*>/g, "")
        .replace(/[|]*\n/, "")
        .replace(/&npsp;/gi, "");
    },

    // 初始化目录
    initTocbot(){
      // 渲染需要时间，延时100
      setTimeout(() => {
        // 添加文章生成目录功能
        let nodes = this.$refs.blogContent.children;
        if (nodes.length) {
          for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            let reg = /^H[1-4]{1}$/;
            if (reg.exec(node.tagName)) {
              // 未显示目录，则显示目录
              if(!this.showToc){
                this.showToc = true;
              }
              node.id = i;
            }
          }
        }
   
        // 生成id后目录初始化
        tocbot.init({
          tocSelector: "#toc", //要把目录添加元素位置，支持选择器
          contentSelector: ".blog-content", //获取html的元素
          headingSelector: "h1, h2, h3", //要显示的id的目录
          scrollSmooth: true,
          headingsOffset: 80,
          scrollSmoothOffset: -15,
          onClick: (e) => {
            e.preventDefault();
          }
        });
      }, 100);
    },

    scrollTop(top){
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/index.less';

.blog-page{
  .flex();
  margin-bottom: 16px;

  // 博客详情 
  .blog-detail-page{
    background: white;
    width: 60vw;
    min-width: 500px;
    min-height: calc(100vh - 30px);

    .blog-pricode-box{
      .flex-center-center();
      flex: 1;
      height: 100%;
      flex-direction: column;

      .blog-pricode-tip{
        color: #b6b6b6;
        font-size: 14px;
        letter-spacing: 1px;
        margin-top: 30vh;
        margin-bottom: 50px;
      }
    }

    .blog-title{
      color: #000;
      font-size: 24px;
      font-weight: bold;
      padding: 12px 24px;
      letter-spacing: 1px;
    }

    .blog-info-box{
      color: #999aaa;
      padding: 0px 24px 12px;
			.flex-center-start();

      .blog-info-flex{
        .flex-center-start();
      }

			.item-status-num{
				color: #999aaa;
				font-size: 12px;
			}

			.item-status-dot{
				height: 3px;
				width: 3px;
				border-radius: 50%;
				background-color: #555666;
				margin: 0 8px;
			}
    }

    .blog-content {
      word-break: break-word;
      font-size: 14px;
      line-height: 2;
      padding: 12px 24px;
    }

    .like-blog-box{
      padding: 12px 24px;
      width: 150px;
    }
  }

  // 博客目录
  .blog-toc{
    width: 15vw;
    min-width: 200px;
    min-height: 300px;
    position: sticky;
    top: 10px;
    background:white;
    margin-left: 10px;
    padding:10px ;
    overflow: hidden;
    display: none;

    .blog-toc-title{
      .flex-center-start();
      font-size: 16px;
      color: #2c2c2c;
      margin-bottom: 10px;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }

  .blog-toc-show{
    display: block;
  }
}

@media screen and (max-width: 1023px) {
  .blog-page {
    margin: 0px;

    .blog-detail-page{
      width: 100%;
      min-width: 100vw;

      .blog-title{
        font-size: 22px;
        padding: 12px;
      }

      .blog-info-box{
        padding: 0px 12px 6px;
      }

      .blog-content {
        padding: 12px;
      }
    }

    .blog-toc{
      display: none;
    }
    
    .blog-toc-show{
      display: none;
    }
  }
}
</style>

<style lang="less">
@import 'github-markdown-css/github-markdown-light.css';
@import '@/assets/css/code-themes/preCode.less';
@import 'prismjs/themes/prism.css';

// h1标题 大小调整
.markdown-body h1 {
  font-size: 1.6em;
}

.markdown-body h1, 
.markdown-body h2, 
.markdown-body h3 {
  border-bottom: none;
}

.markdown-body p {
  white-space: pre-wrap;
}

// 目录样式
.toc{
  ol {
    padding-left: 0px !important;
  }

  .toc-list-item{
    line-height: 2;
    list-style: none;
  }
  .toc-link {
    display: block;
    border-left: 3px solid transparent;
    padding-left: 6px;
    color: #666261 !important;
    transition: all .01s;

    &:hover, &:active{
      background: #f6f6f6;
    }
  }

  .is-active-link{
    border-left: 3px solid #3386ff;
    background: #e6e6e6;
    color: #2c2c2c !important;
  }
}

@media screen and (max-width: 1023px) {
  pre.line-numbers .copy-btn{
    display: none;
  }

  pre.line-numbers b.name{
    display: none;
  }
}
</style>