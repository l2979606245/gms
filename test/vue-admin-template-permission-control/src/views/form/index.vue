<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="入库单号">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="入库仓库">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="1" value="shanghai" />
          <el-option label="2" value="beijing" />
          <el-option label="3" value="beijing" />
          <el-option label="4" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="入库时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="选择时间" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="入库负责人">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item> -->
      <el-form-item label="入库明细：">
        <el-input v-show="form.no" v-model="form.name" />
      </el-form-item>
      <!-- TODO:扫码 -->
      <el-form-item label="物资编号">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="所属类别">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="xxx" name="type" />
          <el-checkbox label="xxxx" name="type" />
          <el-checkbox label="xxxxxx" name="type" />
          <el-checkbox label="xxxxxxx" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="来源">
        <el-radio-group v-model="form.resource">
          <el-radio label="a" />
          <el-radio label="b" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">入库</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        no: false
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

