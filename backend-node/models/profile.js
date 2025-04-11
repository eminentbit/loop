module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("profile", {
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Profile;
};
