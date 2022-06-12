<template>
  <div class="container">
    <div class="left">
      <!-- infocard -->
      <div
        class="infocard"
        v-if="info"
      >
        <div class="avater">
          <img
            v-if="info.avater"
            :src="info.avater"
            alt=""
          >
          <img
            v-else
            src="@/assets/no-avater.png"
            alt=""
          >
        </div>
        <div class="xinxi">
          <div class="name">
            {{info.username}}
          </div>
          <div class="or">
            身份：{{info.user_desc}}<br>
            性别：{{info.gender}}<br>
            生日：{{info.birthday}}
          </div>
        </div>
      </div>
      <!-- 合同 -->
      <el-button
        type="text"
        @click="open"
      >查看合同</el-button>
      <Hetong ref="hetong"></Hetong>

      <!-- 设置用户信息 -->
      <h5>
        更改用户信息
      </h5>
      <el-form
        :model="userInfo"
        ref="userInfo"
        :rules="rules"
        class="info"
        label-width="120px"
      >
        <el-form-item
          label="用户名："
          prop="name"
        >
          <el-input
            v-model="userInfo.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="旧密码："
          prop="oldPassword"
        >
          <el-input
            type="password"
            autocomplete="off"
            v-model="userInfo.oldPassword"
          />
        </el-form-item>
        <el-form-item
          label="新密码："
          prop="newPassword"
        >
          <el-input
            type="password"
            autocomplete="off"
            v-model="userInfo.newPassword"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >提交修改</el-button>
          <!-- 修改头像 -->
          <el-button
            type="primary"
            @click="avaterChange = true"
          >修改头像</el-button>
          <el-button @click="resetForm('userInfo')">重置</el-button>

        </el-form-item>
      </el-form>
      <!-- 修改头像弹框 -->
      <el-dialog
        title="修改头像"
        v-model="avaterChange"
      >
        <!-- 实现上传文件的功能 -->
        <form
          action="upload"
          method="post"
          enctype="multipart/form-data"
        >
          <input
            ref="avater"
            type="file"
            name="file"
            multiple
            accept="image/png,image/jpeg"
            @change="submit"
          >
        </form>

        <div class="cropper-content">
          <vueCropper
            :img="option.img"
            ref="cropper"
            outputSize="1"
            outputType="png"
            autoCrop
            autoCropWidth="200px"
            autoCropHeight="150px"
            fixed=true
            centerBox="true"
          ></vueCropper>
        </div>
        <!-- 预览的地方 -->
        <div
          class="yulan"
          v-if="zhanshi"
        >
          <img
            :src="img_data"
            alt=""
          >
        </div>
        <el-button
          type="primary"
          @click="finish"
          style="margin:20px"
        >预览</el-button>

        <el-button
          type="primary"
          style="margin:20px"
          @click="upload"
        >提交</el-button>
        <el-button @click="avaterChange = false">取 消</el-button>
      </el-dialog>
    </div>
    <div
      class="right"
      v-if="$store.state.manager"
    >
      <memInfo :memberInformation="info.memberInformation"></memInfo>

    </div>
  </div>
</template>

<script>
import Hetong from './Hetong.vue'
import memInfo from '@/components/memInfo.vue'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'

export default {
  name: 'homepage',
  components: {
    Hetong,
    VueCropper,
    memInfo
  },
  data() {
    return {
      info: {},
      userInfo: {
        name: '',
        newPassword: '',
        oldPassword: ''
      },
      option: {
        img: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, max: 10, message: '账号长度为3-10位！', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 3, max: 10, message: '密码长度为3-10位！', trigger: 'blur' }
        ],
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }]
      },
      img_data: '',
      zhanshi: false,
      previews: {},
      previewStyle1: {},
      previewStyle2: {},
      previewStyle3: {},
      previewStyle4: {},
      avaterChange: false
    }
  },
  methods: {
    // 获取用户信息
    async getUserinfo() {
      const { data: res } = await this.$http.get('/api/userinfo')
      if (res.status == 0) {
        this.info = res.userinfo
        // console.log(this.info.memberInformation)
        if(this.info.memberInformation){
         this.$store.commit('isManager')
        }
        return
      }
      return this.$router.push('/login')
    },
    // 打开合同弹框
    open() {
      this.$refs.hetong.dialogVisible = true
    },
    // 选择图片
    submit() {
      const inp = this.$refs.avater
      const reader = new FileReader()
      reader.readAsDataURL(inp.files[0])
      reader.onload = e => {
        this.option.img = e.target.result
      }
    },
    // 裁剪完成，进行预览
    finish() {
      this.$refs.cropper.getCropData(data => {
        // do something
        this.zhanshi = true
        this.img_data = data
      })
    },
    // 上传头像
    upload() {
      this.$refs.cropper.getCropBlob(data => {
        let file = new window.File([data], this.info.username + '-avater.jpeg', { type: 'image/jpeg' })
        let formData = new FormData()
        formData.append('avater', file)
        // console.log(formData)
        this.$http({
          method: 'post',
          url: '/api/upload',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          if (res.data.status == 0) {
            this.$message({
              message: '成功更改头像！',
              type: 'success'
            })
            this.avaterChange=false
            this.$router.go(0)
          } else {
            this.$message.error('更改头像失败！')
          }
        })
      })
    },
    // 清空表单
    resetForm() {
      this.userInfo = {}
    },
    onSubmit() {}
  },
  created() {
    this.getUserinfo()
  }
}
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  padding: 20px;
  min-width: 1024px;
  display: flex;
  .left {
    flex: 3;
    .infocard {
      display: flex;
      width: 300px;
      height: 100px;
      .avater {
        flex: 1;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .xinxi {
        flex: 2;
        padding: 10px;
        .name {
          font-size: 25px;
          font-weight: bold;
        }
        .or {
          color: gray;
          margin-top: 15px;
        }
      }
    }
    h5{
      margin: 10px 40px;
      font-weight: bold;
    }
    .info {
      margin-top: 20px;
      width: 400px;
    }
    .cropper-content {
      width: 300px;
      height: 200px;
    }
    .yulan {
      position: absolute;
      top: 150px;
      left: 350px;
      width: 100px;
      height: 100px;
      border-radius: 50%;

      box-shadow: 0 0 10px gray;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .right {
    flex: 4;
  }
}
</style>