Idee d'architecture

-----

// COMMON
Grids = new Mongo.Collection('grids');

// SERVER

Grids.after.create((userId, doc) => {
  const selector = { _id: doc._id };
  const modifier = { $set: generateNewGrid() };
  Grids.update(selector, modifier);
});

generateNewGrid = () => {
  // TODO
};

Meteor.methods({
  'create.grid'() {
    const gridId = Grids.insert();
    return gridId;
  }
});

Meteor.publish('get.grid', (gridId) => {
  return Grids.find({ _id: gridId, isOpen: true });
});

// CLIENT

// React Object
GridGenerator = React.createClass({
  generateGrid() {
    Meteor.call('create.grid', (gridId) => {
      Meteor.subscribe('get.grid', gridId);
    });
  },
  render() {
    return (<div onClick={this.generateGrid}>Generer grille</div>);
  }
});
