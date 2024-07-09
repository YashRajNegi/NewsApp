fetch(
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F"
)
  .then((response) => response.json())
  .then((data) => {
    const newsList = document.getElementById("news-list");
    const searchInput = document.getElementById("search");

    function displayNews(items) {
      newsList.innerHTML = "";
      items.forEach((item) => {
        const li = document.createElement("li");
        const h2 = document.createElement("h2");
        const pAuthor = document.createElement("p");
        const description = document.createElement("div");
        const showMore = document.createElement("span");
        const a = document.createElement("a");
        const deleteButton = document.createElement("button");

        h2.textContent = item.title;
        pAuthor.textContent = `Author: ${item.author}`;
        description.textContent = item.description;
        showMore.textContent = "Read more";
        a.textContent = "Read full article";
        deleteButton.textContent = "Delete";

        a.href = item.link;
        a.target = "_blank";
        deleteButton.className = "delete-button";
        description.className = "description";
        showMore.className = "show-more";

        deleteButton.addEventListener("click", () => {
          newsList.removeChild(li);
        });

        showMore.addEventListener("click", () => {
          if (
            description.style.display === "none" ||
            description.style.display === ""
          ) {
            description.style.display = "block";
            showMore.textContent = "Show less";
            showMore.style.color = "#ff4d4d";
          } else {
            description.style.display = "none";
            showMore.textContent = "Read more";
            showMore.style.color = "#007bff";
          }
        });

        li.appendChild(h2);
        li.appendChild(pAuthor);
        li.appendChild(showMore);
        li.appendChild(description);
        li.appendChild(a);
        li.appendChild(deleteButton);

        newsList.appendChild(li);
      });
    }

    displayNews(data.items);

    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredItems = data.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
      );
      displayNews(filteredItems);
    });
  });
