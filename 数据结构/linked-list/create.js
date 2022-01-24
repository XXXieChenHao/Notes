// Js 链表实现

function LinkedList() {
  this.length = 0;
  this.head = null;

  function Node(element) {
    this.element = element;
    this.next = null;
  }

  // 追加
  LinkedList.prototype.append = function(element) {
    let node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  // 插入
  LinkedList.prototype.insert = function (position, element) {
    if(position > -1 && position < this.length) {
      let current = this.head;
      let node = new Node(element);
      let previous;
      if(position === 0) {
        node.next = current;
        this.head = node;
      } else {
        for(let i = 0; i < position; i++) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      this.length++;
      return true;
    } else {
      return false
    }
  }
}
new linkedList = new linkedList()
linkedList.append(3)