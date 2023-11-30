import random

class users:
    def __init__(self, firstName, lastName):
        self.firstName = firstName
        self.lastName = lastName
        self.userID = createUserID(firstName, lastName)
    
    def getFirstName(self):
        return self.firstName
    
    def getLastName(self):
        return self.lastName
    
    def getUserID(self):
        return self.userID
    
def createUserID(firstName, lastName):
    return firstName[0] + lastName + random.randInt(0, 1000)
