$(function ($) {
  const $siteList = $(".site_list");
  const $add = $siteList.find("li.add");
  const site = localStorage.getItem("site");
  const siteObject = JSON.parse(site);
  const hashMap = siteObject || [
    { logo: "B", url: "https://www.bilibili.com", urlName: "哔哩哔哩" },
    { logo: "I", url: "https://www.iconfont.cn", urlName: "iconfont" },
    { logo: "G", url: "https://github.com", urlName: "github" },
    { logo: "Z", url: "https://www.zcool.com.cn/", urlName: "站酷" },
    { logo: "J", url: "https://juejin.cn/", urlName: "掘金" },
  ];
  const simplifyUrl = (url) => {
    return url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/.*/, ""); // 删除 / 开头的内容
  };
  const render = () => {
    $siteList.find("li:not(.add)").remove();
    hashMap.forEach((node, index) => {
      const $li = $(`<li class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${node.urlName}</div>
          <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-delete"></use>
          </svg>
        </div>
      </li>`).insertBefore($add);
      $li.on("click", () => {
        window.open(node.url);
      });
      $li.on('click', '.close', (e) => {
        e.stopPropagation() // 阻止冒泡
        alert('确认删除这个网址吗？')
        hashMap.splice(index, 1)
        render()
      })
      $li.on('mouseenter',()=>{
        $li.find('.close').css('display','block')
      })
      $li.on('mouseleave',()=>{
        $li.find('.close').css('display','none')
      })
    });
  };

  render();

  $add.on("click", () => {
    let url = window.prompt("请添加一个网址");
    let urlName = window.prompt("请为刚才添加的网址加一个记得住的名字吧");
    if (url.indexOf("http" !== 0)) {
      url = "https://" + url;
    }

    hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url, urlName });
    render();
  });

  window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem("site", string);
  };

  
$(document).on('keypress', (e) => {
    console.log(e);
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
        window.open(hashMap[i].url)
      }
    }
  })
});
