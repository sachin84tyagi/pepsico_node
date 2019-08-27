// ts-check
const CosmosClient = require("@azure/cosmos").CosmosClient;
const debug = require("debug")("todo:taskdao");
class TaskDao {
    /**
     * Manages reading, adding, and updating Tasks in Cosmos DB
     * param {CosmosClient} cosmosClient
     * param {string} databaseId
     * param {string} containerId
     */
    constructor(cosmosClient, databaseId, containerId) {
        this.client = cosmosClient;
        this.databaseId = databaseId;
        this.collectionId = containerId;

        this.database = null;
        this.container = null;
    }

    async init() {

        console.log("Setting up the database...");
        const dbResponse = await this.client.databases.createIfNotExists({
            id: this.databaseId
        });

        this.database = dbResponse;
        console.log("Setting up the database...done!", this.databaseId);

        console.log("Setting up the container...", this.collectionId);
        // const coResponse = await this.database.containers.createIfNotExists({
        //     id: this.collectionId
        // });

        const coResponse = await this.client.database(this.databaseId).containers.createIfNotExists({ id: this.collectionId });
        //console.log(coResponse)
        this.container = coResponse;
        console.log("Setting up the container...done!");

    }

    async readData() {

        // const { body: databaseDefinition } = await this.client.database(this.databaseId).read();
        // console.log(`Reading database:\n${Object.getOwnPropertyNames(databaseDefinition)}\n`);

        const { body: containerDefinition } = await this.client.database(this.databaseId).container(this.collectionId).read();
        console.log(`Reading container:\n${containerDefinition.id}\n`);

        //const iterator = await this.client.database(this.databaseId).containers.readAll();
        //const { result: containersList } = await iterator.toArray();
        //console.log(" --- Priting via iterator.toArray");
        //console.log(containersList);
        //return containersList;

        //return await this.client.database(this.databaseId).read();
        //const productsData = await this.client.database(this.databaseId).read();
        //console.log("productsData :", productsData)
        //return productsData;

    }

    async queryContainerAllData() {
        // query to return all children in a family
        const querySpec = {
            query: "SELECT r.rackid,r.percentage,r.datetime,r.id FROM root r ORDER BY r.datetime DESC",
            parameters: [
                {
                    name: "@rackid"
                }
            ]
        };

        const { result: results } = await this.client.database(this.databaseId).container(this.collectionId).items.query(querySpec, { enableCrossPartitionQuery: true }).toArray();
        //   for (var queryResult of results) {
        //      var resultString = JSON.stringify(queryResult);

        //   }
        var resultString = JSON.stringify(results);
        return resultString;
    };

    async queryContainer(id) {
        // query to return all children in a family
        const querySpec = {
            query: "SELECT r.rackid,r.percentage,r.datetime,r.id FROM root r WHERE  CONTAINS ( r.rackid, @rackid) ORDER BY r.datetime DESC OFFSET 0 LIMIT 1",
            parameters: [
                {
                    name: "@rackid",
                    value: id
                }
            ]
        };

        const { result: results } = await this.client.database(this.databaseId).container(this.collectionId).items.query(querySpec, { enableCrossPartitionQuery: true }).toArray();
        //   for (var queryResult of results) {
        //      var resultString = JSON.stringify(queryResult);

        //   }
        var resultString = JSON.stringify(results);
        console.log("% Test DATA => ", resultString)
        return resultString;
    };


    async queryRacks() {
        // query to return all children in a family
        const querySpec = {
            query: "SELECT * FROM root r"
        };

        const { result: results } = await this.client.database(this.databaseId).container("rack").items.query(querySpec, { enableCrossPartitionQuery: true }).toArray();
        //   for (var queryResult of results) {
        //      var resultString = JSON.stringify(queryResult);

        //   }
        var resultString = JSON.stringify(results);
        console.log("% Test DATA => ", resultString)
        return resultString;
    };


    async queryContainer2() {
        // query to return all children in a family
        const querySpec = {
            query: "SELECT * FROM root"
        };
        console.log("query started on database id ", this.databaseId);
        console.log("query started on Container id ", this.collectionId);
        const { result: results } = await this.client.database(this.databaseId).container(this.collectionId).items.query(querySpec, { enableCrossPartitionQuery: true }).toArray();
        for (var queryResult of results) {
            let resultString = JSON.stringify(queryResult);
            console.log(`\tQuery returned ${resultString}\n`);
        }
    };

    async find(querySpec) {

        if (!this.container) {
            throw new Error("Collection is not initialized.");
        }
        const { result: results } = await this.container.items
            .query(querySpec)
            .toArray();
        console.log("Result: ", results)
        return results;
    }


    async getItem(itemId) {

        const { body } = await this.container.item(itemId).read();
        return body;
    }
}

module.exports = TaskDao;