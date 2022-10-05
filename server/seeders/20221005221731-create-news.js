"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "News",
      [
        {
          name: "Juntos en la vuelta al cole",
          content:
            "A través de esta iniciativa buscamos que todos los niños y niñas puedan volver al colegio con todo lo necesario. Hablamos con las madres de los chicos que vienen al comedor y muchas expresaron la necesidad de que sus hijos sigan estudiando, pero los útiles de este año están muy caros. Por lo tanto, estamos recibiendo donaciones de útiles escolares para poder afrontar el regreso a la escuela de sus asistentes más pequeños.",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/juntos-vuelta-cole.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Juguetes por más sonrisas",
          content:
            "Como todos los años, seguimos con la campaña de jueguetes por más sonrisas juntando juguetes para regalarles en el día del niño a los chicos que asisten a la fundación. Cualquier juguete que esté en buen estado, algo que se pueda usar, pueden ser peluches, pizarrones, juguetes didácticos, nos sirve y es muy bien recibido por nosotros. En el caso de los juguetes usados realizamos todo un proceso de restauración, ya que los cosemos, los rellenamos, les pegamos los ojos, narices, restaurandolos así completamente.",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/juguetes-por-mas-sonrisas.png",
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
