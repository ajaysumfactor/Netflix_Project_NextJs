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
    users(where: {issuer: {_eq: "did:ethr:0xcC93e75e1d5b9011468c17eAe66bc76ef5E54aeF"}}) {
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
        {},"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweGNDOTNlNzVlMWQ1YjkwMTE0NjhjMTdlQWU2NmJjNzZlZjVFNTRhZUYiLCJwdWJsaWNBZGRyZXNzIjoiMHhjQzkzZTc1ZTFkNWI5MDExNDY4YzE3ZUFlNjZiYzc2ZWY1RTU0YWVGIiwiZW1haWwiOiJhamF5dmVybWEwNDE5OTlAZ21haWwuY29tIiwib2F1dGhQcm92aWRlciI6bnVsbCwicGhvbmVOdW1iZXIiOm51bGwsIndhbGxldHMiOltdLCJpYXQiOjE2ODU1NDAzMTgsImV4cCI6MTY4NjE0NTExOCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4Y0M5M2U3NWUxZDViOTAxMTQ2OGMxN2VBZTY2YmM3NmVmNUU1NGFlRiJ9fQ.E6-bx1soPBNfWeUX0sCVRqUXgkGdwfxaqJ82_-h_xaw",  
          );
}


export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
    if (errors) {
   
      console.error(errors);
    }
    console.log(data);
  }

  startFetchMyQuery()
 



  //                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFqYXl2ZXJtYSIsImlhdCI6MTY4NTQyNDk2NywiZXhwIjoxNjg2MDI5ODU0LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTIzNCJ9fQ.ZGtQNLUW4Edjt8xoO-7BBbpodTK_Xu3r34JQq8yRvsM",
