var ListModule = (function () {

    /********************
    * Lists
    *
    ********************/

    function List(arr) {
        var populateList = function (element) {
            this.append(element);
        };
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = [];  // initializes an empty array to store list elements

        if (arr && Array.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                populateList.call(this, arr[i]);
            }
        }
    }

    List.prototype = {
        constructor: List,

        append: function (element) {
            this.dataStore[this.listSize++] = element;
        },

        appendArray: function (arr) {
            if (arr && Array.isArray(arr)) {
                for (var i=0; i < arr.length; ++i) {
                    this.dataStore[this.listSize++] = arr[i];
                }
            }
        },

        length: function () {
            return this.listSize;
        },

        clear: function () {
            delete this.dataStore;
            this.dataStore = [];
            this.listSize = this.pos = 0;
        },

        find: function (element) {
            for (var i = 0; i < this.dataStore.length; ++i) {
                if (this.dataStore[i] == element) {
                    return i;
                }
            }
            return -1;
        },

        toString: function () {
            return this.dataStore;
        },

        insert: function (element, after) {
            var insertPos = this.find(after);
            if (insertPos > -1) {
                this.dataStore.splice(insertPos+1, 0, element);
                ++this.listSize;
                return true;
            }
            return false;
        },

        remove: function (element) {
            var foundAt = this.find(element);
            if (foundAt > -1) {
                this.dataStore.splice(foundAt,1);
                --this.listSize;
                return true;
            }
            return false;
        },

        front: function () {
            this.pos = 0;
        },

        end: function () {
            this.pos = this.listSize-1;
        },

        prev: function () {
            if (this.pos > 0) {
                --this.pos;
            }
        },

        next: function () {
            if (this.pos < this.listSize-1) {
                ++this.pos;
            }
        },

        currPos: function () {
            return this.pos;
        },

        moveTo: function (position) {
            this.pos = position;
        },

        getElement: function () {
            return this.dataStore[this.pos];
        },

        contains: function (element) {
            for (var i = 0; i < this.dataStore.length; ++i) {
                console.log(this.dataStore[i], element, this.dataStore[i] == element, this.dataStore);
                if (this.dataStore[i] == element) {
                    return true;
                }
            }
            return false;
        }
    };

    /********************
    * Stacks
    *
    ********************/

    function Stack(arr) {
        var populateStack = function (element) {
            this.push(element);
        };
        this.top = 0;
        this.dataStore = [];  // initializes an empty array to store list elements

        if (arr && Array.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                populateStack.call(this, arr[i]);
            }
        }
    }

    Stack.prototype = {
        constructor: Stack,

        push: function (element) {
            this.dataStore[this.top++] = element;
        },

        pop: function () {
            return this.dataStore[--this.top];
        },

        peek: function () {
            return this.dataStore[this.top-1];
        },

        length: function () {
            return this.top;
        },

        clear: function () {
            this.top = 0;
        }
    };

    /********************
    * Queues
    *
    ********************/

    function Queue(arr) {
        var populateQueue = function (element) {
            this.enqueue(element);
        };

        this.dataStore = [];

        if (arr && Array.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                populateQueue.call(this, arr[i]);
            }
        }
    }

    Queue.prototype = {
        constructor: Queue,

        enqueue: function (element) {
            this.dataStore.push(element);
        },

        dequeue: function () {
            this.dataStore.shift();
        },

        front: function () {
            return this.dataStore[0];
        },

        back: function () {
            return this.dataStore[this.dataStore.length-1];
        },

        toString: function () {
            var returnString = "";
            for (var i = 0; i < this.dataStore.length; ++i) {
                returnString += this.dataStore[i] + "\n";
            }
            return returnString;
        },

        empty: function () {
            if (this.dataStore.length === 0) {
                return true;
            } else {
                return false;
            }
        }
    };

    /********************
    * Linked Lists
    *
    ********************/

    function LinkedList() {
        this.head = new LLNode("head");
    }

    function LLNode(element) {
        this.element = element;
        this.next = null;
        this.previous = null; // for doubly linked list
    }

    LinkedList.prototype = {
        constructor: LinkedList,

        find: function (item) {
            var currentNode = this.head;
            while (currentNode.element != item) {
                currentNode = currentNode.next;
            }
            return currentNode;
        },

        insert: function (newElement, item) {
            var newNode = new LLNode(newElement),
                current = this.find(item);
            newNode.next = current.next;
            current.next = newNode;
        },

        remove: function (item) {
            var previousNode = this.findPrevious(item);
            if (previousNode.next !== null) {
                previousNode.next = previousNode.next.next;
            }
        },

        findPrevious: function (item) {
            var currentNode = this.head;
            while (currentNode.next !== null && currentNode.next.element !== item) {
                currentNode = currentNode.next;
            }
            return currentNode;
        },

        display: function () {
            var currentNode = this.head;
            while (currentNode.next !== null) {
                console.log(currentNode.next.element);
                currentNode = currentNode.next;
            }
        },
        advance: function (item, n) {
            var currentNode = this.find(item),
                previousNode = this.findPrevious(item);
            // advances n nodes in the linked list
        },
        back: function (n) {
            // moves n nodes backward in a doubly linked list
        },
        show: function () {
            // displays the current node only
        }
    };

    function DoubleLinkedList() {
        LinkedList.call(this);
    }

    DoubleLinkedList.prototype = Object.create(LinkedList.prototype);
    DoubleLinkedList.prototype.constructor = DoubleLinkedList;
    DoubleLinkedList.prototype.insert = function (newElement, item) {
        var newNode = new LLNode(newElement),
            current = this.find(item);
            newNode.next = current.next;
            newNode.previous = current;
            current.next = newNode;
    };
    DoubleLinkedList.prototype.remove = function (item) {
        var currentNode = this.find(item);
        if (currentNode.next !== null) {
            currentNode.previous.next = currentNode.next;
            currentNode.next.previous = currentNode.previous;
            currentNode.next = null;
            currentNode.previous = null;
        }
    };
    DoubleLinkedList.prototype.findLast = function () {
        var currentNode = this.head;
        while (currentNode.next !== null) {
            currentNode = currentNode.next;
        }
        return currentNode;
    };
    DoubleLinkedList.prototype.displayReverse = function () {
        var currentNode = this.head;
        currentNode = this.findLast();
        while (currentNode.previous !== null) {
            console.log(currentNode.element);
            currentNode = currentNode.previous;
        }
    };

    /********************
    * Dictionaries --
    *   "A dictionary is a data structure that stores data as key-value pairs...."
    *    Data Structures & Algorithms with JavaScript (Kindle Locations 6504-6505). Kindle Edition.
    ********************/

    function Dictionary() {
        this.dataStore = [];
    }

    Dictionary.prototype.count = function () {
        var counter = 0;
        Object.keys(this.dataStore).forEach(function (key) {
            counter++;
        }, this);
        return counter;
    };

    Dictionary.prototype.add = function (key, value) {
        this.dataStore[key] = value;
    };

    Dictionary.prototype.find = function (key) {
        return this.dataStore[key];
    };

    Dictionary.prototype.remove = function (key) {
        delete this.dataStore[key];
    };

    Dictionary.prototype.removeAll = function () {
        Object.keys(this.dataStore).forEach(function (key) {
            this.remove(key);
        }, this);
    };

    Dictionary.prototype.allKeys = function () {
        Object.keys(this.dataStore).sort().forEach(function (key) {
            console.log(key + " -> " + this.dataStore[key]);
        }, this);
    };

    /********************
    * Hash Tables
    *
    ********************/

    function HashTable() {
        this.table = [];
        this.table.length = 137;
    }

    HashTable.prototype.simpleHash = function (data) {
        var i = 0,
            ttl = 0;
        for (; i < data.length; i++) {
            ttl += data.charCodeAt(i);
        }
        return ttl % this.table.length;
    };

    HashTable.prototype.hornerHash = function (data) {
        var HORNER_VAL = 41,
            i = 0,
            ttl = 0;
        for (; i < data.length; i++) {
            ttl += HORNER_VAL * ttl + data.charCodeAt(i);
        }
        ttl = ttl % this.table.length >=0 ? ttl % this.table.length : this.table.length - 1;
        return parseInt(ttl, 10);
    };

    HashTable.prototype.showDistro = function () {
        var i = 0,
            n = 0;
        for (; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                console.log(i + ": " + this.table[i]);
            }
        }
    };

    HashTable.prototype.put = function (key, data) {
        //var pos = this.simpleHash(data);
        var pos = this.hornerHash(key);
        this.table[pos] = data;
    };

    HashTable.prototype.get = function (key) {
        return this.table[this.hornerHash(key)];
    };

    /********************
    * Sets --
    *   "A set is a collection of unique elements."
    *   "The two most important properties of sets are that the members of a set are unordered and
    *    that no member can occur in a set more than once."
    *   "Sets can be useful when you want to create a data structure that consists only of unique
    *    elements, such as a list of each unique word in a text.""
    *
    *   Data Structures & Algorithms with JavaScript (Kindle Locations 8202-8205). Kindle Edition.
    *
    ********************/

    function Set () {
        this.dataStore = [];
    }

    Set.prototype.add = function (value) {
        // add only if value not in Set
        if (this.dataStore.indexOf(value) < 0) {
            this.dataStore.push(value);
            return true;
        } else {
            return false;
        }
    };

    Set.prototype.remove = function (value) {
        var position = this.dataStore.indexOf(value);
        if (position < 0) {
            return false;
        } else {
            this.dataStore.splice(position, 1);
            return true;
        }

    };

    Set.prototype.show = function () {
        console.log(this.dataStore.toString());
        return this.dataStore;
    };

    Set.prototype.size = function () {
        return this.dataStore.length;
    };

    Set.prototype.contains = function (value) {
        if (this.dataStore.indexOf(value) < 0) {
            return false;
        } else {
            return true;
        }
    };

    // conbine this set with set provided, return new set of unique values
    Set.prototype.union = function (set) {
        var tempSet = new Set();
        this.dataStore.forEach( function (value) {
            tempSet.add(value);
        }, this);
        set.dataStore.forEach( function (value) {
            if (!tempSet.contains(value)) {
                tempSet.add(value);
            }
        });
        return tempSet;
    };

    // finds members in both sets, return new set of members
    Set.prototype.intersect = function (set) {
        var tempSet = new Set();
        this.dataStore.forEach( function (value) {
            if (set.contains(value)) {
                tempSet.add(value);
            }
        }, this);
        return tempSet;
    };

    // true if all members of set 'this' are contained in set 'set'
    Set.prototype.subset = function (set) {
        var retVal = true;
        if (this.size() > set.size()) {
            return false;
        } else {
            this.dataStore.forEach( function (value) {
                console.log(value, set.contains(value));
                retVal = retVal && set.contains(value);
            }, this);
        }
        return retVal;
    };

    // return new set of all members of set 'this' that are not in set 'set'
    Set.prototype.difference = function (set) {
        var tempSet = new Set();
        this.dataStore.forEach( function (value) {
            if (!set.contains(value)) {
                tempSet.add(value);
            }
        }, this);
        return tempSet;
    };

    return {
        List: List,
        Stack: Stack,
        Queue: Queue,
        LinkedList: LinkedList,
        DoubleLinkedList: DoubleLinkedList,
        Dictionary: Dictionary,
        HashTable: HashTable,
        Set: Set
    };


})();

var movies = ["Pulp Fiction", "12 Angry Men"];
var myList = new ListModule.List(movies);
var myStack = new ListModule.Stack();


var q = new ListModule.Queue();
q.enqueue("Meredith");
q.enqueue("Cynthia");
q.enqueue("Jennifer");
console.log(q.toString());
q.dequeue();
console.log(q.toString());
console.log("Front of queue: " + q.front());
console.log("Back of queue: " + q.back());


var cities = new ListModule.LinkedList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
cities.remove("Carlisle");
cities.display();
var thisItem = cities.find("Russellville");
console.log(thisItem);

var citiesDouble = new ListModule.DoubleLinkedList();
citiesDouble.insert("aaa", "head");
citiesDouble.insert("bbb", "aaa");
citiesDouble.insert("ccc", "bbb");
citiesDouble.insert("ddd", "ccc");
citiesDouble.display();
citiesDouble.remove("ccc");
citiesDouble.display();
citiesDouble.displayReverse();
//myList.appendArray(movies);

var pbook = new ListModule.Dictionary();
pbook.add("Mike","123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");
console.log("David's extension: " + pbook.find("David"));
pbook.remove("David");
pbook.allKeys();

console.log(pbook.count());
pbook.removeAll();
console.log(pbook.count());


var pnumbers = new ListModule.HashTable();
var testObj = [{name: 'name 1', number: '123'},{name: 'name 2', number: '345'},{name: 'name 3', number: '678'}];
for (var i = 0; i < testObj.length; i++) {
    pnumbers.put(testObj[i].name, testObj[i].number);
}
console.log(pnumbers.get('name 3'));



var names = new ListModule.Set();
names.add("David");
names.add("Jennifer");
names.add("Cynthia");
names.add("Mike");
names.add("Raymond");
if (names.add("Mike")) {
       console.log("Mike added");
} else {
       console.log("Can't add Mike, must already be in set");
}

console.log(names.show());
var removed = "Mike";
if (names.remove(removed)) {
    console.log(removed + " removed.");
} else {
    console.log(removed + " not removed.");
}
names.add("Clayton");
console.log(names.show());
removed = "Alisa";
if (names.remove(removed)) {
    console.log(removed + " removed.");
} else {
    console.log(removed + " not removed.");
}


var cis = new ListModule.Set();
cis.add("Mike");
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Raymond");
var dmp = new ListModule.Set();
dmp.add("Raymond");
dmp.add("Cynthia");
dmp.add("Jonathan");
//var it = new ListModule.Set();
var it = cis.union(dmp);
console.log(it.show());

var cis = new ListModule.Set();
cis.add("Mike");
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Raymond");
var dmp = new ListModule.Set();
dmp.add("Raymond");
dmp.add("Cynthia");
dmp.add("Bryan");
var inter = cis.intersect(dmp);
console.log(inter.show());

var it = new ListModule.Set();
it.add("Cynthia");
it.add("Clayton");
it.add("Jennifer");
it.add("Danny");
it.add("Jonathan");
it.add("Terrill");
it.add("Raymond");
it.add("Mike");
var dmp = new ListModule.Set();
dmp.add("Cynthia");
//dmp.add("Bob");
dmp.add("Raymond");
dmp.add("Jonathan");
if (dmp.subset(it)) {
    console.log("DMP is a subset of IT.");
} else {
    console.log("DMP is NOT a subset of IT.");
}

var cis = new ListModule.Set();
var it = new ListModule.Set();
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Danny");
it.add("Bryan");
it.add("Clayton");
it.add("Jennifer");
//var diff = new ListModule.Set();
diff =it.difference(cis);
console.log("[" +it.show() + "] difference [" +cis.show()       + "] -> [" + diff.show() + "]");


