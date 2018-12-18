<template>
  <div class="team-detail bg-main">
    <div class="bg-part mt20 title" style="color:#2b89e1 !important">队长信息</div>
    <ul class="bg-part">
      <li class="tc flex">
        <div>
          <div>手机</div>
          <div>{{captain.phone}}</div>
        </div>
        <div>
          <div>邮箱</div>
          <div>{{captain.email}}</div>
        </div>
        <div>
          <div>地区</div>
          <div>{{captain.city_name}}{{captain.district_name}}</div>
        </div>
        <div>
          <div>邀请码</div>
          <div>{{captain.extension_code}}</div>
        </div>
      </li>
    </ul>
    <div class="bg-part mt20 title" style="color:#2b89e1 !important">战队信息</div>
    <div class="bg-part info flex">
      <div>
        <div>战队名称</div>
        <span>{{team.name}}</span>
      </div>
      <div>
        <div>战队图标</div>
        <img :src="team.logo" alt style="width:30px;height:30px;border-radius:50%">
      </div>
      <div>
        <div>创建时间</div>
        <span>{{team.create_time}}</span>
      </div>
      <div>
        <div>战队口号</div>
        <span>{{team.desc}}</span>
      </div>
      <div>
        <div>微信</div>
        <span>{{team.wechat}}</span>
      </div>
      <div>
        <div>状态</div>
        <span>{{team.status_name}}</span>
      </div>
      <div>
        <img :src="team.qr_code" alt="" style="width:80px;height:80px">
      </div>
      <div class="btns">
        <el-button size="mini" type="danger" @click="dismiss" v-if="team.is_mine == 1&&team.status_name != '解散中'">解散战队</el-button>
        <el-button size="mini" type="success" @click="join" v-if="team.is_mine == 0">加入战队</el-button>
      </div>
    </div>
    <div class="bg-part mt20 title" style="color:#2b89e1 !important">战队成员</div>
    <div class="bg-part members">
      <div class="flex">
        <span v-for="(item,index) in members" :key="index">{{item.account}}</span>
      </div>
      <div v-if="members.length" class="tc" @click="getMembers(true)">加载更多</div>
      <div v-else class="tc">暂无队员</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      my: "no",
      page: 1,
      token: "",
      team: {},
      captain: {},
      members: [],
      membersPage: 1
    };
  },
  created() {
    this.id = this.$route.query.id || "";
    this.token = window.localStorage.getItem("token") || "";
    this.getInfo();
    this.getMembers();
  },
  methods: {
    getInfo() {
      this.$http({
        url: "/api/team/info",
        params: { id: this.id, page: this.page },
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          this.captain = res.data.message.captain;
          this.team = Object.assign({}, res.data.message);
          // this.team.avatar = res.data.message.captain.head_portrait;
        }
      });
    },
    getMembers(more) {
      var i = layer.load();
      this.$http({
        url: "/api/team/member_list",
        params: { id: this.id, page: this.membersPage, limit: 20 },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          var list = res.data.message.data;
          if (more) {
            if (list.length) {
              this.members = this.members.concat(list);
            } else {
              layer.msg("暂无更多");
            }
          } else {
            this.members = list;
          }
          if (list.length) {
            this.membersPage += 1;
          }
        }
      });
    },
    join() {
      var i = layer.load();
      this.$http({
        url: "/api/team/join",
        method: "post",
        data: { id: this.id },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
      });
    },
    dismiss() {
      var i = layer.load();
      this.$http({
        url: "/api/team/dismiss",
        params: { id: this.id },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
        if(res.data.type == 'ok'){
          this.getInfo();
        }
      });
    },
    leave() {
      var i = layer.load();
      this.$http({
        url: "/api/team/leave",
        params: { id: this.id },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
      });
    }
    
  }
};
</script>

<style lang='scss'>
.team-detail {
  width: 1200px;
  margin: 0 auto;
  .title {
    color: rgb(43, 137, 225) !important;
    font-weight: 600;
  }
  > ul {
    padding: 10px 30px;
    li {
      align-items: center;
      > div {
        margin-right: 50px;
        div {
          margin: 10px 0;
        }
        > div:last-child {
          color: #c2ddf9;
        }
      }
    }
  }
  > .bg-part {
    padding: 10px 30px;
  }
  .members {
    .flex {
      flex-wrap: wrap;
    }
    span {
      width: 100px;
      line-height: 30px;
      margin: 10px 60px 10px 0;
    }
    .tc {
      padding: 30px;
      cursor: pointer;
    }
  }
  > .info {
    > div {
      margin-right: 63px;
      > div {
        margin: 10px 0;
      }
      >span{
        color: #c2ddf9;
      }
    }
  }
}
</style>
