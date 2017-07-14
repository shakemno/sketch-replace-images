# Sketch Replace Images

A plugin to replace (as in update) existing images by name in a sketch document.

Supported image types: ```png, jpg, jpeg```

---

## Changelog

- 08/01/2016 **v0.4.3** Keep size of layer when replacing images, this is not the default behaviour of the replace action from Sketch. The default will resize to maximum images size and only keep resized size if scaled down. (Sketch 39.1)

- 05/23/2016 **v0.4.2** Fixed minor issue with Sketch 3.8.1

- 01/25/2016 **v0.4.1** Replaced the manual path input with the more convenient NSOpenPanel

- 01/24/2016 **v0.4.0** `Plugin rewrite:` sketch-file location is now the default and the plugin is recursively looking for images. Added settings to set custom look-up path.

- 01/19/2016 **v0.3.1** Updated to work with Sketch 3.4 [download v0.3.1 zip](https://github.com/shakemno/sketch-replace-images/archive/0.3.1.zip)

---

## Installation

#### Using Sketch Toolbox

1. Install using Sketch Toolbox (recommended)
2. Install the app from http://sketchtoolbox.com/
3. Install the plugin using the app.

#### Install from repo

1. Download the latest *.zip and unzip
2. In Sketch reveal your plugins folder in ```Plugins > Reveal Plugins Folder...```
3. Move the ``` sketch-replace-images``` folder to ```Plugins```

---

## Usage

1. Select the plugin from the menu or press ```ctrl + ⇧ + ⌘ + R```
2. By default the plugin is recurively looking for image from your sketch-file location. There is also a **settings** option, where you can specify a custom path to a directory containing your resources. (If you are still using the AppStore version, you'll need to authorize sketch to read from the directory)
3. All images with **matching** names *(layer-name equal image-name)* will be updated, in case nothing happens make sure to provide the correct path.

If you define a custom path it will persist, so if you start a new project or want to use the default – you'll need to reset it first, there is a **restore default** option in the settings panel.


---

## Credits

- [bomberstudios](https://github.com/bomberstudios) for [sketch-sandbox](https://github.com/bomberstudios/sketch-sandbox)

---

## License

Copyright (c) 2016 shakemno

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
