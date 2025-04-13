module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    "page",
    {
      title: DataTypes.STRING,
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      content: DataTypes.TEXT,
      is_published: {
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

  Page.beforeValidate((page) => {
    if (!page.slug && page.title) {
      page.slug = page.title.toLowerCase().replace(/\s+/g, "-");
    }
  });

  return Page;
};
