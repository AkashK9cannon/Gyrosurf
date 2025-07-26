/**
 * @typedef {'flex' | 'grid' | 'block' | 'inline' | 'none'} DisplayType
 * @typedef {'center'|'left'|'end'|'start'|'flex-end'|'flex-start'} AlignItems
 * @typedef {'center'|'left'|'end'|'start'|'flex-end'|'flex-start'} JustifyContent
 * @typedef {'center'|'left'|'end'|'start'|'flex-end'|'flex-start'} JustifySelf
 * @typedef {'center'|'left'|'end'|'start'|'flex-end'|'flex-start'} AlignSelf
 */

/**
 * @typedef {Object} StyleOptions
 * @property {string} width
 * @property {string} height
 * @property {DisplayType} [display]
 * @property {AlignItems} [alignItems]
 * @property {AlignItems} [alignSelf]
 * @property {JustifyContent} [justifySelf]
 * @property {colorcombo} [color]
 */

/**
 * @class
 */

class Styles {
  /**
   * @param {StyleOptions} options
   */

  constructor({ width, height, display, color, alignItems, justifyContent }) {
    this.width = width;
    this.height = height;
    this.display = display;
    this.color = color;
    this.alignItems = alignItems;
    this.justifyContent = justifyContent;
  }
}

/**
 * @typedef {Object} TabWindowStyle
 */

/**
 * @typedef {Object} TabWindowOptions
 * @property {string} id
 * @property {string} element
 * @property {string} Class
 * @property {string} width
 * @property {string} height
 * @property {StyleOptions} style
 * @property {number} [x]
 * @property {number} [y]
 */

class TabWindow {
  /**
   * @param {TabWindowOptions} options
   */
  constructor({ id, element, Class, width, height, style, x, y }) {
    this.id = id;
    this.element = element;
    this.class = Class;
    this.width = width;
    this.height = height;
    this.style = style || {};
    this.x = x;
    this.y = y;
  }
  GetId() {
    return this.id;
  }
  Render() {
    const styleStr = `
            width:${this.width};
            height:${this.height};
            display:${this.style.display};
            align-items:${this.style.alignItems};
            align-self:${this.style.alignSelf};
            justify-content:${this.style.justifyContent};
            justify-self:${this.style.justifySelf};
            animation:${this.style.animate || "none"};
            background: ${this.style.background}
        `
      .replace(/\s+/g, " ")
      .trim();
    const TabStore = document.createElement(this.element);
    TabStore.id = this.id;
    TabStore.className = this.class;
    TabStore.style = styleStr;
    TabStore.style.background = "rgba(255,244,255,0.9)";
    return TabStore;
  }

  AddChildTab(tabElement, id, url) {
    const parent = document.getElementById(this.id);
    window.gyrosurf.CreateTab(id, url);
    console.log(tabElement, id, url);
    window.gyrosurf.Reply("CreatedTab", (data) => {
      console.log(`created Tab `, data);
      parent.appendChild(tabElement);
      this.SetActiveTab(id);
      console.log("Added Tab");
    });
  }

  CloseTab(id) {
    const parent = document.getElementById(this.id);
    const tabs = this.GetChildTabs();
    const index = tabs.findIndex((t) => t.id == id);
    if (index === -1) return;

    window.gyrosurf.CloseTab(id);
    window.gyrosurf.Reply("ClosedTab", ({ id, m }) => {
      if (m == "Not Found") {
        return;
      } else if (m == "Found") {
        parent.removeChild(document.getElementById(id));
      }
    });

    const remainingTabs = this.GetChildTabs();

    if (remainingTabs.length === 0) return;

    // Show adjacent tab after deletion
    const newIndex = index === 0 ? 0 : index - 1;
    remainingTabs.forEach((tab, i) => {
      if (i === newIndex) this.SetActiveTab(tab.id);
    });

    this.ManageTabWidth();
  }

  GetChildTabs() {
    const parent = document.getElementById(this.id);
    return document.querySelectorAll(".TabWindow")
  }

  Show(id) {
    const el = document.getElementById(id);
    console.log(id);
    console.log(typeof id);
    console.log(`Showing`);
    window.gyrosurf.ShowTab(id);
    window.gyrosurf.Reply("ShowingTab", (data) => {
      console.log(data);
      document.getElementById(`Tab-${id}`).textContent = data.Title;
      SearchBar.placeholder = data.Url;
      const cel = document.getElementById(id);
      el.style.background = "rgba(255,255,255,0.9)";
      el.style.borderBottom = "";
      el.style.fontWeight = "bold";
      el.style.borderRadius = "";
      cel.style.borderRadius = "";
    });
  }

  Hide(id) {
    const el = document.getElementById(id);
    const cel = document.getElementById(`Tab-${id}`);
    el.style.background = "rgba(80,80,80,0.2)";
    el.style.borderBottom = "none";
    el.style.fontWeight = "normal";
    if (cel) {
      cel.style.borderRadius = "0 0 0 0";
    }
  }

  SetActiveTab(id) {
  console.log("Activating Tab:", id);

  this.GetChildTabs().forEach(t => {
    if (t.id == id) {
      t.className = "TabWindow Tab-active";
      this.Show(t.id)
    } else {
      t.className = "TabWindow Tab-inactive";
      this.Hide(t.id)
    }
  });
}


  SwitchTab(direction = "next") {
    const tabs = this.GetChildTabs();
    const activeIndex = tabs.findIndex((tab) =>
      tab.classList.contains("Tab-active")
    );

    if (activeIndex === -1 || tabs.length <= 1) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (activeIndex + 1) % tabs.length;
    } else if (direction === "prev") {
      newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    }

    const newTab = tabs[newIndex];
    this.SetActiveTab(newTab.id);
  }

  ManageTabWidth() {
    const parent = document.getElementById(this.id);
    if (!parent) return;

    const tabs = this.GetChildTabs();
    const totalTabs = tabs.length;

    const newWidth = totalTabs <= 5 ? "200px" : 1200 / totalTabs + "px";

    tabs.forEach((tab) => {
      tab.style.width = newWidth;
    });
  }

  UpdateTabTitle() {}
  UpdateTabIcon() {}
  UpdateTabUrl() {}

  AddEventListener(event, callback) {
    const el = document.getElementById(this.id);
    if (el) el.addEventListener(event, callback);
  }
}

const GlobalShortcuts = {
  CloseTab: (callback) => {
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.shiftKey && e.key === "ArrowLeft") {
        e.preventDefault();
        callback();
      }
    });
  },
  CreateTab: (callback) => {
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.shiftKey && e.key === "ArrowRight") {
        e.preventDefault();
        callback();
      }
    });
  },
  SwitchTabs: () => {
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        Tabs.SwitchTab("next"); // call your class method
      }

      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        Tabs.SwitchTab("prev"); // call your class method
      }
    });
  },
  DeRegister: (e, callback) => {
    document.removeEventListener("keydown", callback);
  },
};

class Tab {
  /**
   * @param {TabWindowOptions} options
   */
  constructor({
    id,
    element,
    Class,
    width,
    height,
    style,
    x,
    y,
    title,
    url,
    icon,
  }) {
    this.id = id;
    this.element = element;
    this.class = Class;
    this.width = width;
    this.height = height;
    this.style = style || {};
    this.x = x;
    this.y = y;
    this.title = title;
    this.url = url;
    this.icon = icon;
  }
  Render() {
    const styleStr = `
    width:${this.width};
    height:${this.height};
    display:${this.style.display};
    align-items:${this.style.alignItems};
    justify-content:${this.style.justifyContent};
  `
      .replace(/\s+/g, " ")
      .trim();

    const tabEl = document.createElement(this.element);
    tabEl.id = this.id;
    tabEl.className = this.class; // ✅ this is what was missing!
    tabEl.setAttribute("style", styleStr);

    tabEl.innerHTML = `
    ${
      this.icon
        ? `<img src='${this.icon}' alt="Tab-${this.id}-Icon" id='Tab-${this.id}-Icon' />`
        : `<img src='../../sysMedia/Animated/Globe.gif' alt='' id='Tab-${this.id}-Icon' />`
    }
    <span id='Tab-${this.id}' style="width:70%;text-align:center;">${
      this.title ? `${this.title}` : `Tab-${this.id}`
    }</span>
    <img id="tab-${
      this.id
    }-close" class="Tab-Close" src="../../sysMedia/icons/Close.png" alt="tab-${
      this.id
    }-close" />
  `;

    // Close button event listener
    setTimeout(() => {
      const closeBtn = document.getElementById(`tab-${this.id}-close`);
      if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          Tabs.CloseTab(this.id);
        });
      }
    }, 0);

    tabEl.addEventListener("click", (e) => {
      e.preventDefault();
      Tabs.SetActiveTab(this.id);
    });

    this.domElement = tabEl;
    return tabEl;
  }

  GetID() {
    return this.id;
  }
}

class AddTabButton {
  /**
   * @param {TabWindowOptions} options
   */
  constructor({ id, Class, style }) {
    this.id = id;
    this.class = Class;
    this.el = "img";
    this.src = "../../sysMedia/icons/Add.png";
    this.style = style || {};
    this.domElement = null; // store the created DOM element
  }

  Render() {
    const styleStr = `
            display:${this.style.display};
            align-items:${this.style.alignItems};
            justify-content:${this.style.justifyContent};
            animation:${this.style.animate || "none"};
        `
      .replace(/\s+/g, " ")
      .trim();

    const at = document.createElement(this.el);
    at.id = this.id;
    at.className = this.class;
    at.setAttribute("src", this.src);
    at.setAttribute("style", styleStr);

    this.domElement = at; // store the reference

    return at;
  }

  onclick(callback) {
    if (this.domElement) {
      this.domElement.addEventListener("click", (e) => {
        e.preventDefault();
        callback(); // pass a function from outside
      });
    } else {
      console.warn("Element not yet rendered.");
    }
  }
}

var TabsContainer = document.getElementById("TabsContainer");
const Tabs = new TabWindow({
  id: "TabWindow",
  element: "div",
  Class: "TabsContainer",
  width: screen.width - 20,
  height: "30px",
  style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const addtabBtn = new AddTabButton({
  id: "Addtab",
  Class: "TabContainerAddTab",
  style: {
    display: "block",
  },
});

TabsContainer.appendChild(Tabs.Render());
TabsContainer.appendChild(addtabBtn.Render());
var count = 1;

function AddTab() {
  var nt = new Tab({
    id: count + 1,
    element: "div",
    Class: "TabWindow",
    width: "200px",
    height: "100%",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  count += 1;
  console.log("Adding Tab");
  Tabs.AddChildTab(nt.Render(), nt.id);
  Tabs.ManageTabWidth();
}

addtabBtn.onclick(AddTab); // Only once
