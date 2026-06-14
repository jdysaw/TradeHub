<template>
  <el-dialog
    :title="type == 'add' ? '添加商品' : '修改商品'"
    v-model="state.visible"
    width="450px"
  >
    <el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" label-width="100px" class="good-form">
      <el-form-item label="商品名称" prop="name">
        <el-input type="text" v-model="state.ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input type="text" v-model="state.ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="选择商品" prop="goodsId" v-if="type == 'add'">
        <el-select
          v-model="state.ruleForm.goodsId"
          placeholder="请选择商品"
          filterable
          style="width: 100%"
          @change="handleGoodsSelect"
          :loading="state.goodsLoading"
        >
          <el-option
            v-for="item in state.goodsList"
            :key="item.goodsId"
            :label="item.goodsName"
            :value="item.goodsId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品编号" prop="goodsId" v-if="type != 'add'">
        <el-input type="number" min="0" v-model="state.ruleForm.goodsId"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input type="number" v-model="state.ruleForm.sort"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'

const props = defineProps({
  type: String,
  configType: Number,
  reload: Function
})
const formRef = ref(null)
const state = reactive({
  visible: false,
  goodsLoading: false,
  goodsList: [],
  ruleForm: {
    name: '',
    link: '',
    goodsId: null,
    sort: ''
  },
  rules: {
    name: [
      { required: 'true', message: '名称不能为空', trigger: ['change'] }
    ],
    goodsId: [
      { required: 'true', message: '请选择商品', trigger: ['change'] }
    ],
    sort: [
      { required: 'true', message: '排序不能为空', trigger: ['change'] }
    ]
  },
  id: ''
})

// 加载商品列表
const loadGoodsList = () => {
  state.goodsLoading = true
  axios.get('/goods/list', {
    params: {
      pageNumber: 1,
      pageSize: 200,
      goodsSellStatus: 0
    }
  }).then(res => {
    state.goodsList = res.list || []
    state.goodsLoading = false
  }).catch(() => {
    state.goodsLoading = false
  })
}

// 选择商品后自动填充名称
const handleGoodsSelect = (goodsId) => {
  const goods = state.goodsList.find(g => g.goodsId === goodsId)
  if (goods && !state.ruleForm.name) {
    state.ruleForm.name = '热销商品 ' + goods.goodsName
  }
}

// 获取详情
const getDetail = (id) => {
  axios.get(`/indexConfigs/${id}`).then(res => {
    state.ruleForm = {
      name: res.configName,
      goodsId: res.goodsId,
      link: res.redirectUrl,
      sort: res.configRank
    }
  })
}
// 开启弹窗
const open = (id) => {
  state.visible = true
  if (id) {
    state.id = id
    getDetail(id)
  } else {
    state.ruleForm = {
      name: '',
      goodsId: null,
      link: '',
      sort: ''
    }
    // 添加模式时加载商品列表
    loadGoodsList()
  }
}
// 关闭弹窗
const close = () => {
  state.visible = false
  state.goodsList = []
}
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (props.type == 'add') {
        axios.post('/indexConfigs', {
          configType: props.configType || 3,
          configName: state.ruleForm.name,
          redirectUrl: state.ruleForm.link,
          goodsId: state.ruleForm.goodsId,
          configRank: state.ruleForm.sort
        }).then(() => {
          ElMessage.success('添加成功')
          state.visible = false
          if (props.reload) props.reload()
        })
      } else {
        axios.put('/indexConfigs', {
          configId: state.id,
          configType: props.configType || 3,
          configName: state.ruleForm.name,
          redirectUrl: state.ruleForm.link,
          goodsId: state.ruleForm.goodsId,
          configRank: state.ruleForm.sort
        }).then(() => {
          ElMessage.success('修改成功')
          state.visible = false
          if (props.reload) props.reload()
        })
      }
    }
  })
}
defineExpose({ open, close })
</script>

<style scoped>
</style>
