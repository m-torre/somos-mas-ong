"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Testimonials",
      [
        {
          name: "Juan Pérez",
          content:
            "Muchas gracias por la gestión de María y Marita, y por el beneficio que brinda la fundación. Los chicos del barrio están muy agradecidos.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Florencia Lugones",
          content:
            "Gracias al apoyo escolar que dan en la fundación tengo un espacio donde consultar cuando se me complican las cosas del colegio.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Romina Rodriguez",
          content:
            "Con las ayudantías mi hijo puede ir conociendo cómo es el mundo laboral en un espacio agradable y supervisado.",
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
