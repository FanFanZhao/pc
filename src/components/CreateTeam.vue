<template>
  <div id="createteam">
    <div class="title bg-part">创建战队</div>
    <div class="add mt20 bg-part">
      <div class="flex">
        <span>战队名称：</span>
        <input v-model="addPms.name" type="text">
      </div>
      <div class="flex">
        <span>战队口号：</span>
        <input v-model="addPms.desc" type="text">
      </div>
      <div class="flex">
        <span>战队图标地址：</span>
        <div class="upload tc">
          {{addPms.logo}}
          <input
            type="file"
            id="file"
            accept="image/*"
            name="file"
            @change="uploadPic('logo',$event)"
          >
        </div>
      </div>
      <div class="flex">
        <span>微信：</span>
        <input v-model="addPms.wechat" type="text">
      </div>
      <div class="flex">
        <span>战队二维码地址：</span>

        <div class="upload tc">
          {{addPms.qr_code}}
          <input
            type="file"
            id="file"
            accept="image/*"
            name="file"
            @change="uploadPic('qr_code',$event)"
          >
        </div>
      </div>
      <div class="flex">
        <!-- <el-button
          
          @click="showAdd = false;addPms= {name:'',desc:'',qr_code:'上传二维码',wechat:'',logo:'上传图标'}"
        >取消</el-button> -->
        <el-button @click="add"  type="primary">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      addPms: {
        name: "",
        desc: "",
        wechat: "",
        qr_code: "上传二维码",
        logo: "上传图标"
      },
      fileList: []
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
  },
  methods: {
    uploadPic(which, e) {
      var f = new FormData();
      if (e.target.files[0]) {
        f.append("file", e.target.files[0]);
      } else {
        return;
      }
      var i = layer.load();
      $.ajax({
        url: "/api/upload",
        type: "post",
        data: f,
        processData: false,
        contentType: false,
        success: res => {
          layer.close(i);
          if (res.type == "ok") {
            this.addPms[which] = res.message;
          }
        }
      });
    },
    add() {
      if (
        this.addPms.name &&
        this.addPms.desc &&
        this.addPms.qr_code != "请上传二维码" &&
        this.addPms.logo != "请上传图标" &&
        this.addPms.wechat
      ) {
        var i = layer.load();
        this.$http({
          url: "/api/team/create",
          method: "post",
          data: this.addPms,
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          this.showAdd = false;
          layer.msg(res.data.message);
          this.showAdd = false;
          this.addPms = {
            name: "",
            desc: "",
            qr_code: "上传二维码",
            wechat: "",
            logo: "上传图标"
          };
          if (res.data.type == "ok") {
            this.getMine();
            this.getList(1);
            this.getTeams("today");
            this.getTeams("history");
          }
        });
      } else {
        layer.msg("请填写完整");
      }
    }
  }
};
</script>

<style lang='scss'>
#createteam {
  width: 1200px;
  margin: 20px auto;
  input,.upload{
    border: 1px solid #25334f;
    border-radius: 3px;
    color: #cdd6e4;
    background-color: #17223a;
    padding: 0 16px;
    width: 300px;
  }
  > .title {
    padding: 0 50px;
    line-height: 50px;
    font-weight: bold;
  }
  > .add {
    padding: 20px 50px;
    line-height: 40px;
    .flex {
      margin: 30px 0;
      span {
        width: 170px;
      }
      .upload {
        position: relative;
        min-width: 100px;
       
        text-align: center;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 999;
        }
      }
      .el-upload {
        width: 100px;
        .el-button {
          width: 100px;
        }
      }
      
    }
    .el-button{
      width: 170px;
      margin-right: 120px;
    }
  }
}
</style>
