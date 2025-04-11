module.exports = (sequelize, DataTypes) => {
  // Course Model
  const Course = sequelize.define(
    "Course",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Enrollment Model
  const Enrollment = sequelize.define(
    "Enrollment",
    {
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hours_spent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      quizzes_taken: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Streak Model
  const Streak = sequelize.define(
    "Streak",
    {
      day: {
        type: DataTypes.STRING(3), // 'Sun', 'Mon', etc.
        allowNull: false,
      },
      active: {
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

  // Relationships (Assuming you have a User model already defined)
  Enrollment.belongsTo(sequelize.models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  Enrollment.belongsTo(Course, {
    foreignKey: "courseId",
    onDelete: "CASCADE",
  });

  Streak.belongsTo(sequelize.models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  return { Course, Enrollment, Streak };
};
