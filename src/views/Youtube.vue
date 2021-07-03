<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title :class="show_title">{{ $route.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.name }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div style="display: flex;">
        <ion-searchbar @keyup.enter="getData" mode="ios" v-model="form.searchText" show-cancel-button="focus"></ion-searchbar>
        <!-- <ion-button style="margin-top: 10px;" v-on:click.prevent="getData" color="light">Search</ion-button>   -->
      </div>
      <div v-if="loading" style="height: 50vh;display: flex;justify-content: center;align-items: center;">
        <ion-spinner name="crescent"></ion-spinner>
      </div>
      <div padding v-else>  
        <div padding style="background: rgb(0 0 0);display: flex;justify-content: center;align-items: center;filter: invert(1) hue-rotate(360deg);">
          <iframe v-if="videoUrl" :src="videoUrl"
            width="560" height="315" frameborder="0" allowfullscreen>
          </iframe>
        </div>
            <ion-list>
              <ion-item v-for="row in data.items" :key="row.id.videoId">
                <ion-thumbnail slot="start" style="width: 180px;height: 100px;" @click="playvideo(row.id.videoId)">
                  <ion-img :src="row.snippet.thumbnails.default.url"></ion-img>
                </ion-thumbnail>
                <ion-label>
                  <h2 @click="playvideo(row.id.videoId)">{{row.snippet.title}}</h2>
                  <p>{{row.snippet.description}}</p>
                  <p>{{row.snippet.channelTitle}}</p>
                  <ion-button v-on:click.prevent="pushDownload(row.id.videoId)" color="light">Download</ion-button>
                </ion-label>
              </ion-item>
            </ion-list>
          <div>
        </div>
      </div>
      <div style="display:none;">
        <iframe :src="downloadUrl" frameborder="0"></iframe>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSearchbar, 
 IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonSpinner } from '@ionic/vue';
import axios from 'axios'
// import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { defineComponent } from 'vue';
// const streamingMedia: any = StreamingMedia
export default defineComponent({
  name: 'Youtube',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    // IonInput,
    IonSearchbar,
    IonList, IonItem, IonThumbnail, IonImg, IonLabel,
    IonSpinner
  },
  setup(){
      return{
          data : [],
          form:{searchText:''},
          refresh: 0,
          downloadUrl:'',
          loading: false,
          videoUrl:''
      }
  },
  methods:{
      getData: async function(){
        this.$forceUpdate()
        this.loading = true
        this.videoUrl=''
          await axios.post('https://ytd.combinestudio.pk/youtube/get/',this.form).then(res => {
              this.$forceUpdate()
              this.data = JSON.parse(res.data.body)
              this.loading = false
          })
      },
      pushDownload: async function(vid: any){
        this.$forceUpdate()
        this.loading = true
        this.downloadUrl = `https://ytd.combinestudio.pk/download/${vid}`
        this.getData()
      },
      playvideo: function (url: any){
        this.loading = true
        this.$forceUpdate()
        this.videoUrl = `https://www.youtube.com/embed/${url}`
        this.$forceUpdate()
        this.loading = false
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