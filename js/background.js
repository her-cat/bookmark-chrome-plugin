//-------------------- 右键菜单 ------------------------//
chrome.contextMenus.create({
	title: "收藏当前页面",
	onclick: function(params){
		addBookmark(params.pageUrl);
	}
});
chrome.contextMenus.create({
	title: "收藏网址",
	contexts: ['link'],
	onclick: function(params){
		addBookmark(params.linkUrl);
	}
});

function addBookmark(url) 
{
    $.ajax({
        url: 'https://bookmark.hxhsoft.cn/bookmarks',
        type: 'POST',
        data: {url: url},
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        dataType: 'json',
        success: function (response) {
        	chrome.notifications.create(null, {
				type: 'basic',
				iconUrl: 'img/success.png',
				title: '收藏成功！',
				message: response.message
			});
        },
        error: function (response) {
            chrome.notifications.create(null, {
				type: 'basic',
				iconUrl: 'img/fail.png',
				title: '收藏失败！',
				message: '请先登录'
			});

			chrome.tabs.create({url: 'https://bookmark.hxhsoft.cn'});
        }
    });
}