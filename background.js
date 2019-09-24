chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		console.log("The color is green.");
	});
	
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
				//조건이 없으면 전부
				// pageUrl: {hostEquals: 'developer.chrome.com'}, 
        pageUrl: {hostEquals: 'phpschool.com'}
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
	
	
});