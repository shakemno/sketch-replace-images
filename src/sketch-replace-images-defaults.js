const kDefaultsKey = "de.shakemno.sketch-replace-images.defaultsKey";

module.exports = {
  loadDefaults: function() {
    return NSUserDefaults.standardUserDefaults().objectForKey(kDefaultsKey);
  },
  saveDefaults: function(path) {
    NSUserDefaults.standardUserDefaults().setObject_forKey(path, kDefaultsKey);
    NSUserDefaults.standardUserDefaults().synchronize();
  },

  clearDefaults: function() {
    NSUserDefaults.standardUserDefaults().removeObjectForKey(kDefaultsKey);
    NSUserDefaults.standardUserDefaults().synchronize();
  }
};
