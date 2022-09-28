"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Usuario",
          lastName: "Administrador",
          email: "admin@test.com",
          passwordHash:
            "$2b$10$jZeUsmI4/eSu9ZCMMWOUnuiafMlBd9ump/ctsPeYMafjhooTOP9Te",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Usuario",
          lastName: "Regular",
          email: "standard@test.com",
          passwordHash:
            "$2b$10$jZeUsmI4/eSu9ZCMMWOUnuiafMlBd9ump/ctsPeYMafjhooTOP9Te",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
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
