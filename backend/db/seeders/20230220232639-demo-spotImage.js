'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options,[{
      spotId: 1,
      url: "https://lh3.googleusercontent.com/p/AF1QipNliLMj6OFAC-4mfbhtUBrshwN5HrsFlXKbDrYT=s1360-w1360-h1020",
      preview: true
    },
    {
      spotId: 1,
      url: "https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/5e3a384c96ecbe8564dadb2a_Artboard%20Copy%206-p-500.webp",
      preview: false
    },
    {
      spotId: 1,
      url: "https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/5e3a384c96ecbe8564dadb2a_Artboard%20Copy%206-p-500.webp",
      preview: false
    },
    {
      spotId: 1,
      url: "https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/5e3a384c96ecbe8564dadb2a_Artboard%20Copy%206-p-500.webp",
      preview: false
    },
    {
      spotId: 1,
      url: "https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/5e3a384c96ecbe8564dadb2a_Artboard%20Copy%206-p-500.webp",
      preview: false
    },
    {
      spotId: 2,
      url: "https://s3-media0.fl.yelpcdn.com/bphoto/Y76JNq3M910-wGPYz7BeGA/348s.jpg",
      preview: false
    },
    {
      spotId: 2,
      url: "https://cdn.vox-cdn.com/thumbor/hr49ZocPFudPLdNY1ObF6_y2P-0=/0x0:2000x1333/1200x675/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/62618574/TrailblazerTavern_PChang_4346.0.jpg",
      preview: true
    },
    {
      spotId: 2,
      url: "https://s3-media0.fl.yelpcdn.com/bphoto/Y76JNq3M910-wGPYz7BeGA/348s.jpg",
      preview: false
    },
    {
      spotId: 2,
      url: "https://s3-media0.fl.yelpcdn.com/bphoto/Y76JNq3M910-wGPYz7BeGA/348s.jpg",
      preview: false
    },
    {
      spotId: 2,
      url: "https://s3-media0.fl.yelpcdn.com/bphoto/Y76JNq3M910-wGPYz7BeGA/348s.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://randompicturegenerator.com/img/national-park-generator/ged4a87053c3da47721249ae18a64f6a86bc93aa983668c9c8c0315e5bb1711cf07db98b44f1a08fd3db2d1499ebdc76e_640.jpg",
      preview: true
    },
    {
      spotId: 3,
      url: "https://randompicturegenerator.com/img/national-park-generator/g5142e8cc14a284a4d301d4982fa39e2950dfbbfb1c1bf791caddce01a33d1a3ef2367e396312b055ce5af7b6e34148c1_640.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://randompicturegenerator.com/img/national-park-generator/gb0e971dc6754dbb6e493da43a2145613a9e3f853acbf4791dd03c9e6e21679762fab286a342c24e83aace80f5cccbfaf_640.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://randompicturegenerator.com/img/national-park-generator/g44d930863a337b3fead5a74fee69599288b82f73b00c301a6f24aa57eb59513bc0c13d2ce91308742e1f7c2fe71eb796_640.jpg",
      preview: false
    },
    {
      spotId: 3,
      url: "https://randompicturegenerator.com/img/national-park-generator/g44d930863a337b3fead5a74fee69599288b82f73b00c301a6f24aa57eb59513bc0c13d2ce91308742e1f7c2fe71eb796_640.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://jameskaiser.com/wp-content/uploads/2014/12/yosemite-national-park-hotels-in-park.jpg",
      preview: true
    },
    {
      spotId: 4,
      url: "https://randomwordgenerator.com/img/picture-generator/54e7d043435ba914f1dc8460962e33791c3ad6e04e507441722872d5934dc2_640.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://randomwordgenerator.com/img/picture-generator/54e7d043435ba914f1dc8460962e33791c3ad6e04e507441722872d5934dc2_640.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://randomwordgenerator.com/img/picture-generator/54e7d043435ba914f1dc8460962e33791c3ad6e04e507441722872d5934dc2_640.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://randomwordgenerator.com/img/picture-generator/54e7d043435ba914f1dc8460962e33791c3ad6e04e507441722872d5934dc2_640.jpg",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/d4a7343f-6475-4e58-a3ce-0e28599a7ea2.jpeg",
      preview: true
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/c7fc8d28-781e-4dc5-a95d-07924e8a2260.jpeg",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/5ad3b2a1-cb05-46ba-8688-ae9525737191.jpeg",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/6c7cb51e-f1db-40cc-920c-ced40d359dd3.jpg",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-729913139274242534/original/3957a2ac-5e99-427e-8699-6854d16958f0.jpeg",
      preview: true
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-729913139274242534/original/5e59a2a8-b66d-4c6e-b900-4d782ab2ae42.jpeg",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-729913139274242534/original/cc5fac01-1742-40cf-98db-2eef4a625c4c.jpeg",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-729913139274242534/original/8c524928-ec8b-42d3-a5c8-580c860453df.jpeg",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-729913139274242534/original/c58644e7-1fd4-4612-abe2-e92edbfd2ce7.jpeg",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/19ab9cad-ef4c-431e-b435-94060b38fa02.jpg",
      preview: true
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/3539cf0f-9244-400c-bf27-fbd2c25e1b64.jpg",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/52f76d6e-1775-4a29-9335-291b5848cad7.jpg",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/78217600-eb37-43ac-898d-0b62500c3f9b.jpg",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/a6fa08ad-6bd4-4993-a3bc-c7394dc8c8dc.jpg",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/6ca5dd2a-a817-4449-8637-4feb2617a612.jpg",
      preview: true
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/94a4a96f-4955-4ff6-83e1-3a4c04c0c341.jpg",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/6e49ba99-b749-4f08-a04e-5c18a94ea02f.jpg",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/b1675744-fb8f-4a54-8481-d535ff4029b6.jpg",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/7b8c62f3-ca4b-4435-87d7-d01ac6902136.jpg",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/4f2607ee-47b8-4695-ab96-46b58969c9a4.jpg",
      preview: true
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/6fe1733f-d675-4de7-b36c-f5e2e78d62ea.jpg",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/4d2c8261-364c-4497-814d-611f4b20e289.jpg",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-634864712812022244/original/2e22e2f6-b6cd-4781-8ba3-6aeb073d7567.jpeg",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/72f134c3-26ed-4d40-8d03-9f8a58954f4b.jpg",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/68bc4aab-a736-417f-b7b6-ff2f1036bfc0.jpg",
      preview: true
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/eabe7240-cacb-4e2b-ae44-2a85460525e2.jpg",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-10965350/original/6ba5cb33-b0ce-46e7-b477-ab76d431783e.jpeg",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/ee6ec9fe-5125-4f11-8baf-bea316958a0f.jpg",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/a57858cb-0a5b-495e-9e1a-9e2ea37763b3.jpg",
      preview: true
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/f21a3b97-7c20-4120-8cf0-d6b5251bf49f.jpg",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/a00aab1b-105f-4bc9-b4db-c3662b7a0d90.jpg",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/e4d3f619-ca6d-48bc-8882-e4eb2d8eef70.jpg",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-35514489/original/7473d896-d7ab-4457-a26e-893208c35f80.jpeg",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-754944155491608444/original/29df9205-969b-4b16-875a-dde8c681133c.jpeg",
      preview: true
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-754944155491608444/original/9cbc2b4c-e353-429c-8a04-d3d8b463317a.jpeg",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-754944155491608444/original/b0c4b5fc-c94f-4d2d-8700-c1d0c5f4ac55.jpeg",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-754944155491608444/original/f19e44af-eba9-4ac4-8e44-c1f71c60e224.jpeg",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-754944155491608444/original/38b9e865-c260-4dab-af28-e768eec9df7b.jpeg",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-791091294541743329/original/72e6e374-1305-41e5-a901-774df9a12ef9.jpeg",
      preview: true
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-791091294541743329/original/5519de68-289e-477d-840a-9bd8174e1a75.jpeg",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-791091294541743329/original/ea7f166f-6e68-40c8-9ace-0b040eb80db4.jpeg",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-791091294541743329/original/aba15c2d-8da3-4754-b36a-276137911821.jpeg",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-791091294541743329/original/7df0dacc-a234-4fcb-b1bc-34c357832307.jpeg",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-817454084630289813/original/a4ec362b-0d3c-41e8-be16-71c5605841ff.jpeg",
      preview: true
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-817454084630289813/original/f2a0165f-97df-4a28-95a5-12f9e3cdd69f.jpeg",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-817454084630289813/original/026eb6cd-4dd8-445d-9f34-a106b2eb66d5.jpeg",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-817454084630289813/original/9cc5d9e3-1d75-42f2-8efc-0f9a62ac703a.jpeg",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-817454084630289813/original/b147206a-90c9-46e1-bfd9-80236e5fa9e3.jpeg",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-638990296543110131/original/0fcd6c33-cad6-4a21-b27e-24ff6062c858.jpeg",
      preview: true
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-638990296543110131/original/efc7d734-1307-430b-8c8d-8e548c14e85c.jpeg",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-638990296543110131/original/a79ee733-0039-400d-8855-6f7bb3a7c7f0.jpeg",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-638990296543110131/original/44404210-7ac3-4717-af61-51cf80694c4d.jpeg",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-638990296543110131/original/b9b85a48-e40a-41ce-8351-0acbc8d99ed0.jpeg",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-32515033/original/2b5b3816-6845-4e1a-a016-718da27353fc.jpeg",
      preview: true
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-32515033/original/76188f9f-cb1f-439d-bf72-17ad5782448d.jpeg",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-32515033/original/d934de03-d414-4a64-9fb0-90532b18c54e.jpeg",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-32515033/original/8d647b10-4964-48f8-8e66-6f9621658e24.jpeg",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-32515033/original/df0d1a08-3e3c-4842-9a05-1b1a3ea377f2.jpeg",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-762475575301794937/original/0f209cfe-6316-4268-8eee-7702c0fa9ea7.jpeg",
      preview: true
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-762475575301794937/original/b2079d51-e438-49a6-b777-f7c073d637d7.jpeg",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/airflow/Hosting-762475575301794937/original/7b9df085-5e98-46c0-bbdd-66d78902a814.jpg",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/airflow/Hosting-762475575301794937/original/7028d63a-5b14-49ee-8918-b6d48ec8645b.jpg",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/airflow/Hosting-762475575301794937/original/f877f362-d167-4c24-8ae6-5a8d1d873dc7.jpg",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/airflow/Hosting-549724500663566775/original/f2fe38d0-7062-4b37-bd16-6aaebc1fa00c.jpg",
      preview: true
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/airflow/Hosting-549724500663566775/original/9a599f4d-f99c-42cd-8e3f-01526667872d.jpg",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/airflow/Hosting-549724500663566775/original/2fd9035f-8bee-4880-a0f0-964dcd513616.jpg",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/airflow/Hosting-549724500663566775/original/744b859d-c992-4b01-b279-8a3c608cfd06.jpg",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/airflow/Hosting-549724500663566775/original/0d9ea2ae-95e6-441a-af96-65f307387e09.jpg",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/4797361b-fa85-47cc-b417-b71ebd6ef7b8.jpg",
      preview: true
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/32bfb0d7-1d94-40e7-b171-7674f169dd44.jpg",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/631c8926-9ed6-4226-b5c4-c5452e84e6ba.jpg",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/4e0c2b72-1d57-4190-b7b7-102642906cda.jpg",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/7efd55a4-6a9c-4694-a34e-6e0333abe708.jpg",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/33598197-8b44-4a62-8ddc-6ea943910a9e.jpg",
      preview: true
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-53632125/original/ea274373-0c7f-463c-bc53-0e89918c0d6c.jpeg",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/895ab917-8d58-4db8-a8ee-8d334c97051e.jpg",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/91dfd86a-6cf3-4b67-999a-321ae828a0ab.jpg",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/e7e742f0-e33f-4416-93d3-25a05ee4c08d.jpg",
      preview: false
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
