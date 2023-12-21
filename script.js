function getDataFromQuery(queryName) {
      var data = datasets.filter(function(d) {
        if (d) {
          return d.queryName == queryName;
        };
      })[0];
      if (!data) {
        alamode.reportError("No such query: '" + queryName + "'");
        return [];
      }
      return data.content;
    }

    function buildMenu() {
      var data = getDataFromQuery("menu");
      var menuBar = document.getElementById('menuBar');
      var menuData = {};

      // Organize data by menu_bar_name
      data.forEach(function(item) {
        if (!menuData[item.menu_bar_name]) {
          menuData[item.menu_bar_name] = [];
        }
        menuData[item.menu_bar_name].push(item);
      });

      // Generate HTML for each menu bar and its dropdown items
      for (var menuBarName in menuData) {
        var li = document.createElement('li');
        li.innerHTML = '<span onclick="toggleDropdown(\'' + menuBarName.replace(/\s+/g, '') + 'Dropdown\')">' + menuBarName + '</span>';
        var ul = document.createElement('ul');
        ul.id = menuBarName.replace(/\s+/g, '') + 'Dropdown';
        ul.className = 'dropdown-content';

        menuData[menuBarName].forEach(function(dropdownItem) {
          var li = document.createElement('li');
          li.innerHTML = '<a href="' + dropdownItem.link + '" target="_blank">' + dropdownItem.dropdown_name + '</a>';
          ul.appendChild(li);
        });

        li.appendChild(ul);
        menuBar.appendChild(li);
      }
    }

    // Call buildMenu to construct the menu
    buildMenu();

    function toggleDropdown(dropdownId) {
      var dropdowns = document.getElementsByClassName('dropdown-content');
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.id !== dropdownId) {
          openDropdown.style.display = 'none';
        }
      }
      var dropdown = document.getElementById(dropdownId);
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.dropdown > ul > li > span, .dropdown > ul > li > span *')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.style.display === 'block') {
            openDropdown.style.display = 'none';
          }
        }
      }
    }
