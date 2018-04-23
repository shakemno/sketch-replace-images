const SketchReplaceImagesDefaults = require('./sketch-replace-images-defaults');

export default function(context) {
  var fileManager = NSFileManager.defaultManager();
  var doc = context.document;
  var doc_folder = doc.fileURL().toString().stringByDeletingLastPathComponent();

  log("SketchReplaceImages - trying to update images...");

  var relativePath = doc_folder;
  if (!/\/$/.test(relativePath)) {
    relativePath = relativePath + "/";
  }

  var url = NSURL.URLWithString_relativeToURL(relativePath, doc.fileURL());

  var defaults = SketchReplaceImagesDefaults.loadDefaults();
  if(defaults) {
    relativePath = defaults;
    url = NSURL.URLWithString(relativePath);
  }

  var isValidPath = fileManager.fileExistsAtPath(url.path())
  log("isValidPath: "+isValidPath);

  if (isValidPath === 0) 
  {
    doc.showMessage("Sorry, can't find a valid directory. Try (re-)setting the path url.");
    return;
  }

  log("url: "+url);

  var direnum = fileManager.enumeratorAtPath(url.path());
  var filename;
  var fileURL;

  var page = doc.currentPage();
  var layers = page.children();

  var imageTypes = NSArray.arrayWithArray(["png", "jpg", "jpeg"]);
  var images_available = NSMutableDictionary.dictionary();
  var images_replaced = [];

  log("collecting available images...");

  while ((filename = direnum.nextObject() ))
  {
    var basefileName = filename.toString().lastPathComponent();
    var pathExtension = basefileName.pathExtension();

    if(imageTypes.containsObject(pathExtension))
    {
      images_available.setObject_forKey(filename, basefileName);
    }
  }

  log("updating images...");

  var images_available_keys = images_available.allKeys();
  for (var i=0; i<layers.count(); i++)
  {
    var layer = layers[i];
    if(layer.class().toString() == "MSBitmapLayer")
    {
      // loop through image types
      for (var j = 0; j < imageTypes.count(); j++)
      {
        var type = imageTypes.objectAtIndex(j);
        var imageName = layer.name() + "." + type;

        if( images_available_keys.containsObject(imageName) )
        {
          // Do URL escaping on imageName
          var imageNameForUrl = images_available.objectForKey(imageName);
          imageNameForUrl = imageNameForUrl.stringByAddingPercentEscapesUsingEncoding(NSUTF8StringEncoding);

          if(defaults) {
            fileURL = NSURL.URLWithString((relativePath+imageNameForUrl));
          }
          else
          {
            fileURL = NSURL.URLWithString_relativeToURL(imageNameForUrl, url);
          }

          if( fileManager.fileExistsAtPath(fileURL.path()) )
          {
            var srcImage = NSImage.alloc().initByReferencingFile(fileURL.path());
            if (srcImage.isValid())
            {
              var old_width = layer.frame().width();
              var old_height = layer.frame().height();

              var replaceAction = MSReplaceImageAction.alloc().init();
              if(true) //([replaceAction validate])
              {
                replaceAction.applyImage_tolayer(srcImage, layer);
                layer.frame().setWidth(old_width);
                layer.frame().setHeight(old_height);
                images_replaced.push(imageName);
                break; // we'll only pick the first match...
              }
            }
          }
        }

      }
    }
  }

  // check if we updated any images, report accordingly
  if(images_replaced.length > 0)
  {
    doc.showMessage(""+images_replaced.length+" images updated.");
  }
  else
  {
    doc.showMessage("Sorry, couldn't update images...");
  }

};

