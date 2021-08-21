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
    </a-card>
    <!-- User Profile Card -->

    <a-row type="flex" :gutter="24">
      <!-- Platform Settings Column -->
      <a-col :span="24" :md="4" class="mb-24"> </a-col>
      <!-- / Platform Settings Column -->

      <!-- Profile Information Column -->
      <a-col :span="24" :md="16" class="mb-24">
        <!-- Profile Information Card -->
        <CardProfileInformation
		:student='student'></CardProfileInformation>
        <!-- / Profile Information Card -->
      </a-col>
      <!-- / Profile Information Column -->

      <!-- Conversations Column -->
      <a-col :span="24" :md="4" class="mb-24"> </a-col>
      <!-- / Conversations Column -->
    </a-row>
  </div>
</template>

<script>
import CardPlatformSettings from "../components/Cards/CardPlatformSettings";
import CardProfileInformation from "../components/forms/Editstudentform.vue";
import HorizontalStepper from "vue-stepper";
import Barchart from "../components/Cards/CardConversations.vue";

export default {
  components: {
    CardPlatformSettings,
    CardProfileInformation,
    HorizontalStepper,
  },
  data() {
    return {
		// student to be edited
		student:this.$route.params.student,
      // Active button for the "User Profile" card's radio button group.
      profileHeaderBtns: "overview",
      demosteps: [
        {
          icon: "mail",
          name: "first",
          title: "Student Information",
          subtitle: "Student Information",
          component: Barchart,
          completed: false,
        },
        {
          icon: "report_problem",
          name: "second",
          title: "Guardian Information",
          subtitle: "Guardian Information",
          component: CardProfileInformation,
          completed: true,
        },
      ],
    };
  },
  methods: {
    // Executed when @completed-step event is triggered
    completeStep(payload) {
      this.demoSteps.forEach((step) => {
        if (step.name === payload.name) {
          step.completed = true;
        }
      });
    },
    // Executed when @active-step event is triggered
    isStepActive(payload) {
      this.demoSteps.forEach((step) => {
        if (step.name === payload.name) {
          if (step.completed === true) {
            step.completed = false;
          }
        }
      });
    },
    submitForm() {
      console.log("completed");
    },
  },
};
</script>

<style lang="scss"></style>
