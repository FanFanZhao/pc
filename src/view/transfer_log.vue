<template>
  <div class="account-main wrap bg-part">
    <div class="select">
      <el-select v-model="type" size="mini" @change="getList(1)">
        <el-option label="全部" value="-1"></el-option>
        <el-option label="挖矿收益" value="320"></el-option>
        <el-option label="战队个人加成" value="321"></el-option>
        <el-option label="队长收益" value="322"></el-option>
        <el-option label="推荐收益" value="323"></el-option>
      </el-select>
    </div>
    <ul class="white log_ul bg-part">
      <li class="flex ft14">
        <span class="flex1 tc">时间</span>
        <span class="flex1 tc">账户</span>
        <span class="flex1 tc">说明</span>
        <span class="flex1 tc">金额</span>
      </li>
      <div class="li_wrap scroll">
        <li class="flex ft12 around bg-hov" v-for="(item,index) in list" :key="index">
          <span class="flex1 tc">{{item.created_time}}</span>
          <span class="flex1 tc">{{item.account}}</span>
          <span class="flex1 tc">{{item.info}}</span>
          <span class="flex1 tc">{{item.value}}</span>
        </li>
      </div>
    </ul>
    <p class="tc more" @click="getList(page)">加载更多</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      more: "加载更多",
      page: 1,
      limit: 20,
      list: [],
      token: "",
      type: "-1"
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.getList(1);
  },
  mounted() {},
  methods: {
    getList(page) {
      if (this.token) {
        var i = layer.load();
        this.$http({
          url: "/api/account/list",
          method: "post",
          data: { limit: 20, page: page,type:this.type },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            var list = res.data.message.data;
            if (page > 1) {
              if (list.length) {
                this.list = this.list.concat(list);
              }
            } else {
              this.list = list;
            }
            this.page = list.length ? page + 1 : page;
          }
        });
      }
    }
  }
};
</script>
<style scoped lang='scss'>
.select {
  background: #181b2a;
  padding: 10px 20px;
  .el-select {
    background: #181b2a;
  }
}
.scroll::-webkit-scrollbar {
    width: 6px;
    background-color: #0a152d;
}
.scroll::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #0a152d;
}
.wrap {
  overflow: auto;
}
.li_wrap {
  max-height: 600px;
  overflow-y: auto;
}
.log_ul li {
  padding: 15px 0;
}
.log_ul > li:first-child {
  border-bottom: 1px solid #303b4b;
}
.log_ul > li:first-child:hover {
  background: #181b2a;
}
.log_ul li:hover {
  background: #61688a;
}
.more {
  color: #999;
  font-size: 12px;
  margin-top: 10px;
  cursor: pointer;
}
::-webkit-scrollbar {
  background-color: #181b2a;
}
</style>
