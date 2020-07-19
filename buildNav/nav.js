class NavItem{
  constructor(name, href) {
    this.href = href
    this.name = name
  }

  out(space = 0, a = false) {
    if (a) return "  ".repeat(space)+'<a href="' + this.href + '" class="nav-link">' + this.name + '</a>\n';
    return "  ".repeat(space)+'<li class="nav-item"><a href="' + this.href + '" class="nav-link">' + this.name + '</a></li>\n'
  }
  min(a = false) {
    if (a) return '<a href="' + this.href + '" class="nav-link">' + this.name + '</a>'
    else return '<li class="nav-item"><a href="' + this.href + '" class="nav-link">' + this.name + '</a></li>'
  }
}

class Dropdown {
  constructor(name) {
    this.name = name
    this.children = []
  }
  add(el) {
    this.children.push(el)
  }
  min() {

    var start =
      '<li class="nav-item dropdown">' +
      '<a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false" role="button" aria-haspopup="true">' + this.name + '</a>' +
      '<div class="dropdown-menu dropdown-menu-right">'

    var end =
      '</div></li>'

    var base = start;
    for (var i = 0; i < this.children.length; i++) {
      base += this.children[i].min(true)
    }
    base += end;
    return base;
  }
  out(space = 0) {
    var start =
      "  ".repeat(space + 0) + '<li class="nav-item dropdown">\n' +
      "  ".repeat(space + 1) + '<a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false" role="button" aria-haspopup="true">' + this.name + '</a>\n' +
      "  ".repeat(space + 1) + '<div class="dropdown-menu dropdown-menu-right">\n'

    var end =
      "  ".repeat(space + 1) + '</div>\n' +
      "  ".repeat(space + 0) + '</li>\n'

    var base = start;
    for (var i = 0; i < this.children.length; i++) {
      base += this.children[i].out(space+2, true)
    }
    base += end;
    return base;
  }

}

class NavbarNav {
  constructor(id) {
    this.id = id
  }
  navbar(newNavBar) {
    this.navBar = newNavBar
  }
  out(page, space = 0) {
    var target = 'navbarNav'
    var ret =
    "  ".repeat(space + 0) + '<nav id="' + this.id + '" class="navbar sticky-top navbar-expand-lg navbar-light bg-light">\n' +
    "  ".repeat(space + 1) + '<a class="navbar-brand">' + page + '</a>\n' +
    "  ".repeat(space + 1) + '<button class="navbar-toggler" data-target="#' + target + '" data-toggle="collapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" type="button">\n' +
    "  ".repeat(space + 2) + '<span class="navbar-toggler-icon"></span>\n' +
    "  ".repeat(space + 1) + '</button>\n' +
    "  ".repeat(space + 1) + '<div id="' + this.id + '" class="collapse navbar-collapse">\n' +
    "  ".repeat(space + 2) + '<ul class="navbar-nav nav-justified w-100">\n' +
    this.navBar.out(space + 3) +
    "  ".repeat(space + 2) +  '</ul>\n' +
    "  ".repeat(space + 1) + '</div>\n' +
    "  ".repeat(space + 0) + '</nav>'

    return ret;
  }
  min(page) {
    // return '<nav id="' + this.id + '" class="navbar sticky-top navbar-expand-lg navbar-light bg-light">' + page + '</a><div class="dropdown-menu dropdown-menu-right"><button class="navbar-toggler" data-target="#navbarNav" data-toggle="collapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" type="button"><span class="navbar-toggler-icon"></span></button><div id="' + this.id + '" class="collapse navbar-collapse"><ul class="navbar-nav nav-justified w-100">'+ this.navBar.out() + '</ul></div></nav>'
    var target = 'navbarNav'
    var ret =
    '<nav id="' + this.id + '" class="navbar sticky-top navbar-expand-lg navbar-light bg-light">' +
    '<a class="navbar-brand">' + page + '</a>' +
    '<button class="navbar-toggler" data-target="#' + target + '" data-toggle="collapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" type="button">' +
    '<span class="navbar-toggler-icon"></span>' +
    '</button>' +
    '<div id="' + this.id + '" class="collapse navbar-collapse">' +
    '<ul class="navbar-nav nav-justified w-100">' +
    this.navBar.min() +
    '</ul></div></nav>'
    return ret
  }
}

class NavBar{
  constructor() {
    this.els = []
  }
  add(el) {
    this.els.push(el)
  }
  out(space = 0) {
    var ret = "";
    for (var i = 0; i < this.els.length; i++) {
      ret += this.els[i].out(space)
    }

    if (ret.length === 0) return "\n"

    return ret;
  }
  min() {
    var ret = "";
    for (var i = 0; i < this.els.length; i++) {
      ret += this.els[i].min()
    }
    return ret;
  }
}

function buildNav(json) {
  navbarNav = new NavbarNav('menu');
  navBar = new NavBar();

  console.log("json:",JSON.stringify(json),"\n\n")
  for (var i = 0; i < json.length; i++) {
    if (json[i]["inner"]) {
      var dropdown = new Dropdown(json[i]["title"])
      for (var j = 0; j < json[i]["inner"].length; j++) {
        dropdown.add(new NavItem(json[i]["inner"][j]["title"], json[i]["inner"][j]["href"]))
      }
      navBar.add(dropdown)
    }
    else
      navBar.add(new NavItem(json[i]["title"], json[i]["href"]))
  }
  navbarNav.navbar(navBar)

  return navbarNav;
}


module.exports = {NavBar, NavbarNav, Dropdown, NavItem, buildNav};
