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
            <title>Pink Punk</title>
        </head>
            <header>
              <h1 class="headerTitle glow">Pink Punk</h1>
                <nav class="navbar">
                  <a href="/" class="navbar__links" aria-label="list of all posts">read</a>
                  <a href="/submit" class="navbar__links" aria-label="write a new post">write</a>
                </nav>
            </header>
        <body>
            <div class="container">
                ${bodyContent}
            </div>
        </body>
        <script src="public/main.js"></script>
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

function allPosts(postObjArr) {
  let str = postObjArr.map(item => makeArticle(item)).join("\n");
  return sharedLayout(str);
}

function home(){

}

function login(){
  return sharedLayout(
  `
    <form class="form" action="login" method="POST">
      <label for="username"></label>
      <input id="username" name="username" placeholder="who are you?" required>
      <label for="password"></label>
      <input id="password" name="password" required>
      <button class="form__button" type="submit">Login</button>
    </form>
  `
  )
}

function signup(){
  return sharedLayout(
  `
    <form class="form" action="login" method="POST">
      <label for="username"></label>
      <input id="username" name="username" placeholder="who are you?" required>
      <label for="password"></label>
      <input id="password" name="password" required>
      <button class="form__button" type="submit">Sign Up</button>
    </form>
  `
  )
}


function submitPage() {
  return sharedLayout(
    `
    <form class="form" action="submit" method="POST">
      <label for="username">Author: </label>
      <input id="username" name="username" placeholder="who are you?" required>
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

module.exports = { submitPage, missingPage, allPosts, home, login, signup };
