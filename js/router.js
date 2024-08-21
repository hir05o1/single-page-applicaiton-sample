"use strict";

// aタグクリックされたとき
const route = (event) => {
  // クリック時のイベント取得
  event = event || window.event;
  // ブラウザのデフォルト操作（）
  event.preventDefault();
  // ブラウザの履歴を追加（history APIを使用）
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  404: "/pages/404.html",
  "/": "/pages/index.html",
  "/about": "/pages/about.html",
};

const handleLocation = async () => {
  // 現在のパスを取得
  const path = window.location.pathname;
  // 現在のパスに紐づくhtmlのパスを取得
  const route = routes[path] || routes[404];
  // htmlを取得
  const html = await fetch(route).then((data) => data.text());
  // 取得したhtmlを動的にルート直下のindex.htmlに差し込む
  document.getElementById("main-page").innerHTML = html;
};

// ブラウザの戻るボタンや進むボタンが押されたときに発火されるイベント
// 戻るボタンが押されたときに、ブラウザの履歴を取得してきて、main-pageに差し込まれ表示される
window.addEventListener("popstate", () => {
  handleLocation();
});
