const SketchReplaceImagesDefaults = require('./sketch-replace-images-defaults');

function createPanel(msg, default_path)
{
  var openPanel;

  var okButton = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 100, 30));
  okButton.setTitle("Restore default");
  okButton.setCOSJSTargetFunction(function(sender) {
    NSApp.stopModal();
  });
  okButton.setBezelStyle(NSRoundedBezelStyle);

  openPanel = NSOpenPanel.openPanel();
  openPanel.setCanChooseDirectories(true);
  openPanel.setCanChooseFiles(false);
  openPanel.setCanCreateDirectories(true);
  if(default_path !== null)
    openPanel.setDirectoryURL(NSURL.fileURLWithPath(default_path));
  else
    openPanel.setDirectoryURL(NSURL.fileURLWithPath(NSHomeDirectory().stringByAppendingString("/Documents/")));

  openPanel.setPrompt("Set path");
  openPanel.setMessage(msg);
  openPanel.setAccessoryView(okButton);

  var responseCode = openPanel.runModal();
  var url = openPanel.URL().absoluteString();

  return {"responseCode":responseCode, "selection":url};
}

function present_error(doc)
{
  doc.showMessage("There seems to be an issue with the path. Please make sure you know what you're doing.");
}

export default function(context) {

  var documentName = context.document.displayName();
  var doc = context.document;
  var defaults = SketchReplaceImagesDefaults.loadDefaults();
  var choice = createPanel('Select a custom look-up directory...', defaults);

  switch(choice.responseCode) {
    case -1000:
      SketchReplaceImagesDefaults.clearDefaults();
      doc.showMessage("Restored default.");
      break;
    case 1:
      if(choice.selection.length() < 1) {
        present_error(doc);
        return;
      }

      var relativePath = choice.selection;
      if (!/\/$/.test(relativePath)) {
        relativePath = relativePath + "/";
      }

      var url = NSURL.URLWithString(relativePath);
      if(url) {
        SketchReplaceImagesDefaults.saveDefaults(relativePath);
        doc.showMessage('Set path to: "'+relativePath+'"');
      } else {
        present_error(doc);
      }
      break;
    default:
       doc.showMessage("Cancelled");
      break;
  }
};
