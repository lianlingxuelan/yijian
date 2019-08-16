<template>
  <div id="m-tabs">
    <el-tabs
        v-model="tab_value"
        class="m-el-tabs"
        tab-position="left">
      <el-tab-pane
          :label="tab.title"
          v-for="(tab,index) in list"
          :key='`tab-${index}`'
          :name="tab.key">
        <p class="m-tabs-title">
          {{ tab.title }}
        </p>
        <div v-if="data[tab.key]">
          <div
              class="item-div"
              v-show="data[tab.key]"
              v-for="(item, index2) in tab.items"
              :key='`item-${index2}`'>
            <div
                v-if="item.type === 'input'">
              <p
                  class="prepend">
                {{ item.label }}
              </p>
              <el-input
                  placeholder="请输入内容"
                  type="text"
                  v-model="data[tab.key][item.key]">
              </el-input>
            </div>
            <div
                v-else-if="item.type === 'textarea'">
              <p
                  class="prepend">
                {{ item.label }}
              </p>
              <el-input
                  size="medium"
                  class="m-textarea-input"
                  placeholder="请输入内容"
                  type="textarea"
                  v-model="data[tab.key][item.key]">
              </el-input>
            </div>
            <div
                v-else-if="item.type === 'select'">
              <p
                  class="prepend">
                {{ item.label }}
              </p>
              <el-select
                  v-model="data[tab.key][item.key]"
                  placeholder="请选择">
                <el-option
                    v-for="(option, index3) in item.options"
                    :key="`option-${index3}`"
                    :label="option.label"
                    :value="option.value"
                    :disabled="option.disabled">
                </el-option>
              </el-select>
            </div>
            <div
                v-else-if="item.type === 'switch'">
              <p
                  class="prepend"
                  :style="{display: 'inline-block', margin: 'auto'}">
                {{ item.label }}
              </p>
              <el-switch
                  :style="{float: 'right', margin: 'auto'}"
                  active-text="开"
                  inactive-text="关"
                  v-model="data[tab.key][item.key]"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <el-button
              type="primary"
              size="medium"
              @click="handleSave(tab.key)"
              class="m-tabs-button">
            保存
          </el-button>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    tab_value: {
      type: String
    }
  },
  methods: {
    handleSave (key) {
      this.$emit('handaleSave', key)
    }
  }
}
</script>

<style lang="less" scoped>
  #m-tabs .m-tabs-button {
    margin-top: 40px;
    width: 150px;
    position: relative;
    top: 0;
    left: 100px;
  }
  #m-tabs /deep/ .el-tabs__nav-scroll {
    padding-top: 20px;
    font-size: 16px;
    width: 180px;
  }

  #m-tabs /deep/ .el-tabs__item {
    font-size: 16px;
  }

  .item-div {
    margin-bottom: 40px;
    width: 40%;
    min-width: 400px;
    padding-left: 30px;
  }

  .m-el-tabs {
    height: 100%;
  }

  .m-tabs-title {
    font-weight: normal;
    padding-left: 30px;
    font-size: 22px;
    margin-bottom: 35px;
  }
</style>
