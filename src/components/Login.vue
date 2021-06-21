<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="teal accent-4">
            <v-toolbar-title>IDServer 單一登入系統</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <validation-observer
              ref="observer"
              v-slot="{ invalid }"
            >
              <v-form @submit.prevent="login">
                <validation-provider
                  v-slot="{ errors }"
                  name="Username"
                  rules="required"
                >
                  <v-text-field
                    prepend-icon="mdi-login"
                    name="Username"
                    label="Username"
                    type="text"
                    v-model="Username"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </validation-provider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="invalid" color="teal accent-4" class="white--text" type="submit">登入</v-btn>
                </v-card-actions>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  setInteractionMode('eager')
  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      Username: '',
      password: '',
      res:'',
    }),
    methods:{
      login(){
        this.axios
          .get("http://120.114.140.44/config/idcheck.php", {params: { id: this.Username, pw: this.password  }})
          .then(res=>{
            console.log(res);
            if( res.data.[0] == true){
              localStorage.setItem('Username', res.data.[1])
              localStorage.setItem('Gid', res.data.[2])
              localStorage.setItem('Homedir', res.data.[3])
              localStorage.setItem('Displayname', res.data.[4])
              localStorage.setItem('Description', res.data.[5])
              // alert("登入成功");
              this.$router.push('/RDPclass/Open_machine');
            }else{
              alert(res.data);
            }
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
      }
    },
  }
</script>