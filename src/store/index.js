import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from "../firebase";
import router from "../router";

import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

const rpc = new JsonRpc("https://api.testnet.eos.io");

const myApi = new Api({ rpc, signatureProvider: new JsSignatureProvider([]) });

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students:[],
    userProfile:{},
    grades:[],
    records:[],
    voters:[],
    fees:[],
    votes:[],
    reports:[],
    privateKey: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    data: {
      id: 0,
      user: "bob",
      reply_to: 0,
      content: "This is a test",
    },
    error: "",
    
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
    },
    setVoters(state, val){
      state.voters = val
    },
    setVotes(state,val){
      state.votes = val
    }
  },
  actions: {
    // add students
    async getVoters({commit}){
     try {
      const rows = await rpc.get_table_rows({
        json: true,
        code: "bygpvrgjnhgc",
        scope: "",
        table: "voters",
        limit: 1000,
      });
      console.log(rows.rows)
      commit("setVoters",rows.rows)
     } catch (error) {
       console.log(error)
     }
        
    },
     // add students
     async getVotes({commit}){
      try {
       const rows = await rpc.get_table_rows({
         json: true,
         code: "bygpvrgjnhgc",
         scope: "",
         table: "votes",
         limit: 1000,
       });
       console.log(rows)
       commit("setVotes",rows.rows)
      } catch (error) {
        console.log(error)
      }
         
     },
    //enroll voter
    async enrollVoter({state}){
      try {
        myApi.signatureProvider = new JsSignatureProvider([
          state.privateKey
        ]);
        const result = await myApi.transact(
          {
            actions: [
              {
                account: "talk",
                name: "post",
                authorization: [
                  {
                    actor: state.data.user,
                    permission: "active",
                  },
                ],
                data: state.data,
              },
            ],
          },
          {
            blocksBehind: 3,
            expireSeconds: 30,
          }
        );
        console.log(result);
        setState({ error: "" });
      } catch (error) {
        console.log(error);
      }
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
