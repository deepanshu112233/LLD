/*
Refactor OrderService God Class
Problem: You have an OrderService class that handles order processing, inventory management,
and sending notifications. This class has three distinct responsibilities tangled together. 
Your task is to refactor it into three focused classes: OrderProcessor, InventoryManager, and NotificationService.

Requirements:

OrderProcessor should handle order validation and total calculation
InventoryManager should handle stock checks and stock updates
NotificationService should handle sending order confirmation messages
Each class should accept dependencies through its constructor (or method parameters) rather than doing everything internally

*/




class OrderProcessor {
  private inventoryManager: InventoryManager;
  private notificationService: NotificationService;
  private orderCounter = 0;

  constructor(inventoryManager: InventoryManager, notificationService: NotificationService) {
    this.inventoryManager = inventoryManager;
    this.notificationService = notificationService;
  }

  placeOrder(productId: string, quantity: number, customerEmail: string): void {
    if (!this.inventoryManager.checkStock(productId, quantity)) {
      console.log(`Insufficient stock for ${productId}`);
      return;
    }
    this.inventoryManager.reduceStock(productId, quantity);
    const total = quantity * 100.0;
    this.orderCounter++;
    const orderId = `ORD-${this.orderCounter}`;
    this.notificationService.sendOrderConfirmation(customerEmail, orderId, total);
  }
}

class InventoryManager{
    private stock:Map<string,number>

    constructor(){
        this.stock = new Map([
        ['LAPTOP',100],   
        ['Mobile',12]
        ])
    }

    checkStock(productId: string, quantity: number): boolean {
        return (this.stock.get(productId) ?? 0) >= quantity;
    }

    reduceStock(productId: string, quantity: number): void {
        this.stock.set(productId, this.stock.get(productId)! - quantity);
    }
    
}

class NotificationService{

    sendOrderConfirmation(email:string,orderId:string,total:number){
        console.log(`Order placed for Email: ${email}. OrderId: ${orderId}. Total: ${total}`)
    }

}


const inventory = new InventoryManager();
const notifications = new NotificationService();
const processor = new OrderProcessor(inventory, notifications);
processor.placeOrder("LAPTOP", 1, "alice@example.com");