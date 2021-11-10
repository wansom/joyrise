<template>
  <!-- Profile Information Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full card-profile-information"
    :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
    :headStyle="{ paddingRight: 0 }"
  >
    <a-modal v-model="visible" title="Basic Modal">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <template #title>
      <h6 class="font-semibold m-0">Add Candidate</h6>
    </template>

 
    <hr class="my-25" />
    <a-form
      id="student-information"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Candidate Information">
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
          <a-form-item>
        <a-upload-dragger
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">
      Click or drag file to this area to upload
    </p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading sensitive data or other
      band files
    </p>
  </a-upload-dragger>
          </a-form-item>
           <a-form-item label="Position">
            <a-select
              v-decorator="[
                'position',
                {
                  rules: [
                    { required: true, message: 'Please select desired position!' },
                  ],
                },
              ]"
              placeholder="Select Position"
            >
              <a-select-option value="President">
                President
              </a-select-option>
              <a-select-option value="Governor">
                Governor
              </a-select-option>
               <a-select-option value="senator">
                Senator
              </a-select-option>
               <a-select-option value="womenrep">
                Women Representative
              </a-select-option>
              <a-select-option value="mca">
                MCA
              </a-select-option>
            </a-select>
          </a-form-item>
            <a-form-item>
            <a-button
              type="primary"
              block
               html-type="submit"
              class="login-form-button" 
            >
              ADD Candidate
            </a-button>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </a-card>
  <!-- / Profile Information Card -->
</template>

<script>
import { mapState } from "vuex";
import * as fb from "@/firebase.js";
export default {
  data() {
    return {
      gender: "",
      visible: false,
      boarding: false,
      transport: false,
       file:null,
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
    this.form = this.$form.createForm(this, { name: "student_info" });
  },
  methods: {
   async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const ref = fb.storage.ref();
      const url = await ref
        .child(this.file.name)
        .put(this.file, this.file.type)
        .then((snapshot) => snapshot.ref.getDownloadURL());
        await fb.candidatesCollection.add({
          photo:url,
          first_name:values.first_name,
          second_name: values.last_name,
          county:values.county,
          dob:values.dob,
          position:values.position,
          ward: values.ward


        }).then(()=>{
           this.$message.success(` candidate added successfully.`);
        })
        .catch(err=>{
            this.$message.error(err.toString());
        })         
        } else {
          Object.entries(err).forEach((data) => console.log(data));
          console.log(err);
          this.$message.error(`check your values and try again`);
        }
      });
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
         this.file =info.file.originFileObj
       console.log(this.file)

      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        this.file =info.file.originFileObj
       console.log(this.file)
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
  computed: {
    ...mapState(["grades","candidates"]),
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
};
</script>
