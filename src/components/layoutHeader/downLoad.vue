<template>
  <CDialog 
    :show.sync="showModal"
    :title="'下载资源'"
  >
    <div>资源内容</div>
  </CDialog>
</template>

<script>
export default {
  name: 'DownLoad',
  data() {
    return {

    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
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
  }
}
</script>