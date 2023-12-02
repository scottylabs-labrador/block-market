import user
import block
from fastapi import FastAPI

# keeps track of number of sell orders at each price
countSellOrdersByPrice = dict()
# keeps track of sell orders at each price
sellOrdersByPrice = dict()

# assumes the order hasn't been matched yet
def findMatch(buyOrder):
    if buyOrder.command() == "buy":
        price = buyOrder.getPrice()
        food = buyOrder.getfoodItem()
        vendor = buyOrder.getVendor()
        if countSellOrdersByPrice[price] == 0:
            return f"Your request was not matched. Please enter a higher price than {price}"
        else:
            for sellOrder in sellOrdersByPrice[price]:
                if sellOrder.getMatchStatus() == False:
                    if sellOrder.getfoodItem() == food and sellOrder.getVendor() == vendor:
                        return f'Your request was matched! Connect to {sellOrder.getUserID}'


app = FastAPI()
@app.put("/user")
def returnUserID(firstName, lastName):
    user1 = user(firstName, lastName)
    return f'account_id: {user1.getUserID()}'

@app.post("/order")
def createOrder(typeBlock, price, foodItem, vendor, command, userID):
    newBlock = block(typeBlock, price, foodItem, vendor, command, userID)
    if command == "sell" or command == "buy":
        if command == "sell":
            if countSellOrdersByPrice[price] == 0:
                countSellOrdersByPrice[price] = 0
                sellOrdersByPrice[price] = [newBlock]
            else:
                countSellOrdersByPrice[price] += 1
                sellOrdersByPrice[price].append(newBlock)
    else:
        return "Incorrect command."
    return f'matched: {newBlock.getMatchStatus()}\nprice: {newBlock.getPrice}\nmarket_status:{countSellOrdersByPrice}'

@app.get("/market")
def listMarketState():
    return countSellOrdersByPrice

@app.get("/")
async def root():
    return {"message": "Block Market"}
