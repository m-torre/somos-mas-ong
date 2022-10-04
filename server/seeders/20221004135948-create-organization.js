"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Organizations",
      [
        {
          name: "Somos Más",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/somos-mas-logo.png",
          email: "somosfundacionmas@gmail.com",
          phone: "1160112988",
          FacebookURL: "https://www.facebook.com/Somos_Más",
          InstagramURL: "https://www.instagram.com/SomosMás",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
