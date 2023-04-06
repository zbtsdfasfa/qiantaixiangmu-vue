<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow" >
        <h2 class="all" >全部商品分类</h2>
      <!-- 过渡动画 -->
      <transition name="sort">
        <div class="sort" v-show="show">
        <!-- 利用编程式导航和事件委派-->
        <div class="all-sort-list2" @click.prevent="goSearch">
          <div class="item" v-for="(c1,index) in categoryList.slice(0,16)" :key="c1.categoryId" :class="{cur:currentIndex == index}">
            <h3 @mouseenter="changeIndex(index)">
              <a href :data-categoryName='c1.categoryName' :data-category1Id='c1.categoryId'>{{c1.categoryName}}</a>
            </h3>
            <!-- 二级 三级分类 -->
            <div class="item-list clearfix" :style="{display:currentIndex == index ? 'block' : 'none'}">
              <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a href :data-categoryName='c2.categoryName' :data-category2Id='c2.categoryId'>{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a href :data-categoryName='c3.categoryName' :data-category3Id='c3.categoryId'>{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
      </div>
       <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 按需引入节流函数
import _ from 'lodash'
export default {
  name: "TypeNav",
  data(){
    return{
      // 存储用户鼠标移动上哪一个一级分类
      currentIndex:-1,
      show:true
    }
  },
  methods:{
// 鼠标进入事件修改currentIndex的值
    // 对鼠标进入事件进行节流处理
    changeIndex:_.throttle(function(index){
      this.currentIndex = index
    },50),
    // 鼠标离开事件 鼠标离开让currentIdex等于 -1从而使背景颜色消失
    leaveIndex(){
      this.currentIndex = -1
      // 鼠标离开将商品列表隐藏
      if(this.$route.path != '/home'){
        this.show = false
      }
    },
    goSearch(event){
      // 这里遇到两个问题 1，如何确定点击的式a标签还是其他的标签，2：如何确定点击的是一级标题还是二级标题还是三级标题
      // 解决问题1 把子节点当中的a标签我加上一个自定义属性data——categoryName，其余的子节点没有
      let element = event.target
      // 节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
      let {categoryname,category1id,category2id,category3id} = element.dataset
      // 如果标签身上拥有categoryname一定是a标签
      if(categoryname){
        // 整理路由跳转的参数
        let location = {name:'search'};
        let query = {categoryName:categoryname};
        // 如何区分以及标签还是二级标签
        if(category1id){
          query.category1Id = category1id;
        }else if(category2id){
          query.category2Id = category2id;
        }else{
          query.category3Id = category3id;
        }
      //  如果路由跳转的时候带有params参数就传代过去
      if(this.$route.params){
        location.params = this.params
         // 整理完参数
        location.query = query;
        // 路由跳转
        this.$router.push(location)
      }
      }
    },
    // 鼠标进入typenav显示show为ture
    enterShow(){
      if(this.$route.path !='/home'){
        this.show = true
      }
    }
  },
  mounted(){
    // 如果不是home路由组件就对typenav进行隐藏
    if(this.$route.path != '/home'){
      this.show = false
    }
  },
computed:{
  categoryList(){
   return this.$store.state.home.categoryList
  }
}
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
            &.cur {
              background: skyblue;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>