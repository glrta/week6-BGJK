const test = require('tape');
const db = require('../src/db/connection');
const build = require('../src/db/build');


const {
    newPost,
    getPosts,
    deletePost,
    createUser
} = require('/model.js');

test("Check to see if createUser function exists", t => {
    build().then(() => {
        createUser()
            .then(username => {
                console.log(username)
            t.equal(username, "Donald's_toupee")
            t.end()
            })
            .catch(error )
           
    })
});

test('Can get recipe titles!', t => {
    build().then(() => {
      getTitles()
        .then(title => {
          const firstTitle = title[0]
          t.equal(firstTitle.recipetitle, 'Pesto pasta')
          t.equal(title.length, 3)
          t.end()
        })
        .catch(error => {
          t.error(error)
          t.end()
        })
    })
  })

// test("Check model is exporting the function deleteListing", t => {
//   t.equal("deleteListing" in model , true);
//   t.end();
// });