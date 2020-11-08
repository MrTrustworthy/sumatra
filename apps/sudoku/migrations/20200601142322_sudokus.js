exports.up = function (knex) {
    return knex.schema.createTable("sudokus", (table) => {
        table.increments("id");
        table.string("data").notNullable();
        table.string("creator_id").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("sudokus");
};
