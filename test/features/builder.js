export const createLabel = function(labelObj) {
  let label = server.execute((obj)=>{
    const { Label } = require('/imports/api/label.js');
    Label.insert(obj);
    return Label.findOne(obj);
  }, labelObj);
  return label;
};

export const getLabel = function(labelObj) {
  let label = server.execute( (obj) => {
    const { Label } = require('/imports/api/label.js');
    return Label.findOne(obj);
  }, labelObj );
  return label;
};
