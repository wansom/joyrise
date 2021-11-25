import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from "../firebase";
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students:[],
    userProfile:{},
    grades:[],
    records:[],
    fees:[],
    reports:[]
  },
  mutations: {
    setUserProfile(state, val){
      state.userProfile = val
    },
    setStudents(state, val){
      state.students = val
    },
    setGrades(state, val){
      state.grades =val
    },
    setRecords(state, val){
      state.records = val
    },
    setFees(state, val){
      state.fees = val
    },
    setReport(state, val){
      state.reports = val
    }
  },
  actions: {
    // add students
    async addStudent({commit},payload){
      fb.studentCollection.add(payload
         )
         commit("setStudents",payload)
    },
    // add fee records
    async addFeeRecords({dispatch},payload){
      await fb.feesCollection.add({
        term:payload.term,
        amount:payload.amount,
        level:payload.level,
        recordtype:payload.recordtype,
        boarding:payload.boarding,
        date: new Date(),

      })
    },
    //edit students
    async editStudent({dispatch},payload){
       await fb.studentCollection.doc(payload.id).update(payload).then(()=>{
         console.log("success")
       })
    },
    // get student fees records
    async getRecords({commit},payload){
      fb.recordsCollection.where("student_id","==",payload.id)
      .onSnapshot((snapshot) => {
        const loadedRecords = [];
        snapshot.forEach((doc) => {
          const loadedRecord = doc.data();
          (loadedRecord.id = doc.id), loadedRecords.push(loadedRecord);
        });
        commit("setRecords", loadedRecords);
      });
     console.log(payload.id)
    },
    //get fees structure
    async getFees({commit}){
      
      fb.feesCollection
        .onSnapshot((snapshot) => {
          const loadedFees = [];
          snapshot.forEach((doc) => {
            const loadedFee = doc.data();
            (loadedFee.id = doc.id), loadedFees.push(loadedFee);
          });
          commit("setFees", loadedFees);
        });
    },
    //get students
        async getstudents({ commit }) {

      fb.studentCollection
        .onSnapshot((snapshot) => {
          const loadedStudents = [];
          snapshot.forEach((doc) => {
            const loadedStudent = doc.data();
            (loadedStudent.id = doc.id), loadedStudents.push(loadedStudent);
          });
          commit("setStudents", loadedStudents);
        });
    },
       //get students
       async getReports({ commit }) {

        fb.tempfees
          .onSnapshot((snapshot) => {
            const loadedStudents = [];
            snapshot.forEach((doc) => {
              const loadedStudent = doc.data();
              (loadedStudent.id = doc.id), loadedStudents.push(loadedStudent);
            });
            commit("setReport", loadedStudents);
          });
      },
    //get grades
          async getClasses({ commit }) {

      fb.gradesCollection
        .onSnapshot((snapshot) => {
          const loadedGrades = [];
          snapshot.forEach((doc) => {
            const loadedGrade = doc.data();
            (loadedGrade.id = doc.id), loadedGrades.push(loadedGrade);
          });
          commit("setGrades", loadedGrades);
        });
    },
     /**
     * Profile Section Starts Here
     */
    async login({ dispatch }, form) {
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(
          form.email,
          form.password
        );
        dispatch("fetchUserProfile", user);
        router.push("/dashboard");
      } catch (err) {
        alert(err.message);
      }
    },
    //reset password
    async reset({ dispatch }, form) {
      try {
        let isLoading = true;
        await fb.auth
          .sendPasswordResetEmail(form.email)
          .then(function() {
            // Password reset email sent.
            isLoading = false;
          })
          .catch(function(error) {
            // Error occurred. Inspect error.code.
            console.log(error.message);
          });
        console.log(dispatch);
        return isLoading;
      } catch (err) {
        alert(err);
      }
    },
    //user registration
    async signUp({ dispatch }, form) {
      try {
        const { user } = await fb.auth.createUserWithEmailAndPassword(
          form.email,
          form.password
        );
        await fb.usersCollection.doc(user.uid).set({
          email: user.email,
          id: user.uid,
          first_name: form.first_name,
          last_name: form.last_name,
          phone_number: form.phone,
          balance: 0,
          uid: user.uid,
          referral_code:form.code
        });
        dispatch("fetchUserProfile", user);
        router.push("/dashboard");
        alert("registration complete");
      } catch (error) {
        alert(error.message);
      }
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection
        .doc(user.uid)
        .get()
        .then(docs => {
          return docs.data();
        });
      // set user profile in state
      commit("setUserProfile", userProfile);
    },
// update user profile
    async updateProfile({ dispatch }, form) {
      const user = fb.auth.currentUser;
      await fb.usersCollection.doc(user.uid).set({
        name: form.businessName,
        email: form.email,
        industry: form.industry,
        type: form.type,
        logo: form.url,
        scanresult: "https://www.scanpal.co.ke/" + user.uid,
        id: user.uid,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        zip: form.zip,
        state: form.state,
        phone: form.phone,
      });
      dispatch("fetchUserProfile", user);
    }
  },
  getters: {
    getByCategory: state => category => {
      console.log(category);
      return state.products.filter(
        tappedProduct => tappedProduct.category === category
      );
    }
  },
  modules: {
  }
})
