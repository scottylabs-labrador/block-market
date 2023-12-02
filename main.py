import user
import block
from fastapi import FastAPI

# keeps track of number of orders at each price
countSellOrdersByPrice = dict()
# keeps track of order objects at each price
sellOrdersByPrice = dict()

# prints out the dictionary of the counts of sell orders at each price
def listCountOfSellOrders():
    orderCounts = "orders: "
    for price in countSellOrdersByPrice:
        countAtPrice = countSellOrdersByPrice[price]
        orderCounts += f'{price}: {countAtPrice},\n'
    return orderCounts

app = FastAPI()
@app.put("/user")
def returnUserID(firstName, lastName):
    user1 = user(firstName, lastName)
    return f'account_id: {user1.getUserID()}'

@app.post("/order")
def createOrder(typeBlock, price, foodItem, vendor, command, userID):
    newBlock = block(typeBlock, price, foodItem, vendor, command, userID)
    if command == "sell":
        if countSellOrdersByPrice[price] == 0:
            countSellOrdersByPrice[price] = 0
            sellOrdersByPrice[price] = newBlock
        else:
            countSellOrdersByPrice[price] += 1
            sellOrdersByPrice[price].add(newBlock)
    return f'matched: {newBlock.getMatchStatus()}\nprice: {newBlock.getPrice}\nmarket_status:{listCountOfSellOrders()}'

@app.get("/market")
def listMarketState():
    listCountOfSellOrders()

@app.get("/")
async def root():
    return {"message": "Block Market"}
