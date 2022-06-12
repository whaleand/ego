<template>
  <div id="main">

  </div>
</template>

<script>
// 先导入，创建实例，然后create
// 为了方便外界操作，保存到data里，
import E from 'wangeditor'
export default {
  data() {
    return {
      editor: ''
    }
  },
  mounted() {
    this.editor = new E('#main')
    this.editor.config.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      // 'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      // 'backColor',
      'link',
      'list',
      'todo',
      //'justify',
      // 'quote',
      // 'emoticon',
      'image',
      'video'
      // 'table',
      // 'code',
      // 'splitLine',
      // 'undo',
      // 'redo',
    ]
    // 配置 onchange 回调函数
    this.editor.config.onchange = newHtml => {
      // console.log('change 之后最新的 html', newHtml)
      this.$emit('editorChange', newHtml)
    }
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500 // 修改为 500ms
    this.editor.config.focus = false
    this.editor.config.height = 100
    this.editor.create()
  }
}
</script>

<style>
</style>