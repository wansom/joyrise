<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
  <div class="sign-in">
    <a-row type="flex" :gutter="[24, 24]" justify="space-around" align="middle">
      <!-- Sign In Form Column -->
      <a-col
        :span="24"
        :md="12"
        :lg="{ span: 12, offset: 0 }"
        :xl="{ span: 6, offset: 2 }"
        class="col-form"
      >
        <h1 class="mb-15">Sign In</h1>
        <!-- Sign In Form -->
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
          :hideRequiredMark="true"
        >
          <!-- <a-form-item class="mb-10" label="code" :colon="false">
						<a-input 
						v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]" placeholder="Code" />
					</a-form-item> -->
          <!-- <a-form-item class="mb-5" label="role" :colon="false">
						<a-input
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your password!' }] },
						]" type="password" placeholder="Role" />
					</a-form-item> -->
          <div v-if="visibleCam">
                <div class='ui container'>
        <video v-if="!imageData.image" ref="video" class="camera-stream"  style="width:100%"/>
        <div class='ui divider'></div>
        <!-- <div class="icon-group">   
            <a-button @click="captureImage">Take Photo</a-button>
            <a-button @click="rotateImage">Rotate Photo</a-button>
            <a-button>Upload</a-button>
            <a-button @click="cancelImage">Cancel</a-button>
        </div> -->
      </div>
            
              <a-button
                type="primary"
                @click="login"
                >
                CONTINUE
              </a-button>

          </div>
          <div v-else>
            <a-input-search
              placeholder="input national ID"
              size="large"
              @search="onSearch"
              class="mb-10"
            >
              <a-button slot="enterButton">
                VERIFY
              </a-button>
            </a-input-search>
          </div>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">
          Don't have an account?
          <router-link to="/sign-up" class="font-bold text-dark"
            >REGISTER</router-link
          >
        </p>
      </a-col>
      <!-- / Sign In Form Column -->

      <!-- Sign In Image Column -->
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <img src="images/vote.png" alt="" />
      </a-col>
      <!-- Sign In Image Column-->
    </a-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from "../router";
export default {
  data() {
    return {
      gender: "",
      visible: false,
      boarding: false,
      transport: false,
      accountName: "bygpvrgjnhgc",
      privateKey: "5K6FHys4VU3ZRwDCkvpmvDZp1QWTwrGAuUqSVyX5uSUb8D8Hspk",
      headers: {
        authorization: "authorization-text",
      },
      mediaStream: null,
      imageData: {
        image: "",
        image_orientation: 0,
      },
      buttonText: "FACE VERIFICATION",
      visibleCam: false,
      user:{
        role:"",
        id:0,
        county:""
      },
    };
  },

  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
    this.$store.dispatch("getVoters");
  },
  computed: {
    ...mapState(["voters"]),
  },
  methods: {
    onSearch(value) {
      
      const result = this.voters.filter((voter) => voter.id === parseInt(value));

     if(result.length >=1){
       this.$message.success(`${result[0].username} verified successfully.`);
       this.visibleCam =! this.visibleCam;
       this.cancelImage()
       this.$store.dispatch("fetchUserProfile", result[0]);
       this.user = result[0]
       console.log(this.user)
       
     }else{
       this.$message.error(`No user found!`); 
     }
    },
    //proceed to respective dashboards
    login(){
      if(this.user.role ==="voter"){
        router.push("/vote")
      }
      else if(this.user.role ==="admin"){
         router.push("/dashboard")
      }
    },
    captureImage() {
       this.visibleCam =! this.visibleCam;
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);
      let reader = new FileReader();
      return imageCapture.takePhoto().then((blob) => {
        reader.readAsDataURL(blob);
        reader.onload = () => {
          this.imageData.image = reader.result;
          console.log(reader.result);
        };
      });
    },
    rotateImage() {
      this.imageData.image_orientation = this.imageData.image_orientation + 90;
    },
    cancelImage() {
      this.imageData.image = null;
      this.showCameraModal = true;
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          this.$refs.video.srcObject = mediaStream;
          this.$refs.video.play();
          this.mediaStream = mediaStream;
        });
    },
    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store.dispatch("login", {
            email: "admin@gmail.com",
            password: "Admin@123",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
