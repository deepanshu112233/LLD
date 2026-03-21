/*
Refactor OrderService
Problem: An OrderService directly creates and uses a MySQLDatabase object to save orders. 
If you want to switch to PostgreSQL or MongoDB, you would have to rewrite OrderService. 
Refactor by introducing a Database interface so OrderService depends on the abstraction, not the concrete database. 
Then add a PostgresDatabase implementation and show both databases working with the same OrderService.

Requirements:

Create a Database interface with insert(table, data) and query(table, id) methods
Make MySQLDatabase implement the Database interface
Create a PostgresDatabase implementation that prints "PostgreSQL: ..." instead of "MySQL: ..."
Refactor OrderService to accept a Database through its constructor instead of creating one internally
Show OrderService working with both databases without changing OrderService

*/


interface Databse{
    insert(table: string, data: string): void;
    query(table: string, id: number): any;
}

class MySQLDatabase implements Databse{
    insert(table: string, data: string): void {
        console.log(`MySQL: Inserting into ${table} - ${data}`);
    }
    query(table: string, id: number) {
        console.log(`MySQL: Querying ${table} for id ${id}`);
        return { id, data: `Data from MySQL for ${table}` };
    }
}

class PostgresDatabase implements Databse{
    insert(table: string, data: string): void {
        console.log(`PostgreSQL: Inserting into ${table} - ${data}`);
    }
    query(table: string, id: number) {
        console.log(`PostgreSQL: Querying ${table} for id ${id}`);
        return { id, data: `Data from PostgreSQL for ${table}` };
    }
}

class OrderService {
    private database: Databse;
    constructor(database: Databse) {
        this.database = database;
    }
    saveOrder(orderId: number, orderData: string): void {
        this.database.insert('orders', `OrderID: ${orderId}, Data: ${orderData}`);
    }
    getOrder(orderId: number): any {
        return this.database.query('orders', orderId);
    }
}

// Using MySQLDatabase
const mysqlService = new OrderService(new MySQLDatabase());
mysqlService.saveOrder(1, 'MySQL Order Data');
console.log(mysqlService.getOrder(1));


// Using PostgresDatabase
const postgresService = new OrderService(new PostgresDatabase());
postgresService.saveOrder(2, 'PostgreSQL Order Data');
console.log(postgresService.getOrder(2));