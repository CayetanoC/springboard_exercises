"use strict";

const TVMAZE_API_URL = "https://api.tvmaze.com";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $episodesList = $("#episodesList");
const $searchForm = $("#searchForm");

/** Given a search term, search for TV shows that match that query.
 *
 *  Returns a promise for an array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  try {
    const response = await axios.get(
      `${TVMAZE_API_URL}/search/shows?q=${term}`
    );

    const shows = response.data.map((result) => {
      const showData = result.show;
      return {
        id: showData.id,
        name: showData.name,
        summary: showData.summary,
        image: showData.image
          ? showData.image.medium
          : "https://tinyurl.com/tv-missing",
      };
    });

    return shows;
  } catch (error) {
    console.error("Error fetching shows:", error);
    return [];
  }
}

/** Given list of shows, create markup for each and add it to the DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(`
      <div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img src="${show.image}" alt="${show.name}" class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
      </div>
    `);

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from the API and display.
 *    Hide the episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

async function getEpisodesOfShow(id) {
  try {
    const response = await axios.get(`${TVMAZE_API_URL}/shows/${id}/episodes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
}

/** Given a list of episodes, create markup for each and add it to the DOM */

function populateEpisodes(episodes) {
  $episodesList.empty();

  episodes.forEach((episode) => {
    const $episodeItem = $("<li></li>");
    $episodeItem.text(`Episode ${episode.number} : ${episode.name}`);
    $episodesList.append($episodeItem);
  });

  $episodesArea.show();
}

/** Handle click on episodes button: get episodes for the show and display */

async function getEpisodesAndDisplay(evt) {
  const showId = $(evt.target).closest(".Show").data("show-id");
  const episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
}

$showsList.on("click", ".Show-getEpisodes", getEpisodesAndDisplay);

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});
