module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define(
    "Subscriber",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: true,
      createdAt: "subscribed_at",
      updatedAt: false,
    }
  );

  return Subscriber;
};
