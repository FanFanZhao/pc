<template>
  <div id="page-team">
    <div class="add-box" v-if="showAdd">
      <div class="content">
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
          <el-button
            size="small"
            @click="showAdd = false;addPms= {name:'',desc:'',qr_code:'上传二维码',wechat:'',logo:'上传图标'}"
          >取消</el-button>
          <el-button @click="add" size="small" type="primary">确认</el-button>
        </div>
      </div>
    </div>
    <div class="bg-part mine">
      <div class="title" style="color:#2b89e1;font-weight:600" v-if="mine.name">我的战队</div>
      <el-button v-else type="primary" size="mini" @click="showAdd = true">申请战队</el-button>
      <ul class="myteam flex" v-if="mine.name">
        <li class="tc">
          <div>战队名</div>
          <span>{{mine.name}}</span>
        </li>
        <li class="tc">
          <div>战队图标</div>
          <img :src="mine.logo" alt style="width:33px;height:33px;boder-radius:50%;">
        </li>
        <li class="tc">
          <div>创建时间</div>
          <span>{{mine.create_date}}</span>
        </li>
        <li class="tc">
          <div>战队口号</div>
          <span>{{mine.desc}}</span>
        </li>
        <li class="tc">
          <div>微信</div>
          <span>{{mine.wechat}}</span>
        </li>
        <li class="tc">
          <div>状态</div>
          <span>{{mine.status_name}}</span>
        </li>
        <li>
          <router-link :to="{path:'/teamDetail',query:{id:mine.id}}" class="flex mt20">
            <el-button size="mini" type="primary">详情</el-button>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="bot flex mt20">
      <div class="left-part">
        <div class="bg-part">
          <div class="title">今日收益排行榜</div>
          <div class="ul-head flex-bet" style="justify-content:space-between;padding: 10px 0">
            <span>战队名称</span>
            <span>收益</span>
          </div>
          <ul>
            <router-link
              :to="{path:'/teamDetail',query:{id:item.id}}"
              tag="li"
              class="flex-bet"
              v-for="(item,index) in todayTeams"
              :key="index"
            >
              <div class="flex">
                <span style="color:#fff;margin-right:5px;">{{index+1}}.</span>
                <img :src="item.logo" alt>
                <span>{{item.name}}</span>
              </div>
              <span>{{item.today_profit}}</span>
            </router-link>
          </ul>
        </div>
        <div class="bg-part mt20 right-part">
          <div class="title">昨日收益排行榜</div>
          <div class="ul-head flex-bet" style="justify-content:space-between;padding: 10px 0">
            <span>战队名称</span>
            <span>收益</span>
          </div>
          <ul>
            <router-link
              :to="{path:'/teamDetail',query:{id:item.id}}"
              tag="li"
              class="flex-bet"
              v-for="(item,index) in todayTeams"
              :key="index"
            >
              <div class="flex">
                <span style="color:#fff;margin-right:5px;">{{index+1}}.</span>
                <img :src="item.logo" alt>
                <span>{{item.name}}</span>
              </div>
              <span>{{item.history_profit}}</span>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="bg-part">
        <ul class="list">
          <router-link :to="{path:'/teamDetail',query:{id:item.id}}" tag="li" v-for="(item,index) in list" :key="index">
            <div class="tc">
              <img :src="item.logo" alt style="width:60px;height:60px">
            </div>
            <div class="desc flex">
              <div class="label">战队名称：</div>
              <span>{{item.name}}</span>
            </div>
            <div class="desc flex">
              <div class="label">战队口号：</div>
              <span>{{item.desc}}</span>
            </div>
            <div class="desc flex">
              <div class="label">战队人数：</div>
              <span>{{item.member_count}}</span>
            </div>
            <div class="flex">
              <div class="label">今日盈利：</div>
              <span>{{item.today_profit}}</span>
            </div>
            <div class="flex">
              <div class="label">昨日盈利：</div>
              <span>{{item.history_profit}}</span>
            </div>

            <!-- <div class="flex">
              <img :src="item.qr_code" alt style="width:80px;height:80px;border-radius:0">
              <div class>
                <div>微信： {{item.wechat}}</div>
                <router-link :to="{path:'/teamDetail',query:{id:item.id}}" class="flex">
                  <el-button size="mini" type="primary">详情</el-button>
                </router-link>
              </div>
            </div> -->
          </router-link>
        </ul>
        <div class="btns">
          <el-button size="mini" type="primary" @click="getList(listPage-0-1)" v-if="listPage>1">上一页</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="getList(listPage+0+1)"
            v-if="list.length"
          >下一页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      mine: { name: "" },
      list: [],
      todayTeams: [],
      hisTeams: [],
      showAdd: false,
      addPms: {
        name: "",
        desc: "",
        wechat: "",
        qr_code: "上传二维码",
        logo: "上传图标"
      },
      listPage: 1,
      fileList: []
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.getMine();
    this.getList(1);
    this.getTeams("today");
    this.getTeams("history");
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
    },
    getMine() {
      if (this.token) {
        this.$http({
          url: "/api/team/my_team",
          headers: { Authorization: this.token }
        }).then(res => {
          if (res.data.type == "ok") {
            var msg = res.data.message;
            if (msg) {
              if (msg.name) {
                this.mine = msg;
              }
            }
          }
        });
      }
    },
    getList(page) {
      if (this.token) {
        this.listPage = page;
        var i = layer.load();
        this.$http({
          url: "/api/team/list",
          params: { page: this.listPage },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            this.list = res.data.message.data;
            if (this.list.length == 0) {
              layer.msg("暂无更多");
            }
          }
        });
      }
    },
    getTeams(type) {
      if (this.token) {
        this.$http({
          url: "/api/team/top_list",
          params: {
            limit: 10,
            type: type
          },
          headers: { Authorization: this.token }
        }).then(res => {
          if (res.data.type == "ok") {
            var list =  res.data.message;
            if(list.length>10){
              list = list.slice(0,10);
            }
            if (type == "today") {
              this.todayTeams = list;
            } else {
              this.hisTeams = list;
            }
          }
        });
      }
    }
  }
};
</script>

<style lang='scss'>
#page-team {
  width: 1200px;
  margin: 20px auto;
  font-size: 14px;
  .flex-bet{
    display: flex;
    justify-content: space-between;
  }
  li{
    cursor: pointer;
  }
  > .add-box {
    line-height: 30px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    > .content {
      margin: 100px auto 0;
      border-radius: 4px;
      padding: 10px 30px;
      background: #fff;
      width: 440px;
      .flex {
        margin: 20px 0;
        justify-content: space-between;
        span {
          width: 140px;
        }
        .upload {
          position: relative;
          min-width: 100px;
          max-width: 236px;
          height: 30px;
          text-align: center;
          font-size: 12px;
          background: #ccc;
          border-radius: 4px;
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
        input {
          padding: 0 20px;
          border: 1px solid #eee;
          border-radius: 2px;
          line-height: 30px;
        }
      }
    }
    .el-button {
      width: 40%;
    }
  }
  .flex {
    flex-wrap: wrap;
  }
  > .mine {
    padding: 10px 30px;
    line-height: 30px;
    li {
      margin-right: 60px;
      > div {
        margin: 10px 0;
      }
    }
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
  }
  > .bot {
    justify-content: space-between;
    >.left-part{
      >div{
        width: 300px;
        padding: 10px 30px;
      }
    }
    >.right-part{
      width: 880px;
    }
    > div:nth-child(2n + 1) {
      
      
      .title {
        padding: 10px 0;
        font-size: 16px;
        font-weight: 600;
        color: #2b89e1;
      }
      ul {
        li {
          line-height: 30px;
          display: flex;
          align-items: center;
          height: 30px;
          // justify-content: space-between;
          .flex {
            align-items: center;
          }
        }
      }
    }
    > div:nth-child(2) {
      width: 880px;
      .list {
        display: flex;
        flex-wrap: wrap;

        li {
          padding: 10px 28px;
          width: 33.33%;
          border-bottom: 1px solid #192646;
          border-right: 1px solid #192646;
          font-size: 14px;
          > div {
            margin: 10px 0;
            align-items: center;
            > img {
              margin-right: 10px;
            }
            .label {
              width: 77px;
            }
            div:not(.label),
            span:not(.label) {
              color: #ddd;
            }
          }
          .el-button {
            margin-top: 20px;
            width: 100px;
          }
        }
        li:nth-child(3n) {
          border-right: none;
        }
      }
      > div {
        padding: 30px;
        text-align: center;
        .el-button {
          margin: 0 30px;
        }
      }
    }
  }
}
</style>
