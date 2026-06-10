<template>
  <div class="product-detail">
    <s-header :name="'商品详情'"></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item v-for="(item, index) in state.detail.goodsCarouselList" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{ state.detail.goodsName || '' }}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>¥{{ state.detail.sellingPrice || '' }}</span>
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li :class="{ active: state.activeTab === 0 }" @click="state.activeTab = 0">概述</li>
          <li :class="{ active: state.activeTab === 1 }" @click="state.activeTab = 1">参数</li>
          <li :class="{ active: state.activeTab === 2 }" @click="state.activeTab = 2">服务保障</li>
          <li :class="{ active: state.activeTab === 3 }" @click="state.activeTab = 3">常见问题</li>
        </ul>
        <!-- 核心内容注入点 -->
        <div class="product-content" v-html="renderContent"></div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" :badge="!cart.count ? '' : cart.count" @click="goTo()" text="购物车" />
      <van-action-bar-button type="warning" @click="handleAddCart" text="加入购物车" />
      <van-action-bar-button type="danger" @click="goToCart" text="立即购买" />
    </van-action-bar>
    <van-back-top target=".detail-content" />
  </div>
</template>

<script setup>
import { reactive, onMounted, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { getDetail } from '@/service/good'
import { addCart } from '@/service/cart'
import sHeader from '@/components/SimpleHeader.vue'
import { showSuccessToast } from 'vant'
import { prefix } from '@/common/js/utils'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const state = reactive({
  activeTab: 0,
  detail: {
    goodsCarouselList: []
  }
})

// 计算属性：渲染最终内容（带自动回退逻辑）
const renderContent = computed(() => {
  const tab = state.activeTab
  const name = state.detail.goodsName || ''
  
  if (tab === 0) {
    const content = state.detail.goodsDetailContent || ''
    // 如果原生内容为空或仅为加载中占位，加载高质量通用模版
    if (!content || !content.includes('<img') || content.includes('加载中')) {
      return defaultContent.value
    }
    return content
  } else if (tab === 1) {
    return `
      <div class="hw-product-detail-template">
        <h2 class="hw-section-title">详细参数矩阵</h2>
        <div class="hw-params-table">
          <div class="hw-p-row"><span>商品名称</span><span>${name}</span></div>
          <div class="hw-p-row"><span>商品编号</span><span>${state.detail.goodsId || '暂无'}</span></div>
          <div class="hw-p-row"><span>商品毛重</span><span>以实物为准</span></div>
          <div class="hw-p-row"><span>商品产地</span><span>中国大陆</span></div>
          <div class="hw-p-row"><span>包装清单</span><span>商品主体 × 1、说明书 × 1</span></div>
        </div>
      </div>
    `
  } else if (tab === 2) {
    return `
      <div class="hw-product-detail-template">
        <h2 class="hw-section-title">服务与保障</h2>
        <div class="hw-reasons-grid" style="grid-template-columns: 1fr;">
          <div class="hw-reason-card" style="text-align: left; padding: 20px 30px;">
            <h3 style="color:#1baeae; font-size:18px;">✅ 正品行货</h3>
            <p style="font-size:14px; margin-top:10px;">商城向您保证所售商品均为正品行货，开具机打发票或电子发票。</p>
          </div>
          <div class="hw-reason-card" style="text-align: left; padding: 20px 30px;">
            <h3 style="color:#1baeae; font-size:18px;">🚚 全国联保</h3>
            <p style="font-size:14px; margin-top:10px;">凭质保证书及商城发票，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证。</p>
          </div>
          <div class="hw-reason-card" style="text-align: left; padding: 20px 30px;">
            <h3 style="color:#1baeae; font-size:18px;">🔄 无忧退换</h3>
            <p style="font-size:14px; margin-top:10px;">客户购买商城商品7日内（含7日，自客户收到商品之日起计算），在保证商品完好的前提下，可无理由退货。</p>
          </div>
        </div>
      </div>
    `
  } else if (tab === 3) {
    return `
      <div class="hw-product-detail-template">
        <h2 class="hw-section-title">常见问题 FAQ</h2>
        <div class="hw-params-table">
          <div class="hw-p-row" style="flex-direction: column; gap: 10px;">
            <span style="color:#333; font-weight:bold;">Q：下单后什么时候发货？</span>
            <span style="color:#666; font-weight:normal;">A：一般情况下，我们会在您付款后的 24 小时内为您发货（大型活动期间除外）。</span>
          </div>
          <div class="hw-p-row" style="flex-direction: column; gap: 10px;">
            <span style="color:#333; font-weight:bold;">Q：支持哪些快递？</span>
            <span style="color:#666; font-weight:normal;">A：商城默认使用顺丰速运或京东物流，偏远地区将根据实际情况安排邮政 EMS 等合适的快递。</span>
          </div>
          <div class="hw-p-row" style="flex-direction: column; gap: 10px;">
            <span style="color:#333; font-weight:bold;">Q：如何申请退换货？</span>
            <span style="color:#666; font-weight:normal;">A：请在“我的订单”中找到对应订单，点击“申请售后”，填写相关信息即可。</span>
          </div>
        </div>
      </div>
    `
  }
})

// 计算属性：通用高级视觉模版（适用于所有商品）
const defaultContent = computed(() => {
  const name = state.detail.goodsName || ''
  return `
    <div class="hw-product-detail-template">
      <!-- 核心理由网格 -->
      <h2 class="hw-section-title">选择 ${name} 的 6 大理由</h2>
      <div class="hw-reasons-grid">
        <div class="hw-reason-card"><span class="icon">✨</span><h3>匠心工艺</h3><p>精雕细琢，每一个细节都经得起时间的推敲。</p></div>
        <div class="hw-reason-card"><span class="icon">🏆</span><h3>严选材质</h3><p>从源头把控品质，只为您提供最安心的选择。</p></div>
        <div class="hw-reason-card"><span class="icon">🎨</span><h3>出众颜值</h3><p>经典与现代的完美碰撞，彰显您的独特品味。</p></div>
        <div class="hw-reason-card"><span class="icon">🛡️</span><h3>坚韧耐用</h3><p>经过多重严苛测试，保证每一处细节经久耐用。</p></div>
        <div class="hw-reason-card"><span class="icon">❤️</span><h3>贴心设计</h3><p>以人为本的交互逻辑，带来前所未有的舒适体验。</p></div>
        <div class="hw-reason-card"><span class="icon">🌟</span><h3>口碑爆棚</h3><p>深受万千用户喜爱，好评如潮的明星爆款。</p></div>
      </div>

      <!-- 沉浸式黑色亮点 -->
      <div class="hw-tech-black-block">
        <h2>重新定义卓越品质</h2>
        <p>${name} 致力于将极致体验融入生活的方方面面。我们不仅关注产品的功能，更在意它能为您带来的情感价值。</p>
      </div>

      <!-- 美学文案区 -->
      <div class="hw-aesthetic-area">
        <h2>卓越于形 · 匠心于心</h2>
        <p class="hw-note">*图片仅供参考，实际产品由于光线、显示器等原因可能存在些许色差，请以实物为准。</p>
      </div>

      <!-- 底部服务保障横条 -->
      <div class="hw-service-footer">
        <div class="hw-s-item"><span>🛡️</span>正品保障</div>
        <div class="hw-s-item"><span>🚀</span>急速发货</div>
        <div class="hw-s-item"><span>📅</span>售后无忧</div>
      </div>
    </div>
  `
})

onMounted(async () => {
  const { id } = route.params
  const { data } = await getDetail(id)
  data.goodsCarouselList = data.goodsCarouselList.map(i => prefix(i))
  state.detail = data
  cart.updateCart()
})

nextTick(() => {
  const content = document.querySelector('.detail-content')
  if (content) content.scrollTop = 0
})

const goTo = () => {
  router.push({ path: '/cart' })
}

const handleAddCart = async () => {
  const { resultCode } = await addCart({ goodsCount: 1, goodsId: state.detail.goodsId })
  if (resultCode == 200 ) showSuccessToast('添加成功')
  cart.updateCart()
}

const goToCart = async () => {
  await addCart({ goodsCount: 1, goodsId: state.detail.goodsId })
  cart.updateCart()
  router.push({ path: '/cart' })
}
</script>

<style lang="less">
  @import '../common/style/mixin';
  .product-detail {
    .detail-content {
      height: calc(100vh - 100px);
      overflow: hidden;
      overflow-y: auto;
      padding-bottom: 50px;
      .detail-swipe-wrap {
        .my-swipe .van-swipe-item {
          img {
            width: 100%;
          }
        }
      }
      .product-info {
        padding: 0 15px;
        .product-title {
          font-size: 20px;
          text-align: left;
          color: #333;
          font-weight: 500;
          padding-top: 10px;
        }
        .product-desc {
          font-size: 14px;
          text-align: left;
          color: #999;
          padding: 5px 0;
        }
        .product-price {
          padding: 5px 0;
          span {
            color: #F63515;
            font-size: 24px;
            font-weight: bold;
          }
        }
      }
      .product-intro {
        width: 100%;
        margin-top: 20px;
        ul {
          display: flex;
          width: 100%;
          border-bottom: 1px solid #eee;
          li {
            flex: 1;
            padding: 15px 0;
            text-align: center;
            font-size: 15px;
            color: #666;
            &.active {
              color: #1baeae;
              font-weight: bold;
              border-bottom: 2px solid #1baeae;
            }
          }
        }
        .product-content {
          padding: 0; 
          
          /* 华为官网级视觉样式 */
          .hw-product-detail-template {
            color: #333;
            background: #fff;
            .hw-section-title {
              text-align: center;
              font-size: 22px;
              padding: 40px 15px 25px;
              font-weight: 600;
              letter-spacing: 1px;
            }
            .hw-reasons-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              padding: 0 20px 40px;
              .hw-reason-card {
                background: #fdfdfd;
                border: 1px solid #f2f2f2;
                padding: 20px 10px;
                border-radius: 16px;
                text-align: center;
                transition: transform 0.2s;
                .icon { font-size: 28px; margin-bottom: 10px; display: block; }
                h3 { font-size: 15px; margin-bottom: 6px; font-weight: bold; color: #111; }
                p { font-size: 11px; color: #999; line-height: 1.5; padding: 0 5px; }
              }
            }
            .hw-tech-black-block {
              background: #000;
              color: #fff;
              padding: 70px 25px;
              text-align: center;
              margin: 30px 0;
              h2 { font-size: 28px; margin-bottom: 15px; background: linear-gradient(to bottom, #fff, #999); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; }
              p { font-size: 14px; line-height: 1.8; color: #ccc; max-width: 90%; margin: 0 auto; }
            }
            .hw-params-table {
              margin: 0 20px 40px;
              border: 1px solid #eee;
              border-radius: 14px;
              overflow: hidden;
              .hw-p-row {
                display: flex;
                justify-content: space-between;
                padding: 18px 20px;
                border-bottom: 1px solid #f8f8f8;
                font-size: 14px;
                &:last-child { border-bottom: none; }
                span:first-child { color: #888; font-weight: normal; }
                span:last-child { font-weight: 600; color: #333; }
              }
            }
            .hw-aesthetic-area {
              text-align: center;
              padding: 60px 20px;
              h2 { font-style: italic; font-size: 30px; color: #111; margin-bottom: 10px; font-weight: 300; }
              .hw-note { font-size: 11px; color: #bbb; margin-top: 30px; letter-spacing: 0.5px; }
            }
            .hw-service-footer {
              display: flex;
              justify-content: space-around;
              padding: 30px 10px;
              background: #fafafa;
              border-top: 1px solid #eee;
              .hw-s-item { font-size: 13px; color: #444; font-weight: 500; span { margin-right: 5px; font-size: 18px; } }
            }
          }
          
          /* 防爆裂：通用富文本样式限制 */
          img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          p {
            line-height: 1.6;
            margin: 10px 0;
            color: #333;
            padding: 0 10px;
          }
        }
      }
    }
    .van-action-bar-button--warning {
      background: linear-gradient(to right,#6bd8d8, @primary)
    }
    .van-action-bar-button--danger {
      background: linear-gradient(to right, #0dc3c3, #098888)
    }
  }
</style>
