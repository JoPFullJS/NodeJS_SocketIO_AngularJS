'use strict';

var items = [
  {'name' : 'Forrest Gump', 'category_id' : 1},
  {'name' : 'Seraphine', 'category_id' : 1},
  {'name' : 'Le tombeau des lucioles', 'category_id' : 1}
];

app.service('itemProvider', function (){
    this.getItems = function () {
      return items;
    }

    this.create = function (item) {
      items.push(item);

      return items;
    }
});
