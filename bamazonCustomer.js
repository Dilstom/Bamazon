var mysql = require("mysql");
var inquirer = require('inquirer');
var table = require('cli-table');
require("console.table");
var leftItem;
var getItemId = 0;
var selectedItem;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("Connected as id " + connection.threadId);
    afterConnection();

});

function afterConnection() {
    connection.query("SELECT * FROM products1", function (err, res) {
        if (err) throw err;
        console.table(res);
        // // console.log(res);
        // var newTable = new table({
        //     head: ['Product ID', 'Product Name', 'Department Name', 'Product Price', 'Stock Quantity']
        //     //   , colWidths: [100, 200]
        // });
        // // table.push(
        // //     ['First value', 'Second value']
        // //   , ['First value', 'Second value']
        // // );
        // for (var i = 0; i < res.length; i++) {
        //     var allItems = [];
        //     for (var listResult in res[i]) {
        //         allItems.push(res[i][listResult]);
        //     }
        //     newTable.push(allItems);
        // }
        // console.log(newTable.toString());

    });
    start();
}

//a) message "Id to buy" -  (and Quit)-> b) message "How many" -> updated table with new prompt


function start() {
    connection.query("\nSELECT * FROM products1", function (err, results) {
        if (err) throw err;
        // once you have the product list, prompt the user for which they'd like to buy
        inquirer
            .prompt([
                {
                    name: "itemId",
                    type: "input",
                    message: "What is ID of the Product you would like to purchase? ('Ctrl + c' to exit) "
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy? ('Ctrl' + 'c' to exit)"
                }
            ])
            .then(function (answer) {
                // console.log('answer', answer)
                // console.log('results', results)
                getItemId = parseInt(answer.itemId);
                selectedItem = results[getItemId - 1];
                console.log("Selected Item : " + selectedItem.product_name);
                console.log("Quantity: " + answer.quantity);

                if(selectedItem.stock_quantity <= answer.quantity){
                    // display - inventory is not enough
                    console.log("Insufficient quantity!");
                    start();
                } else {
                    leftItem = parseInt(selectedItem.stock_quantity - answer.quantity);
                    // console.log("Items left: " + leftItem);
                                 
                connection.query(
                    "UPDATE products1 SET ? WHERE ?",
                    [
                        {
                            stock_quantity: leftItem,
                        }, {
                            item_id: answer.itemId
                        }
                    ],
                    function (error) {
                        if (error) {
                            console.log('error:', error)
                            return;
                        };
                        var itemIndex = getItemId - 1;
                        // console.log("itemId is:", getItemId);
                        var total = parseInt(results[itemIndex].price*answer.quantity); 
                        
                        // console.log('Database has been updated with new quantity');
                        console.log('Total cost of this purchase is: $' + total+ '\n');
                        afterConnection();

                    }
                
                )}

            });
        }) 
    }           