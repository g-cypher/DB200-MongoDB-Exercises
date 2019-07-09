//get all documents
db.movies.find({})

//get all documents with writer set to "Quentin Tarantino"
db.movies.find({"writer": "Quentin Tarantino"})

//get all documents where actors include "Brad Pitt"
db.movies.find({ "actors": "Brad Pitt"})

//get all documents with franchise set to "The Hobbit"
db.movies.find({ "franchise": "The Hobbit" })

//get all movies released in the 90s
db.movies.find({ "year": { $gt: 1989, $lt: 2001 } })

//get all movies released before the year 2000 or after 2010
db.movies.find({ "year": {$not: { $gt: 2000, $lt: 2010 } }})

//add a synopsis to "The Hobbit: An Unexpected Journey" : "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."
db.movies.update({ "title" : "The Hobbit: An Unexpected Journey" }, {$set: { "synopsis" : "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug." } })

//add a synopsis to "The Hobbit: The Desolation of Smaug" : "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
db.movies.update({ "title" : "The Hobbit: The Desolation of Smaug" }, {$set: { "synopsis" : "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring." } })

//add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
db.movies.update({ "title" : "Pulp Fiction" }, { $addToSet: { "actors": "Samuel L. Jackson" } })

//find all movies that have a synopsis that contains the word "Bilbo"
db.movies.find({ "synopsis": /Bilbo/ })

//find all movies that have a synopsis that contains the word "Gandalf"
db.movies.find({ "synopsis": /Gandalf/ })

//find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"
db.movies.find({ $and: [{ "synopsis": /Bilbo/ }, { "synopsis": { $not: /Gandalf/ } }]})

//find all movies that have a synopsis that contains the word "dwarves" or "hobbit"
db.movies.find({ $or: [{ "synopsis": /dwarves/ }, { "synopsis": /hobbit/ }] })

//find all movies that have a synopsis that contains the word "gold" and "dragon"
db.movies.find({ $and: [{ "synopsis": /gold/ }, { "synopsis": /dragon/ }] })

//delete the movie "Pee Wee Herman's Big Adventure"
db.movies.deleteOne({ "title" : "Pee Wee Herman's Big Adventure" })

//delete the movie "Avatar"
db.movies.deleteOne({ "title" : "Avatar" })

//find all users
db.users.find({})

//find all posts
db.posts.find({})

//find all posts that was authored by "SallySmith"
db.posts.find({ "username": "SallySmith" })

//find all posts that was authored by "JimmyHagen"
db.posts.find({ "username": "JimmyHagen" })

//find all comments
db.comments.find({})

//find all comments that was authored by "SallySmith"
db.comments.find({ "username": "SallySmith" })

//find all comments that was authored by "JimmyHagen"
db.comments.find({ "username": "JimmyHagen" })

//find all comments belonging to the post "Reports a bug in your code"
db.posts.aggregate([{ $match: {"title":"Reports a bug in your code"}},
{$lookup: {from: "comments", localField: "_id", foreignField: "post", as: "all_comments"}},
{$project: {all_comments:1,_id:0}}])
