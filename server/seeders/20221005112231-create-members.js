"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Members",
      [
        {
          name: "María Iraola",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/Maria-Iraola.jpg",
          description:
            "María estudió economía y se especializó en economía para el desarrollo. Comenzó como voluntaria en la fundación y fue quien promovió el crecimiento y la organización de la institución acompañando la transformación de un simple comedor barrial al centro comunitario de atención integral que es hoy en día.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marita Gomez",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/Marita-Gomez.jpeg",
          description:
            "Marita estudió la carrera de nutrición y se especializó en nutrición infantil. Toda la vida fue voluntaria en distintos espacios en el barrio hasta que decidió abrir un comedor propio. Comenzó trabajando con 5 familias y culminó su trabajo transformando Somos Más en la organización que es hoy.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Miriam Rodriguez",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/Miriam-Rodriguez.jpg",
          description: "Terapista Ocupacional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cecilia Mendez",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/Cecilia-Mendez.jpeg",
          description: "Psicopedagoga",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marco Fernandez",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/Marco-Fernandez.jpg",
          description: "Profesor de Educación Física",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "María García",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/Maria-Garcia.jpg",
          description: "Profesora de Artes Dramáticas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rodrigo Fuente",
          image:
            "https://somos-mas-ong.s3.sa-east-1.amazonaws.com/Rodrigo-Fuente.jpg",
          description: "Contador",
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
