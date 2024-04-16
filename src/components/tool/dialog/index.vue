<template>
  <transition name="loader">
    <div class="dialog-mask-layer" @click="$emit('update:show', false)" v-if="show">
      <div 
        class="dialog-content" 
        :style="{ width }"
        @click.stop
      >
        <div class="dialog-hide" @click="$emit('update:show', false)">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="dialog-header">{{ title }}</div>
        <div class="dialog-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DialogMaskLayer',
  data() {
    return {

    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '600px'
    },
    title: {
      type: String,
      default: '对话框'
    }
  },
  computed: {
    showModal: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('update:show', value)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.body.appendChild(this.$el)
    })
  },
  beforeDestroy() {
    if (document.body.contains(this.$el)) {
      document.body.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>