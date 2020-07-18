class Navbar {
  constructor(nav,funActive) {
    this.funActive = funActive
    this.hrefs = {};
    this.navbarBrand = nav.querySelector(".navbar-brand")
    this.navbarNav = nav.querySelector(".navbar-nav")
    this.dropdown = {}
    this.navbarNav.querySelectorAll("[href]").forEach((i) => {
      i.onclick = (e) => {
        e.preventDefault()
        var page = new URL(e.target.href).pathname;
        this.active(page)
        this.lp(page)
      }
      parent = undefined
      if (i.parentElement.classList.contains("dropdown-menu")) {
      console.log(17, i.parentElement.parentElement)
        parent = i.parentElement
      }

      this.hrefs[new URL(i.href).pathname] = {item:i,parent};
    });

    this.cur = new URL(document.URL).pathname;
    window.onpopstate = this.onpopstate.bind(this)

  }
  onpopstate(event) {
    var page = new URL(document.location).pathname
    this.active(page)
    this.lp(document.location, false)
  }
  active(link) {
    //preventDefault;
    if (!this.hrefs[link]) return;
    if (!this.hrefs[link].item) return;
    var old = this.hrefs[this.cur];
    if (old) {
      old.item.classList.remove("active")
      if (old.parent)
      if (old.parent.parentNode)
        old.parent.parentNode.querySelector(".dropdown-toggle").classList.remove("active")
    }

    var page = this.hrefs[link]
    if (page) {
      this.cur = link
      page.item.classList.add("active")
      this.navbarBrand.textContent = page.item.textContent
      if (page.parent)
      if (page.parent.parentNode)
        page.parent.parentNode.querySelector(".dropdown-toggle").classList.add("active")
    }
    //
    // if (this.funActive) {
    //   // this.funActive(link)
    //   this.lp(link)
    // }
    return this;
  }
  lp(p, save = true) {
    var _this = this

    var xhr = new XMLHttpRequest();
    xhr.responseType = "document"
    xhr.onload = function () {
      var w = xhr.response
      var title = w.title
      var main = w.querySelector('main')
      document.querySelector('main').replaceWith( main )
      document.title = title
      if (save) {
        history.pushState({page: p}, title, p)
      }
    }

    xhr.open("GET", p, true);
    xhr.send();
  }
}
