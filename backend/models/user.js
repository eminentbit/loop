const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  class User extends Model {
    // Method to compare passwords during login
    async validPassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("jobseeker", "recruiter", "investor"),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_staff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      // Recruiter specific
      company_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      industry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      additional_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // Jobseeker/Investor specific
      current_job_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      experience_level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primary_skills: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      career_interests: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location_preference: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User", // Changed from UserAccount to User
      tableName: "users", // Changed from user_accounts to users
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};
