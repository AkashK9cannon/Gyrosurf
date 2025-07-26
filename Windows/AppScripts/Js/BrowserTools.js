var HistoryBack = document.getElementById("HistoryBack");
var SearchBar = document.getElementById("SearchBar");
var BookmarkBtn = document.getElementById('BookmarkBtn')
const Reload = document.getElementById("Reload");
var HistoryForward = document.getElementById("HistoryForward");
var AppCloseBtn = document.getElementById('AppCloseBtn')
var AppMenu = document.getElementById('AppMenu')

AppCloseBtn.addEventListener('click', (e) => {
  window.gyrosurf.CloseApp()
})


AppMenu.addEventListener('click', (e) => {
  const rect = AppMenu.getBoundingClientRect();
  const x = rect.left + window.scrollX;
  const y = rect.top + window.scrollY;

  console.log("Element Position: ", x, y);
  window.gyrosurf.OpenAppMenu(x, y)
});


function Search() {
  var Sval = SearchBar.value;
  const urlRegex =/^^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,}\/?(?:[\w-.\/?%&=]*))$/i;

  function isLikelyURL(text) {
    return urlRegex.test(text);
  }

  if(isLikelyURL(Sval) == false){
    console.log(false)
  } else if(isLikelyURL(Sval) == true){
    console.log(true)
  }
}
SearchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    Search();
  }
});


// BrowserTools
Reload.addEventListener("click", (e) => {
  ReloadTab();
});
function ReloadTab() {
  var activetab = Tabs.GetChildTabs().find((t) =>
    t.classList.contains("active")
  );
  Reload.classList.add("Reload");

  setTimeout(() => {
    Reload.classList.remove("Reload");
  }, 1000); // match your animation duration
}



BookmarkBtn.addEventListener('click', (e) => {
  SetBookmarked()
})
function SetBookmarked(){
  var setMarked = false
  if(setMarked == false){
    BookmarkBtn.setAttribute("src", "../../sysMedia/iconsC/Star.png");
    setMarked = true
  } else if(setMarked == true){
    BookmarkBtn.setAttribute("src", "../../sysMedia/icons/Star.png");
    setMarked = false
  }
}



