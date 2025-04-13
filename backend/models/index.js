const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db"); // Import the sequelize instance from db.js

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load the models (ensure paths are correct)
db.User = require("./user.js")(sequelize, DataTypes);
db.Profile = require("./profile.js")(sequelize, DataTypes); // Renamed to Profile
db.Follow = require("./follow.js")(sequelize, DataTypes); // Check if Follow model is still needed
db.Page = require("./page.js")(sequelize, DataTypes);
db.Event = require("./event.js")(sequelize, DataTypes);
db.Subscriber = require("./subscriber.js")(sequelize, DataTypes);
db.Newsletter = require("./newsletter.js")(sequelize, DataTypes);

// Define model associations (relationships)
db.User.hasOne(db.Profile, { foreignKey: "userId", onDelete: "CASCADE" });
db.Profile.belongsTo(db.User, { foreignKey: "userId" });

// If using Follow model:
db.User.hasMany(db.Follow, { foreignKey: "followerId", as: "followingSet" });
db.User.hasMany(db.Follow, { foreignKey: "followingId", as: "followersSet" });
db.Follow.belongsTo(db.User, { foreignKey: "followerId", as: "follower" });
db.Follow.belongsTo(db.User, { foreignKey: "followingId", as: "following" });

db.User.hasMany(db.Page, { foreignKey: "authorId" });
db.Page.belongsTo(db.User, { foreignKey: "authorId" });

db.User.hasMany(db.Event, { foreignKey: "organizerId" });
db.Event.belongsTo(db.User, { foreignKey: "organizerId" });

db.User.hasMany(db.Subscriber, { foreignKey: "userId" });
db.Subscriber.belongsTo(db.User, { foreignKey: "userId" });

db.Newsletter.belongsToMany(db.Subscriber, {
  through: "NewsletterSubscribers",
  foreignKey: "newsletterId",
});
db.Subscriber.belongsToMany(db.Newsletter, {
  through: "NewsletterSubscribers",
  foreignKey: "subscriberId",
});

// Export the db object with all models and Sequelize instance
module.exports = db;
