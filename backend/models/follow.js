module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {},
    {
      indexes: [{ unique: true, fields: ["followerId", "followingId"] }],
    }
  );

  return Follow;
};
