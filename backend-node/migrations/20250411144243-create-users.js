'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('jobseeker', 'recruiter', 'investor'),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      is_staff: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      // Recruiter-specific
      company_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_role: {
        type: Sequelize.STRING,
        allowNull: true
      },
      industry: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      additional_info: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // Jobseeker/Investor-specific
      current_job_title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      experience_level: {
        type: Sequelize.STRING,
        allowNull: true
      },
      primary_skills: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      career_interests: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      location_preference: {
        type: Sequelize.STRING,
        allowNull: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    // Drop the ENUM type in Postgres
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
  }
};
