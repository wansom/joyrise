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

    <a-row type="flex" :gutter="24">
      <!-- / Platform Settings Column -->
      <!-- / Profile Information Column -->

      <!-- Conversations Column -->
      <a-col :span="24" :md="24" class="mb-24">
        <!-- Conversations Card -->
        <Levelstable :data="tableData" :columns="tableColumns"></Levelstable>

        <!-- / Conversations Card -->
      </a-col>
      <!-- / Conversations Column -->
    </a-row>
  </div>
</template>

<script>
// "Projects" table component.
import Levelstable from "../components/Cards/CardProjectTable";

// "Projects" table list of columns and their properties.
const tableColumns = [
  {
    title: "COMPANIES",
    dataIndex: "company",
    scopedSlots: { customRender: "company" },
    width: 300,
  },
  {
    title: "MEMBERS",
    dataIndex: "members",
    scopedSlots: { customRender: "members" },
  },
  {
    title: "BUDGET",
    dataIndex: "budget",
    class: "font-bold text-muted text-sm",
  },
  {
    title: "COMPLETION",
    scopedSlots: { customRender: "completion" },
    dataIndex: "completion",
  },
];

// "Projects" table list of rows and their properties.
const tableData = [
  {
    key: "1",
    company: {
      name: "Soft UI Shopify Version",
      logo: "images/logos/logo-shopify.svg",
    },
    members: [
      "images/face-1.jpg",
      "images/face-4.jpg",
      "images/face-2.jpg",
      "images/face-3.jpg",
    ],
    budget: "$14,000",
    completion: 60,
  },
  {
    key: "2",
    company: {
      name: "Progress Track",
      logo: "images/logos/logo-atlassian.svg",
    },
    members: ["images/face-4.jpg", "images/face-3.jpg"],
    budget: "$3,000",
    completion: 10,
  },
  {
    key: "3",
    company: {
      name: "Fix Platform Errors",
      logo: "images/logos/logo-slack.svg",
    },
    members: ["images/face-1.jpg", "images/face-2.jpg", "images/face-3.jpg"],
    budget: "Not Set",
    completion: {
      label: "100",
      status: "success",
      value: 100,
    },
  },
  {
    key: "4",
    company: {
      name: "Launch new Mobile App",
      logo: "images/logos/logo-spotify.svg",
    },
    members: ["images/face-1.jpg", "images/face-2.jpg"],
    budget: "$20,600",
    completion: {
      label: "100",
      status: "success",
      value: 100,
    },
  },
  {
    key: "5",
    company: {
      name: "Add the New Landing Page",
      logo: "images/logos/logo-jira.svg",
    },
    members: [
      "images/face-1.jpg",
      "images/face-4.jpg",
      "images/face-2.jpg",
      "images/face-3.jpg",
    ],
    budget: "$4,000",
    completion: 80,
  },
  {
    key: "6",
    company: {
      name: "Redesign Online Store",
      logo: "images/logos/logo-invision.svg",
    },
    members: ["images/face-1.jpg", "images/face-4.jpg", "images/face-3.jpg"],
    budget: "$2,000",
    completion: {
      label: "Cancelled",
      status: "exception",
      value: 100,
    },
  },
];

export default {
  components: {
    Levelstable,
  },
  data() {
    return {
      // Active button for the "User Profile" card's radio button group.
      profileHeaderBtns: "overview",

      // Associating Conversation's list data with its corresponding property.
      conversationsData,

      // Project cards data
      projects,
      // Associating "Authors" table data with its corresponding property.
      tableData: tableData,

      // Associating "Authors" table columns with its corresponding property.
      tableColumns: tableColumns,
    };
  },
};
</script>

<style lang="scss"></style>
