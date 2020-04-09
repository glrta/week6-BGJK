const test = require('tape');
const db = require('../src/db/connection');
const build = require('../src/db/build');


const {
    newPost,
    getPosts,
    deletePost,
    createUser
} = require('../src/model');



test("Check to see if createUser adds new username", t => {
  const newUser = {
    username: "Donald's_toupee",
    password: "kkk"
  };  
  build().then(() => {
    createUser(newUser)
      .then((result) => {
        const userProfile = result;
        t.equal(userProfile.rows[0].username, "Donald's_toupee")
        t.end()
      })
      .catch(error => {
        t.error(error)
        t.end()
      })   
    })
});




// test('Can get recipe titles!', t => {
//     build().then(() => {
//       getTitles()
//         .then(title => {
//           const firstTitle = title[0]
//           t.equal(firstTitle.recipetitle, 'Pesto pasta')
//           t.equal(title.length, 3)
//           t.end()
//         })
//         .catch(error => {
//           t.error(error)
//           t.end()
//         })
//     })
//   })

// test("Check model is exporting the function deleteListing", t => {
//   t.equal("deleteListing" in model , true);
//   t.end();
// });

