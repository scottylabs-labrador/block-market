# have a class of buyers
class buyers:
    # constructor initializes buyer's firstname, lastname, ID
    def __init__(self, firstName, lastName, grubhubID):
        self.firstName = firstName
        self.lastName = lastName
        self.ID = grubhubID
    
    # lists out the buyers requests
    def listOrders():
        return None

# have a class of sellers   
class sellers:
    def __init__(self, firstName, lastName, grubhubID):
        self.firstName = firstName
        self.lastName = lastName
        self.ID = grubhubID

class orders:
    # initialize order info when an order is made
    def __init__(self, typeBlock, price, buyerFirstName, buyerLastName, buyerGrubhubID):
        # refers to lunch, dinner
        self.typeBlock = typeBlock
        self.price = price
        self.buyerFirstName = buyerFirstName
        self.buyerLastName = buyerLastName
        self.buyerGrubhubID = buyerGrubhubID
    
    # represents the order as an f-string
    def __repr__(self):
        return f'${self.price} - {self.typeBlock} Block - Buyer: {self.buyerFirstName} {self.buyerLastName}'

# if click to "add order", construct a new order
# if click cart, buyer can enter details of how much they're bidding for, which meal the block is for
    