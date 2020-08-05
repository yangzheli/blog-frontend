//异步加载百度地图
export function map() {
  return new Promise(function (resolve, reject) {
    //如果已加载直接返回
    if (typeof BMap !== 'undefined') {
      resolve(BMap);
      return true;
    }
    const ak = "Bv34HE0ZNueVbC9wCHrBbYbVXiVqdKE1";
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}
