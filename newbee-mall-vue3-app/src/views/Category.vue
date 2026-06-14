<template>
  <div class="categray">
    <div>
      <header class="category-header wrap van-hairline--bottom">
        <i class="nbicon nbfanhui" @click="goHome"></i>
        <div class="header-search">
          <i class="nbicon nbSearch"></i>
          <router-link tag="span" class="search-title" to="./product-list?from=category">全场50元起步</router-link>
        </div>
        <i class="iconfont icon-More"></i>
      </header>
      <nav-bar></nav-bar>
      <div class="search-wrap" ref="searchWrap">
        <!-- 骨架屏：加载时显示 -->
        <template v-if="state.loading">
          <div class="nav-side-wrapper">
            <ul class="nav-side skeleton-nav">
              <li v-for="i in 10" :key="i" class="skeleton-menu-item">
                <van-skeleton :row="1" animate :row-width="'60%'" />
              </li>
            </ul>
          </div>
          <div class="search-content">
            <div class="skeleton-content">
              <van-skeleton :row="4" animate title />
              <van-skeleton :row="4" animate title style="margin-top: 20px;" />
            </div>
          </div>
        </template>
        <!-- 真实内容：加载完成后显示 -->
        <template v-else>
          <list-scroll :scroll-data="state.categoryData" class="nav-side-wrapper">
            <ul class="nav-side">
              <li
                v-for="item in state.categoryData"
                :key="item.categoryId"
                v-text="item.categoryName"
                :class="{'active' : state.currentIndex == item.categoryId}"
                @click="selectMenu(item.categoryId)"
              ></li>
            </ul>
          </list-scroll>
          <div class="search-content">
            <list-scroll :scroll-data="state.categoryData" >
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <template v-for="(category, index) in state.categoryData">
                    <div class="swiper-slide" v-if="state.currentIndex == category.categoryId" :key="index">
                      <!-- <img class="category-main-img" :src="category.mainImgUrl" v-if="category.mainImgUrl"/> -->
                      <div class="category-list" v-for="(products, index) in category.secondLevelCategoryVOS" :key="index">
                        <p class="catogory-title">{{products.categoryName}}</p>
                        <div class="product-item" v-for="(product, index) in products.thirdLevelCategoryVOS" :key="index" @click="selectProduct(product)">
                          <div class="product-img-box">
                            <img :src="getCategoryImg(product.categoryName)" alt="product" referrerpolicy="no-referrer" />
                          </div>
                          <p v-text="product.categoryName" class="product-title"></p>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </list-scroll>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import navBar from '@/components/NavBar.vue'
import listScroll from '@/components/ListScroll.vue'
import { getCategory } from "@/service/good"
import { getCategoryImg } from "@/common/js/categoryIcons"
const router = useRouter()
// composition API 获取 refs 的形式
const searchWrap = ref(null)
const state = reactive({
  categoryData: [],
  currentIndex: 15,
  loading: true
})



// 分类数据过滤：合并手机重复型号 + 清除垃圾条目 + 隐藏指定一级分类
const filterCategories = (categories) => {
  if (!categories) return categories

  // 需要从左侧菜单完全隐藏的一级分类关键词
  const hiddenLevel1Keywords = ['玩具']
  // 手机品牌合并规则
  const phoneRemoveList = ['p30', 'mate 20', 'iphone 11', 'mix', 'reno']
  // 垃圾/无意义条目黑名单（精确匹配）
  const junkNames = ['wer']

  // 过滤一级分类
  categories = categories.filter(level1 => {
    const name = level1.categoryName || ''
    return !hiddenLevel1Keywords.some(kw => name.includes(kw))
  })

  categories.forEach(level1 => {
    if (level1.secondLevelCategoryVOS) {
      level1.secondLevelCategoryVOS.forEach(level2 => {
        if (level2.thirdLevelCategoryVOS) {
          level2.thirdLevelCategoryVOS = level2.thirdLevelCategoryVOS.filter(item => {
            const nameLower = item.categoryName.toLowerCase().trim()

            // 过滤垃圾条目
            if (junkNames.includes(nameLower)) return false

            // 手机分类下过滤重复型号
            if (level2.categoryName.includes('手机')) {
              if (phoneRemoveList.some(r => nameLower.includes(r.toLowerCase()))) return false
            }

            return true
          })
        }
      })
    }
  })

  return categories
}

onMounted(async () => {
  let $screenHeight = document.documentElement.clientHeight
  searchWrap.value.style.height = $screenHeight - 100 + 'px'
  const { data } = await getCategory()
  state.categoryData = filterCategories(data)
  state.loading = false
})

const goHome = () => {
  router.push({ path: 'home' })
}

const selectMenu = (index) => {
  state.currentIndex = index
}

const selectProduct = (item) => {
  router.push({ path: '/product-list', query: { categoryId: item.categoryId } })
}
</script>
<style lang="less" scoped>
  @import '../common/style/mixin';
  .categray {
    .category-header {
      background: #fff;
      position: fixed;
      left: 0;
      top: 0;
      .fj();
      .wh(100%, 50px);
      line-height: 50px;
      padding: 0 15px;
      box-sizing: border-box;
      font-size: 15px;
      color: #656771;
      z-index: 10000;
      &.active {
        background: @primary;
      }
      .icon-left {
        font-size: 25px;
        font-weight: bold;
      }
      .header-search {
        display: flex;
        width: 80%;
        height: 20px;
        line-height: 20px;
        margin: 10px 0;
        padding: 5px 0;
        color: #232326;
        background: #F7F7F7;
        border-radius: 20px;
        .nbSearch {
          padding: 0 10px 0 20px;
          font-size: 17px;
        }
        .search-title {
          font-size: 12px;
          color: #666;
          line-height: 21px;
        }
      }
      .icon-More {
        font-size: 20px;
      }
    }
  }
  .search-wrap {
    .fj();
    width: 100%;
    margin-top: 50px;
    background: #F8F8F8;
    .nav-side-wrapper {
      width: 28%;
      height: 100%;
      overflow: hidden;
      .nav-side {
        width: 100%;
        .boxSizing();
        background: #F8F8F8;
        li {
          width: 100%;
          height: 56px;
          text-align: center;
          line-height: 56px;
          font-size: 14px;
          &.active {
            color: @primary;
            background: #fff;
          }
        }
        &.skeleton-nav {
          .skeleton-menu-item {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 12px;
            height: 56px;
            /deep/ .van-skeleton {
              width: 100%;
              padding: 0;
            }
          }
        }
      }
    }
    .search-content {
      width: 72%;
      height: 100%;
      padding: 0 10px;
      background: #fff;
      overflow-y: scroll;
      touch-action: pan-y;
      * {
          touch-action: pan-y;
        }
      .boxSizing();
      .skeleton-content {
        padding: 16px 0;
      }
      .swiper-container {
        width: 100%;
        .swiper-slide {
          width: 100%;
          .category-main-img {
            width: 100%;
          }
          .category-list {
            display: flex;
            flex-wrap: wrap;
            flex-shrink: 0;
            width: 100%;
            .catogory-title {
              width: 100%;
              font-size: 17px;
              font-weight: 500;
              padding: 20px 0;
            }
            .product-item {
              width: 33.3333%;
              margin-bottom: 10px;
              text-align: center;
              font-size: 15px;
              .product-img-box {
                .wh(44px, 44px);
                margin: 0 auto 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 1px 4px rgba(0,0,0,0.06);
                background: #ffffff;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain; /* 改为 contain，让 Logo 也能完美内显 */
                  padding: 2px; /* 增加轻微内边距放置内容贴边 */
                }
              }
              .product-title {
                font-size: 13px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
  .fade-out-enter-active, .fade-out-leave-active {
    // transition: opacity 0.5s;
  }

  .fade-out-enter, .fade-out-leave-to {
    // opacity: 0;
  }
</style>