<!-- 
	This is the user profile page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <!-- Header Background Image -->
    <div
      class="profile-nav-bg"
      style="background-image: url('images/bg-profile.jpg')"
    ></div>
    <!-- / Header Background Image -->

    <!-- User Profile Card -->
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
              <h4 class="font-semibold m-0">St. Isaac Academy</h4>
              <p>Fee Structure</p>
            </div>
          </a-col>
          <!-- <a-col
            :span="24"
            :md="12"
            style="display: flex; align-items: center; justify-content: flex-end"
          >
            <a-radio-group v-model="feesType" size="small">
              <a-radio-button value="tuition">TUITION</a-radio-button>
              <a-radio-button value="transport">TRANSPORT</a-radio-button>
            </a-radio-group>
          </a-col> -->
        </a-row>
      </template>
    </a-card>
    <!-- User Profile Card -->
    <div>
      <div>
        <TuitionTable></TuitionTable>
      </div>
    </div>
  </div>
</template>

<script>
import TuitionTable from "../components/tables/TuitionTable.vue";

export default {
  components: {
    TuitionTable,
  },
  data() {
    return {
      // Active button for the "User Profile" card's radio button group.
      feesType: "tuition",
    };
  },
  created() {
    this.$store.dispatch("getFees");
  },
};
</script>

<style lang="scss"></style>
