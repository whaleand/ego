<template>
  <el-dialog
    v-model="addDialogVisible"
    :title="title"
    width="70%"
    @closed="clear"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item
        label="商品名称"
        prop="good_name"
      >
        <el-input v-model="ruleForm.good_name" />
      </el-form-item>
      <el-form-item
        label="商品价格"
        prop="good_price"
      >
        <el-input v-model.number="ruleForm.good_price" />
      </el-form-item>
      <el-form-item
        label="商品数量"
        prop="good_num"
      >
        <el-input v-model.number="ruleForm.good_num" />
      </el-form-item>
      <el-form-item
        label="商品类目"
        prop="good_cate"
      >
        <el-input v-model="ruleForm.good_cate" />
      </el-form-item>
      <!-- 上传图片 -->
      <el-upload
        class="upload-demo"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-success="successUpload"
        :on-change="changeUpload"
        :file-list="fileList"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>
      <!-- <form
      >
        <h1>选择图片</h1>
        <input
          type="file"
          name="file"
          multiple
          ref="pic"
        >
        <input
          type="button"
          value="上传"
          @click="shangchuan"
        >
      </form> -->
      <el-form-item
        label="商品卖点"
        prop="good_sellPoint"
      >
        <el-input v-model="ruleForm.good_sellPoint" />
      </el-form-item>
      <el-form-item
        label="商品描述"
        prop="good_desc"
      >
        <Editor
          @editorChange="getEditor"
          ref="wEditor"
        ></Editor>
        <!-- <el-input v-model="ruleForm.good_desc" /> -->
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
        >{{btn}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import { reactive } from '@vue/reactivity'
import Editor from '@/components/Editor.vue'
export default {
  name: 'addGoods',
  props: {
    formData: {
      type: Object,
      default: {}
    }
  },
  components: {
    Editor
  },
  data() {
    return {
      // 0表示当前正在添加，1表示编辑
      flag: -1,
      title: '添加商品',
      btn: '',
      // 添加按钮
      addDialogVisible: false,
      // 表单数据
      ruleForm: {
        good_name: '',
        good_price: '',
        good_num: '',
        good_cate: '',
        good_img: '',
        good_sellPoint: '',
        good_desc: ''
      },
      // 校验规则
      rules: {
        good_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        good_cate: [{ required: true, message: '请输入商品类目', trigger: 'blur' }],
        good_sellPoint: [{ required: true, message: '请输入商品卖点', trigger: 'blur' }],
        good_desc: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
        good_num: [
          { required: true, message: '请输入商品数量！', trigger: 'blur' },
          { type: 'number', message: '数量必须为数字！', trigger: 'blur' }
        ],
        good_price: [
          { required: true, message: '请输入商品价格！', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字', trigger: 'blur' }
        ]
      },
      // 图片
      fileList: [],
      // 编辑的id
      editId: ''
    }
  },
  methods: {
    shangchuan(){
// const img=this.$refs.image
const reader=new FileReader();
reader.readAsDataURL(this.$refs.pic.files[0])
reader.onload=(e)=>{
  this.fileList.push(e.target.result)
}
    },
    //  添加商品的请求
    async addGoods(info, img) {
      function stringify(data) {
        const formData = new FormData()
        for (const key in data) {
          // eslint-disable-next-line no-prototype-builtins
          if (data.hasOwnProperty(key)) {
            if (data[key]) {
              if (data[key].constructor === Array) {
                if (data[key][0]) {
                  if (data[key][0].constructor === Object) {
                    formData.append(key, JSON.stringify(data[key]))
                  } else {
                    data[key].forEach((item, index) => {
                      formData.append(key + `[${index}]`, item)
                    })
                  }
                } else {
                  formData.append(key + '[]', '')
                }
              } else if (data[key].constructor === Object) {
                formData.append(key, JSON.stringify(data[key]))
              } else {
                formData.append(key, data[key])
              }
            } else {
              if (data[key] === 0) {
                formData.append(key, 0)
              } else {
                formData.append(key, '')
              }
            }
          }
        }
        return formData
      }
      // 整理信息
      const { data: res } = await axios({
        method: 'post',
        url: 'http://localhost:3020/api/addgoods',
        data: { info },
        transformRequest: [
          function (data) {
            return stringify(data)
          }
        ],
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if(res.status==0){
            this.$message({
              message: '成功添加商品！',
              type: 'success'
            })
      }
    },
    // 编辑商品的请求
    async editGoods(info, img) {
      function stringify(data) {
        const formData = new FormData()
        for (const key in data) {
          // eslint-disable-next-line no-prototype-builtins
          if (data.hasOwnProperty(key)) {
            if (data[key]) {
              if (data[key].constructor === Array) {
                if (data[key][0]) {
                  if (data[key][0].constructor === Object) {
                    formData.append(key, JSON.stringify(data[key]))
                  } else {
                    data[key].forEach((item, index) => {
                      formData.append(key + `[${index}]`, item)
                    })
                  }
                } else {
                  formData.append(key + '[]', '')
                }
              } else if (data[key].constructor === Object) {
                formData.append(key, JSON.stringify(data[key]))
              } else {
                formData.append(key, data[key])
              }
            } else {
              if (data[key] === 0) {
                formData.append(key, 0)
              } else {
                formData.append(key, '')
              }
            }
          }
        }
        return formData
      }
      const { data: res } = await axios({
        method: 'post',
        url: 'http://localhost:3020/api/editgoods',
        data: { ...info, id: this.editId },
        transformRequest: [
          function (data) {
            return stringify(data)
          }
        ],
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    changeUpload(file) {
      this.fileList[0] = file
    },
    // 点击提交
    submitForm() {
      let Info = {
        good_name: this.ruleForm.good_name,
        good_price: this.ruleForm.good_price,
        good_num: this.ruleForm.good_num,
        good_cate: this.ruleForm.good_cate,
        // good_img:img,
        good_sellPoint: this.ruleForm.good_sellPoint,
        good_descr: this.ruleForm.good_desc
      }
      if (this.flag == 0) {
        // 添加
        this.$refs.ruleFormRef.validate(valid => {
          if (valid) {
            // console.log('输入的信息', this.ruleForm)
            this.addGoods(Info, this.fileList[0])
            
            this.clear()
          } else {
            this.$message.error('添加商品失败！')
            return false
          }
        })
      }
      if (this.flag == 1) {
        // 编辑
        this.$refs.ruleFormRef.validate(valid => {
          if (valid) {
            // console.log('输入的信息', this.ruleForm)
            this.editGoods(Info, this.fileList[0])
            this.$message({
              message: '成功编辑商品！',
              type: 'success'
            })
            this.clear()
          } else {
            this.$message.error('编辑商品失败！')
            return false
          }
        })
      }
    },
    // 点击取消
    cancel() {
      this.clear()
    },
    // 关闭表单，清空表单
    clear() {
      this.addDialogVisible = false
      // 有bug害
      // this.$refs.ruleFormRef.resetFields()
      ;(this.ruleForm = {
        good_name: '',
        good_price: '',
        good_num: '',
        good_cate: '',
        good_img: '',
        good_sellPoint: '',
        good_desc: ''
      }),
        // 清空编辑器
        this.$refs.wEditor.editor.txt.clear()
    },
    // 转存编辑器的内容
    getEditor(newHtml) {
      this.ruleForm.good_desc = newHtml
    }
  }
}
</script>

<style>
</style>