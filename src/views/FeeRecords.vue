<template>
  <div>
    <!-- Header Background Image -->
    <div
      class="profile-nav-bg"
      style="background-image: url('images/bg-profile.jpg')"
    ></div>
    
    
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
              <h4 class="font-semibold m-0">total</h4>
              <p>Grade: 1299</p>
            </div>
          </a-col>
          <a-col
            :span="24"
            :md="12"
            style="display: flex; align-items: center; justify-content: flex-end"
          >
            <a-button >ADD NEW RECORD</a-button>
          </a-col>
        </a-row>
      </template>
    </a-card>
    <FeesTable
     :data="votes"></FeesTable>
  </div>
</template>

<script>
import FeesTable from "../components/tables/FeesTable";


import { mapState } from "vuex";

export default {
  data() {
    return {
      visible: false,
 
    };
  },
  components: {
    FeesTable,
  },


  created() {
    this.$store.dispatch("getVotes");
  },
    computed: {
    ...mapState(["votes"]),
  },
};
</script>

<style></style>
