const TaskDao = require("../models/TaskDao");

class TaskList {
    /**
     * Handles the various APIs for displaying and managing tasks
     * @param {TaskDao} taskDao
    */
    constructor(taskDao) {
        this.taskDao = taskDao;
    }
    async showTasks(req, res) {
        const querySpec = {
            query: "SELECT * FROM root"
        };

        const items = await this.taskDao.find(querySpec);
        console.log("ITEM DATA: ", items)
        // res.render("index", {
        //     title: "My ToDo List ",
        //     tasks: items
        // });
    }

    async showProductsData(req, res, id) {
        console.log("Show Products Data");
        const queryData = await this.taskDao.queryContainer(id);
        console.log("Show Products Data 3333333 ", queryData);
        return queryData
    }


    async showRacks(req, res) {
        console.log("Show racks Data");
        const queryData = await this.taskDao.queryRacks();
        console.log("Show racks Data 3333333 ", queryData);
        return queryData
    }

    async showProductsAllData() {
        const queryData = await this.taskDao.queryContainerAllData();
        return queryData;
    }


    async completeTask(req, res) {
        const completedTasks = Object.keys(req.body);
        const tasks = [];

        completedTasks.forEach(task => {
            tasks.push(this.taskDao.updateItem(task));
        });

        await Promise.all(tasks);

        res.redirect("/");
    }
}

module.exports = TaskList;