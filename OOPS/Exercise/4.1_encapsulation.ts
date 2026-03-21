/*
Problem: Build a ShoppingCart class that manages items, supports a one-time discount code, and prevents modifications after checkout.
Requirements:
    Private map/dictionary of items (item name to price)
    Private discount code (can only be applied once)
    Private isCheckedOut flag
    addItem(name, price): adds an item, but only if the cart hasn't been checked out
    applyDiscount(code): if the code is "SAVE10" and no discount has been applied yet, marks the discount as applied and stores it. Returns success/failure.
    getTotal(): returns the sum of all prices, minus 10% if a discount was applied
    checkout(): marks the cart as checked out if it has at least one item. After checkout, no items can be added and no discounts can be applied.
*/

class ShoppingCart{
    private items: Map<string, number> = new Map();
    private discount:string|null=null
    private isCheckout:boolean=false

    // constructor(){
    //     this.discount=''
    //     this.isCheckout=false
    // }

    addItem(item:string,price:number):boolean{
        if(this.isCheckout==false){
            this.items.set(item,price)
            return true
        }
        else{
            console.log("Cart already checked out!")
            return false
        }
    }

    applyDiscount(code:string):boolean{
        if(this.isCheckout || this.discount!=null) return false

        if(code=='SAVE10'){
            this.discount=code
            return true
        }
        return false
    }

    getTotal(){
        let sum:number=0;
        this.items.forEach((price)=>{
            sum+=price
        })
        if(this.discount==='SAVE10'){
            sum=sum*(0.9)
        }
        return sum
    }

    checkout():boolean{
        if(this.items.size>=1){
            this.isCheckout=true;
            return true;
        }
        return false
    }
}

const element:ShoppingCart = new ShoppingCart()

element.addItem("phone",100)
element.addItem("food",200)
element.addItem("laptop",500)

console.log(element.getTotal())
element.applyDiscount("SAVE10")
console.log(element.getTotal())
element.checkout()
element.addItem("book",100)