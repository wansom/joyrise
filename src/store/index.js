import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from "../firebase";
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students:[],
    userProfile:{}
  },
  mutations: {
    setUserProfile(state, val){
      state.userProfile = val
    },
    setStudents(state, val){
      state.students = val
    }
  },
  actions: {
    // add students
    async addStudent({state},payload){
      fb.studentCollection.add({
         addmission_no: state.students.length++,//number
            first_name: payload.first_name,
            last_name:payload.last_name,
            gender:payload.gender,
            birth_date:payload.birth_date,
            admission_date:payload.admission_date,
            father_name:payload.father_name,
            father_phone:payload.father_phone,
            mother_phone: payload.mother_phone,
            mother_name:payload.mother_name,
            guardian_name: payload.guardian_name,
            guardian_phone:payload.mother_phone,
            student_class: payload.student_class,
            stream: payload.stream,
            reporting_date: payload.reporting_date,
            previous_school: payload.previous_school,
            guardian_occupation:payload.guardian_occupation,
            address: payload.address
      })
    },
    //get students
    
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
    //fetch userData
    async fetchUserData({ commit }, user) {
      // fetch user profile
      const userData = await fb.usersCollection
        .doc(user.uid)
        .get()
        .then(docs => {
          return docs.data();
        });
      // set user profile in state
      commit("setUserData", userData);
    },
    // logout
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/sign-in");
    },

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
        about: form.about
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
