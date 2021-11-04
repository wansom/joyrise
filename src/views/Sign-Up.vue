<!-- 
	This is the sign up page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
	<div>

		<!-- Sign Up Image And Headings -->
		<div class="sign-up-header" style="background-image: url('images/bg-signup.jpg')">
			<div class="content">
				<h1 class="mb-5"> VOTER REGISTER</h1>
			</div>
		</div>
		<!-- / Sign Up Image And Headings -->
		
		<!-- Sign Up Form -->
		<a-card :bordered="false" class="card-signup header-solid h-full" :bodyStyle="{paddingTop: 0}">
			<template #title>
				<h5 class="font-semibold text-center">ENTER YOUR DETAILS</h5>
			</template>
			<!-- <div class="sign-up-gateways">
    			<a-button>
					<img src="images/logos/logos-facebook.svg" alt="">
				</a-button>
    			<a-button>
					<img src="images/logos/logo-apple.svg" alt="">
				</a-button>
    			<a-button>
					<img src="images/logos/Google__G__Logo.svg.png" alt="">
				</a-button>
			</div> -->
			<!-- <p class="text-center my-25 font-semibold text-muted">Or</p> -->
			<a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="handleSubmit"
			>
          <a-form-item class="mb-10" label=" First Name">
            <a-input
              v-decorator="[
                'first_name',
                {
                  rules: [
                    { required: true, message: 'Please input first name!' },
                  ],
                },
              ]"
              placeholder=" Timothy"
            >
            </a-input>
          </a-form-item>
           <a-form-item class="mb-10" label=" Last Name">
            <a-input
              v-decorator="[
                'last_name',
                {
                  rules: [
                    { required: true, message: 'Please input last name!' },
                  ],
                },
              ]"
              placeholder="Nasibi"
            >
            </a-input>
          </a-form-item>
                <a-form-item class="mb-10" label=" National ID">
            <a-input
              v-decorator="[
                'id',
                {
                  rules: [
                    { required: true, message: 'Please input National ID!' },
                  ],
                },
              ]"
              placeholder=" 35276748"
            >
            </a-input>
          </a-form-item>
         
 
          <a-form-item class="mb-10" label="Birth Date">
            <a-input
              v-decorator="[
                'dob',
                {
                  rules: [{ required: true, message: 'please pick a date' }],
                },
              ]"
              placeholder="Birth Date"
              type="date"
            >
            </a-input>
          </a-form-item>
          <!-- <a-form-item class="mb-10" label="Admission Date">
            <a-input
              v-decorator="[
                'admission_date',
                {
                  rules: [{ required: true, message: 'please pick a date' }],
                },
              ]"
              placeholder="Birth Date"
              type="date"
            >
            </a-input>
          </a-form-item> -->
          <!-- <a-form-item class="mb-10" label="Reporting Date">
            <a-input
              v-decorator="[
                'reporting_date',
                {
                  rules: [{ required: true, message: 'please pick a date' }],
                },
              ]"
              placeholder="Birth Date"
              type="date"
            >
            </a-input>
          </a-form-item> -->
          <!-- <a-form-item label="Gender">
            <a-select
              v-decorator="[
                'gender',
                {
                  rules: [
                    { required: true, message: 'Please select your gender!' },
                  ],
                },
              ]"
              placeholder="Select gender"
            >
              <a-select-option value="male">
                male
              </a-select-option>
              <a-select-option value="female">
                female
              </a-select-option>
            </a-select>
          </a-form-item> -->
          <a-form-item label="County">
            <a-select
              v-decorator="[
                'county',
                { rules: [{ required: true, message: 'No county selected!' }] },
              ]"
              placeholder="Select county"
            >
            <a-select-option value="kisumu">
        Kisumu
      </a-select-option>
      <a-select-option value="homabay">
        Homa Bay
      </a-select-option>
       <a-select-option value="nakuru">
        Nakuru
      </a-select-option>
            </a-select>
          </a-form-item>
          <!-- <a-form-item class="mb-10" label="Boarding School">
            <a-switch default-checked @change="addBoarding" />
          </a-form-item>
          <a-form-item class="mb-10" label="School Transport">
            <a-switch default-checked @change="addTransport" />
          </a-form-item> -->
          <a-form-item class="mb-10" label="Constituency">
            <a-input
              v-decorator="[
                'constituency',
                {
                  rules: [{ required: false }],
                },
              ]"
              placeholder="Kisumu"
            >
            </a-input>
          </a-form-item>
             <a-form-item class="mb-10" label="Ward">
            <a-input
              v-decorator="[
                'ward',
                {
                  rules: [{ required: false }],
                },
              ]"
              placeholder="Kisumu west"
            >
            </a-input>
          </a-form-item>
		   <a-form-item class="mb-10" label="Photo">
			<div class='ui container' >
        <video v-if="!imageData.image" ref="video" class="camera-stream" style="width:90%;"/>
        <div class='ui divider'></div>
	
        <div class="icon-group">   
            <a-button @click="captureImage">Take Photo</a-button>
           	<a-upload
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :headers="headers"
        @change="handleChange"
      >
        <a-button> <a-icon type="upload" /> Click to upload ID</a-button>
      </a-upload>
            <a-button @click="cancelImage">Cancel</a-button>
        </div>
      </div>
		   </a-form-item>

            <a-form-item>
            <a-button
              type="primary"
              block
               html-type="submit"
              class="login-form-button" 
            >
              REGISTER 
            </a-button>
          </a-form-item>
			</a-form>
			<p class="font-semibold text-muted text-center">Already have an account? <router-link to="/sign-in" class="font-bold text-dark">Sign In</router-link></p>
		</a-card>
		<!-- / Sign Up Form -->

	</div>
</template>

<script>
import * as fb from "@/firebase.js";
import EosService from '@/eosio/EosioService';
import router from "../router";
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
    };
  },
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
	methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
        
             EosService.enroll (this.accountName, this.privateKey,values).then(()=>{
          this.$message.success(` registration successful.`);
		   router.push("/sign-in");
        }).catch(err=>{
            this.$message.error(err.toString());
        })         
        } else {
          Object.entries(err).forEach((data) => console.log(data));
          console.log(err);
          this.$message.error(`check your values and try again`);
        }
      });
    },
	    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        // this.createInput(info.file.originFileObj);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    captureImage() {
		
            const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
            const imageCapture = new window.ImageCapture(mediaStreamTrack)
            let reader = new FileReader();
            return imageCapture.takePhoto().then(blob => {
                reader.readAsDataURL(blob)
                reader.onload = () => {
                    this.imageData.image = reader.result;
                    console.log(reader.result)
					 this.$message.success(` photo uploaded successfully.`);
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
            }) 
        },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createInput(files[0]);
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        this.createInput(info.file.originFileObj);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    createInput(file) {
      let promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          resolve((vm.fileinput = reader.result));
        };
        reader.readAsText(file);
      });

      promise.then(
        (result) => {
          /* handle a successful result */
          var lines = result.split("\n");
          var newresult = [];
          var headers = lines[0].split(",");
          for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }
            newresult.push(obj);
          }
          //return result; //JavaScript object
          //JSON
          if (newresult && typeof newresult === "object") {
            Object.keys(newresult).forEach((data) => {
              fb.studentCollection.doc().set(newresult[data]);
              console.log(newresult[data]);
            });
          }
        },
        (error) => {
          /* handle an error */
          console.log(error);
        }
      );
    },
    enroll(){
      this.$store.dispatch("enrollVoter");
    }
  },
    mounted() {
    this.$store.dispatch("getVoters");
        navigator.mediaDevices.getUserMedia({video: true})
            .then(mediaStream => {
                    this.$refs.video.srcObject = mediaStream;
                    this.$refs.video.play()
                    this.mediaStream = mediaStream                   
            })  
  },
	})

</script>

<style lang="scss">
</style>