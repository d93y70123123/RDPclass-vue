<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col justify="center" align="center">
      <!--這邊要顯示開機狀態-->
      {{Use_status}}
      </v-col>
    </v-row>
    <v-row>
      <v-col justify="center" align="center">
        <v-btn v-if="isActive" color="pink" dark top @click="download">
          按此下載
          <v-icon>
            mdi-download
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col justify="center" align="center">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>1. 點擊按鈕下載連線檔案</v-list-item-title>
            <v-list-item-title>2. 點擊兩下連線檔案</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row>
      <v-col justify="center" align="center">
        <v-btn color="pink" dark top @click="disconnect">
          關閉機器
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
      isActive: '',
      connect_info: '120.0.0.0:8989',
      Open_machine: '/RDPclass/Open_machine',
      Use_status: '',
      seat: '',
      seatIP: '',
      usestatus: '',
      Username: '',
      serip: '',
      arr: [],
      openstatus: '',
    }),
    methods:{
      download(){
        let link  = document.createElement('a');
        link.style.display = "none";
        link.href = this.serip + "/rdpclass/rdppkg/" + this.Username + ".exe";
        link.setAttribute("download", this.Username);
        link.download = this.Username + '.exe';
        link.click();

        this.Host_status = this.serip + "/rdpclass/rdppkg/" + this.Username + ".exe";
      },
      disconnect(){
        this.axios
          .get(this.serip + "/config/disconnect.php",{params:{ username: this.Username }})
          .then(res=>{
            this.$router.push('/RDPclass/Open_machine');
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
        this.$router.push('/RDPclass/Open_machine');
      },
      check_openstatus(){
        this.axios
          .get(this.serip + "/config/get_preopen.php",{params:{ username: this.Username }})
          .then(res=>{
            console.log(res.data);
            if(res.data[3] == 1){
              this.Use_status = '可以使用了';
              clearInterval(this.openstatus);
            }else if(res.data[3] == 2){
              this.Use_status = '目前主機正在開機中';
            }else if(res.data[3] == 3){
              this.Use_status = '目前虛擬機正在開機中';
            }else if(res.data[3] == 5){
              this.Use_status = '目前沒有機器可用';
            }else{
              console.log("null");
              clearInterval(this.openstatus);
            }
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
      },
    },
    mounted: function(){
      this.Username = localStorage.getItem('Username');
      this.seat=localStorage.getItem('seat');
      this.seatIP=localStorage.getItem('seatIP');
      this.usestatus=localStorage.getItem('usestatus');

      this.serip = window.location.protocol + "//" + window.location.host;
      this.arr = this.serip.split(":");
      this.serip = this.arr[0] + ":" + this.arr[1];

      this.openstatus=setInterval(this.check_openstatus, 5000);
    }
  }
</script>