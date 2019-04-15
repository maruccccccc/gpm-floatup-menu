let mouseX = 0;
let mouseY = 0;

setTimeout(() => {
  const musicListWrapperObserver = new MutationObserver(fixChildObserver);
  musicListWrapperObserver.observe(
    document.querySelector("table.song-table.tight"),
    {
      attributes: true
    }
  );

  function fixChildObserver() {
    for (const child of document.querySelector("table.song-table.tight")
      .children) {
      if (child.tagName === "TBODY") {
        tbody = child;
      }
    }

    if (tbody === undefined) return;

    const musicListObserver = new MutationObserver(addEvent);
    musicListObserver.observe(tbody, {
      attributes: true
    });
    function addEvent() {
      document
        .querySelectorAll("paper-icon-button[data-id='menu']")
        .forEach(function(button) {
          if (!button.fixed) {
            button.addEventListener("mouseover", function(event) {
              if (event.target !== event.currentTarget) {
                this.dispatchEvent(new Event("click", { bubbles: true }));
              }
            });
            button.fixed = true;
          }
        });
    }
    addEvent();
  }

  fixChildObserver();

  const infoPopUpObserver = new MutationObserver(m => {
    let baseLine = document
      .querySelector(".selected-song-row")
      .getBoundingClientRect();
    let songMenu = document.querySelector(
      "div.goog-menu.goog-menu-vertical.song-menu"
    );
    songMenu.style.top = parseFloat(baseLine.top) - 165 + "px";
    songMenu.style.left = parseFloat(songMenu.style.left) + 40 + "px";
  });
  infoPopUpObserver.observe(
    document.querySelector("div.goog-menu.goog-menu-vertical.song-menu"),
    { attributes: true, attributeFilter: ["class"] }
  );
}, 2000);
