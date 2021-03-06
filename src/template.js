function sharedLayout(bodyContent) {
  return `<!DOCTYPE html>
    <html lang="en">    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="Pink Punk">
            <link href="https://fonts.googleapis.com/css2?family=Fugaz+One&family=Lato:wght@300&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">
            <script src="https://kit.fontawesome.com/794b746eef.js" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="./public/main.css">
            <title>The Cookie Jar</title>
        </head>
            <header>
              <h1 class="headerTitle glow">The Cookie Jar</h1>
                <nav class="navbar">
                  <a href="/" class="navbar__links" aria-label="list of all posts">Home</a>
                  <a href="/all_posts" class="navbar__links" aria-label="list of all posts">See All the Posts</a>
                  <a href="/user_page" class="navbar__links" aria-label="list of your posts">See Your Posts</a>
                  <a href="/submit" class="navbar__links" aria-label="write a new post">Submit New Post</a>
                  <a href="/login" class="navbar__links" aria-label="Login">Login</a>
                  <a href="/signup" class="navbar__links" aria-label="Sgn up">Sign up</a>
                </nav>
            </header>
        <body>
            <div class="container">
                ${bodyContent}
            </div>
        </body>
    </html>
    `;
}

function makeArticle(obj) {
  return `    
    <article class="post">
      <p class="post__author">${obj.username} wrote:</p>
      <p class="post__textContent">${obj.post}</p>
      <p class="post__date">on: ${obj.post_date
        .toString()
        .split(" ")
        .slice(0, 3)
        .join(" ")}</p>
      
      <a class="post__remove-button"
      aria-label="button to remove post"
      href="/delete-post?id=${obj.id}">
        <i class="fas fa-trash-alt"></i>
      </a>
      </button>
    </article>
`;
}

function home() {
  let cookieStr = `
  <div class="cookie">
    <div class="choco-chip left left--1"></div>
    <div class="choco-chip left left--2"></div>
    <div class="choco-chip center center--1"></div>
    <div class="choco-chip center center--2"></div>
    <div class="choco-chip center center--3"></div>
    <div class="choco-chip right right--1"></div>
    <div class="choco-chip right right--2"></div>
  </div>
  <script>
    const container = document.querySelector('.container'); 
    container.classList.add('home-container');    
  </script>
  `;
  return sharedLayout(cookieStr);
}

function userDetailForm(button, action, passwordError, usernameError) {
  return sharedLayout(
    `
    <form id=userDetailForm class="form" action=${action} method="POST">
      <label for="username">Username<span aria-hidden="true">*</span>:</label>
      <input id="username" name="username" placeholder="who are you?" required />
      <div id="usernameError" class="error">${usernameError}</div>
      <label for="password">Password<span aria-hidden="true">*</span>:</label>
      <p id="passwordRequirements">Password must contain at least one letter, one capital letter, one number, and contain at least 8 characters.
      </p>
      <input type="password" aria-describedby="passwordRequirements" id="password" name="password"  required minlength="8"/>  <!-- pattern="(?=.*[A-z])(?=.*\d)[A-z\d]+" -->
      <div id="passwordError" class="error">${passwordError}</div>
      ${button}
    </form>
    <script src="public/script.js"></script>
  `
  );
} // regex pattern commented out in html above, because causing issues....revisit later

function login(passwordError) {
  return userDetailForm(
    `<button class="form__button" type="submit">Login</button>`,
    "/login",
    `${passwordError ? passwordError : ""}`,
    ""
  );
}
function signup(usernameError) {
  return userDetailForm(
    `<button class="form__button" type="submit">Sign Up</button>`,
    "/signup",
    "",
    `${usernameError ? usernameError : ""}`
  );
}

function submitPage() {
  return sharedLayout(
    `
    <form class="form" action="submit" method="POST">
      
      <label for="post_text">Write Post</label>
      <textarea id="post_text" rows="10" cols="50" name="post_text" aria-label="write blog here" placeholder="what are you thinking about?" required></textarea>
      <button class="form__button" type="submit">Add Post</button>
    </form>
  `
  );
}

function missingPage() {
  return `
  <img class="missing-resource-image" src="https://media.giphy.com/media/VwoJkTfZAUBSU/giphy.gif" alt="404 resource not found">
  `;
}

function errorPage(message) {
  return `<h1>${message}</h1>
  <a href="/" class="navbar__links" aria-label="Home page">Home</a>
  `;
}

function allPosts(postObjArr) {
  let str = postObjArr.map(item => makeArticle(item)).join("\n");
  return sharedLayout(str);
}

function displayUserPosts(postObjArr) {
  let str2 = `
    <form action='/logout' method='POST'>
    <button type="submit">Logout</button>
    </form>
  `; 
  let str = postObjArr.map((item) => makeArticle(item)).join("\n");
  str = str + str2; 
  return sharedLayout(str);
}

module.exports = {
  submitPage,
  missingPage,
  errorPage,
  allPosts,
  home,
  displayUserPosts,
  userDetailForm,
  login,
  signup
};
