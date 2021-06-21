<template>
  <v-app id="RDPclass">
    <v-app-bar app dark color="teal accent-4" flat>
      <div class="headline white--text">
        IDserver
      </div>
      <v-tabs centered class="ml-n9">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-btn v-if="isActive" elevation="2" medium @click="logout">
        登出
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="">
            <v-sheet rounded="lg" min-height="268">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>身分資訊</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>使用者: {{Username}}</v-list-item-title>
                  <v-list-item-title>權限為: {{Auth}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-sheet>
          </v-col>
          
          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="">
            <v-sheet rounded="lg" min-height="268">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>目前登入人數：{{number}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>登入的人有:</v-list-item-title>
                  <v-list-item-title></v-list-item-title>
                  <v-list-item-title>{{Username}}({{Auth}})</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      isActive: 'true',
      Username: '',
      Auth:'',
      links: [],
      number: '',
    }),
    methods:{
      logout(){
        localStorage.clear();
        this.$router.push('/');
      }
    },
    mounted: function(){
      this.Username = localStorage.getItem('Username');
      this.Auth = localStorage.getItem('Gid');
      if( this.Auth == 1001){
        this.Auth = '學生';
        this.links= [
          '開啟機器',
          '修改資料',
          //'設定連線資訊',
        ];
      }else if( this.Auth == 1002){
        this.Auth = '老師';
        this.links= [
          '開啟機器',
          '修改資料',
        ];
      }else if( this.Auth == 1003){
        this.Auth = '管理員';
        this.links= [
          '開啟機器',
          '修改資料',
        ];
      }
      this.axios
        .get("http://120.114.140.44/config/checkconnect.php")
        .then(res=>{
          console.log(res.data);
          if( res.data ){
            this.number = res.data;
          }else{
            this.number = 'error';
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