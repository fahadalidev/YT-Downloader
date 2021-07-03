<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="padding" color="light">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.name }}</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container" style="display: flex;justify-content: center;">
        <div style="padding: 20px;background: white;border-radius: 10px;box-shadow: 0px 0px 10px 0px #00000026;">
          <ion-list>  
              <ion-title>Sign In</ion-title>
            <ion-item>  
              <ion-label>Email</ion-label>  
              <ion-input v-model="form.email" type="email"></ion-input>  
            </ion-item>  
                
            <ion-item>  
              <ion-label>Password</ion-label>  
              <ion-input v-model="form.password" type="password"></ion-input>  
            </ion-item>   
          </ion-list>  
                
          <div padding>  
            <ion-button v-on:click.prevent="login" color="primary" expand="block">Sign In</ion-button>  
          </div>  
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import axios from 'axios'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Folder',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput
  },
  setup(){
    return { 
      form:{email:'',password:''} 
    }
  },
  methods:{
    login: async function(){
      await axios.get(`http://localhost:8888/dolibarr/htdocs/api/index.php/login?login=${this.form.email}&password=${this.form.password}`).then(res=> {
        console.log(res.data)
      })
    }
  }
})
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>