
// TODO: I could potentially have a situation where the model for a link only
// has a `target` property and the entity reducer figures out the proper values
// of `points` when SETting the diagram. In this way I'd had a mix of
// declarative in the inital model and then switch to explicit after load.

const model: EntityState = [{ "id": "id-1", "type": "Event", "width": 50, "height": 50, "x": 450, "y": 150, "name": "Tim", "linksTo": [{ "target": "Jim", "edited": false, "position": [{ "x": 0, "y": 0 }, { "x": 10, "y": 10 }] }] }];

export default model;
