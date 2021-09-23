
/* 

  Some *functional style* helpers below:

  *pipe*: this function is curried, it takes the initial list state and returns a function that
    expects any number of the list-transformation functions as arguments.
  
  *compose*: same as pipe, except that it is curried in the reverse order, so it first expects
    list-operating functions and after partial application returns a composed function expecting a 
    list as argument that you can declare and reuse.

  *trace*: just logs its argument and returns it, useful for debugging pipelines

*/

const pipe =
x => (...fns) =>
  fns.reduce((v, f) => f(v), x);

const compose =
(...fns) => x =>
  fns.reduce((v, f) => f(v), x);

const trace = x => {
console.log(x);
return x;
};

const List = {
  create: (...args) => add(...args)([]),

  add:
    (...args) =>
    list => {
      const [head, ...tail] = args;
      return head !== undefined ? add(...tail)([head, list]) : list;
    },

  reverse:
  (newList = []) =>
  ([head, ...tail]) =>
      head !== undefined ?
        pipe(newList)(
          add(head),
          reverse
        )(...tail)
        : newList,

  shove: (list, ...args) => 
    pipe(list)(
      reverse(), 
      add(...args), 
      reverse()
    ),

  map:
    ([head, ...tail], fn) =>
    (newList = []) =>
      head !== undefined
        ? pipe(newList)(
          add(fn(head)), 
          map(...tail, fn)
        )
        : reverse()(newList),
};

const { create, add, reverse, shove, map } = List;


/* 

  Reuses above implementation and pins the list-operation functions to class methods which
    allows for aligning the transformations in the OOP traditional "." chaining.

  */
const OOPList = class OOPList {
  constructor(...args) {
    this.list = [];
    return this.add(...args);
  }
  add(...args) {
    this.list = List.add(...args)(this.list);
    return this;
  }
  reverse() {
    this.list = List.reverse()(this.list);
    return this;
  }
  trace() {
    console.log(this.list);
    return this;
  }
  shove(...args) {
    this.list = List.shove(this.list, ...args);
    return this;
  }
  map(fn) {
    this.list = List.map(this.list, fn)();
    return this;
  }
};

console.log("Pipe example log:");
const piped = pipe(create())(
  add(2), 
  add(3), 
  reverse(), 
  trace
);

console.log("Composed example log:");
const composed = compose(
  add(2), 
  add(3), 
  reverse(), 
  trace
);

composed(create());

console.log("Class example log:");
new OOPList()
  .trace()
  .shove(1)
  .trace()
  .add(0)
  .trace()
  .reverse()
  .trace()
  .shove(5)
  .trace()
  .map(x => x + 1)
  .trace();