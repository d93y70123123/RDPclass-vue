<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col justify="center" align="center">
      {{Use_status}}
      {{Host_status}}
      {{VM_status}}
      </v-col>
    </v-row>
    <v-row>
      <v-col justify="center" align="center">
        <v-btn v-if="isActive" color="pink" dark top @click="download">
          按此下載(推薦使用此方式)
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
      Host_status: '',
      VM_status: '',
      Use_status: '',
      seat: '',
      seatIP: '',
      usestatus: '',
    }),
    methods:{
      download(){
        let a = document.createElement('a');
        a.href = '/rdp.exe';
        a.download = '測試檔案.exe';
        a.click();
      },
      disconnect(){
        // let a = document.createElement('a');
        // a.href = '/rdp.exe';
        // a.download = '測試檔案.exe';
        // a.click();
        this.$router.push('/RDPclass/Open_machine');
      },
    },
    mounted: function(){
      this.seat=localStorage.getItem('seat');
      this.seatIP=localStorage.getItem('seatIP');
      this.usestatus=localStorage.getItem('usestatus');
      if(this.usestatus == 1){
        this.Use_status = '有使用過的紀錄';
      }else if(this.usestatus == 2){
        this.Use_status = '無使用過的紀錄，已幫你尋找新的電腦，請稍等';
      }else if(this.usestatus == 3){
        this.Use_status = '有使用過的紀錄，但目前該電腦有人使用，已幫你尋找新的電腦，請稍等';
      }
      if(true){
        this.isActive = true;
        this.Host_status = 'host';
        this.VM_status = 'vm';
      }
      if(this.Host_status){
        this.Host_status ='host open';
      }
      if(this.VM_status == 1){
        this.Host_status = 'vm open';
      }
    }
  }
</script>