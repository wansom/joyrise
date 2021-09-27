<template>
  <div>
    <!-- Header Background Image -->
    <div
      class="profile-nav-bg"
      style="background-image: url('images/bg-profile.jpg')"
    ></div>
    <!-- / Header Background Image -->
    <a-card
      :bordered="false"
      class="card-profile-head"
      :bodyStyle="{ padding: 0 }"
    >
      <template #title>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12" class="col-info">
            <a-avatar :size="74" shape="square" src="images/stIsaacLogo.png" />
            <div class="avatar-info">
              <h4 class="font-semibold m-0">{{ student.name }}</h4>
              <p>Grade: {{ student.grade }}</p>
            </div>
          </a-col>
          <a-col
            :span="24"
            :md="12"
            style="display: flex; align-items: center; justify-content: flex-end"
          >
            <a-button>ADD NEW RECORD</a-button>
          </a-col>
        </a-row>
      </template>
    </a-card>
    <FeesTable></FeesTable>
  </div>
</template>

<script>
import FeesTable from "../components/tables/FeesTable";

export default {
  data() {
    return {
      student: this.$route.params.student,
    };
  },
  components: {
    FeesTable,
  },
  methods: {
    studentlog() {
      console.log(this.$route.params.student);
    },
  },
  		  created(){
    this.$store.dispatch("getRecords",this.student);
  },
};
</script>

<style></style>
