const http = require("http");
//comment
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decoder = new StringDecoder("utf-8");
  let body = "";
  req.on("data", (data) => {
    body += decoder.write(data);
  });
  req.on("end", () => {
    body += decoder.end();
    const bodyDecoded = decodeURI(body);
    const bodyArray = bodyDecoded.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const [key, value] = part.split("=");
      resultHash[key] = decodeURIComponent(value.replace(/\+/g, ' '));
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter some number below.";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = (resultMessage = "") => {
  return `
  <body>
    <p>${item}</p>
    <div id="result">${resultMessage}</div>
    <form id="sumForm" method="POST">
      <span>Sum of numbers:</span><br>
      <input type="text" name="num1" /> <br>
      <input type="text" name="num2" />
      <button type="submit">Calculate</button>
    </form>
    <script>
      document.getElementById('sumForm').onsubmit = function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const searchParams = new URLSearchParams();
        for (const pair of formData) {
          searchParams.append(pair[0], pair[1]);
        }
        fetch('/', {
          method: 'POST',
          body: searchParams,
        })
        .then(response => response.text())
        .then(text => {
          document.getElementById('result').textContent = 'Result: ' + text;
        });
        .catch(error => console.error('Error:', error));

      };
    </script>
  </body>
  `;
};


const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      const num1 = parseFloat(body.num1);
      const num2 = parseFloat(body.num2);

      if (!isNaN(num1) && !isNaN(num2)) {
        result = num1 + num2;  // Calculate sum
        res.end(form(`The sum is ${result}.`));
      } else {
        // Handle invalid inputs
        res.end(form("Invalid input. Please enter two numbers."));
      }
    });
  } else {
    // Serve form for GET requests
    res.end(form());
  }
  }
);

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");
