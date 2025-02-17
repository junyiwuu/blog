---
title: C++ study notes collection
description: Here only  collect something that I atm feel I want to knowledge backup
---
# Static
```cpp
// Example 1: Normal function
int getNumber() {
    int count = 0; 
    return count++;  // count always starts at 0
}

// Example 2: Static variable in function
int getNumber() {
    static int count = 0;  // Only initialized once
    return count++;  // count remembers its value between calls
}

int main() {
    cout << getNumber(); // prints 0
    cout << getNumber(); // prints 1
    cout << getNumber(); // prints 2
}
```



understand below:
```cpp
static LveGameObject createGameObject()
```
* `static`: can be called without an instance
* `LveGameObject`: data type
* `createGameObject()` : function name