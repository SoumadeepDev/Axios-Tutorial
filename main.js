//AXIOS GLOBALS
axios.defaults.headers.common["X-AUTH-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcm9udGVuZCBkZXZlbG9wZXIiLCJuYW1lIjoiU291bWFkZWVwIENoYXR0ZXJqZWUiLCJpYXQiOjE1MTYyMzkwMjJ9.SFLVtDXqfdxvQXohnm5Tqq_CerzO4RlLPA41ojQ7WUo";
// GET REQUEST
function getTodos() {
  // console.log("GET Request");
  // axios({
  //   method: "get",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   params: {
  //     _limit: 5, //If we dont write params we will get all the whatever is there in the api, here it is 200
  //   },
  // })
  //   .then((res) => {
  //     showOutput(res);
  //   })
  //   .catch((err) => console.log(err));

  //The above code is a longer approach, there is a shorthand available for axios
  //shorthand approach of axios http requests
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));

  //we can include timeout also
  // axios
  //   .get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
  //     timeout: 5000,
  //   })
  //   .then((res) => showOutput(res))
  //   .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  // console.log("POST Request");
  // axios({
  //   method: "post",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   data: {
  //     title: "New Todo",
  //     completed: false,
  //   },
  // })
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New Todo",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log("PUT/PATCH Request");
  // axios({
  //   method: "put",
  //   url: "https://jsonplaceholder.typicode.com/todos/4",
  //   data: {
  //     title: "Updated Todo",
  //     completed: true,
  //   },
  // })
  axios
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Updated Todo",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

/*
//if we use put request the entire data gets replaced with out own provided data 
but if we want to modify only few things and let the other data remains then we can 
use patch request

axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {  
      title: "Updated Todo",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
*/

// DELETE REQUEST
function removeTodo() {
  // console.log("DELETE Request");
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA  // if we want to fetch different sections of api together we can get them using axios.all([])
function getData() {
  // console.log("Simultaneous Request");
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    // .then((res) => {
    //   console.log(res[0]);
    //   console.log(res[1]);
    //   showOutput(res[0]);
    // })
    .then(axios.spread((todos, posts) => showOutput(todos)))
    .catch((err) => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log("Custom Headers");
  const config = {
    header: {
      "Content-Type": "application/json",
      Authorization: "sometoken",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "Custom header Todo",
        completed: true,
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log("Transform Response");
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };
  axios(options).then((res) => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  // console.log("Error Handling");
  axios
    .get("https://jsonplaceholder.typicode.com/todoss?_limit=5")
    .then((res) => showOutput(res))
    .catch((error) => {
      if (error.response) {
        //server responded with a status other than 200 range
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 404) {
          alert("Error: Page Not Found");
        }
        if (error.request) {
          //request was made but no response
          console.log(error.request);
        } else {
          console.log(error.message);
        }
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  // console.log("Cancel Token");
  const source = axios.CancelToken.source();

  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request Cancelled", thrown.message);
      }
    });
  if (true) {
    // if we comment this we can see the request is sending normally
    source.cancel("Request has not sent");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
// axiosInstance.get("/comments").then((res) => showOutput(res));

//this is how we can access from any baseurl

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
