# Apereo OAE - Tasklist widget

The Tasklist widget is an example widget and set of accompanying REST APIs for the Apereo Open Academic Environment.

Whilst it is not suitable for production use, it can be used as an introduction into Apereo OAE widget development.

In order to install the Tasklist widget, the following 3 steps need to be taken:

#### 1. Install the back-end module

The back-end module provides the REST APIs that will be used by the widget and takes care of data storage, etc.
In order to install this module, go to the `Hilary` folder and run the following command:

```
npm install git://github.com/oaeproject/oae-tasklist
```

#### 2. Install the widget

The front-end module provides the Tasklist widget, which can be embedded anywhere in the UI.
In order to install this widget, go to the `3akai-ux` folder and run the following command:

```
npm install git://github.com/oaeproject/oae-ui-tasklist
```

#### 3. Define where the widget is shown

At this point, the UI is aware of the existence of the widget, but doesn’t yet know where it needs to be shown. If the widget needs to be triggered by clicking a certain button or link, this can be done through configuration in the widget manifest.

If you want to show the widget as part of the left hand navigation structure in one of the pages, you can add it to the page configuration in the js file for that page.
For example, if you want the Tasklist widget to show in the `Recent activity` page in your personal space, you’d have to change [this](https://gist.github.com/nicolaasmatthijs/97bdf6b71186c69ba021) to [this](https://gist.github.com/nicolaasmatthijs/dd8a0a46d9f276ad001b) in `3akai-ux/ui/js/me.js`
After doing all of that, the Tasklist widget should show up in the `Recent Activity` page.
