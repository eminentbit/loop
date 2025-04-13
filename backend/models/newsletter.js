module.exports = (sequelize, DataTypes) => {
  const Newsletter = sequelize.define(
    "Newsletter",
    {
      subject: DataTypes.STRING,
      body: DataTypes.TEXT,
      send_date: DataTypes.DATE,
      is_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Newsletter;
};
