//Function to create newUser also filll detail in database also========================================
export async function insertStats(token,{favourited,userId,videoId,watched}){
const operationsDoc = `
  mutation insertStats($favourited: Int!,$userId: String!,$watched: Boolean!,$videoId: String!) {
    insert_stats_one(object: {favourited: $favourited,
       userId: $userId,
        videoId: $videoId,
         watched: $watched})
         {
          favourited,
          userId,
          watched,
          videoId
         }
  }

   
`;
const response = await queryHasuraGQL(
  operationsDoc,
  "insertStats",
  { videoId, userId,favourited,watched },
  token
);//same response as in graphQl respone generate in hasura dashboard 
// console.log({response});
//  return response?.data?.stats.length === 0;
return response;
}



// =======================================================================================================
export async function updateStats(token,{favourited,userId,watched,videoId}) {
  const operationsDoc2 = `
 
  
  mutation updateStats($favourited: Int!,$userId: String!,$watched: Boolean!,$videoId: String!) {
    update_stats(where: {
      videoId: {_eq: $videoId},
       userId: {_eq: $userId}},
        _set: { watched: $watched,favourited: $favourited}) {
          returning {
            favourited,
      userId,
      watched,
      videoId
          }
     
    }
   }
`;
  const response = await queryHasuraGQL(
    operationsDoc2,
    "updateStats",
    { videoId, userId,favourited,watched },
    token
  );//same response as in graphQl respone generate in hasura dashboard 
  // console.log({response});
  //  return response?.data?.stats.length === 0;
  return response;
}

// ===================================================================================================================











export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUser($userId: String!,$videoId: String!){
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      favourited
      userId
      videoId
      watched
    }
  }
  
   
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUser",
    { videoId, userId },
    token
  );//same response as in graphQl respone generate in hasura dashboard 
  // console.log({response});
  console.log({response});
   return response?.data?.stats.length > 0;
 


}


















export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!,$email: String!,$publicAddress: String!){
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
       returning{
        email,id,issuer
       }
    }
  }
`;


  const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token
  );//same response as in graphQl respone generate in hasura dashboard 
  console.log({ response, issuer });
  return response;
}


//==================================================================================================







//=========check if user is a new user============================================================
export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      issuer
      id
      email
      
    }
  }
`;


  const response = await queryHasuraGQL(operationsDoc, "isNewUser", { issuer }, token);//same response as in graphQl respone generate in hasura dashboard 
  console.log({ response, issuer });
  return response?.data?.users?.length === 0;
}




//============================================================================================


export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}




  //                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFqYXl2ZXJtYSIsImlhdCI6MTY4NTQyNDk2NywiZXhwIjoxNjg2MDI5ODU0LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTIzNCJ9fQ.ZGtQNLUW4Edjt8xoO-7BBbpodTK_Xu3r34JQq8yRvsM",
