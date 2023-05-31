export async function queryHasuraGQL(operationsDoc, operationName, variables) {
    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
        {
            method: "POST",
            headers: {
                Authorization: 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFqYXl2ZXJtYSIsImlhdCI6MTY4NTQyNDk2NywiZXhwIjoxNjg2MDI5ODU0LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTIzNCJ9fQ.ZGtQNLUW4Edjt8xoO-7BBbpodTK_Xu3r34JQq8yRvsM",
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


function fetchMyQuery() {

    const operationsDoc = `
  query MyQuery {
    users {
      id
      issuer
      publicAddress
      email
    }
  }
`;
    return queryHasuraGQL(
        operationsDoc,
        "MyQuery",
        {}
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
 
