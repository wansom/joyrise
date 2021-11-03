<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
	<div class="sign-in">
		
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h1 class="mb-15">Sign In</h1>
		 <div class='ui container'>
        <video v-if="!imageData.image" ref="video" class="camera-stream" />
      
      </div>
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
							<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
			
						CONTINUE
						</a-button>
					</a-form-item>
					</div>
					<div v-else>
						<a-button type="primary" @click="cancelImage">
			
						{{buttonText}}
						</a-button>
					</div>
					
					
						
				</a-form>
				<!-- / Sign In Form -->

				<!-- <p class="font-semibold text-muted">Don't have an account? <router-link to="/sign-in" class="font-bold text-dark">Sign Up</router-link></p> -->
			</a-col>
			<!-- / Sign In Form Column -->

			<!-- Sign In Image Column -->
			<a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
				<img src="images/vote.png" alt="">
				
			</a-col>
			<!-- Sign In Image Column-->

		</a-row>
		
	</div>
</template>

<script>
	export default ({
 data() {
    return {
      gender: "",
      visible: false,
      boarding: false,
      transport: false,
       accountName: 'bygpvrgjnhgc',
      privateKey: '5K6FHys4VU3ZRwDCkvpmvDZp1QWTwrGAuUqSVyX5uSUb8D8Hspk',
      headers: {
        authorization: "authorization-text",
        				
      },
       mediaStream: null,
            imageData: {
                image: '',
                image_orientation: 0,
            },
			buttonText:"start Camera",
			visibleCam:false
    };
  },
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
		methods: {
			    captureImage() {
            const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
            const imageCapture = new window.ImageCapture(mediaStreamTrack)
            let reader = new FileReader();
            return imageCapture.takePhoto().then(blob => {
                reader.readAsDataURL(blob)
                reader.onload = () => {
                    this.imageData.image = reader.result;
                    console.log(reader.result)
                }
            })  
        },
        rotateImage() {
            this.imageData.image_orientation = this.imageData.image_orientation + 90; 
        },
cancelImage() {
            this.imageData.image = null;
            this.showCameraModal = true;
            navigator.mediaDevices.getUserMedia({video: true})
            .then(mediaStream => {
                    this.$refs.video.srcObject = mediaStream;
                    this.$refs.video.play()
                    this.mediaStream = mediaStream 
					this.visibleCam = true                  
            }) 
        },
			// Handles input validation after submission.
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if ( !err ) {
						console.log('Received values of form: ', values) ;
						this.$store.dispatch("login",{
							email:"admin@gmail.com",
							password:"Admin@123"
						})
					}
				});
			},

		},
	})

</script>

<style lang="scss">
	body {
		background-color: #ffffff;
	}
</style>