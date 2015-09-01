# Corodova Network Events
Retrieve Cordova network information with Web API fallback

This is a simple wrapper around [ngCordova Network](http://ngcordova.com/docs/plugins/network/) that uses the [Cordova network plugin](https://github.com/apache/cordova-plugin-network-information) to detect online/offline status in an Ionic/Cordova application. There is a fallback for web browsers using the [navigator.online](https://html.spec.whatwg.org/multipage/browsers.html#browser-state) API.

It is meant to use the [Ionic framework](http://ionicframework.com) and [ngCordova](http://ngcordova.com), thus both of those projects are required.

Usage is quite simple. After adding to your project, you can ping the service for online status:

```
NetworkService.isOnline()
```

As well, you can retrieve network information or status: 

```
NetworkService.getNetwork()
NetworkService.getStatus()
```

There are also some network events. When the connectivity status changes from offline to online, `cordova.network.online` fires. Alternatively, when the device or browser goess offline, `cordova.network.offline` is fired. These two events allow you to listen to events if you prefer to work that way.