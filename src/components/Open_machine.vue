<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col justify="center" align="center">
        請確認是否開啟遠端桌面連線的功能
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="isActive" justify="center" align="center">
        {{used}}
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="isActive" justify="center" align="center">
        {{pre_open}}
      </v-col>
    </v-row>
    <v-row>
      <v-col justify="center" align="center">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>開啟方式為：</v-list-item-title>
            <v-list-item-title>a. 使用滑鼠右鍵點擊左下載開始按鈕</v-list-item-title>
            <v-list-item-title>b. 點選設定</v-list-item-title>
            <v-list-item-title>c. 左邊導覽列點選[遠端桌面]</v-list-item-title>
            <v-list-item-title>d. 點擊開啟，即完成。</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row>
      <v-col justify="center" align="center">
        <v-btn
          color="pink"
          dark
          top
          @click="connect"
        >
          點擊開啟機器
          <v-icon>
            mdi-login
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      isActive: 'false',
      Username: '',
      Auth:'',
      link: '/RDPclass/Show',
      links: [],
      pre_open: '',
      serip: '',
      arr: [],
      used: '',
    }),
    methods:{
      connect(){
        this.axios
          .get(this.serip +"/config/getrdp.php",{params:{ username: this.Username }})
          .then(res=>{
            localStorage.setItem('seat', res.data.[0]);
            localStorage.setItem('seatIP', res.data.[1]);
            localStorage.setItem('usestatus', res.data.[2]);
            // console.log(res);
            this.$router.push('/RDPclass/Connect');
            // console.log(res);
            // if( res.data.[0] == true){
            // }else{
            // }
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
      }
    },
    mounted: function(){
      this.Username = localStorage.getItem('Username');
      this.serip = window.location.protocol + "//" + window.location.host;

      this.arr = this.serip.split(":");
      this.serip = this.arr[0] + ":" + this.arr[1];

      this.axios
      .get(this.serip + "/config/get_preopen.php",{params:{ username: this.Username }})
        .then(res=>{
          // console.log(res.data);
          if( res.data[0] == 1 ){
            this.pre_open = "目前有預備機 "+res.data+" 台";
            this.isActive = true;
          }else{
            this.pre_open = "目前沒有有預備機，需要等待較長時間";
          }
          if( res.data[1] && res.data[2]  ){
            this.used = "有使用過的紀錄，上次連線的電腦是：" + res.data[1] + "電腦的IP是：" + res.data[2];
            this.isActive = true;
          }else{
            console.log(res.data[1] + res.data[2]);
            this.used = "沒有使用過的紀錄";
          }
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    }
  }
</script>