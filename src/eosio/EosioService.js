import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

async function invokeAction(action, dataValue) {
  const rpc = new JsonRpc(process.env.VUE_APP_NODE_ENDPOINT);

  const privateKey = localStorage.getItem('private_key');
  const signatureProvider = new JsSignatureProvider([privateKey]);

  const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
  });

  try {
    const resultWithConfig = await api.transact(
      {
        actions: [
          {
            account: process.env.VUE_APP_SMART_CONTRACT_NAME,
            name: action,
            authorization: [
              {
                actor: localStorage.getItem('name_account'),
                permission: 'owner'
              }
            ],
            data: dataValue
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    );
    return resultWithConfig;
  } catch (err) {
    throw err;
  }
}
async function getRows(action, dataValue) {
    const rpc = new JsonRpc(process.env.VUE_APP_NODE_ENDPOINT);
  
    const privateKey = '5K6FHys4VU3ZRwDCkvpmvDZp1QWTwrGAuUqSVyX5uSUb8D8Hspk';
    const signatureProvider = new JsSignatureProvider([privateKey]);
  
    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
  
    try {
      const resultWithConfig = await api.transact(
        {
          actions: [
            {
              account: process.env.VUE_APP_SMART_CONTRACT_NAME,
              name: action,
              authorization: [
                {
                  actor: localStorage.getItem('name_account'),
                  permission: 'owner'
                }
              ],
              data: dataValue
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        }
      );
      return resultWithConfig;
    } catch (err) {
      throw err;
    }
  }

class EosService {
  static login(acc, key) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('name_account', acc);
      localStorage.setItem('private_key', key);
      invokeAction('login', { user: acc })
        .then(() => {
          resolve();
        })
        .catch(err => {
          localStorage.removeItem('name_account');
          localStorage.removeItem('private_key');
          reject(err);
        });
    });
  }
  static enroll(acc, key,values){
    return new Promise((resolve, reject)=>{
      localStorage.setItem('name_account', acc);
      localStorage.setItem('private_key', key);
      invokeAction('enroll',{
        "id": parseInt(values.id),
        "user": values.first_name,
        "county": values.county,
        "constituency": values.constituency,
        "role": "admin",
        "ward": values.ward,
        "username": values.first_name + values.last_name,
        "dob": values.dob
      },).then(()=>{
      resolve()
    }).catch(err=>{
        reject(err)
      })
    })

  }
  static vote(acc, key,values){
    return new Promise((resolve, reject)=>{
      localStorage.setItem('name_account', acc);
      localStorage.setItem('private_key', key);
      const idone =  Math.floor(Math.random() * 10);
      const idtwo =  Math.floor(Math.random() * 110);
      const idthree = idone + idtwo
      console.log(values)
      invokeAction('vote',{
        "id": idthree,
        "user":"warren",
        "president": values.president,
        "governor": values.governor,
        "womanrep": values.womenrep,
        "senator": values.senator,
        "mca": values.mca,
        "mp": values.mp
      },).then(()=>{
      resolve()
    }).catch(err=>{
        reject(err)
      })
    })

  }
}

export default EosService;
