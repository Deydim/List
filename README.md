## FP style linked list

Some functional languages implement a list data structure in a nested/recursive way.

<Code>Node1->Node2->Node3</Code> can be represented using arrays as
<Code>[Node1, [Node2, [Node3, []]]]</Code> in JS.

In <Code>list.js</Code> you can see some example methods to create and work with such list types as well as some helper functions I've borrowed to help with data transformation process.

JSFiddle here: https://jsfiddle.net/Lhvrsfoy/