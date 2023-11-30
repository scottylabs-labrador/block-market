class block:
    # initialize order info when an order is made
    def __init__(self, typeBlock, price, foodItem, vendor, command, creatorUserID):
        # refers to lunch, dinner
        self.typeBlock = typeBlock
        self.price = price
        self.foodItem = foodItem
        self.vendor = vendor
        self.command = command
        self.creatorUserID = creatorUserID
        self.matched = False
    
    def getPrice(self):
        return self.price
    
    def getFoodItem(self):
        return self.foodIten
    
    def getMatchStatus(self):
        return self.matched
    
    # represents the order as an f-string
    def __repr__(self):
        if self.command == "buy":
            # ex. $5 - dinner block - pasta from ciao bella - buyer: nlingam2983
            return f'${self.price} - {self.typeBlock} Block - {self.foodItem} from {self.vendor} - Buyer: {self.creatorUserID}'
        elif self.command == "sell":
            # ex. $5 - dinner block - seller: jdoe9283
            return f'${self.price} - {self.typeBlock} Block - Seller: {self.creatorUserID}'

    def __hash__(self):
        return hash(str(self))