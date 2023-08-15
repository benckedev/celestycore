// Classe de banco de dados do sistema principal das APIs da Celesty

// Definição da classe do banco de dados "Database"
class Database {

    // Criação de variáveis privadas para cada uma das opções de banco de dados 
    #mongo
    #sql

    /**
     * - Select "sql" to make a local connection with Postgres
     * - Opt for "mongo" connecting to MongoDB connection
     * @param {*} options
     **/
    constructor(options = {
        sql: true,
        mongo: null
    }) {

        // Verifica, se caso o modo SQL esteja desativado, a definição de "mongo" é válida
        if (options.sql === false && options.mongo === null) throw { name: "InvalidArguments", message: `Please enter a valid value for "mongo?"` }

        // Definição das variáveis locais de modos de conexão de banco de dados
        this.#sql = options.sql
        this.#mongo = options.mongo

        return this.start()

    }

    start() {

        // Verifica se a opção "sql" foi definida como método de banco de dados
        if (this.#sql === false) {

            // Verifica se a dependência "mongoose" está instalada em "node_modules"
            if (!require.resolve("mongoose")) throw { name: "DependencyNotFound", message: `Install dependency "mongoose"` }


            // Retorna a conexão em MongoDB
            return {
                // Define o modo de conexão da database
                mode: "MONGO",
                ...this.#mongo
            }

        } else {

            // Verifica se a dependência "lowdb-node" está instalada em "node_modules"
            if (!require.resolve("lowdb-node")) throw { name: "DependencyNotFound", message: `Install dependency "lowdb-node"` }

            // Retorna o módulo SQL para trabalhar em outras APIs
            return {
                // Define o modo de conexão da database
                mode: "LOW",
                ...require('lowdb-node')
            }
        }
    }
}

// Exportação do tipo "module" para acessar a classe Database
module.exports = Database