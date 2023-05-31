export async function isNewUser(token){
  const operationsDoc = `
  query MyQuery {
    users(where: {issuer: {_eq: "did:ethr:0xcC93e75e1d5b9011468c17eAe66bc76ef5E54aeF"}}) {
      issuer
      id
      email
      publicAddress
    }
  }
`;

const response =await queryHasuraGQL(operationsDoc,"MyQuery",{},token);//same response as in graphQl respone generate in hasura dashboard 
console.log({response});
return response?.users?.length === 0;
}
export async function queryHasuraGQL(operationsDoc, operationName, variables,token) {
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

const operationsDoc = `
  query MyQuery {
    users(where: {issuer: {_eq: ""}}) {
      issuer
      id
      email
      publicAddress
    }
  }
`;

function fetchMyQuery() {

  
    return queryHasuraGQL(
        operationsDoc,
        "MyQuery",
        {},"",  
          );
}


export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
    if (errors) {
   
      console.error(errors);
    }
    console.log(data);
  }


 



  //                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFqYXl2ZXJtYSIsImlhdCI6MTY4NTQyNDk2NywiZXhwIjoxNjg2MDI5ODU0LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTIzNCJ9fQ.ZGtQNLUW4Edjt8xoO-7BBbpodTK_Xu3r34JQq8yRvsM",
