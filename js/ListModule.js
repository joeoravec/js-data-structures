var ListModule = (function () {

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

    function Node(element) {
        this.element = element;
        this.next = null;
        this.previous = null; // for doubly linked list
    }

    function LinkedList() {
        this.head = new Node("head");
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
            var newNode = new Node(newElement),
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
        var newNode = new Node(newElement),
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

    function HashTable() {
        this.table = [];
        this.table.length = 137;
    }

    HashTable.prototype.simpleHash = function () {

    };

    HashTable.prototype.showDistro = function () {

    };

    HashTable.prototype.put = function () {

    };

    HashTable.prototype.get = function () {

    };

    return {
        List: List,
        Stack: Stack,
        Queue: Queue,
        LinkedList: LinkedList,
        DoubleLinkedList: DoubleLinkedList,
        Dictionary: Dictionary,
        HashTable: HashTable
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
